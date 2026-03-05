import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ChevronDown, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-welding.jpg";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const trustChips = ["10+ años", "Entrega en Lima", "Envío a provincias", "Trabajos a medida"];

const WHATSAPP_NUMBER = "51999999999";
const WHATSAPP_MSG = encodeURIComponent("Hola MetalFirme, quiero cotizar un proyecto metálico.");

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroImg}
          alt="Soldador profesional trabajando en estructura metálica"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <motion.div
        className="absolute left-8 top-1/4 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Brand tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[2px] w-16 bg-gradient-to-r from-primary to-primary/30" />
            <span className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm">MetalFirme</span>
            <div className="h-[2px] w-8 bg-primary/20" />
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] mb-8 font-bold tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block"
            >
              Estructuras y muebles
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="block"
            >
              metálicos{" "}
              <span className="text-gradient">a medida</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="block text-steel-light"
            >
              en Lima
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-silver max-w-xl mb-10 leading-relaxed"
          >
            Más de 10 años fabricando mesas, barras y estructuras metálicas con acabados profesionales.
          </motion.p>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {trustChips.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="glass-card-elevated px-5 py-2.5 rounded-full text-sm font-medium text-silver shimmer"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-accent text-lg px-8 py-7 font-semibold rounded-xl group transition-all duration-300 hover:scale-[1.02]"
              asChild
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-steel/40 text-foreground hover:bg-secondary hover:border-primary/40 text-lg px-8 py-7 rounded-xl transition-all duration-300"
              asChild
            >
              <a href="#proyectos">Ver proyectos</a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 text-primary/60" />
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-20 right-8 w-20 h-20 border-t border-r border-primary/20 rounded-tr-3xl" />
      <div className="absolute bottom-20 left-8 w-20 h-20 border-b border-l border-primary/20 rounded-bl-3xl" />
    </section>
  );
};

export default HeroSection;
