import { useState } from "react";
import { motion } from "framer-motion";

const BeforeAfterSection = () => {
  const [position, setPosition] = useState(50);

  return (
    <section className="section-padding max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-6xl mb-4">
          Antes y <span className="text-gradient">después</span>
        </h2>
        <p className="text-muted-foreground text-lg">Transformamos espacios con estructuras metálicas de calidad.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden border border-border"
      >
        {/* Before side */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
          <div className="text-center">
            <span className="font-display text-4xl text-muted-foreground">ANTES</span>
            <p className="text-muted-foreground text-sm mt-2">Espacio sin estructura</p>
          </div>
        </div>

        {/* After side */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-charcoal-light to-background flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="text-center">
            <span className="font-display text-4xl text-primary">DESPUÉS</span>
            <p className="text-secondary-foreground text-sm mt-2">Entrepiso metálico instalado</p>
          </div>
        </div>

        {/* Slider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-10"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground text-xs font-bold">⇔</span>
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
