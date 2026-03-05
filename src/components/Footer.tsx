const Footer = () => (
  <footer className="border-t border-border py-10 px-4 md:px-8">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-xl text-primary tracking-wider">METALFIRME</span>
      <p className="text-muted-foreground text-sm text-center">
        © {new Date().getFullYear()} MetalFirme. Estructuras metálicas en Lima, Perú. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
