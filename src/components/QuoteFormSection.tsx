import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SITE } from "@/lib/site";

const projectTypes = ["Mesa industrial", "Barra", "Bares flotantes", "Entrepiso", "Reja", "Estructura", "Mueble metalico", "Otro"];
const budgetRanges = ["Menos de S/500", "S/500 - S/1,500", "S/1,500 - S/3,000", "S/3,000 - S/5,000", "Más de S/5,000", "No definido"];

const QuoteFormSection = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", district: "", projectType: "", measurements: "", budget: "", details: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nombre requerido";
    if (!form.phone.trim() || !/^\d{9}$/.test(form.phone.trim())) e.phone = "Número de 9 dígitos";
    if (!form.district.trim()) e.district = "Distrito requerido";
    if (!form.projectType) e.projectType = "Selecciona un tipo";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    toast({ title: "Solicitud lista", description: "Abrimos WhatsApp con la informacion de tu proyecto." });
    sendToWhatsApp();
  };

  const sendToWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola ${SITE.name}, solicito cotizacion:\n- Nombre: ${form.name}\n- Telefono: ${form.phone}\n- Distrito: ${form.district}\n- Proyecto: ${form.projectType}\n- Medidas: ${form.measurements || "Por definir"}\n- Presupuesto: ${form.budget || "No definido"}\n- Detalles: ${form.details || "N/A"}`
    );
    window.open(`https://wa.me/${SITE.whatsappNumber}?text=${msg}`, "_blank");
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full bg-secondary/80 border rounded-lg px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary/50 outline-none transition-all duration-300 md:rounded-xl md:px-4 md:py-3.5 md:text-base ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  if (submitted) {
    return (
      <section id="cotizar" className="section-padding max-w-2xl mx-auto text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-2xl p-6 glass-card-elevated md:rounded-3xl md:p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="mx-auto mb-5 h-14 w-14 text-primary md:mb-8 md:h-20 md:w-20" />
          </motion.div>
          <h2 className="mb-3 font-display text-3xl font-bold md:mb-4 md:text-4xl">Solicitud preparada</h2>
          <p className="mb-6 text-sm text-muted-foreground md:mb-8 md:text-lg">Tu mensaje ya esta listo para continuar la cotizacion por WhatsApp.</p>
          <Button onClick={sendToWhatsApp} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-accent group">
            <MessageCircle className="mr-2 h-5 w-5" /> Continuar por WhatsApp
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="cotizar" className="section-padding max-w-3xl mx-auto relative">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative mb-6 text-center md:mb-16">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-primary md:mb-4 md:text-sm">Cotizacion</span>
        <h2 className="mb-2 font-display text-3xl font-bold md:mb-6 md:text-6xl lg:text-7xl">Solicita tu <span className="text-gradient">cotizacion</span></h2>
        <p className="text-sm text-muted-foreground md:text-lg">Completa el formulario y te respondemos en menos de 24 horas.</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="relative space-y-4 rounded-2xl p-4 glass-card-elevated md:space-y-6 md:rounded-3xl md:p-10"
      >
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground md:mb-2 md:text-sm">Nombre *</label>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Tu nombre completo" className={inputClass("name")} maxLength={100} />
            {errors.name && <span className="text-destructive text-xs mt-1 block">{errors.name}</span>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground md:mb-2 md:text-sm">Teléfono *</label>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))} placeholder="999 999 999" className={inputClass("phone")} maxLength={9} />
            {errors.phone && <span className="text-destructive text-xs mt-1 block">{errors.phone}</span>}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground md:mb-2 md:text-sm">Distrito *</label>
            <input value={form.district} onChange={(e) => update("district", e.target.value)} placeholder="Ej: Miraflores" className={inputClass("district")} maxLength={100} />
            {errors.district && <span className="text-destructive text-xs mt-1 block">{errors.district}</span>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground md:mb-2 md:text-sm">Tipo de proyecto *</label>
            <select value={form.projectType} onChange={(e) => update("projectType", e.target.value)} className={inputClass("projectType")}>
              <option value="">Seleccionar...</option>
              {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.projectType && <span className="text-destructive text-xs mt-1 block">{errors.projectType}</span>}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground md:mb-2 md:text-sm">Medidas aproximadas</label>
          <input value={form.measurements} onChange={(e) => update("measurements", e.target.value)} placeholder="Ej: 2m largo x 1m ancho x 0.75m alto" className={inputClass("measurements")} maxLength={200} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground md:mb-2 md:text-sm">Rango de presupuesto</label>
          <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className={inputClass("budget")}>
            <option value="">Seleccionar (opcional)</option>
            {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground md:mb-2 md:text-sm">Detalles adicionales</label>
          <textarea value={form.details} onChange={(e) => update("details", e.target.value)} placeholder="Describe tu proyecto, materiales preferidos, referencias..." rows={3} className={inputClass("details")} maxLength={1000} />
        </div>

        <Button type="submit" size="lg" className="group w-full rounded-lg bg-primary py-5 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.01] hover:bg-primary/90 glow-accent md:rounded-xl md:py-7 md:text-lg">
          <Send className="mr-2 h-5 w-5" /> Enviar solicitud
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.form>
    </section>
  );
};

export default QuoteFormSection;
