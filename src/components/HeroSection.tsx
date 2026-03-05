import { motion } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-welding.jpg";
import { Button } from "@/components/ui/button";

const trustChips = ["10+ años", "Entrega en Lima", "Envío a provincias", "Trabajos a medida"];

const WHATSAPP_NUMBER = "51999999999";
const WHATSAPP_MSG = encodeURIComponent("Hola MetalFirme, quiero cotizar un proyecto metálico.");

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Soldador profesional trabajando en estructura metálica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Brand */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">MetalFirme</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
            Estructuras y muebles metálicos{" "}
            <span className="text-gradient">a medida</span> en Lima
          </h1>

          <p className="text-lg md:text-xl text-secondary-foreground max-w-xl mb-8 leading-relaxed">
            Más de 10 años fabricando mesas, barras y estructuras metálicas con acabados profesionales.
          </p>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-3 mb-10">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="glass-card px-4 py-2 rounded-full text-sm font-medium text-secondary-foreground"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-accent text-lg px-8 py-6 font-semibold"
              asChild
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-steel text-foreground hover:bg-secondary text-lg px-8 py-6"
              asChild
            >
              <a href="#proyectos">Ver proyectos</a>
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
