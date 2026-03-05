import { motion } from "framer-motion";

const Footer = () => (
  <footer className="border-t border-border/50 py-12 px-4 md:px-8 relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-display text-2xl text-primary tracking-wider font-bold"
      >
        METALFIRME
      </motion.span>
      <p className="text-muted-foreground text-sm text-center">
        © {new Date().getFullYear()} MetalFirme. Estructuras metálicas en Lima, Perú. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
