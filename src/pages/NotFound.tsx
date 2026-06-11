import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Pagina no encontrada</p>
        <h1 className="mt-4 font-display text-6xl font-bold">404</h1>
        <p className="mt-4 text-muted-foreground">La ruta solicitada no existe en Estructuras Ravichagua.</p>
        <Link to="/" className="mt-7 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
