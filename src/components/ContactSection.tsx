import { motion } from "framer-motion";
import { MapPin, Clock, Truck, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

const districts = [
  "Miraflores", "San Isidro", "Surco", "La Molina", "San Borja",
  "Barranco", "Jesús María", "Lince", "Pueblo Libre", "Magdalena",
  "Chorrillos", "SJL", "Ate", "Santa Anita", "Los Olivos",
  "Callao", "Comas", "Villa El Salvador", "Puente Piedra",
];

const ContactSection = () => {
  return (
    <section id="contacto" className="section-padding max-w-7xl mx-auto relative">
      <div className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-primary/20 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mb-6 text-center md:mb-20"
      >
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-primary md:mb-4 md:text-sm">Contacto</span>
        <h2 className="mb-0 font-display text-3xl font-bold md:mb-6 md:text-6xl lg:text-7xl">
          <span className="text-gradient">Contacto</span> y cobertura
        </h2>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-3 md:gap-5">
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
              <p className="text-silver text-sm">Instalacion y coordinacion en Lima Metropolitana.</p>
              <p className="text-silver text-sm mt-2">Envios a provincias con embalaje reforzado via agencia.</p>
            </>
          )},
          { icon: Phone, title: "Contacto directo", content: (
            <>
              <a href={`tel:+${SITE.whatsappNumber}`} className="text-primary hover:text-primary/80 text-sm block font-medium transition-colors">{SITE.phoneDisplay}</a>
              <a href={`mailto:${SITE.email}`} className="text-primary hover:text-primary/80 text-sm block mt-1 font-medium transition-colors">{SITE.email}</a>
              <p className="text-muted-foreground text-xs mt-3">{SITE.workshop}</p>
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
            className="group rounded-xl p-4 glass-card-elevated md:rounded-2xl md:p-7"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-500 group-hover:bg-primary/20 md:mb-5 md:h-14 md:w-14 md:rounded-2xl">
              <item.icon className="h-5 w-5 text-primary md:h-7 md:w-7" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold md:mb-4 md:text-2xl">{item.title}</h3>
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
        className="mt-3 rounded-xl p-4 glass-card-elevated md:mt-8 md:rounded-2xl md:p-7"
      >
        <div className="mb-3 flex items-center gap-3 md:mb-5">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-display text-xl font-semibold md:text-2xl">Distritos que atendemos</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {districts.map((d) => (
            <span key={d} className="cursor-default rounded-lg bg-secondary/80 px-3 py-1 text-[0.7rem] font-medium text-secondary-foreground transition-colors hover:bg-secondary hover:text-foreground md:rounded-xl md:px-4 md:py-1.5 md:text-xs">{d}</span>
          ))}
          <span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-[0.7rem] font-semibold text-primary md:rounded-xl md:px-4 md:py-1.5 md:text-xs">+ toda Lima y provincias</span>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
