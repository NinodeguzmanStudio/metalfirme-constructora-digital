import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Home, Fence, ArrowUpRight, ChevronDown, ChevronUp, MessageCircle, ArrowRight, Building2, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, whatsappUrl } from "@/lib/site";

const services = [
  { icon: Home, title: "Muebles industriales", desc: "Mesas de comedor, mesas de centro, repisas y piezas metalicas para hogares y oficinas.", details: "Fabricamos a medida combinando metal, madera y acabados resistentes para uso diario." },
  { icon: Utensils, title: "Barras para restaurantes", desc: "Barras de atencion, exhibicion y mobiliario metalico para locales comerciales.", details: "Diseñamos segun flujo de atencion, medidas del ambiente y estilo del negocio." },
  { icon: Building2, title: "Entrepisos comerciales", desc: "Estructuras para ampliar area util en tiendas, almacenes y espacios de trabajo.", details: "Evaluamos medidas, carga de uso y tipo de instalacion para una propuesta clara." },
  { icon: Fence, title: "Rejas y cerramientos", desc: "Rejas ornamentales, barandas y cerramientos con enfoque en seguridad y presencia.", details: "Trabajamos diseños modernos, ornamentales y funcionales con acabados durables." },
  { icon: Wrench, title: "Soldadura y reparaciones", desc: "Refuerzos, adaptaciones y trabajos metalicos puntuales en taller o instalacion.", details: "Atendemos acero al carbono, inoxidable y soluciones mixtas segun necesidad." },
  { icon: ArrowUpRight, title: "Proyectos personalizados", desc: "Desarrollos metalicos para restaurantes, bares flotantes, viviendas y negocios.", details: "Partimos de tus medidas o referencia visual y armamos una cotizacion directa por WhatsApp." },
];

const ServicesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="servicios" className="section-padding max-w-7xl mx-auto relative">
      <div className="absolute right-0 top-20 h-px w-1/3 bg-gradient-to-l from-primary/25 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block"
        >
          Servicios
        </motion.span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 font-bold">
          Nuestros <span className="text-gradient">servicios</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Soluciones metalicas para hogares, restaurantes, comercios y proyectos a medida.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => {
          const Icon = s.icon;
          const isOpen = expanded === i;
          const isHovered = hoveredIdx === i;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative rounded-2xl p-7 transition-all duration-500 group cursor-pointer overflow-hidden ${
                isHovered ? "glass-card-elevated border-glow" : "glass-card"
              }`}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 ${
                  isHovered ? "bg-primary/20 shadow-lg shadow-primary/10" : "bg-primary/10"
                }`}>
                  <Icon className={`h-6 w-6 transition-all duration-500 ${isHovered ? "text-primary scale-110" : "text-primary/80"}`} />
                </div>
                <h3 className="font-display text-2xl mb-3 font-semibold">{s.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{s.desc}</p>

                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-silver text-sm mb-5 leading-relaxed"
                  >
                    {s.details}
                  </motion.p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <button
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                  >
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {isOpen ? "Menos" : "Más info"}
                  </button>
                  <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 rounded-lg group/btn" asChild>
                    <a
                      href={whatsappUrl(`Hola ${SITE.name}, me interesa cotizar: ${s.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Cotizar
                      <ArrowRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
