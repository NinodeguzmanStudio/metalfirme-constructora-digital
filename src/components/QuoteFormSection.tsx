import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "51999999999";
const projectTypes = ["Mesa", "Barra", "Estante", "Escalera", "Puerta", "Reja", "Estructura", "Entrepiso", "Otro"];
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
    toast({ title: "¡Cotización enviada!", description: "Te contactaremos pronto por WhatsApp." });
  };

  const sendToWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola MetalFirme, solicito cotización:\n• Nombre: ${form.name}\n• Teléfono: ${form.phone}\n• Distrito: ${form.district}\n• Proyecto: ${form.projectType}\n• Medidas: ${form.measurements || "Por definir"}\n• Presupuesto: ${form.budget || "No definido"}\n• Detalles: ${form.details || "N/A"}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full bg-secondary/80 border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary/50 outline-none transition-all duration-300 ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  if (submitted) {
    return (
      <section id="cotizar" className="section-padding max-w-2xl mx-auto text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card-elevated rounded-3xl p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-8" />
          </motion.div>
          <h2 className="font-display text-4xl mb-4 font-bold">¡Solicitud recibida!</h2>
          <p className="text-muted-foreground mb-8 text-lg">Te contactaremos pronto. También puedes continuar por WhatsApp:</p>
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
      
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16 relative">
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Cotización</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 font-bold">Solicita tu <span className="text-gradient">cotización</span></h2>
        <p className="text-muted-foreground text-lg">Completa el formulario y te respondemos en menos de 24 horas.</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="glass-card-elevated rounded-3xl p-8 md:p-10 space-y-6 relative"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block font-medium">Nombre *</label>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Tu nombre completo" className={inputClass("name")} maxLength={100} />
            {errors.name && <span className="text-destructive text-xs mt-1 block">{errors.name}</span>}
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block font-medium">Teléfono *</label>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))} placeholder="999 999 999" className={inputClass("phone")} maxLength={9} />
            {errors.phone && <span className="text-destructive text-xs mt-1 block">{errors.phone}</span>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block font-medium">Distrito *</label>
            <input value={form.district} onChange={(e) => update("district", e.target.value)} placeholder="Ej: Miraflores" className={inputClass("district")} maxLength={100} />
            {errors.district && <span className="text-destructive text-xs mt-1 block">{errors.district}</span>}
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block font-medium">Tipo de proyecto *</label>
            <select value={form.projectType} onChange={(e) => update("projectType", e.target.value)} className={inputClass("projectType")}>
              <option value="">Seleccionar...</option>
              {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.projectType && <span className="text-destructive text-xs mt-1 block">{errors.projectType}</span>}
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block font-medium">Medidas aproximadas</label>
          <input value={form.measurements} onChange={(e) => update("measurements", e.target.value)} placeholder="Ej: 2m largo x 1m ancho x 0.75m alto" className={inputClass("measurements")} maxLength={200} />
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block font-medium">Rango de presupuesto</label>
          <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className={inputClass("budget")}>
            <option value="">Seleccionar (opcional)</option>
            {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block font-medium">Detalles adicionales</label>
          <textarea value={form.details} onChange={(e) => update("details", e.target.value)} placeholder="Describe tu proyecto, materiales preferidos, referencias..." rows={3} className={inputClass("details")} maxLength={1000} />
        </div>

        <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-7 text-lg font-semibold glow-accent rounded-xl group transition-all duration-300 hover:scale-[1.01]">
          <Send className="mr-2 h-5 w-5" /> Enviar solicitud
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.form>
    </section>
  );
};

export default QuoteFormSection;
