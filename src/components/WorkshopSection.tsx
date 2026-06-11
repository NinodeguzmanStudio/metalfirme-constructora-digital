import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flame, ImagePlus, PackageCheck, Paintbrush } from "lucide-react";
import { SITE, WORKSHOP_STEPS, whatsappUrl } from "@/lib/site";

const icons = {
  soldadura: Flame,
  pintura: Paintbrush,
  despacho: PackageCheck,
};

const WorkshopSection = () => {
  const [active, setActive] = useState(WORKSHOP_STEPS[0].id);
  const current = WORKSHOP_STEPS.find((step) => step.id === active) ?? WORKSHOP_STEPS[0];
  const CurrentIcon = icons[current.id as keyof typeof icons];

  return (
    <section id="taller" className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-9 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-end"
      >
        <div>
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Nuestro taller
          </span>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Asi fabricamos
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">
          Esta vista queda separada por etapas para cargar tus fotos reales sin mezclar proyectos:
          soldadura, pintura y despacho. Cuando me pases las URLs, cada pestaña tendra su propia galeria.
        </p>
      </motion.div>

      <div className="rounded-lg border border-border bg-card">
        <div className="grid border-b border-border md:grid-cols-3">
          {WORKSHOP_STEPS.map((step) => {
            const Icon = icons[step.id as keyof typeof icons];
            const selected = step.id === active;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActive(step.id)}
                className={`flex items-center gap-3 border-b border-border px-5 py-4 text-left transition last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
                  selected ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${selected ? "border-primary/50 text-primary" : "border-border"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Etapa
                  </span>
                  <span className="font-display text-xl font-semibold">{step.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-6 p-5 md:p-7 lg:grid-cols-[0.75fr_1.25fr]"
        >
          <div className="flex flex-col justify-between rounded-lg border border-border bg-background/45 p-5">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/40 text-primary">
                <CurrentIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Proceso en taller</p>
              <h3 className="mt-3 font-display text-3xl font-semibold">{current.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{current.description}</p>
            </div>
            <a
              href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un trabajo relacionado a ${current.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg border border-primary/40 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Cotizar esta etapa
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {current.photos.length > 0
              ? current.photos.map((photo) => (
                  <img
                    key={photo}
                    src={photo}
                    alt={`${current.title} en taller de ${SITE.name}`}
                    className="aspect-[4/3] rounded-lg border border-border object-cover"
                    loading="lazy"
                  />
                ))
              : Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex aspect-[4/3] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/25 p-4 text-center"
                  >
                    <ImagePlus className="mb-3 h-6 w-6 text-primary/70" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Foto {index + 1}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">URL pendiente</span>
                  </div>
                ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkshopSection;
