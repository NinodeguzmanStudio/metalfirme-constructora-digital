import { motion } from "framer-motion";

const materials = [
  { name: "Pintura Electrostática", desc: "Acabado duradero y uniforme en cualquier color RAL.", swatch: "from-blue-800/60 via-slate-700/50 to-zinc-800/70" },
  { name: "Negro Mate", desc: "El clásico industrial. Elegante y atemporal.", swatch: "from-neutral-800/80 via-zinc-900/70 to-slate-950/80" },
  { name: "Acero Natural", desc: "Acabado raw con sellador transparente. Estilo loft.", swatch: "from-slate-400/40 via-zinc-500/30 to-slate-600/50" },
  { name: "Acero Corten", desc: "Oxidación controlada. Aspecto rústico premium.", swatch: "from-orange-800/40 via-amber-900/30 to-stone-800/50" },
  { name: "Galvanizado", desc: "Máxima protección contra corrosión y humedad.", swatch: "from-gray-300/30 via-slate-400/20 to-gray-500/30" },
  { name: "Acero Inoxidable", desc: "Brillo y resistencia para cocinas y exteriores.", swatch: "from-blue-200/20 via-slate-300/15 to-cyan-200/20" },
];

const MaterialsSection = () => {
  return (
    <section className="section-padding max-w-7xl mx-auto relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/3 rounded-full blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Materiales</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 font-bold">
          Materiales y <span className="text-gradient">acabados</span>
        </h2>
        <p className="text-muted-foreground text-lg">Seleccionamos los mejores materiales para cada proyecto.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {materials.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="glass-card rounded-2xl p-6 group hover:border-primary/30 transition-all duration-500 border-glow cursor-pointer"
          >
            <div className={`w-full h-24 rounded-xl bg-gradient-to-br ${m.swatch} mb-5 group-hover:scale-[1.03] transition-transform duration-500 border border-border/20`} />
            <h4 className="font-display text-xl mb-2 font-semibold">{m.name}</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MaterialsSection;
