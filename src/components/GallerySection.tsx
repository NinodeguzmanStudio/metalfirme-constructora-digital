// ─────────────────────────────────────────────────────────────
//  OPCIÓN A — Hover / dedo: zoom suave en la tarjeta misma
//  Click: abre lightbox con info + botón WhatsApp (sin zoom)
//  Archivo a reemplazar: src/components/GallerySection.tsx
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "51999999999";

const categories = ["Todos", "Mesas", "Barras", "Estructuras", "Puertas", "Escaleras", "Rejas"];

const projects = [
  {
    id: 1,
    title: "Mesa de comedor industrial",
    cat: "Mesas",
    desc: "Acero + madera recuperada",
    image: "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/mesacomedorinsutrial.png",
    color: "from-blue-900/30 via-slate-800/40 to-slate-900/60",
  },
  {
    id: 2,
    title: "Barra para restaurante",
    cat: "Barras",
    desc: "Acero inoxidable brushed",
    image: "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/mesacomedorinsutrial.png",
    color: "from-slate-700/30 via-zinc-800/40 to-slate-900/60",
  },
  { id: 3,  title: "Entrepiso comercial",      cat: "Estructuras", desc: "Estructura 120m² con escalera",   color: "from-cyan-900/20 via-slate-800/40 to-zinc-900/60"    },
  { id: 4,  title: "Portón corredizo",          cat: "Puertas",     desc: "Diseño minimalista con motor",    color: "from-slate-800/30 via-blue-900/30 to-slate-900/60"   },
  { id: 5,  title: "Escalera tipo U",           cat: "Escaleras",   desc: "Metal + peldaños de roble",       color: "from-indigo-900/20 via-slate-800/40 to-zinc-900/60"  },
  { id: 6,  title: "Reja ornamental",           cat: "Rejas",       desc: "Estilo moderno geométrico",       color: "from-slate-700/30 via-blue-900/20 to-slate-900/60"   },
  { id: 7,  title: "Mesa de centro flotante",   cat: "Mesas",       desc: "Patas hairpin, vidrio templado",  color: "from-cyan-900/20 via-slate-800/40 to-zinc-900/60"    },
  { id: 8,  title: "Barra cervecera",           cat: "Barras",      desc: "Con reposapiés y riel",           color: "from-blue-900/20 via-slate-800/40 to-zinc-900/60"    },
  { id: 9,  title: "Techo metálico",            cat: "Estructuras", desc: "Cobertura para estacionamiento",  color: "from-slate-700/30 via-zinc-800/40 to-slate-900/60"   },
  { id: 10, title: "Puerta pivotante",          cat: "Puertas",     desc: "Acero corten + vidrio",           color: "from-indigo-900/20 via-blue-900/20 to-slate-900/60"  },
  { id: 11, title: "Escalera caracol",          cat: "Escaleras",   desc: "Espacio reducido, diseño elegante", color: "from-slate-800/30 via-cyan-900/20 to-zinc-900/60"  },
  { id: 12, title: "Baranda de balcón",         cat: "Rejas",       desc: "Cable de acero + tubo cuadrado",  color: "from-blue-900/20 via-slate-800/40 to-zinc-900/60"    },
];

// ── Tarjeta con foto + hover zoom ──────────────────────────────────────────
const PhotoCard = ({
  p,
  onClick,
}: {
  p: (typeof projects)[0];
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4 }}
      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-border/30 hover:border-primary/40 transition-colors duration-300"
      style={{ background: "#0d1117" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Foto con zoom */}
      <img
        src={p.image}
        alt={p.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hovered ? "scale(1.12)" : "scale(1)",
        }}
      />

      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

      {/* Tinte azul al hover */}
      <div
        className="absolute inset-0 bg-primary/10"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }}
      />

      {/* Badge categoría */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/20 text-[10px] font-bold tracking-widest uppercase text-primary">
        {p.cat}
      </div>

      {/* Ícono expandir */}
      <div
        className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-background/40 backdrop-blur-sm flex items-center justify-center"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.7)",
          transition: "all 0.3s",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-foreground">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>

      {/* Texto abajo */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1">{p.cat}</span>
        <h4 className="font-display text-base md:text-lg leading-tight font-semibold text-foreground">{p.title}</h4>
        <p
          className="text-xs text-muted-foreground mt-1"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(5px)",
            transition: "all 0.35s",
          }}
        >
          {p.desc}
        </p>
      </div>
    </motion.div>
  );
};

// ── Tarjeta con gradiente (sin foto) ───────────────────────────────────────
const GradientCard = ({
  p,
  onClick,
}: {
  p: (typeof projects)[0];
  onClick: () => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.85 }}
    transition={{ duration: 0.4 }}
    className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br ${p.color} border border-border/30 hover:border-primary/30 transition-all duration-500`}
    onClick={onClick}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
  >
    <div className="absolute inset-0 flex flex-col justify-end p-5">
      <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{p.cat}</span>
      <h4 className="font-display text-lg md:text-xl leading-tight font-semibold">{p.title}</h4>
      <p className="text-xs text-muted-foreground mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        {p.desc}
      </p>
    </div>
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
  </motion.div>
);

// ── Componente principal ────────────────────────────────────────────────────
const GallerySection = () => {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.cat === filter);
  const current = projects.find((p) => p.id === lightbox);

  return (
    <section id="proyectos" className="section-padding max-w-7xl mx-auto relative">
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary/3 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Portfolio</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 font-bold">
          Proyectos <span className="text-gradient">destacados</span>
        </h2>
        <p className="text-muted-foreground text-lg">Más de 500 proyectos entregados en Lima y provincias.</p>
      </motion.div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              filter === c
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) =>
            p.image ? (
              <PhotoCard key={p.id} p={p} onClick={() => setLightbox(p.id)} />
            ) : (
              <GradientCard key={p.id} p={p} onClick={() => setLightbox(p.id)} />
            )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-border/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Foto o gradiente en el lightbox */}
              {current.image ? (
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className={`w-full aspect-video bg-gradient-to-br ${current.color}`} />
              )}

              {/* Overlay con info */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-background/60 backdrop-blur-sm flex items-center justify-center hover:bg-background/80 transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">{current.cat}</span>
                <h3 className="font-display text-3xl md:text-4xl mb-2 font-bold">{current.title}</h3>
                <p className="text-muted-foreground mb-6">{current.desc}</p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit rounded-xl group" asChild>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero algo similar a: ${current.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Quiero uno similar
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
