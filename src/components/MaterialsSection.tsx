import { motion } from "framer-motion";

const materials = [
  { name: "Pintura Electrostática", desc: "Acabado duradero y uniforme en cualquier color RAL.", swatch: "from-zinc-600 to-zinc-800" },
  { name: "Negro Mate", desc: "El clásico industrial. Elegante y atemporal.", swatch: "from-neutral-800 to-neutral-950" },
  { name: "Acero Natural", desc: "Acabado raw con sellador transparente. Estilo loft.", swatch: "from-slate-400 to-slate-600" },
  { name: "Acero Corten", desc: "Oxidación controlada. Aspecto rústico premium.", swatch: "from-orange-700 to-amber-900" },
  { name: "Galvanizado", desc: "Máxima protección contra corrosión y humedad.", swatch: "from-gray-300 to-gray-500" },
  { name: "Acero Inoxidable", desc: "Brillo y resistencia para cocinas y exteriores.", swatch: "from-slate-200 to-slate-400" },
];

const MaterialsSection = () => {
  return (
    <section className="section-padding max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-6xl mb-4">
          Materiales y <span className="text-gradient">acabados</span>
        </h2>
        <p className="text-muted-foreground text-lg">Seleccionamos los mejores materiales para cada proyecto.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {materials.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-5 group hover:border-primary/30 transition-all"
          >
            <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${m.swatch} mb-4 group-hover:scale-105 transition-transform`} />
            <h4 className="font-display text-xl mb-1">{m.name}</h4>
            <p className="text-muted-foreground text-xs">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MaterialsSection;
