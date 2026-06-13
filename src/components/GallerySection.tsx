import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { PROJECTS, SITE, whatsappUrl } from "@/lib/site";

const categories = ["Todos", "Mesas", "Barras", "Estructuras", "Rejas"];

const GallerySection = () => {
  const [category, setCategory] = useState("Todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const projects = useMemo(
    () => (category === "Todos" ? PROJECTS : PROJECTS.filter((project) => project.category === category)),
    [category]
  );
  const selected = PROJECTS.find((project) => project.id === selectedId);

  return (
    <section id="proyectos" className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-10 max-w-3xl"
      >
        <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Proyectos reales
        </span>
        <h2 className="font-display text-4xl font-bold md:text-6xl">
          Fabricacion metalica con <span className="text-gradient">presencia profesional</span>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Una seleccion de trabajos para restaurantes, hogares y espacios comerciales. Cada pieza se
          cotiza segun medida, uso, material y acabado.
        </p>
      </motion.div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              category === item
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group overflow-hidden rounded-lg border border-border/70 bg-card"
          >
            <button
              type="button"
              onClick={() => setSelectedId(project.id)}
              className="relative block aspect-[4/3] w-full overflow-hidden text-left"
              aria-label={`Ver ${project.title}`}
            >
              <motion.img
                src={project.image}
                alt={`${project.title} fabricado por ${SITE.name}`}
                className="h-full w-full object-contain transition duration-700 group-hover:scale-105 md:object-cover"
                loading="lazy"
                initial={{ scale: 1.12, y: 18 }}
                whileInView={{ scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,hsl(var(--background)/0.88)_100%)]" />
              <span className="absolute left-4 top-4 rounded-md bg-background/75 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur">
                {project.category}
              </span>
              <span className="absolute right-4 top-4 rounded-md bg-background/75 p-2 text-silver opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">{project.description}</p>
              </div>
            </button>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={whatsappUrl(`Hola ${SITE.name}, vi sus proyectos y quiero cotizar un trabajo similar.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Cotizar un proyecto parecido
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-background/95 p-4 backdrop-blur"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-card"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute right-4 top-4 z-10 rounded-md bg-background/80 p-2 text-foreground backdrop-blur transition hover:bg-secondary"
                aria-label="Cerrar imagen"
              >
                <X className="h-5 w-5" />
              </button>
              <img src={selected.image} alt={selected.title} className="max-h-[78vh] w-full object-contain bg-background" />
              <div className="border-t border-border p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{selected.category}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">{selected.title}</h3>
                <p className="mt-2 text-muted-foreground">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
