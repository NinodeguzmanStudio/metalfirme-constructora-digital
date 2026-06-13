export const SITE = {
  name: "Estructuras Ravichagua",
  legalName: "Infraestructura Ravichagua",
  domain: "https://www.estructurasravichagua.com",
  whatsappNumber: "51916207911",
  phoneDisplay: "+51 916 207 911",
  email: "ventas@estructurasravichagua.com",
  city: "Lima, Peru",
  workshop: "Jr. Angamos Mz B Lt 09, AAHH Miguel Grau, SJL - Lima",
  office: "Calle Luis Aldana 251, La Victoria - Lima",
};

export const whatsappUrl = (message: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const PROJECTS = [
  {
    id: "mesa-comedor-industrial",
    title: "Mesa comedor industrial",
    category: "Mesas",
    description: "Estructura metalica con tablero de presencia robusta para comedor o negocio.",
    image:
      "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/mesacomedorinsutrial.png",
  },
  {
    id: "barra-restaurante",
    title: "Barra para restaurante",
    category: "Barras",
    description: "Barra funcional para atencion, exhibicion y alto transito comercial.",
    image:
      "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/barrapararestaurant.png",
  },
  {
    id: "entrepiso-comercial",
    title: "Entrepiso comercial",
    category: "Estructuras",
    description: "Solucion estructural para ampliar area util en locales y almacenes.",
    image:
      "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/entrepisocomercial.png",
  },
  {
    id: "reja-ornamental",
    title: "Reja ornamental",
    category: "Rejas",
    description: "Cerramiento metalico con diseno decorativo y enfoque en seguridad.",
    image:
      "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/rejaronamental.png",
  },
  {
    id: "mesa-centro",
    title: "Mesa de centro",
    category: "Mesas",
    description: "Mobiliario industrial a medida para salas, recepciones y espacios comerciales.",
    image:
      "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/mesadecentro.png",
  },
  {
    id: "bares-flotantes",
    title: "Bares flotantes",
    category: "Barras",
    description: "Piezas metalicas suspendidas para bares, restaurantes y espacios premium.",
    image:
      "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/baresflotantes.png",
  },
];

export const HERO_IMAGE =
  "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/fondo1.png";

export const WORKSHOP_GALLERIES = {
  soldadura: [
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/T2.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/T3.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/T4.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/T5.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/T6.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/T8.png",
  ],
  pintura: [
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/p1.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/p2.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/p3.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/p4.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/p5.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/p7.png",
  ],
  despacho: [
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/a1.png",
    "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/a2.png",
  ],
} as const;
