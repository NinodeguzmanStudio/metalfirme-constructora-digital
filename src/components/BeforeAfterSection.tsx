import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PROJECTS, SITE, whatsappUrl } from "@/lib/site";

const featured = PROJECTS[2];
const points = ["Aprovechamiento de altura", "Estructura fabricada a medida", "Solucion para uso comercial"];

const BeforeAfterSection = () => {
  return (
    <section className="section-padding mx-auto max-w-7xl">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-lg border border-border bg-card"
        >
          <img
            src={featured.image}
            alt={`${featured.title} de ${SITE.name}`}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Proyecto destacado
          </span>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Entrepiso comercial para ampliar area util
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Una solucion metalica pensada para negocios que necesitan crecer sin mudarse:
            estructura firme, medidas personalizadas y fabricacion enfocada en uso real.
          </p>

          <div className="mt-8 space-y-3">
            {points.map((point) => (
              <div key={point} className="flex items-center gap-3 text-silver">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <a
            href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un entrepiso comercial.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Cotizar una estructura
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
