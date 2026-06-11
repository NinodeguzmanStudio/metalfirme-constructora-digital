import BeforeAfterSection from "@/components/BeforeAfterSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import MaterialsSection from "@/components/MaterialsSection";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";

const ProcessPage = () => (
  <PageShell>
    <PageHero
      eyebrow="Proceso"
      title="De la medida al despacho con etapas claras"
      description="Reunimos proceso, materiales y decisiones tecnicas en una pagina propia para que el cliente entienda como se fabrica su proyecto."
    />
    <HowWeWorkSection />
    <BeforeAfterSection />
    <MaterialsSection />
  </PageShell>
);

export default ProcessPage;
