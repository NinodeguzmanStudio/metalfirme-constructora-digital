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
    <section className="section-padding max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-6xl mb-4">
          Cómo <span className="text-gradient">trabajamos</span>
        </h2>
        <p className="text-muted-foreground text-lg">Un proceso simple y transparente de inicio a fin.</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Icon className="h-7 w-7 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
