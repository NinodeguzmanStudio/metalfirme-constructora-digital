import { useState } from "react";
import { motion } from "framer-motion";

const BeforeAfterSection = () => {
  const [position, setPosition] = useState(50);

  return (
    <section className="section-padding max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Transformación</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 font-bold">
          Antes y <span className="text-gradient">después</span>
        </h2>
        <p className="text-muted-foreground text-lg">Transformamos espacios con estructuras metálicas de calidad.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto aspect-video rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-background/50"
      >
        {/* Before side */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-stone-800 to-zinc-900 flex items-center justify-center">
          <div className="text-center">
            <span className="font-display text-5xl text-muted-foreground/50 font-bold">ANTES</span>
            <p className="text-muted-foreground text-sm mt-3">Espacio sin estructura</p>
          </div>
        </div>

        {/* After side */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-800 to-background flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="text-center">
            <span className="font-display text-5xl text-primary font-bold">DESPUÉS</span>
            <p className="text-silver text-sm mt-3">Entrepiso metálico instalado</p>
          </div>
        </div>

        {/* Slider */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-primary/80 cursor-ew-resize z-10"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 border-2 border-primary-foreground/20">
            <span className="text-primary-foreground text-sm font-bold">⇔</span>
          </div>
        </div>

        {/* Range input */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </motion.div>
    </section>
  );
};

export default BeforeAfterSection;
