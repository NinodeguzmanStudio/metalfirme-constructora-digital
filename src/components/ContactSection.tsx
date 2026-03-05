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
    <section id="contacto" className="section-padding max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-6xl mb-4">
          <span className="text-gradient">Contacto</span> y cobertura
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-xl p-6">
          <Clock className="h-8 w-8 text-primary mb-4" />
          <h3 className="font-display text-2xl mb-3">Horario</h3>
          <p className="text-secondary-foreground text-sm">Lunes a Viernes: 8:00 – 18:00</p>
          <p className="text-secondary-foreground text-sm">Sábados: 8:00 – 13:00</p>
          <p className="text-muted-foreground text-xs mt-2">Cotizaciones por WhatsApp 24/7</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
          <Truck className="h-8 w-8 text-primary mb-4" />
          <h3 className="font-display text-2xl mb-3">Entregas</h3>
          <p className="text-secondary-foreground text-sm">Instalación en Lima Metropolitana incluida.</p>
          <p className="text-secondary-foreground text-sm mt-2">Envíos a provincias con embalaje reforzado vía agencia.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
          <Phone className="h-8 w-8 text-primary mb-4" />
          <h3 className="font-display text-2xl mb-3">Contacto directo</h3>
          <a href="tel:+51999999999" className="text-primary hover:underline text-sm block">+51 999 999 999</a>
          <a href="mailto:info@metalfirme.pe" className="text-primary hover:underline text-sm block mt-1">info@metalfirme.pe</a>
        </motion.div>
      </div>

      {/* Districts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-display text-2xl">Distritos que atendemos</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {districts.map((d) => (
            <span key={d} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">{d}</span>
          ))}
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">+ toda Lima y provincias</span>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
