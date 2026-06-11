import { motion } from "framer-motion";
import { ArrowRight, PackageCheck, Paintbrush, Flame } from "lucide-react";
import { SITE, WORKSHOP_STEPS, whatsappUrl } from "@/lib/site";

const icons = {
  soldadura: Flame,
  pintura: Paintbrush,
  despacho: PackageCheck,
};

const WorkshopSection = () => {
  return (
    <section id="taller" className="section-padding mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Nuestro taller
          </span>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Asi fabricamos cada estructura
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Del armado a la entrega, trabajamos con proceso claro: soldadura, pintura y despacho.
            Esta seccion queda lista para tus fotos reales del taller cuando las subamos a URL publica.
          </p>
          <a
            href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar fabricacion en taller.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-primary/40 px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Cotizar fabricacion a medida
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {WORKSHOP_STEPS.map((step, index) => {
            const Icon = icons[step.id as keyof typeof icons];
            return (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="group overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={step.image}
                    alt={`${step.title} en taller de ${SITE.name}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,hsl(var(--background)/0.88)_100%)]" />
                  <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-lg bg-background/80 text-primary backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
