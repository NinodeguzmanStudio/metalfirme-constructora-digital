import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE, SITE, whatsappUrl } from "@/lib/site";
import { useRef } from "react";

const trustItems = [
  { icon: ShieldCheck, label: "Fabricacion a medida" },
  { icon: Truck, label: "Lima y provincias" },
  { icon: Sparkles, label: "Acabados profesionales" },
];

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={HERO_IMAGE}
          alt="Barra metalica industrial fabricada por Estructuras Ravichagua"
          className="h-full w-full scale-105 object-cover object-[63%_18%] sm:object-[58%_18%] md:object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--background)/0.86)_36%,hsl(var(--background)/0.42)_70%,hsl(var(--background)/0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(var(--background))_0%,transparent_42%,hsl(var(--background)/0.55)_100%)]" />
      </motion.div>

      <div className="absolute inset-0 grid-pattern opacity-25" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-20 pt-28 md:px-8"
        style={{ opacity }}
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-14 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {SITE.name}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-bold leading-[0.94] tracking-tight md:text-7xl lg:text-[5.8rem]"
          >
            Infraestructura metalica y mobiliario industrial a medida
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-silver md:text-xl"
          >
            Fabricamos mesas, barras, rejas, entrepisos y estructuras metalicas para hogares,
            restaurantes y negocios que necesitan resistencia, presencia y buen acabado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <span key={label} className="glass-card flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-silver">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.7 }}
            className="mt-11 flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" className="rounded-lg bg-primary px-8 py-7 text-lg font-semibold text-primary-foreground hover:bg-primary/90" asChild>
              <a href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un proyecto metalico.`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-lg border-steel/40 px-8 py-7 text-lg text-foreground hover:border-primary/50 hover:bg-secondary"
              asChild
            >
              <a href="#proyectos">Ver proyectos</a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <ChevronDown className="h-5 w-5 text-primary/70" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
