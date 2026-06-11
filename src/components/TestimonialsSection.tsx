import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Cliente comercial", district: "Lima", project: "Barra para restaurante", text: "Trabajo firme, buen acabado y medidas claras desde el inicio. La barra quedo lista para uso diario." },
  { name: "Cliente residencial", district: "Lima", project: "Mesa industrial", text: "La estructura quedo solida y con presencia. Nos ayudaron a aterrizar la idea y el acabado." },
  { name: "Cliente de negocio", district: "Lima", project: "Entrepiso comercial", text: "La propuesta fue directa y funcional. Ganamos espacio util sin complicar la operacion." },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding max-w-7xl mx-auto relative">
      <div className="absolute left-1/2 top-20 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative"
      >
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Testimonios</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 font-bold">
          Lo que dicen nuestros <span className="text-gradient">clientes</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="glass-card-elevated rounded-2xl p-7 relative overflow-hidden group"
          >
            <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors duration-500" />
            
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-silver text-sm mb-6 leading-relaxed relative z-10">"{t.text}"</p>
            <div className="border-t border-border/50 pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{t.name[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.project} · {t.district}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
