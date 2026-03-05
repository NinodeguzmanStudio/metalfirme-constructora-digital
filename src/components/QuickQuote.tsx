import { useState } from "react";
import { MessageCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const projectTypes = ["Mesa", "Barra", "Estante", "Escalera", "Puerta", "Reja", "Estructura", "Otro"];
const WHATSAPP_NUMBER = "51999999999";

const QuickQuote = () => {
  const [type, setType] = useState("");
  const [measurements, setMeasurements] = useState("");

  const sendToWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola MetalFirme, quiero cotizar:\n• Proyecto: ${type || "No especificado"}\n• Medidas: ${measurements || "Por definir"}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative z-20 -mt-16 px-4 md:px-8 max-w-4xl mx-auto"
    >
      <div className="glass-card rounded-2xl p-6 md:p-8 glow-accent">
        <h3 className="font-display text-2xl md:text-3xl mb-6 text-center">Cotización rápida en 3 pasos</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">1. Tipo de proyecto</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Seleccionar...</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Step 2 */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">2. Medidas aprox.</label>
            <input
              type="text"
              placeholder="Ej: 1.2m x 0.6m x 0.75m"
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col justify-end">
            <label className="text-sm text-muted-foreground mb-2 block">3. Enviar cotización</label>
            <Button
              onClick={sendToWhatsApp}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-semibold"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Enviar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default QuickQuote;
