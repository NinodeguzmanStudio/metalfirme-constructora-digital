import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Home, DoorOpen, Fence, ArrowUpRight, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "51999999999";

const services = [
  {
    icon: Home,
    title: "Muebles metálicos",
    desc: "Mesas de comedor, barras, estantes y repisas industriales con acabados premium.",
    details: "Trabajamos con acero al carbono, acero inoxidable y combinaciones con madera. Cada pieza es diseñada a medida según tus especificaciones exactas.",
  },
  {
    icon: ArrowUpRight,
    title: "Estructuras metálicas",
    desc: "Entrepisos, techos, columnas y refuerzos estructurales para viviendas y negocios.",
    details: "Calculamos y fabricamos estructuras con certificación, soldadura MIG/TIG según requerimiento. Entrega con planos y certificado.",
  },
  {
    icon: DoorOpen,
    title: "Puertas y portones",
    desc: "Puertas enrollables, batientes, corredizas y portones automatizados.",
    details: "Diseños modernos o clásicos, con acabado en pintura electrostática o galvanizado. Instalación incluida en Lima Metropolitana.",
  },
  {
    icon: Fence,
    title: "Rejas y cerramientos",
    desc: "Rejas de seguridad, barandas, cercos perimétricos con diseños personalizados.",
    details: "Protege tu propiedad con estilo. Ofrecemos diseños minimalistas y ornamentales con acabados duraderos.",
  },
  {
    icon: Wrench,
    title: "Soldadura especializada",
    desc: "Reparaciones, refuerzos y trabajos de soldadura MIG, TIG y arco eléctrico.",
    details: "Servicio en taller y a domicilio. Soldamos aluminio, acero inoxidable y acero al carbono con equipos profesionales.",
  },
  {
    icon: ArrowUpRight,
    title: "Escaleras metálicas",
    desc: "Escaleras rectas, caracol, tipo U y L con barandas integradas.",
    details: "Diseño personalizado con combinación de materiales: metal + vidrio, metal + madera. Cálculo estructural incluido.",
  },
];

const ServicesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="servicios" className="section-padding max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-6xl mb-4">
          Nuestros <span className="text-gradient">servicios</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Soluciones metálicas completas para hogares, negocios y proyectos industriales.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          const isOpen = expanded === i;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>

              {isOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-secondary-foreground text-sm mb-4"
                >
                  {s.details}
                </motion.p>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {isOpen ? "Menos" : "Más info"}
                </button>
                <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10" asChild>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa: ${s.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Cotizar
                  </a>
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
