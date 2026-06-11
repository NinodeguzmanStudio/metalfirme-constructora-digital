import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import WorkshopSection from "@/components/WorkshopSection";

const WorkshopPage = () => (
  <PageShell>
    <PageHero
      eyebrow="Nuestro taller"
      title="Soldadura, pintura y despacho en una vista separada"
      description="Aqui colocaremos las fotos reales del taller por etapa, sin repetir imagenes de proyectos ni ensuciar la portada."
    />
    <WorkshopSection />
  </PageShell>
);

export default WorkshopPage;
