// ============================================================
//  TEMPLATE CONFIG — Edit this file to fully rebrand the site
//  Every section below maps directly to what appears on screen
// ============================================================

export const BUSINESS = {
  name: "Palm Beach Plumbing Contractor Inc",
  shortName: "Palm Beach Plumbing",
  trade: "Plumbing",
  location: "Palm Beach area, FL",
  serviceArea: "Palm Beach County and surrounding areas",

  phone: "(561) 685-5153",
  phoneRaw: "+15616855153",

  email: "palmbeachplumbing@yahoo.com",

  hours: "Mon–Fri 8:00 AM – 5:00 PM · 24/7 Emergency Service",

  yearsInBusiness: "11",

  // Trade type — must match a key in placeholders.ts (or "default").
  // Lowercase, hyphen-separated. Examples: "softwash", "roofing", "lawn-care",
  // "fencing", "auto-detailing", "junk-removal", "hvac", "plumbing",
  // "electrical", "painting", "tree-services", "cleaning".
  // Used to pick trade-appropriate placeholder photos until the client sends real ones.
  tradeType: "plumbing",
};

export const HERO = {
  headline1: "Reliable Plumbing",
  headline2: "Done Right the First Time",
  subheading: "Licensed and insured plumbing contractors serving the greater Palm Beach area. Fast response, honest pricing, quality workmanship.",
  cta1: "Call (561) 685-5153",
  cta2: "Get a Free Quote",
};

export const ABOUT = {
  headline: "Your Local Palm Beach Plumbers",
  body1: "Palm Beach Plumbing Contractor Inc is a family-owned, fully licensed plumbing company proudly serving the entire Palm Beach area. From small leaks to full repipes, we treat every job like it's in our own home.",
  body2: "We show up when we say we will, give you a clear price up front, and back our work with the kind of warranty you'd expect from a contractor who plans to be your plumber for years to come.",
  teamPhotoAlt: "Palm Beach Plumbing service van",
};

export const CTA_BANNER = {
  headline: "Need a Plumber Now?",
  body: "Burst pipe, slab leak, clogged main, no hot water — call us and we'll be there fast. 24/7 emergency service across Palm Beach County.",
};

export const BADGES = [
  "Lic. #CFC1429294",
  "Commercial & Residential",
  "Se Habla Español",
  "24/7 Emergency Service",
];

export const SERVICES = [
  {
    name: "Drain Cleaning",
    desc: "Slow drains, clogged kitchen sinks, backed-up showers, and main line stoppages cleared fast with professional cabling.",
  },
  {
    name: "Water Jetting",
    desc: "High-pressure hydro jetting clears grease, scale, and tree roots from sewer and drain lines — restores full flow without digging.",
  },
  {
    name: "Sewer Camera Inspection",
    desc: "Pinpoint blockages, broken pipes, and root intrusion with high-definition sewer camera inspection. Know exactly what's wrong before we dig.",
  },
  {
    name: "New Construction Plumbing",
    desc: "Full plumbing rough-in and finish for new residential and commercial builds. Permitted, inspected, and built to South Florida code.",
  },
  {
    name: "Renovations & Remodels",
    desc: "Kitchen and bathroom remodels, additions, and re-pipes. We work clean with your contractor or homeowner to keep the project on schedule.",
  },
  {
    name: "Commercial Plumbing",
    desc: "Restaurants, offices, retail, and multi-unit properties. Preventive maintenance, emergency response, and code-compliant repairs.",
  },
];

// Real verified Google Maps reviews from Palm Beach Plumbing Contractor Inc.
export const REVIEWS = [
  {
    text: "Slab leak detected under the master bedroom floor — genuinely one of the most stressful home situations imaginable. Palm Beach Plumbing Contractor Inc came out the same day, located the source precisely using detection equipment, and explained the situation clearly.",
    author: "Thomas S. Hurtado",
    source: "Google Review",
  },
  {
    text: "Thank you Alfredo and the team. You are the best plumber ever. I was so scared, but you were honest and did not overcharge me like others. I strongly recommend this company to anyone who needs a plumber. They are honest.",
    author: "Alexandra Berger",
    source: "Google Review",
  },
  {
    text: "I found my new plumber — this guy is HONEST, prompt & friendly. Did a great job & again, Honest! Highly recommend Alfredo!",
    author: "Liz Block",
    source: "Google Review",
  },
];

// ============================================================
//  THEME — HSL values only (no "hsl()" wrapper)
//  primary        = brand accent color (buttons, highlights)
//  background     = page background
//  card           = card / panel background
//  accent         = secondary highlight
// ============================================================

export const THEME = {
  primary: "210 75% 35%",      // Plumbing blue (#1E5F9F, slightly deeper for contrast on white)
  primaryFg: "0 0% 100%",
  background: "0 0% 100%",     // Pure white
  foreground: "215 35% 15%",   // Deep navy text
  card: "210 30% 97%",         // Very light blue-tinted card
  cardFg: "215 35% 15%",
  accent: "200 95% 50%",       // Bright accent blue
  accentFg: "0 0% 100%",
  mutedFg: "215 15% 45%",      // Muted gray-blue
  border: "215 25% 88%",       // Light border
};

// ============================================================
//  PITCH_MODE — Set to `true` when you're shipping a design pitch
//  without a backend deployed yet. The quote form will hide its
//  submit button and show a "We'll call you back at <phone>"
//  message instead of trying to POST to /api/quote.
//  Flip to `false` when the backend is live.
// ============================================================

export const PITCH_MODE = true;

// ============================================================
//  I18N — Spanish translations
//  EN strings above are the source of truth; ES mirrors them.
//  Language toggle in the header flips between the two at runtime.
// ============================================================

export const HERO_ES = {
  headline1: "Plomería Confiable",
  headline2: "Hecha Bien la Primera Vez",
  subheading: "Plomeros con licencia y seguro al servicio del área de Palm Beach. Respuesta rápida, precios honestos, trabajo de calidad.",
  cta1: "Llame al (561) 685-5153",
  cta2: "Cotización Gratis",
};

export const ABOUT_ES = {
  headline: "Sus Plomeros Locales de Palm Beach",
  body1: "Palm Beach Plumbing Contractor Inc es una empresa familiar, totalmente licenciada, orgullosa de servir a toda el área de Palm Beach. Desde pequeñas fugas hasta repipes completos, tratamos cada trabajo como si fuera en nuestra propia casa.",
  body2: "Llegamos cuando decimos que llegaremos, le damos un precio claro por adelantado, y respaldamos nuestro trabajo con la garantía que esperaría de un contratista que planea ser su plomero por muchos años.",
  teamPhotoAlt: "Camioneta de servicio de Palm Beach Plumbing",
};

export const CTA_BANNER_ES = {
  headline: "¿Necesita un Plomero Ahora?",
  body: "Tubería rota, fuga en losa, drenaje tapado, sin agua caliente — llámenos y llegaremos rápido. Servicio de emergencia 24/7 en todo el condado de Palm Beach.",
};

export const BADGES_ES = [
  "Lic. #CFC1429294",
  "Comercial y Residencial",
  "Se Habla Español",
  "Emergencias 24/7",
];

export const SERVICES_ES = [
  {
    name: "Limpieza de Drenajes",
    desc: "Drenajes lentos, fregaderos tapados, regaderas obstruidas y bloqueos en líneas principales despejados rápido con equipo profesional.",
  },
  {
    name: "Hidro-Jetting",
    desc: "Hidro-jetting de alta presión elimina grasa, sarro y raíces de árboles en líneas de drenaje y alcantarillado — restaura el flujo sin excavar.",
  },
  {
    name: "Inspección con Cámara",
    desc: "Localice bloqueos, tuberías rotas e invasión de raíces con inspección de cámara de alta definición. Sepa exactamente qué pasa antes de excavar.",
  },
  {
    name: "Plomería de Obra Nueva",
    desc: "Instalación completa de plomería para construcciones residenciales y comerciales nuevas. Con permisos, inspeccionada, y construida al código del sur de Florida.",
  },
  {
    name: "Renovaciones y Remodelaciones",
    desc: "Remodelaciones de cocinas y baños, ampliaciones, y repipes completos. Trabajamos limpio con su contratista o propietario para mantener el proyecto al día.",
  },
  {
    name: "Plomería Comercial",
    desc: "Restaurantes, oficinas, comercios y propiedades multifamiliares. Mantenimiento preventivo, respuesta de emergencia, y reparaciones según código.",
  },
];

export const REVIEWS_ES = [
  {
    text: "Fuga en la losa detectada debajo del piso de la habitación principal — una de las situaciones más estresantes que se pueden tener en casa. Palm Beach Plumbing Contractor Inc vino el mismo día, ubicó la fuga con precisión usando equipo de detección, y explicó la situación claramente.",
    author: "Thomas S. Hurtado",
    source: "Reseña de Google",
  },
  {
    text: "Gracias a Alfredo y al equipo. Son los mejores plomeros. Estaba muy asustada, pero fueron honestos y no me cobraron de más como otros. Recomiendo mucho esta empresa a cualquiera que necesite un plomero. Son honestos.",
    author: "Alexandra Berger",
    source: "Reseña de Google",
  },
  {
    text: "Encontré a mi nuevo plomero — es HONESTO, puntual y amable. Hizo un gran trabajo y, otra vez, ¡honesto! ¡Recomiendo mucho a Alfredo!",
    author: "Liz Block",
    source: "Reseña de Google",
  },
];

// UI labels (everything outside the config sections above)
export const UI_ES = {
  navServices: "Servicios",
  navAbout: "Nosotros",
  navReviews: "Reseñas",
  navContact: "Contacto",
  sectionExpertise: "Nuestra Experiencia",
  sectionWhatWeDo: "Lo Que Hacemos Mejor",
  sectionAboutEyebrow: "Acerca de Nosotros",
  sectionTestimonials: "Testimonios",
  sectionTestimonialsSub: "No Solo Lo Diga Por Nosotros",
  sectionGetInTouch: "Contáctenos",
  sectionReadyToHelp: "Listos para Ayudar, Ahora Mismo",
  callOrText: "Llame o envíe un mensaje",
  callUs: "Llámenos",
  textUs: "Mensaje de Texto",
  whatsapp: "WhatsApp",
  emailUs: "Correo Electrónico",
  tapToCall: "Toque para llamar",
  tapToText: "Toque para enviar mensaje",
  tapForWhatsapp: "Toque para abrir WhatsApp",
  replyHours: "Respondemos en horas",
  serviceArea: "Área de Servicio",
  hours: "Horario",
  callUsNow: "Llámenos Ahora",
  learnMore: "Más Información",
  yearsExperience: "Años de Experiencia",
  privacy: "Privacidad",
  terms: "Términos",
  admin: "Admin",
  allRightsReserved: "Todos los derechos reservados",
  whatsappPrefill: "Hola, me gustaría una cotización de plomería.",
};

export const UI_EN = {
  navServices: "Services",
  navAbout: "About",
  navReviews: "Reviews",
  navContact: "Contact",
  sectionExpertise: "Our Expertise",
  sectionWhatWeDo: "What We Do Best",
  sectionAboutEyebrow: "About Us",
  sectionTestimonials: "Client Testimonials",
  sectionTestimonialsSub: "Don't Just Take Our Word For It",
  sectionGetInTouch: "Get In Touch",
  sectionReadyToHelp: "Ready to Help, Right Now",
  callOrText: "Call or text us",
  callUs: "Call Us",
  textUs: "Text Us",
  whatsapp: "WhatsApp",
  emailUs: "Email Us",
  tapToCall: "Tap to call instantly",
  tapToText: "Tap to open messages",
  tapForWhatsapp: "Tap to open WhatsApp",
  replyHours: "We reply within hours",
  serviceArea: "Service Area",
  hours: "Hours",
  callUsNow: "Call Us Now",
  learnMore: "Learn More",
  yearsExperience: "Years Experience",
  privacy: "Privacy",
  terms: "Terms",
  admin: "Admin",
  allRightsReserved: "All rights reserved",
  whatsappPrefill: "Hi, I'd like a plumbing quote.",
};
