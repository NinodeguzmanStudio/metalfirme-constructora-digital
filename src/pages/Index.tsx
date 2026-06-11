import { Link } from "react-router-dom";
import { ArrowRight, Building2, Factory, Images, MessageCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import HeroSection from "@/components/HeroSection";
import QuickQuote from "@/components/QuickQuote";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { SITE, whatsappUrl } from "@/lib/site";

const routes = [
  {
    title: "Nuestro taller",
    description: "Soldadura, pintura y despacho separados por etapas para tus fotos reales.",
    href: "/taller",
    icon: Factory,
  },
  {
    title: "Proyectos",
    description: "Galeria de trabajos metalicos, barras, mesas, rejas y entrepisos.",
    href: "/proyectos",
    icon: Images,
  },
  {
    title: "Proceso",
    description: "Como pasamos de medida y referencia a fabricacion e instalacion.",
    href: "/proceso",
    icon: Building2,
  },
];

const Index = () => {
  return (
    <PageShell>
      <HeroSection />
      <QuickQuote />
      <ServicesSection />

      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Explorar la empresa
          </span>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Una web ordenada por decisiones, no por bloques repetidos
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Cada area tiene su propia pagina para revisar mejor desde celular o escritorio.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {routes.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} to={href} className="group rounded-lg border border-border bg-card p-6 transition hover:border-primary/50 hover:bg-secondary/60">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/40 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Abrir pagina
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <section className="px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-7xl rounded-lg border border-border bg-card p-7 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Cotizacion directa</p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Tu proyecto empieza con medidas y fotos de referencia</h2>
            </div>
            <Button size="lg" className="rounded-lg bg-primary px-7 py-7 text-primary-foreground hover:bg-primary/90" asChild>
              <a href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un proyecto metalico.`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
