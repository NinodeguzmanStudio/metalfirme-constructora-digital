import { useState, useEffect } from "react";
import { MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, whatsappUrl } from "@/lib/site";

const links = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Taller", href: "#taller" },
  { label: "Proceso", href: "#proceso" },
  { label: "Cotizar", href: "#cotizar" },
  { label: "Contacto", href: "#contacto" },
];

const StickyNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      // Track active section
      const sections = links.map(l => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleMobileNav = (href: string) => {
    setMenuOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center">
          <img
            src="/ravichagua-logo.png"
            alt={`${SITE.legalName} logo`}
            className="h-[42px] w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:h-[51px]"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <Button size="sm" className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg group" asChild>
            <a href={whatsappUrl(`Hola ${SITE.name}, quiero informacion para cotizar.`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1.5 h-4 w-4" /> WhatsApp
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden relative z-50 text-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "100dvh", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[120] bg-background/98 shadow-2xl shadow-background/60 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <img
                src="/ravichagua-logo.png"
                alt={`${SITE.legalName} logo`}
                className="h-[42px] w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
              />
              <button
                className="rounded-lg p-2 text-foreground hover:bg-secondary"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <div className="space-y-2 px-4 py-6">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  type="button"
                  onClick={() => handleMobileNav(l.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block w-full rounded-lg px-4 py-3 text-left text-xl font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button className="mt-4 w-full rounded-xl bg-primary py-5 text-primary-foreground hover:bg-primary/90" asChild>
                  <a href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un proyecto.`)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> Cotizar por WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default StickyNav;
