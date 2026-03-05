import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "51999999999";
const WHATSAPP_MSG = encodeURIComponent("Hola MetalFirme, quiero cotizar un proyecto.");

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ rotate: [0, -10, 10, 0] }}
      aria-label="Cotizar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </motion.a>
  );
};

export default WhatsAppButton;
