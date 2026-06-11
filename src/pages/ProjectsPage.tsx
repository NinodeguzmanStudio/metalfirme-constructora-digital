import GallerySection from "@/components/GallerySection";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import TestimonialsSection from "@/components/TestimonialsSection";

const ProjectsPage = () => (
  <PageShell>
    <PageHero
      eyebrow="Proyectos"
      title="Trabajos reales de fabricacion metalica"
      description="Galeria organizada por categorias y clientes reales. Las fotos se cargan desde URLs publicas para verse correctamente en Vercel y celulares."
    />
    <GallerySection />
    <TestimonialsSection />
  </PageShell>
);

export default ProjectsPage;
