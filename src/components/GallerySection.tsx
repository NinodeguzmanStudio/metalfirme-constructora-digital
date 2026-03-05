import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "51999999999";

const categories = ["Todos", "Mesas", "Barras", "Estructuras", "Puertas", "Escaleras", "Rejas"];

const projects = [
  { id: 1, title: "Mesa de comedor industrial", cat: "Mesas", desc: "Acero + madera recuperada", color: "from-amber-900/40 to-stone-900/60" },
  { id: 2, title: "Barra para restaurante", cat: "Barras", desc: "Acero inoxidable brushed", color: "from-slate-800/40 to-zinc-900/60" },
  { id: 3, title: "Entrepiso comercial", cat: "Estructuras", desc: "Estructura 120m² con escalera", color: "from-zinc-800/40 to-neutral-900/60" },
  { id: 4, title: "Portón corredizo", cat: "Puertas", desc: "Diseño minimalista con motor", color: "from-stone-800/40 to-neutral-900/60" },
  { id: 5, title: "Escalera tipo U", cat: "Escaleras", desc: "Metal + peldaños de roble", color: "from-amber-800/40 to-stone-900/60" },
  { id: 6, title: "Reja ornamental", cat: "Rejas", desc: "Estilo moderno geométrico", color: "from-slate-700/40 to-zinc-900/60" },
  { id: 7, title: "Mesa de centro flotante", cat: "Mesas", desc: "Patas hairpin, vidrio templado", color: "from-teal-900/40 to-slate-900/60" },
  { id: 8, title: "Barra cervecera", cat: "Barras", desc: "Con reposapiés y riel", color: "from-amber-900/40 to-zinc-900/60" },
  { id: 9, title: "Techo metálico", cat: "Estructuras", desc: "Cobertura para estacionamiento", color: "from-zinc-700/40 to-stone-900/60" },
  { id: 10, title: "Puerta pivotante", cat: "Puertas", desc: "Acero corten + vidrio", color: "from-orange-900/40 to-stone-900/60" },
  { id: 11, title: "Escalera caracol", cat: "Escaleras", desc: "Espacio reducido, diseño elegante", color: "from-slate-800/40 to-zinc-900/60" },
  { id: 12, title: "Baranda de balcón", cat: "Rejas", desc: "Cable de acero + tubo cuadrado", color: "from-zinc-800/40 to-neutral-900/60" },
];

const GallerySection = () => {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.cat === filter);
  const current = projects.find((p) => p.id === lightbox);

  return (
    <section id="proyectos" className="section-padding max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-6xl mb-4">
          Proyectos <span className="text-gradient">destacados</span>
        </h2>
        <p className="text-muted-foreground text-lg">Más de 500 proyectos entregados en Lima y provincias.</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-gradient-to-br ${p.color}`}
              onClick={() => setLightbox(p.id)}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">{p.cat}</span>
                <h4 className="font-display text-lg md:text-xl leading-tight">{p.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{p.desc}</p>
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`relative w-full max-w-2xl aspect-video rounded-2xl bg-gradient-to-br ${current.color} p-8 flex flex-col justify-end`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">{current.cat}</span>
              <h3 className="font-display text-3xl md:text-4xl mb-2">{current.title}</h3>
              <p className="text-muted-foreground mb-6">{current.desc}</p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" asChild>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero algo similar a: ${current.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Quiero uno similar
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
