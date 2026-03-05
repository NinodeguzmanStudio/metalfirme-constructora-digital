import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Home, DoorOpen, Fence, ArrowUpRight, ChevronDown, ChevronUp, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "51999999999";

const services = [
  { icon: Home, title: "Muebles metálicos", desc: "Mesas de comedor, barras, estantes y repisas industriales con acabados premium.", details: "Trabajamos con acero al carbono, acero inoxidable y combinaciones con madera. Cada pieza es diseñada a medida según tus especificaciones exactas." },
  { icon: ArrowUpRight, title: "Estructuras metálicas", desc: "Entrepisos, techos, columnas y refuerzos estructurales para viviendas y negocios.", details: "Calculamos y fabricamos estructuras con certificación, soldadura MIG/TIG según requerimiento. Entrega con planos y certificado." },
  { icon: DoorOpen, title: "Puertas y portones", desc: "Puertas enrollables, batientes, corredizas y portones automatizados.", details: "Diseños modernos o clásicos, con acabado en pintura electrostática o galvanizado. Instalación incluida en Lima Metropolitana." },
  { icon: Fence, title: "Rejas y cerramientos", desc: "Rejas de seguridad, barandas, cercos perimétricos con diseños personalizados.", details: "Protege tu propiedad con estilo. Ofrecemos diseños minimalistas y ornamentales con acabados duraderos." },
  { icon: Wrench, title: "Soldadura especializada", desc: "Reparaciones, refuerzos y trabajos de soldadura MIG, TIG y arco eléctrico.", details: "Servicio en taller y a domicilio. Soldamos aluminio, acero inoxidable y acero al carbono con equipos profesionales." },
  { icon: ArrowUpRight, title: "Escaleras metálicas", desc: "Escaleras rectas, caracol, tipo U y L con barandas integradas.", details: "Diseño personalizado con combinación de materiales: metal + vidrio, metal + madera. Cálculo estructural incluido." },
];

const ServicesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="servicios" className="section-padding max-w-7xl mx-auto relative">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/3 rounded-full blur-[100px]" />
      
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
          Soluciones metálicas completas para hogares, negocios y proyectos industriales.
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
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa: ${s.title}`)}`}
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
