import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/HeroSection";
import QuickQuote from "@/components/QuickQuote";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import MaterialsSection from "@/components/MaterialsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteFormSection from "@/components/QuoteFormSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyNav />
      <HeroSection />
      <QuickQuote />
      <ServicesSection />
      <GallerySection />
      <BeforeAfterSection />
      <div id="proceso">
        <HowWeWorkSection />
      </div>
      <MaterialsSection />
      <TestimonialsSection />
      <QuoteFormSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
