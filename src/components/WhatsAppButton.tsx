import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SITE, whatsappUrl } from "@/lib/site";

const WhatsAppButton = () => {
  return (
    <motion.a
      href={whatsappUrl(`Hola ${SITE.name}, quiero cotizar un proyecto.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 md:bottom-6 md:right-6 md:h-14 md:w-14"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ rotate: [0, -10, 10, 0] }}
      aria-label="Cotizar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white md:h-7 md:w-7" />
    </motion.a>
  );
};

export default WhatsAppButton;
