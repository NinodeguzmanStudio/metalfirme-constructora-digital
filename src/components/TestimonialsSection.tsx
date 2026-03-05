import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Carlos M.", district: "Miraflores", project: "Mesa de comedor", text: "Excelente calidad y acabado. La mesa quedó perfecta, exactamente como la pedimos. Muy profesionales." },
  { name: "Ana R.", district: "San Borja", project: "Entrepiso metálico", text: "Cumplieron con el plazo y el presupuesto. El entrepiso quedó sólido y bien terminado. 100% recomendados." },
  { name: "Roberto L.", district: "La Molina", project: "Reja perimetral", text: "Diseño moderno y elegante. Los vecinos me preguntan quién lo hizo. MetalFirme es de confianza." },
  { name: "María T.", district: "Surco", project: "Escalera tipo U", text: "Nos ayudaron con el diseño y quedó espectacular. La combinación de metal y madera es increíble." },
  { name: "Jorge P.", district: "Barranco", project: "Barra para bar", text: "Hicieron exactamente lo que necesitaba para mi negocio. Rápidos, puntuales y con buen precio." },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-6xl mb-4">
          Lo que dicen nuestros <span className="text-gradient">clientes</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-secondary-foreground text-sm mb-4 leading-relaxed">"{t.text}"</p>
            <div className="border-t border-border pt-4">
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.project} · {t.district}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
