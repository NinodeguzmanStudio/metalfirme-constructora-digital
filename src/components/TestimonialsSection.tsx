import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CLIENT_PROJECTS, SITE, whatsappUrl } from "@/lib/site";

const TestimonialsSection = () => {
  return (
    <section className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 max-w-3xl"
      >
        <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Clientes reales
        </span>
        <h2 className="font-display text-4xl font-bold md:text-6xl">
          Proyectos entregados con enfoque comercial
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Trabajos fabricados a medida para clientes que requieren piezas resistentes, funcionales
          y listas para uso diario.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {CLIENT_PROJECTS.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.55 }}
            className="group overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={`${project.project} para ${project.client}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute left-4 top-4 rounded-md bg-background/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur">
                {project.category}
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold text-primary">{project.client}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{project.project}</h3>
              <a
                href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un proyecto similar a ${project.project}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-silver transition hover:text-primary"
              >
                Cotizar similar
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
