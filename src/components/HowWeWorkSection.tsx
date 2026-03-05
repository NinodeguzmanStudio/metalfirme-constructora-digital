import { motion } from "framer-motion";
import { MessageCircle, Ruler, Flame, Truck } from "lucide-react";

const steps = [
  { icon: MessageCircle, title: "Consulta", desc: "Nos cuentas tu idea por WhatsApp o formulario. Evaluamos y presupuestamos sin compromiso." },
  { icon: Ruler, title: "Diseño", desc: "Definimos medidas, materiales y acabados. Te enviamos render o boceto para aprobación." },
  { icon: Flame, title: "Fabricación", desc: "Fabricamos en nuestro taller con equipos profesionales. Control de calidad en cada etapa." },
  { icon: Truck, title: "Entrega", desc: "Instalamos en tu ubicación en Lima. Envíos a provincias con embalaje reforzado." },
];

const HowWeWorkSection = () => {
  return (
    <section className="section-padding max-w-7xl mx-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative"
      >
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Proceso</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 font-bold">
          Cómo <span className="text-gradient">trabajamos</span>
        </h2>
        <p className="text-muted-foreground text-lg">Un proceso simple y transparente de inicio a fin.</p>
      </motion.div>

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-[3.5rem] left-[12%] right-[12%] h-[2px]">
          <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
        </div>

        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6 relative z-10 border border-primary/20 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-500"
                >
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                    {i + 1}
                  </span>
                </motion.div>
                <h3 className="font-display text-2xl mb-3 font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
