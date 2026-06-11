import { useEffect, useState } from "react";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SITE, whatsappUrl } from "@/lib/site";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Taller", href: "/taller" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Proceso", href: "/proceso" },
  { label: "Contacto", href: "/contacto" },
];

const StickyNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/88 shadow-lg shadow-black/20 backdrop-blur-xl" : "bg-background/45 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link to="/" className="group relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/40 bg-primary/10 font-display text-lg font-bold text-primary">
            ER
          </span>
          <span className="font-display font-bold leading-none tracking-wide">
            <span className="block text-base text-foreground md:text-2xl">ESTRUCTURAS</span>
            <span className="block text-[0.68rem] tracking-[0.24em] text-primary md:text-xs">RAVICHAGUA</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClass}>
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-route-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Button size="sm" className="ml-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a href={whatsappUrl(`Hola ${SITE.name}, quiero informacion para cotizar.`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1.5 h-4 w-4" />
              WhatsApp
              <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground transition hover:bg-secondary md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            className="overflow-hidden border-t border-border bg-background/96 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-5">
              {links.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-lg font-medium transition ${
                      isActive ? "bg-secondary text-primary" : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button className="mt-4 w-full rounded-lg bg-primary py-6 text-primary-foreground hover:bg-primary/90" asChild>
                <a href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un proyecto.`)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Cotizar por WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default StickyNav;
