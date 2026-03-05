import { motion } from "framer-motion";
import { MapPin, Clock, Truck, Phone, MessageCircle } from "lucide-react";

const districts = [
  "Miraflores", "San Isidro", "Surco", "La Molina", "San Borja",
  "Barranco", "Jesús María", "Lince", "Pueblo Libre", "Magdalena",
  "Chorrillos", "SJL", "Ate", "Santa Anita", "Los Olivos",
  "Callao", "Comas", "Villa El Salvador", "Puente Piedra",
];

const ContactSection = () => {
  return (
    <section id="contacto" className="section-padding max-w-7xl mx-auto relative">
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/3 rounded-full blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative"
      >
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Contacto</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 font-bold">
          <span className="text-gradient">Contacto</span> y cobertura
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          { icon: Clock, title: "Horario", content: (
            <>
              <p className="text-silver text-sm">Lunes a Viernes: 8:00 – 18:00</p>
              <p className="text-silver text-sm">Sábados: 8:00 – 13:00</p>
              <p className="text-muted-foreground text-xs mt-3">Cotizaciones por WhatsApp 24/7</p>
            </>
          )},
          { icon: Truck, title: "Entregas", content: (
            <>
              <p className="text-silver text-sm">Instalación en Lima Metropolitana incluida.</p>
              <p className="text-silver text-sm mt-2">Envíos a provincias con embalaje reforzado vía agencia.</p>
            </>
          )},
          { icon: Phone, title: "Contacto directo", content: (
            <>
              <a href="tel:+51999999999" className="text-primary hover:text-primary/80 text-sm block font-medium transition-colors">+51 999 999 999</a>
              <a href="mailto:info@metalfirme.pe" className="text-primary hover:text-primary/80 text-sm block mt-1 font-medium transition-colors">info@metalfirme.pe</a>
            </>
          )},
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="glass-card-elevated rounded-2xl p-7 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-500">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl mb-4 font-semibold">{item.title}</h3>
            {item.content}
          </motion.div>
        ))}
      </div>

      {/* Districts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-8 glass-card-elevated rounded-2xl p-7"
      >
        <div className="flex items-center gap-3 mb-5">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-display text-2xl font-semibold">Distritos que atendemos</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {districts.map((d) => (
            <span key={d} className="px-4 py-1.5 rounded-xl bg-secondary/80 text-secondary-foreground text-xs font-medium hover:bg-secondary hover:text-foreground transition-colors cursor-default">{d}</span>
          ))}
          <span className="px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-semibold border border-primary/20">+ toda Lima y provincias</span>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
