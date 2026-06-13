import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Paintbrush, PackageCheck, ArrowRight } from "lucide-react";
import { SITE, WORKSHOP_GALLERIES, whatsappUrl } from "@/lib/site";

const stages = [
  {
    id: "soldadura",
    title: "Soldadura",
    icon: Flame,
    eyebrow: "Etapa 01",
    description:
      "Armado, punteo y cordones estructurales segun medidas, carga y uso real del proyecto.",
  },
  {
    id: "pintura",
    title: "Pintura",
    icon: Paintbrush,
    eyebrow: "Etapa 02",
    description:
      "Preparacion de superficie, proteccion y acabado final para una entrega limpia y duradera.",
  },
  {
    id: "despacho",
    title: "Despacho",
    icon: PackageCheck,
    eyebrow: "Etapa 03",
    description:
      "Revision, embalaje y coordinacion de entrega o instalacion en Lima y provincias.",
  },
];

const WorkshopSection = () => {
  const [activeId, setActiveId] = useState(stages[0].id);
  const activeStage = stages.find((stage) => stage.id === activeId) ?? stages[0];
  const ActiveIcon = activeStage.icon;
  const gallery = WORKSHOP_GALLERIES[activeStage.id as keyof typeof WORKSHOP_GALLERIES] ?? [];

  return (
    <section id="taller" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(82,116,148,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(145,98,63,0.18),transparent_24%),linear-gradient(180deg,rgba(8,12,18,0.9)_0%,rgba(15,23,34,0.96)_45%,rgba(11,16,24,0.94)_100%)]" />
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-8 max-w-3xl"
      >
        <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Nuestro taller
        </span>
        <h2 className="font-display text-4xl font-bold md:text-6xl">
          Asi fabricamos sin cargar toda la pagina
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Una seccion puntual para mostrar proceso por etapas. Ya cargamos las fotos reales de
          soldadura y pintura, y dejamos despacho listo para cuando me pases esas imagenes.
        </p>
      </motion.div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(20,28,38,0.82),rgba(15,20,28,0.92))] shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur">
        <div className="grid border-b border-border/70 md:grid-cols-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.id === activeId;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveId(stage.id)}
                className={`flex items-center gap-3 border-b border-border/70 px-5 py-4 text-left transition last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                  isActive ? "border-primary/50 bg-primary/10 text-primary" : "border-border/70 bg-background/50"
                }`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                    {stage.eyebrow}
                  </span>
                  <span className="font-display text-xl font-semibold">{stage.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 p-6 md:p-8 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(7,13,20,0.84),rgba(20,28,38,0.68))] p-6">
            <div>
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                <ActiveIcon className="h-6 w-6" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {activeStage.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold">{activeStage.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{activeStage.description}</p>
            </div>

            <a
              href={whatsappUrl(`Hola ${SITE.name}, quiero consultar sobre la etapa de ${activeStage.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-primary/40 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Consultar esta etapa
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {gallery.length > 0
              ? gallery.map((photo, index) => (
                  <div
                    key={`${activeStage.id}-${index}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-background/40"
                  >
                    <motion.img
                      src={photo}
                      alt={`${activeStage.title} en taller de ${SITE.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      initial={{ scale: 1.1, y: 14 }}
                      whileInView={{ scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(6,10,15,0.24)_100%)] opacity-0 transition group-hover:opacity-100" />
                  </div>
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`${activeStage.id}-${index}`}
                    className="aspect-[4/3] rounded-2xl border border-dashed border-white/10 bg-[linear-gradient(145deg,rgba(10,16,24,0.8)_0%,rgba(28,36,46,0.65)_100%)] p-4"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                        Foto {index + 1}
                      </span>
                      <div className="space-y-2">
                        <div className="h-2 w-20 rounded-full bg-primary/20" />
                        <div className="h-2 w-28 rounded-full bg-border/80" />
                        <div className="h-2 w-16 rounded-full bg-border/60" />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
