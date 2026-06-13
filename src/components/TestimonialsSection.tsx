import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Cliente corporativo", district: "Lima", project: "Estructura metalica", text: "Trabajo cumplido a tiempo, con buena coordinacion y entrega responsable de la estructura solicitada." },
  { name: "Norky's", district: "Lima", project: "Estructura comercial", text: "Acabados profesionales, estructura firme y presentacion adecuada para uso comercial y publicitario." },
  { name: "Colegio Pamer", district: "Lima", project: "Trabajo institucional", text: "Servicio recomendado por la calidad del trabajo, puntualidad y buena atencion durante el proceso." },
  { name: "Almase Peru E.I.R.L.", district: "Lima", project: "Proyecto metalico", text: "Excelente trabajo. Ha cumplido con lo solicitado." },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding max-w-7xl mx-auto relative">
      <div className="absolute left-1/2 top-8 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent md:top-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 relative md:mb-20"
      >
        <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-3 block md:mb-4 md:text-sm">Testimonios</span>
        <h2 className="font-display text-3xl md:text-6xl lg:text-7xl mb-0 font-bold">
          Lo que dicen nuestros <span className="text-gradient">clientes</span>
        </h2>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-4 relative">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="glass-card-elevated rounded-xl p-4 relative overflow-hidden group md:rounded-2xl md:p-7"
          >
            <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/10 group-hover:text-primary/20 transition-colors duration-500 md:top-6 md:right-6 md:h-8 md:w-8" />
            
            <div className="flex gap-1 mb-3 md:mb-5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary md:h-4 md:w-4" />
              ))}
            </div>
            <p className="text-silver text-sm mb-4 leading-relaxed relative z-10 md:mb-6">"{t.text}"</p>
            <div className="border-t border-border/50 pt-3 flex items-center gap-3 md:pt-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center md:h-10 md:w-10">
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
