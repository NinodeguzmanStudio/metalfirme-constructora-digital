import { safeLocalStorage } from './utils/storage';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AmbientBackground from './components/AmbientBackground.tsx';
import Sparkles from './components/Sparkles.tsx';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import QuestionChatScreen from './components/QuestionChatScreen.tsx';
import CardSelectionScreen from './components/CardSelectionScreen.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import OnboardingFlow from './components/OnboardingFlow.tsx';
import { SageAdvice } from './components/SageAdvice.tsx';
import { TarotTable } from './components/TarotTable.tsx';
import SpreadsMenu from './components/SpreadsMenu.tsx';
import BottomNav from './components/BottomNav.tsx';
import PremiumView from './components/PremiumView.tsx';
import SettingsView from './components/SettingsView.tsx';
import PremiumModal from './components/PremiumModal.tsx';
import PhotoReadingScreen from './components/PhotoReadingScreen.tsx';
import PalmReadingScreen from './components/PalmReadingScreen.tsx';
import CompatibilityScreen from './components/CompatibilityScreen.tsx';
import { UserProfile, AppScreen, MainTab, SpreadType, ZodiacSign, TarotCard } from './types.ts';
import { calculateZodiacSign } from './utils.ts';
import { supabase, syncProfileWithCloud, getUserProfile } from './services/supabaseClient.ts';

// ✅ PASO 3.5: Importar error tracking de Sentry
import { initErrorTracking, setErrorTrackingUser, clearErrorTrackingUser, captureError } from './services/errorTracking.ts';

// ✅ Analytics: Google Analytics + Meta Pixel
import { trackLogin, trackSignUp, trackOnboardingComplete, trackPurchase, setAnalyticsUser, clearAnalyticsUser } from './services/analyticsService.ts';

// ✅ NUEVO: Notificaciones
import { initNotifications, promptNotificationPermission } from './services/notificationService.ts';

// v2.5: DEV_EMAIL desde variable de entorno (no hardcoded)
const DEV_EMAIL = import.meta.env.VITE_DEV_EMAIL || '';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  birthDate: '',
  birthTime: '',
  birthPlace: '',
  locationCoords: '',
  sign: undefined,
  isPremium: false,
  usage: {
    dailyDrawUsed: false,
    sections: {},
    lastReset: new Date().toISOString()
  }
};

interface SavedReading {
  spreadType: SpreadType;
  question: string;
  cards: TarotCard[];
  reading: string;
  timestamp: string;
  visitorId: string;
  premiumDeck: {
    name: string;
    type: string;
    totalCards: number;
    cardsToSelect: number;
  } | null;
  sourceTab: MainTab;
}

const getUserId = (email: string | null): string => {
  if (email) return email.replace(/[^a-zA-Z0-9]/g, '_');
  let visitorId = safeLocalStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now();
    safeLocalStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

const getProfileKey = (userId: string) => `mystic_profile_${userId}`;
const getReadingKey = (userId: string) => `mystic_reading_${userId}`;

const LoadingScreen: React.FC<{ message?: string }> = ({ message }) => (
  <div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center">
    <div className="relative mb-6">
      <span className="text-5xl animate-pulse">🔮</span>
      <div className="absolute -inset-4 bg-sky-500/20 rounded-full blur-xl animate-pulse"></div>
    </div>
    <div className="text-sky-400 text-lg animate-pulse">{message || 'Preparando tu lectura...'}</div>
    <div className="mt-4 flex gap-1">
      <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const devMode = useMemo(() => {
    const isLocalOrPreview = !window.location.hostname.includes('lecturadeltarot.com');
    return isLocalOrPreview;
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('Conectando con el destino...');
  
  const [screen, setScreen] = useState<AppScreen>(AppScreen.Welcome);
  const [activeTab, setActiveTab] = useState<MainTab>(MainTab.Home);
  const [viewMode, setViewMode] = useState<'menu' | 'table'>('menu');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('RiderWaite');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showPhotoReading, setShowPhotoReading] = useState(false);
  const [showPalmReading, setShowPalmReading] = useState(false);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [premiumDeck, setPremiumDeck] = useState<{
    name: string;
    type: string;
    totalCards: number;
    cardsToSelect: number;
  } | null>(null);

  const [sourceTab, setSourceTab] = useState<MainTab>(MainTab.Tarot);
  const [initialQuestion, setInitialQuestion] = useState<string>('');
  const [initialCards, setInitialCards] = useState<TarotCard[]>([]);
  const [pendingReading, setPendingReading] = useState<boolean>(false);
  
  const [savedReading, setSavedReading] = useState<SavedReading | null>(null);
  const [showSavedReading, setShowSavedReading] = useState<boolean>(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  // ✅ PASO 3.5: Inicializar Sentry al cargar la App
  useEffect(() => {
    initErrorTracking();
  }, []);

  const isProfileComplete = useCallback((profile: UserProfile): boolean => {
    return !!(profile.name && profile.name.trim() !== '' && profile.birthDate);
  }, []);

  const loadUserProfile = useCallback(async (email: string | null): Promise<boolean> => {
    const userId = getUserId(email);
    
    try {
      const saved = safeLocalStorage.getItem(getProfileKey(userId));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (isProfileComplete(parsed)) {
          setUserProfile(parsed);
          setIsNewUser(false);
          setIsLoadingProfile(false);
          
          if (email && supabase) {
            getUserProfile().then(({ success, profile }) => {
              if (success && profile && profile.name) {
                const cloudProfile: UserProfile = {
                  name: profile.name,
                  birthDate: profile.birth_date || '',
                  birthTime: profile.birth_time || '',
                  birthPlace: profile.birth_place || '',
                  locationCoords: profile.location_coords || '',
                  sign: profile.sign as ZodiacSign,
                  isPremium: profile.is_premium || false,
                  usage: parsed.usage || DEFAULT_PROFILE.usage
                };
                setUserProfile(cloudProfile);
                safeLocalStorage.setItem(getProfileKey(userId), JSON.stringify(cloudProfile));
              }
            }).catch(e => captureError(e instanceof Error ? e : new Error(String(e)), { context: 'cloudProfileSync' })); 
          }
          
          return true;
        }
      }
    } catch (e) {
      console.error('Error loading from safeLocalStorage:', e);
    }
    
    if (email && supabase) {
      try {
        const timeoutPromise = new Promise<null>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 10000)
        );
        
        const profilePromise = getUserProfile();
        
        const result = await Promise.race([profilePromise, timeoutPromise]);
        
        if (result && result.success && result.profile && result.profile.name) {
          const loadedProfile: UserProfile = {
            name: result.profile.name,
            birthDate: result.profile.birth_date || '',
            birthTime: result.profile.birth_time || '',
            birthPlace: result.profile.birth_place || '',
            locationCoords: result.profile.location_coords || '',
            sign: result.profile.sign as ZodiacSign,
            isPremium: result.profile.is_premium || false,
            usage: DEFAULT_PROFILE.usage
          };
          setUserProfile(loadedProfile);
          safeLocalStorage.setItem(getProfileKey(userId), JSON.stringify(loadedProfile));
          setIsNewUser(false);
          setIsLoadingProfile(false);
          return true;
        }
      } catch (e) {
        
      }
    }
    
    setUserProfile(DEFAULT_PROFILE);
    setIsNewUser(true);
    setIsLoadingProfile(false);
    return false;
  }, [isProfileComplete]);

  // ✅ FIX: Lectura guardada ya NO expira a las 24h — persiste hasta que el usuario haga otra
  const loadSavedReading = useCallback((userId: string) => {
    try {
      const saved = safeLocalStorage.getItem(getReadingKey(userId));
      if (saved) {
        const parsed = JSON.parse(saved) as SavedReading;
        // ✅ CAMBIO: Ya no verificamos las 24 horas. La lectura persiste siempre.
        if (parsed.reading) {
          setSavedReading(parsed);
          return;
        }
      }
      safeLocalStorage.removeItem(getReadingKey(userId));
      setSavedReading(null);
    } catch (e) {
      console.error('Error loading saved reading:', e);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const initializeApp = async () => {
      if (devMode) {
        setIsAuthenticated(true);
        setLoadingMessage('Cargando tu perfil...');
        const exists = await loadUserProfile(DEV_EMAIL);
        if (isMounted) {
          // 🔧 DEV: Forzar premium para pruebas en modo dev
          setUserProfile(prev => ({ ...prev, isPremium: true, daysRemaining: 999 }));
          if (exists) {
            setScreen(AppScreen.MainHub);
            loadSavedReading(getUserId(DEV_EMAIL));
          }
        }
        return;
      }

      if (!supabase) {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoadingProfile(false);
          setScreen(AppScreen.Welcome);
        }
        return;
      }

      try {
        setLoadingMessage('Verificando sesión...');
        
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise<null>((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 5000)
        );
        
        const result = await Promise.race([sessionPromise, timeoutPromise]);
        
        if (!isMounted) return;
        
        if (result && result.data?.session?.user) {
          const email = result.data.session.user.email || null;
          setIsAuthenticated(true);
          setUserEmail(email);
          
          // ✅ PASO 3.5: Rastrear usuario al iniciar sesión (Caso 1: Sesión guardada)
          setErrorTrackingUser(result.data.session.user.id, email || '');
          // ✅ Analytics: identificar usuario en GA4
          setAnalyticsUser(result.data.session.user.id);

          setLoadingMessage('Cargando tu perfil...');
          const exists = await loadUserProfile(email);
          
          const pending = safeLocalStorage.getItem('pending_reading');
          if (pending) {
            try {
              const data = JSON.parse(pending);
              setInitialQuestion(data.question);
              setInitialCards(data.cards);
              setPendingReading(true);
            } catch (e) { captureError(e instanceof Error ? e : new Error(String(e)), { context: "parsePending" }); }
          }
          
          if (isMounted) {
            if (exists) {
              setScreen(AppScreen.MainHub);
              loadSavedReading(getUserId(email));
            } else {
              // ✅ FIX: Usuario autenticado NUNCA debe ver Welcome (lectura gratis)
              // Si no tiene perfil completo, va directo a onboarding
              setScreen(AppScreen.InputName);
            }
          }
        } else {
          if (isMounted) {
            setIsAuthenticated(false);
            setIsLoadingProfile(false);
            setScreen(AppScreen.Welcome);
          }
        }
      } catch (e) {
        
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoadingProfile(false);
          setScreen(AppScreen.Welcome);
        }
      }
    };

    initializeApp();

    let subscription: any = null;
    if (supabase && !devMode) {
      const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (!isMounted) return;
        if (session?.user) {
          const email = session.user.email || null;
          setIsAuthenticated(true);
          setUserEmail(email);
          // ✅ PASO 3.5: Rastrear usuario al iniciar sesión (Caso 2: Evento de cambio)
          setErrorTrackingUser(session.user.id, email || '');
        } else {
          setIsAuthenticated(false);
          setUserEmail(null);
        }
      });
      subscription = data.subscription;
    }

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [devMode, loadUserProfile, loadSavedReading]);

  // ✅ NUEVO: Inicializar notificaciones cuando el perfil está completo y estamos en MainHub
  useEffect(() => {
    if (screen === AppScreen.MainHub && isProfileComplete(userProfile) && userProfile.name) {
      // Inicializar notificaciones con datos del usuario
      initNotifications(
        userProfile.name, 
        userProfile.sign, 
        userProfile.usage?.dailyDrawUsed || false
      );
    }
  }, [screen, userProfile.name, userProfile.sign, userProfile.usage?.dailyDrawUsed, isProfileComplete]);

  useEffect(() => {
    if (isProfileComplete(userProfile) && userEmail) {
      const userId = getUserId(userEmail);
      safeLocalStorage.setItem(getProfileKey(userId), JSON.stringify(userProfile));
      syncProfileWithCloud(userProfile).catch(e => captureError(e instanceof Error ? e : new Error(String(e)), { context: 'syncProfile' }));
    }
  }, [userProfile, userEmail, isProfileComplete]);

  const handleUpdateProfile = useCallback((data: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...data };
      if (updated.birthDate && updated.birthDate.length === 10) {
        updated.sign = calculateZodiacSign(updated.birthDate);
      }
      return updated;
    });
  }, []);

  const handleWelcomeStart = useCallback(() => {
    setScreen(AppScreen.QuestionChat);
  }, []);

  const handleQuestionSubmit = useCallback((question: string) => {
    setInitialQuestion(question);
    setScreen(AppScreen.CardSelection);
  }, []);

  const handleCardsSelected = useCallback((cards: TarotCard[]) => {
    setInitialCards(cards);
    safeLocalStorage.setItem('pending_reading', JSON.stringify({
      question: initialQuestion,
      cards: cards
    }));
    setPendingReading(true);
  }, [initialQuestion]);

  const handleAuthFromCards = useCallback(async () => {
    setIsAuthenticated(true);
    
    let email: string | null = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      email = user?.email || null;
      setUserEmail(email);
      
      // ✅ PASO 3.5: Rastrear usuario al autenticarse después de seleccionar cartas
      if (user) {
        setErrorTrackingUser(user.id, email || '');
        // ✅ Analytics: registrar signup (primera vez desde cartas)
        setAnalyticsUser(user.id);
        trackSignUp('google');
      }
    }
    
    const exists = await loadUserProfile(email);
    
    if (exists) {
      setScreen(AppScreen.MainHub);
      safeLocalStorage.removeItem('pending_reading');
    } else {
      setScreen(AppScreen.InputName);
    }
  }, [loadUserProfile]);

  const handleLoginSuccess = useCallback(async () => {
    setIsAuthenticated(true);
    safeLocalStorage.setItem('has_logged_in_before', 'true');
    let email: string | null = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      email = user?.email || null;
      setUserEmail(email);

      // ✅ PASO 3.5: Rastrear usuario al hacer login exitoso
      if (user) {
        setErrorTrackingUser(user.id, email || '');
        // ✅ Analytics: registrar login
        setAnalyticsUser(user.id);
        trackLogin('google');
      }
    }
    
    const exists = await loadUserProfile(email);
    
    const pending = safeLocalStorage.getItem('pending_reading');
    if (pending) {
      try {
        const data = JSON.parse(pending);
        setInitialQuestion(data.question);
        setInitialCards(data.cards);
        setPendingReading(true);
      } catch (e) { captureError(e instanceof Error ? e : new Error(String(e)), { context: "parsePending" }); }
    }
    
    if (exists) {
      setScreen(AppScreen.MainHub);
      loadSavedReading(getUserId(email));
    } else {
      setScreen(AppScreen.InputName);
    }
  }, [loadUserProfile, loadSavedReading]);

  const handleOnboardingNext = useCallback((data?: Partial<UserProfile>) => {
    if (data) handleUpdateProfile(data);
    
    const nextScreen = screen + 1;
    
    if (nextScreen >= AppScreen.MainHub) {
      setScreen(AppScreen.MainHub);
      setIsNewUser(false);
      safeLocalStorage.removeItem('pending_reading');
      // ✅ Analytics: onboarding completado
      trackOnboardingComplete();
      
      // ✅ NUEVO: Pedir permiso de notificaciones después del onboarding (suave, no bloquea)
      setTimeout(() => {
        promptNotificationPermission();
      }, 3000);
    } else {
      setScreen(nextScreen as AppScreen);
    }
  }, [screen, handleUpdateProfile]);

  const handleOnboardingBack = useCallback(() => {
    if (screen > AppScreen.InputName) {
      setScreen((screen - 1) as AppScreen);
    }
  }, [screen]);

  const handlePremiumDeckSelect = useCallback((deck: { name: string; type: string; totalCards: number; cardsToSelect: number }) => {
    setPremiumDeck(deck);
    setSelectedSpread(deck.type as SpreadType);
    setSourceTab(MainTab.Premium);
    setActiveTab(MainTab.Tarot);
    setViewMode('table');
  }, []);

  const handlePremiumUpdate = useCallback((isPremium: boolean, daysRemaining: number) => {
    setUserProfile(prev => {
      // ✅ Analytics: si pasó a premium y antes no era
      if (isPremium && !prev.isPremium) {
        trackPurchase('premium', 12.90, 'PEN');
      }
      return { ...prev, isPremium, daysRemaining };
    });
  }, []);

  const handleLogout = useCallback(async () => {
    // ✅ PASO 3.5: Limpiar rastreo de usuario al hacer logout
    clearErrorTrackingUser();
    // ✅ Analytics: limpiar usuario
    clearAnalyticsUser();

    if (supabase) {
      await supabase.auth.signOut();
    }
    
    const userId = getUserId(userEmail);
    // ✅ FIX: NO borrar perfil - mantener usage (dailyDrawUsed) para que no se reinicie al re-loguearse
    safeLocalStorage.removeItem(getReadingKey(userId));
    safeLocalStorage.removeItem('pending_reading');
    
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserProfile(DEFAULT_PROFILE);
    setInitialQuestion('');
    setInitialCards([]);
    setPendingReading(false);
    setSavedReading(null);
    setShowSavedReading(false);
    setIsNewUser(true);
    setActiveTab(MainTab.Home);
    setViewMode('menu');
    setScreen(AppScreen.AuthScreen);
  }, [userEmail]);

  const handleReadingComplete = useCallback((reading: string, cards: TarotCard[], question: string) => {
    const userId = getUserId(userEmail);
    const savedData: SavedReading = {
      spreadType: selectedSpread,
      question,
      cards,
      reading,
      timestamp: new Date().toISOString(),
      visitorId: userId,
      premiumDeck,
      sourceTab
    };
    safeLocalStorage.setItem(getReadingKey(userId), JSON.stringify(savedData));
    setSavedReading(savedData);
  }, [userEmail, selectedSpread, premiumDeck, sourceTab]);

  const handleBackFromReading = useCallback(() => {
    if (sourceTab === MainTab.Premium) {
      setActiveTab(MainTab.Premium);
      setViewMode('menu');
      setPremiumDeck(null);
    } else {
      setViewMode('menu');
      setPremiumDeck(null);
    }
    setSourceTab(MainTab.Tarot);
  }, [sourceTab]);

  const handleShowSavedReading = useCallback(() => {
    if (savedReading) {
      setSelectedSpread(savedReading.spreadType);
      setPremiumDeck(savedReading.premiumDeck);
      setSourceTab(savedReading.sourceTab);
      setShowSavedReading(true);
      setActiveTab(MainTab.Tarot);
      setViewMode('table');
    }
  }, [savedReading]);

  // ✅ FIX CRÍTICO: handleTabChange ahora resetea TODOS los estados que podrían bloquear la navegación
  const handleTabChange = useCallback((tab: MainTab) => {
    setShowSavedReading(false);
    setShowPhotoReading(false);
    setShowPalmReading(false);
    setShowCompatibility(false);
    
    // ✅ FIX: Resetear pendingReading para que no bloquee los tabs
    setPendingReading(false);
    setInitialCards([]);
    setInitialQuestion('');
    safeLocalStorage.removeItem('pending_reading');
    
    setActiveTab(tab);
    if (tab === MainTab.Tarot) setViewMode('menu');
  }, []);

  const renderMainContent = useCallback(() => {
    // ✅ FIX: showSavedReading ahora se puede cerrar con los tabs (handleTabChange lo resetea)
    if (showSavedReading && savedReading) {
      return (
        <TarotTable 
          onBack={() => {
            setShowSavedReading(false);
            handleBackFromReading();
          }} 
          isPremium={savedReading.premiumDeck !== null || userProfile.isPremium || false}
          spreadType={savedReading.spreadType}
          userProfile={userProfile} 
          onUpdateProfile={handleUpdateProfile} 
          onShowPremium={() => setShowPremiumModal(true)}
          premiumDeck={savedReading.premiumDeck}
          initialCards={savedReading.cards}
          initialQuestion={savedReading.question}
          initialReading={savedReading.reading}
          onReadingComplete={handleReadingComplete}
          sourceTab={savedReading.sourceTab}
        />
      );
    }

    if (pendingReading && initialCards.length > 0) {
      return (
        <TarotTable 
          onBack={() => {
            setPendingReading(false);
            setInitialCards([]);
            setInitialQuestion('');
            setViewMode('menu');
          }} 
          isPremium={true}
          spreadType="CelticCross"
          userProfile={userProfile} 
          onUpdateProfile={handleUpdateProfile} 
          onShowPremium={() => setShowPremiumModal(true)}
          premiumDeck={{ name: 'Lectura Inicial', type: 'CelticCross', totalCards: 78, cardsToSelect: 9 }}
          initialCards={initialCards}
          initialQuestion={initialQuestion}
          onReadingComplete={handleReadingComplete}
          sourceTab={MainTab.Home}
        />
      );
    }

    switch (activeTab) {
      case MainTab.Home:
        return (
          <>
            <SageAdvice userProfile={userProfile} />
            {savedReading && !showSavedReading && (
              <div className="px-4 pb-4">
                <button
                  onClick={handleShowSavedReading}
                  className="w-full py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl text-amber-200 text-sm font-serif flex items-center justify-center gap-2"
                >
                  <span>🔮</span>
                  <span>Ver tu última lectura</span>
                </button>
              </div>
            )}
          </>
        );
      case MainTab.Tarot:
        if (viewMode === 'menu') {
          return (
            <>
              <SpreadsMenu 
                onSelectSpread={(s) => { 
  setPremiumDeck(null);
  setSelectedSpread(s); 
  setSourceTab(MainTab.Tarot);
  setViewMode('table'); 
}}
                userProfile={userProfile} 
                onShowPremium={() => setShowPremiumModal(true)} 
              />
              {savedReading && !showSavedReading && (
                <div className="px-4 pb-4">
                  <button
                    onClick={handleShowSavedReading}
                    className="w-full py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl text-amber-200 text-sm font-serif flex items-center justify-center gap-2"
                  >
                    <span>🔮</span>
                    <span>Ver tu última lectura</span>
                  </button>
                </div>
              )}
            </>
          );
        }
        return (
          <TarotTable 
            onBack={handleBackFromReading}
            isPremium={premiumDeck !== null || userProfile.isPremium || false} 
            spreadType={selectedSpread} 
            userProfile={userProfile} 
            onUpdateProfile={handleUpdateProfile} 
            onShowPremium={() => setShowPremiumModal(true)}
            premiumDeck={premiumDeck}
            onReadingComplete={handleReadingComplete}
            sourceTab={sourceTab}
          />
        );
      case MainTab.Premium:
        if (showPhotoReading) {
          return <PhotoReadingScreen onBack={() => setShowPhotoReading(false)} userProfile={userProfile} />;
        }
        if (showPalmReading) {
          return <PalmReadingScreen onBack={() => setShowPalmReading(false)} userProfile={userProfile} />;
        }
        if (showCompatibility) {
          return <CompatibilityScreen onBack={() => setShowCompatibility(false)} userProfile={userProfile} />;
        }
        return (
          <PremiumView 
            userProfile={userProfile} 
            onSelectDeck={handlePremiumDeckSelect} 
            onPremiumUpdate={handlePremiumUpdate} 
            onPhotoReading={() => setShowPhotoReading(true)}
            onPalmReading={() => setShowPalmReading(true)}
            onCompatibility={() => setShowCompatibility(true)}
          />
        );
      case MainTab.Settings:
        return <SettingsView onLogout={handleLogout} />;
      default:
        return <SageAdvice userProfile={userProfile} />;
    }
  }, [
    showSavedReading, savedReading, pendingReading, initialCards, initialQuestion, 
    showPhotoReading, showPalmReading, showCompatibility,
    activeTab, viewMode, userProfile, selectedSpread, premiumDeck, sourceTab,
    handleBackFromReading, handleUpdateProfile, handleReadingComplete,
    handleShowSavedReading, handlePremiumDeckSelect, handlePremiumUpdate, handleLogout
  ]);

  if (isLoadingProfile && !devMode) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020617] flex items-center justify-center font-serif text-slate-200 overflow-hidden">
      <div className="relative w-full max-w-[480px] h-full bg-[#020617] flex flex-col shadow-2xl overflow-hidden border-x border-slate-900">
        <AmbientBackground />
        <Sparkles />
        
        <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {screen === AppScreen.Welcome && (
            <WelcomeScreen onStart={handleWelcomeStart} onLogin={() => setScreen(AppScreen.AuthScreen)} />
          )}
          
          {screen === AppScreen.QuestionChat && (
            <QuestionChatScreen onSubmit={handleQuestionSubmit} />
          )}
          
          {screen === AppScreen.CardSelection && (
            <CardSelectionScreen 
              question={initialQuestion} 
              onComplete={handleCardsSelected}
              onAuthSuccess={handleAuthFromCards}
            />
          )}
          
          {screen === AppScreen.AuthScreen && (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          )}
          
          {screen >= AppScreen.InputName && screen < AppScreen.MainHub && (
            <OnboardingFlow 
              currentScreen={screen} 
              onNext={handleOnboardingNext} 
              onBack={handleOnboardingBack}
            />
          )}
          
          {screen === AppScreen.MainHub && (
            <div className="flex-1 relative pb-16">
              {renderMainContent()}
            </div>
          )}
        </main>
        
        {screen === AppScreen.MainHub && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
        {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
      </div>
    </div>
  );
};

export default App;
