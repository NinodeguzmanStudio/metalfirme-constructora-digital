import { useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const projectTypes = ["Mesa", "Barra", "Estante", "Escalera", "Puerta", "Reja", "Estructura", "Otro"];
const WHATSAPP_NUMBER = "51999999999";

const QuickQuote = () => {
  const [type, setType] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [step, setStep] = useState(1);

  const sendToWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola MetalFirme, quiero cotizar:\n• Proyecto: ${type || "No especificado"}\n• Medidas: ${measurements || "Por definir"}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative z-20 -mt-20 px-4 md:px-8 max-w-4xl mx-auto"
    >
      <div className="glass-card-elevated rounded-2xl p-8 md:p-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="relative">
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  step >= s ? "bg-primary text-primary-foreground scale-110" : "bg-secondary text-muted-foreground"
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-[2px] rounded transition-all duration-500 ${step > s ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <h3 className="font-display text-2xl md:text-3xl mb-8 text-center font-bold">
            Cotización <span className="text-gradient">rápida</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className={`transition-opacity duration-300 ${step >= 1 ? "opacity-100" : "opacity-40"}`}>
              <label className="text-sm text-muted-foreground mb-2 block font-medium">Tipo de proyecto</label>
              <select
                value={type}
                onChange={(e) => { setType(e.target.value); if (e.target.value) setStep(Math.max(step, 2)); }}
                className="w-full bg-secondary/80 border border-border rounded-xl px-4 py-3.5 text-foreground focus:ring-2 focus:ring-primary focus:border-primary/50 outline-none transition-all duration-300"
              >
                <option value="">Seleccionar...</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Step 2 */}
            <div className={`transition-opacity duration-300 ${step >= 2 ? "opacity-100" : "opacity-40"}`}>
              <label className="text-sm text-muted-foreground mb-2 block font-medium">Medidas aprox.</label>
              <input
                type="text"
                placeholder="Ej: 1.2m x 0.6m x 0.75m"
                value={measurements}
                onChange={(e) => { setMeasurements(e.target.value); if (e.target.value) setStep(3); }}
                className="w-full bg-secondary/80 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary/50 outline-none transition-all duration-300"
              />
            </div>

            {/* Step 3 */}
            <div className={`flex flex-col justify-end transition-opacity duration-300 ${step >= 3 ? "opacity-100" : "opacity-40"}`}>
              <label className="text-sm text-muted-foreground mb-2 block font-medium">Enviar</label>
              <Button
                onClick={sendToWhatsApp}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3.5 font-semibold rounded-xl glow-accent group transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Enviar por WhatsApp
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default QuickQuote;
