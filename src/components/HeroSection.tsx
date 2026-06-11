import { motion } from "framer-motion";
import { ArrowRight, Building2, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE, PROJECTS, SITE, whatsappUrl } from "@/lib/site";

const trustItems = [
  { icon: ShieldCheck, label: "Fabricacion a medida" },
  { icon: Building2, label: "Estructuras y mobiliario" },
  { icon: Truck, label: "Lima y provincias" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-background pt-20 md:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,hsl(var(--primary)/0.11),transparent_30%),linear-gradient(135deg,hsl(var(--background))_0%,hsl(216_18%_9%)_48%,hsl(var(--background))_100%)]" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 mx-auto grid min-h-[calc(92vh-5rem)] w-full max-w-7xl items-center gap-10 px-4 pb-14 pt-8 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-8 inline-flex items-stretch overflow-hidden rounded-lg border border-border bg-card/70 shadow-xl shadow-black/20 backdrop-blur">
            <div className="w-2 bg-primary" />
            <div className="px-5 py-4">
              <span className="block text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Infraestructura
              </span>
              <span className="mt-1 block font-display text-2xl font-bold leading-none tracking-wide text-foreground md:text-3xl">
                Ravichagua
              </span>
              <span className="mt-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Metalica industrial en Lima
              </span>
            </div>
          </div>

          <h1 className="font-display text-[clamp(2.7rem,11vw,5.75rem)] font-bold leading-[0.96] tracking-tight">
            Infraestructura metalica para negocios que necesitan crecer
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver md:text-xl">
            Fabricamos estructuras, barras, mesas de alta carga, rejas y mobiliario industrial
            con medidas reales, acabado profesional y coordinacion directa por WhatsApp.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="glass-card flex min-h-14 items-center gap-3 rounded-lg px-4 py-3 text-sm text-silver">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="rounded-lg bg-primary px-7 py-7 text-base font-semibold text-primary-foreground hover:bg-primary/90 md:text-lg" asChild>
              <a href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un proyecto metalico.`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-lg border-steel/40 px-7 py-7 text-base text-foreground hover:border-primary/50 hover:bg-secondary md:text-lg"
              asChild
            >
              <Link to="/proyectos">Ver proyectos</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/35">
            <img
              src={HERO_IMAGE}
              alt="Estructura metalica comercial fabricada por Estructuras Ravichagua"
              className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,hsl(var(--background)/0.86)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Proyecto comercial</p>
              <h2 className="mt-2 font-display text-2xl font-semibold md:text-4xl">Entrepisos, barras y mobiliario industrial</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-silver md:text-base">
                Soluciones metalicas para restaurantes, locales, talleres y espacios de alto uso.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {PROJECTS.slice(0, 3).map((project) => (
              <img
                key={project.id}
                src={project.image}
                alt={project.title}
                className="aspect-square rounded-lg border border-border object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
