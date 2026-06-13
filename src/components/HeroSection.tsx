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
    <section ref={ref} className="relative min-h-[70svh] overflow-hidden bg-background md:min-h-screen">
      <motion.div className="absolute inset-0" style={{ y }}>
        <div
          className="absolute inset-0 bg-[position:78%_12%] bg-no-repeat md:hidden"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "auto 60%" }}
          aria-hidden="true"
        />
        <img
          src={HERO_IMAGE}
          alt="Barra metalica industrial fabricada por Estructuras Ravichagua"
          className="hidden h-full w-full scale-105 object-cover object-[50%_20%] md:block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--background)/0.86)_36%,hsl(var(--background)/0.42)_70%,hsl(var(--background)/0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(var(--background))_0%,transparent_42%,hsl(var(--background)/0.55)_100%)]" />
      </motion.div>

      <div className="absolute inset-0 grid-pattern opacity-25" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[70svh] w-full max-w-7xl items-center px-4 pb-10 pt-[5.5rem] md:min-h-screen md:px-8 md:pb-20 md:pt-28"
        style={{ opacity }}
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-3 md:mb-7 md:gap-4"
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
            className="font-display text-[2.35rem] font-bold leading-[0.98] tracking-tight md:text-7xl lg:text-[5.8rem]"
          >
            Infraestructura metalica y mobiliario industrial a medida
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7 }}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-silver md:mt-8 md:text-xl"
          >
            Fabricamos mesas, barras, rejas, entrepisos y estructuras metalicas para hogares,
            restaurantes y negocios que necesitan resistencia, presencia y buen acabado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.7 }}
            className="mt-5 flex flex-wrap gap-2 md:mt-8 md:gap-3"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <span key={label} className="glass-card flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-silver md:px-4 md:text-sm">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.7 }}
            className="mt-5 flex flex-col gap-2 sm:flex-row md:mt-11 md:gap-4"
          >
            <Button size="lg" className="rounded-lg bg-primary px-5 py-5 text-base font-semibold text-primary-foreground hover:bg-primary/90 md:px-8 md:py-7 md:text-lg" asChild>
              <a href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un proyecto metalico.`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-lg border-steel/40 px-5 py-5 text-base text-foreground hover:border-primary/50 hover:bg-secondary md:px-8 md:py-7 md:text-lg"
              asChild
            >
              <a href="#proyectos">Ver proyectos</a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
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
