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

export const CLIENT_PROJECTS = [
  {
    id: "mavic-mesa-barra-repostero",
    client: "Mavic",
    project: "Mesa barra y repostero industrial",
    category: "Mobiliario comercial",
    image: PROJECTS[1].image,
  },
  {
    id: "hans-escritorio-industrial",
    client: "Hans",
    project: "Escritorio industrial",
    category: "Mobiliario industrial",
    image: PROJECTS[0].image,
  },
  {
    id: "diana-gonzales-mesas-alta-carga",
    client: "Diana Gonzales",
    project: "2 mesas de alta carga industrial",
    category: "Mesas industriales",
    image: PROJECTS[4].image,
  },
];

export const WORKSHOP_STEPS = [
  {
    id: "soldadura",
    title: "Soldadura",
    description: "Armado, punteo y cordones de soldadura segun uso, medida y carga del proyecto.",
    photos: [],
  },
  {
    id: "pintura",
    title: "Pintura",
    description: "Preparacion de superficie, proteccion anticorrosiva y acabado final para uso diario.",
    photos: [],
  },
  {
    id: "despacho",
    title: "Despacho",
    description: "Revision, embalaje y coordinacion para entrega o instalacion en Lima y provincias.",
    photos: [],
  },
];

export const HERO_IMAGE = PROJECTS[2].image;
