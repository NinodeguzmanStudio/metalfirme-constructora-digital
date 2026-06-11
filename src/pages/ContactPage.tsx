import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import QuoteFormSection from "@/components/QuoteFormSection";

const ContactPage = () => (
  <PageShell>
    <PageHero
      eyebrow="Contacto"
      title="Cotizacion directa por WhatsApp"
      description="Envia medidas, ubicacion y fotos de referencia. Te respondemos con una propuesta clara para fabricar a medida."
    />
    <QuoteFormSection />
    <ContactSection />
  </PageShell>
);

export default ContactPage;
