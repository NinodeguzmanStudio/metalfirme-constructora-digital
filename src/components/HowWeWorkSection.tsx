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
    <section id="proceso" className="section-padding relative mx-auto max-w-7xl overflow-hidden">
      <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mb-6 text-center md:mb-20"
      >
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-primary md:mb-4 md:text-sm">Proceso</span>
        <h2 className="mb-2 font-display text-3xl font-bold md:mb-6 md:text-6xl lg:text-7xl">
          Cómo <span className="text-gradient">trabajamos</span>
        </h2>
        <p className="text-sm text-muted-foreground md:text-lg">Un proceso simple y transparente de inicio a fin.</p>
      </motion.div>

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-[3.5rem] left-[12%] right-[12%] h-[2px]">
          <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
        </div>

        <div className="space-y-3 md:grid md:grid-cols-4 md:gap-6 md:space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-start gap-3 rounded-xl border border-white/10 bg-card/55 p-3 text-left md:block md:border-0 md:bg-transparent md:p-0 md:text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 md:mx-auto md:mb-6 md:h-20 md:w-20 md:rounded-3xl"
                >
                  <Icon className="h-5 w-5 text-primary md:h-8 md:w-8" />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-lg bg-primary text-[0.65rem] font-bold text-primary-foreground shadow-lg shadow-primary/30 md:-right-3 md:-top-3 md:h-7 md:w-7 md:rounded-xl md:text-xs">
                    {i + 1}
                  </span>
                </motion.div>
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold md:mb-3 md:text-2xl">{step.title}</h3>
                  <p className="mx-auto max-w-xs text-xs leading-relaxed text-muted-foreground md:text-sm">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
