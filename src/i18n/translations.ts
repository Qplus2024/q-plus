/**
 * Interface copy for the public site, in Spanish and English.
 *
 * `en` is typed as `typeof es`, so TypeScript fails the build if a key is
 * added to one language and forgotten in the other.
 *
 * Content that lives in the database (property titles, descriptions, feature
 * blocks, investment names) is NOT here — that is translated on the fly by
 * `useAutoTranslate`.
 */

export type Language = 'es' | 'en';

export const LANGUAGES: Language[] = ['es', 'en'];

const es = {
  nav: {
    home: 'Inicio',
    properties: 'Propiedades',
    investments: 'Inversiones',
    tools: 'Herramientas',
    investorTable: 'Mesa de Inversionistas',
    contact: 'Contacto',
    adminAccess: 'Acceso administrativo',
    admin: 'Admin',
    toggleMenu: 'Abrir menú',
    languageLabel: 'Cambiar idioma',
  },

  hero: {
    slide1Title: 'Tu próxima propiedad, una decisión inteligente',
    slide1Subtitle: 'Encuentra el hogar perfecto con el respaldo de expertos',
    slide1Cta: 'Ver propiedades',
    slide2Title: 'Invierte en el exterior con respaldo experto',
    slide2Subtitle: 'Accede a oportunidades internacionales de alto retorno',
    slide2Cta: 'Explorar inversiones',
    slideAria: 'Diapositiva',
  },

  about: {
    eyebrow: 'Quiénes somos',
    title: 'Somos Q+',
    imageAlt: 'Equipo profesional Q+ trabajando en estrategia de inversión',
    paragraph1:
      'Somos la mejor elección para generar rentabilidad con inversiones seguras a corto, mediano y largo plazo, según tus necesidades. Ofrecemos servicios de evaluación, seguimiento, venta y administración de capital por medio de propiedades e inversiones estratégicas.',
    paragraph2:
      'Un equipo multidisciplinario con experiencia en marketing digital, análisis financiero y relaciones estratégicas con empresarios e inversionistas. Nuestra red de contactos y alianzas nos permite identificar oportunidades antes que el mercado, garantizando decisiones informadas y resultados medibles para cada uno de nuestros clientes.',
    highlight1: 'Evaluación estratégica',
    highlight2: 'Seguimiento continuo',
    highlight3: 'Administración de capital',
    highlight4: 'Inversiones seguras',
  },

  propertiesSlider: {
    eyebrow: 'Portafolio',
    title: 'Propiedades Destacadas',
    ctaTitle: 'Encuentra tu propiedad ideal',
    ctaText: 'Explora nuestro catálogo completo de propiedades disponibles.',
    ctaButton: 'Ver todas',
    noImage: 'Sin imagen',
  },

  investmentsSlider: {
    eyebrow: 'Oportunidades',
    title: 'Inversiones Internacionales',
    ctaTitle: 'Invierte con respaldo experto',
    ctaText:
      'Descubre oportunidades de inversión internacional con retornos atractivos y asesoría personalizada.',
    ctaButton: 'Explorar',
    from: 'Desde',
    expectedReturn: 'Retorno esperado',
    noImage: 'Sin imagen',
    typeResidential: 'Residencial',
    typeCommercial: 'Comercial',
    typeFund: 'Fondo',
  },

  homeContact: {
    title: '¿Interesado en alguna propiedad?',
    subtitle: 'Contáctanos y te ayudaremos a encontrar el hogar perfecto para ti',
    phone: 'Teléfono',
    email: 'Email',
    knowMore: 'Conoce más',
    knowMoreText: 'Contáctanos y agenda tu visita',
    followUs: 'Síguenos en redes',
  },

  footer: {
    tagline: 'Tu aliado inmobiliario de confianza. Encontramos el hogar perfecto para ti.',
    linksTitle: 'Enlaces',
    privateListings: 'Propiedades privadas',
    contactTitle: 'Contacto',
    followTitle: 'Síguenos',
    address: 'Calle 100 #15-20, Bogotá',
    rights: 'Q+ Inmobiliaria. Todos los derechos reservados.',
  },

  properties: {
    title: 'Propiedades',
    subtitle: 'Encuentra tu próximo hogar entre nuestra selección',
    searchPlaceholder: 'Buscar propiedades...',
    allCities: 'Todas las ciudades',
    noResults: 'No se encontraron propiedades',
    clearFilters: 'Limpiar filtros',
    foundOne: 'propiedad encontrada',
    foundMany: 'propiedades encontradas',
    moreOne: 'propiedad más',
    moreMany: 'propiedades más',
    seeMore: 'Ver más',
    backToStart: 'Volver al inicio',
  },

  status: {
    draft: 'Borrador',
    available: 'Disponible',
    reserved: 'Reservado',
    sold: 'Vendido',
    rented: 'Arrendado',
  },

  property: {
    back: 'Volver a propiedades',
    notFoundTitle: 'Propiedad no encontrada',
    notFoundText: 'La propiedad que buscas no existe o ya no está disponible.',
    seeAllProperties: 'Ver todas las propiedades',
    bedrooms: 'Habitaciones',
    bathrooms: 'Baños',
    area: 'm²',
    description: 'Descripción',
    features: 'Características',
    location: 'Ubicación',
    mapTitle: 'Ubicación de la propiedad',
    expand: 'Ampliar',
    openInMaps: 'Abrir en Google Maps',
    noImages: 'Sin imágenes disponibles',
    perMonth: '/mes',
    sale: 'Venta',
    rentPerMonth: '/mes Arriendo',
    salePrice: 'Precio de venta',
    rentPrice: 'Precio de arriendo',
    priceOnRequest: 'Precio a consultar',
    whatsapp: 'WhatsApp',
    call: 'Llamar',
    share: 'Compartir',
    shareProperty: 'Compartir propiedad',
    shareEmail: 'Correo electrónico',
    copyLink: 'Copiar link',
    copied: '¡Copiado!',
    linkCopiedTitle: 'Link copiado',
    linkCopiedDesc: 'El enlace se ha copiado al portapapeles',
    instagramCopiedDesc: 'Pega el enlace en tu historia o mensaje de Instagram',
    whatsappMessage: 'Hola, estoy interesado en la propiedad:',
    shareMessage: '¡Mira esta propiedad!',
  },

  tools: {
    title: 'Herramientas para inversionistas',
    subtitle:
      'Simula tu crédito hipotecario y calcula la rentabilidad de un proyecto de renta corta, con cifras de referencia del mercado colombiano.',
    creditTitle: 'Simulador de crédito hipotecario',
    creditSubtitle:
      'Compara, banco por banco, la cuota estimada y si tu perfil cumple los requisitos típicos.',
    buyerData: 'Datos del comprador',
    propertyValue: 'Valor del inmueble (COP)',
    downPayment: 'Cuota inicial disponible',
    householdIncome: 'Ingresos mensuales netos del hogar (COP)',
    currentDebts: 'Deudas mensuales actuales (COP)',
    age: 'Edad',
    termYears: 'Plazo (años)',
    amountToFinance: 'Monto a financiar',
    downPaymentCop: 'Cuota inicial en pesos',
    bank: 'Banco',
    refRate: 'Tasa ref. EA',
    monthlyPayment: 'Cuota mensual est.',
    debtRatio: 'Endeudamiento',
    statusColumn: 'Estado',
    meets: 'Cumple',
    review: 'Revisar',
    creditDisclaimer:
      'Cifras de referencia con fines educativos, calculadas con tasas y topes aproximados de mercado a 2026. Cada banco define sus propias tasas, cupos y política de riesgo. Confirma siempre las condiciones vigentes directamente con la entidad.',
    rentalTitle: 'Rentabilidad en renta corta',
    rentalSubtitle:
      'Para proyectos nuevos tipo Airbnb: NOI, Cap Rate, Cash-on-Cash y ROI total del primer año.',
    purchaseFinancing: 'Compra y financiación',
    purchasePrice: 'Precio de compra (COP)',
    furnishing: 'Adecuación y amoblado (COP)',
    financedPct: 'Porcentaje financiado',
    rate: 'Tasa EA',
    nightlyRate: 'Tarifa promedio por noche (COP)',
    occupancy: 'Ocupación mensual estimada',
    fixedCosts: 'Gastos operativos fijos / mes',
    platformFee: 'Comisión plataforma %',
    insuranceTax: 'Seguro + predial /mes',
    noiAnnual: 'NOI anual',
    capRate: 'Cap Rate',
    cashOnCash: 'Cash-on-Cash',
    roiYear1: 'ROI total año 1',
    grossIncome: 'Ingreso bruto por hospedaje (anual)',
    platformCommission: 'Comisión de plataforma (anual)',
    operatingCosts: 'Gastos operativos (anual)',
    debtService: 'Servicio de deuda (anual)',
    cashInvested: 'Efectivo invertido',
    netCashFlow: 'Flujo de caja neto anual',
    rentalDisclaimer:
      'Estimación con fines de planeación, no constituye asesoría financiera. Incluye un costo de cierre estimado del 3% del precio de compra. Ajusta tarifa y ocupación con datos reales del sector para cada proyecto.',
  },

  investments: {
    badge: 'Inversiones Internacionales',
    heroTitle: 'Invierte en el exterior con respaldo experto',
    heroAlt: 'Skyline internacional',
    heroCta: 'Descubre tu perfil de inversor',
    metricManaged: 'gestionados',
    metricCountries: 'países',
    metricInvestors: 'inversores',
    oppsTitle: 'Oportunidades de inversión',
    oppsSubtitle:
      'Accede a propiedades y fondos seleccionados en los mercados más rentables del mundo.',
    noOpps: 'Próximamente nuevas oportunidades de inversión.',
    returnLabel: 'retorno',
    from: 'Desde',
    quizTitle: '¿Qué tipo de inversor eres?',
    quizText:
      'En 3 minutos descubre si eres un inversor conservador, moderado o agresivo y qué oportunidades son para ti.',
    quizButton: 'Hacer el test gratuito',
    trust1Title: 'Asesoría personalizada',
    trust1Desc:
      'Un experto dedicado te guía en cada paso, desde la selección hasta el cierre de tu inversión.',
    trust2Title: 'Portafolio diversificado',
    trust2Desc:
      'Accede a oportunidades en múltiples países y sectores para minimizar riesgos y maximizar retornos.',
    trust3Title: 'Retornos documentados',
    trust3Desc:
      'Reportes transparentes y auditados sobre el rendimiento de cada oportunidad de inversión.',
  },

  investorTable: {
    badge: 'Comunidad',
    title: 'Mesa de las Inversionistas',
    subtitle:
      'Un tip de inversión inmobiliaria cada mes, con un video corto en nuestro canal de YouTube.',
    watchVideo: 'Ver video',
    watchChannel: 'Ver canal de YouTube',
    months: [
      {
        month: 'Agosto',
        topic: 'Cómo leer un contrato de arras antes de firmar',
        tips: [
          'Verifica el plazo de las arras y qué pasa si te arrepientes.',
          'Pide siempre el certificado de tradición y libertad actualizado.',
          'No entregues dinero sin promesa de compraventa firmada.',
        ],
      },
      {
        month: 'Septiembre',
        topic: 'Renta corta vs. renta tradicional en Antioquia',
        tips: [
          'Compara el Cap Rate de ambos modelos en la misma zona.',
          'Revisa la normativa municipal para alquiler tipo Airbnb.',
          'Calcula la ocupación mínima para igualar un arriendo fijo.',
        ],
      },
      {
        month: 'Octubre',
        topic: 'Qué banco se ajusta a tu perfil de crédito',
        tips: [
          'El nivel de endeudamiento pesa más que el ingreso bruto.',
          'Compara cuota inicial mínima entre entidades, no solo tasa.',
          'Independientes: ten a la mano dos años de declaración de renta.',
        ],
      },
      {
        month: 'Noviembre',
        topic: 'Cierre de año: declarar tus ingresos por Airbnb',
        tips: [
          'Guarda los reportes mensuales de la plataforma todo el año.',
          'Separa comisión de plataforma de tu ingreso operativo real.',
          'Consulta con tu contador antes de la temporada de renta.',
        ],
      },
      {
        month: 'Diciembre',
        topic: 'Temporada alta: cómo fijar tarifas dinámicas',
        tips: [
          'Sube la tarifa gradualmente para no perder reservas.',
          'Bloquea noches sueltas difíciles de llenar entre reservas largas.',
          'Revisa precios de la competencia cercana cada semana.',
        ],
      },
      {
        month: 'Enero',
        topic: 'Metas de inversión inmobiliaria para el año nuevo',
        tips: [
          'Define cuánto efectivo quieres tener listo para una nueva compra.',
          'Revisa el Cash-on-Cash real de tus propiedades del año anterior.',
          'Marca en el calendario cuándo renegociar tu crédito actual.',
        ],
      },
    ],
  },

  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscas no existe o fue movida.',
    home: 'Volver al inicio',
  },
};

const en: typeof es = {
  nav: {
    home: 'Home',
    properties: 'Properties',
    investments: 'Investments',
    tools: 'Tools',
    investorTable: 'Investors Table',
    contact: 'Contact',
    adminAccess: 'Admin access',
    admin: 'Admin',
    toggleMenu: 'Open menu',
    languageLabel: 'Change language',
  },

  hero: {
    slide1Title: 'Your next property, a smart decision',
    slide1Subtitle: 'Find the perfect home with expert guidance behind you',
    slide1Cta: 'View properties',
    slide2Title: 'Invest abroad with expert backing',
    slide2Subtitle: 'Access high-return international opportunities',
    slide2Cta: 'Explore investments',
    slideAria: 'Slide',
  },

  about: {
    eyebrow: 'Who we are',
    title: 'We are Q+',
    imageAlt: 'Q+ professional team working on investment strategy',
    paragraph1:
      'We are the best choice for generating returns through safe short, medium and long-term investments, tailored to your needs. We offer appraisal, monitoring, sales and capital management services through properties and strategic investments.',
    paragraph2:
      'A multidisciplinary team with experience in digital marketing, financial analysis and strategic relationships with business owners and investors. Our network of contacts and partnerships lets us spot opportunities before the market does, guaranteeing informed decisions and measurable results for every one of our clients.',
    highlight1: 'Strategic appraisal',
    highlight2: 'Ongoing monitoring',
    highlight3: 'Capital management',
    highlight4: 'Safe investments',
  },

  propertiesSlider: {
    eyebrow: 'Portfolio',
    title: 'Featured Properties',
    ctaTitle: 'Find your ideal property',
    ctaText: 'Browse our full catalogue of available properties.',
    ctaButton: 'View all',
    noImage: 'No image',
  },

  investmentsSlider: {
    eyebrow: 'Opportunities',
    title: 'International Investments',
    ctaTitle: 'Invest with expert backing',
    ctaText:
      'Discover international investment opportunities with attractive returns and personalised advice.',
    ctaButton: 'Explore',
    from: 'From',
    expectedReturn: 'Expected return',
    noImage: 'No image',
    typeResidential: 'Residential',
    typeCommercial: 'Commercial',
    typeFund: 'Fund',
  },

  homeContact: {
    title: 'Interested in one of our properties?',
    subtitle: 'Get in touch and we will help you find the perfect home',
    phone: 'Phone',
    email: 'Email',
    knowMore: 'Learn more',
    knowMoreText: 'Contact us and book your visit',
    followUs: 'Follow us',
  },

  footer: {
    tagline: 'Your trusted real estate partner. We find the perfect home for you.',
    linksTitle: 'Links',
    privateListings: 'Private listings',
    contactTitle: 'Contact',
    followTitle: 'Follow us',
    address: 'Calle 100 #15-20, Bogotá',
    rights: 'Q+ Inmobiliaria. All rights reserved.',
  },

  properties: {
    title: 'Properties',
    subtitle: 'Find your next home among our selection',
    searchPlaceholder: 'Search properties...',
    allCities: 'All cities',
    noResults: 'No properties found',
    clearFilters: 'Clear filters',
    foundOne: 'property found',
    foundMany: 'properties found',
    moreOne: 'more property',
    moreMany: 'more properties',
    seeMore: 'See more',
    backToStart: 'Back to start',
  },

  status: {
    draft: 'Draft',
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
    rented: 'Rented',
  },

  property: {
    back: 'Back to properties',
    notFoundTitle: 'Property not found',
    notFoundText: 'The property you are looking for does not exist or is no longer available.',
    seeAllProperties: 'View all properties',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    area: 'm²',
    description: 'Description',
    features: 'Features',
    location: 'Location',
    mapTitle: 'Property location',
    expand: 'Expand',
    openInMaps: 'Open in Google Maps',
    noImages: 'No images available',
    perMonth: '/month',
    sale: 'Sale',
    rentPerMonth: '/month Rent',
    salePrice: 'Sale price',
    rentPrice: 'Rental price',
    priceOnRequest: 'Price on request',
    whatsapp: 'WhatsApp',
    call: 'Call',
    share: 'Share',
    shareProperty: 'Share property',
    shareEmail: 'Email',
    copyLink: 'Copy link',
    copied: 'Copied!',
    linkCopiedTitle: 'Link copied',
    linkCopiedDesc: 'The link has been copied to your clipboard',
    instagramCopiedDesc: 'Paste the link into your Instagram story or message',
    whatsappMessage: 'Hello, I am interested in this property:',
    shareMessage: 'Take a look at this property!',
  },

  tools: {
    title: 'Tools for investors',
    subtitle:
      'Simulate your mortgage and calculate the returns of a short-term rental project, using reference figures from the Colombian market.',
    creditTitle: 'Mortgage simulator',
    creditSubtitle:
      'Compare, bank by bank, the estimated instalment and whether your profile meets the usual requirements.',
    buyerData: 'Buyer details',
    propertyValue: 'Property value (COP)',
    downPayment: 'Down payment available',
    householdIncome: 'Net monthly household income (COP)',
    currentDebts: 'Current monthly debts (COP)',
    age: 'Age',
    termYears: 'Term (years)',
    amountToFinance: 'Amount to finance',
    downPaymentCop: 'Down payment in pesos',
    bank: 'Bank',
    refRate: 'Ref. rate EAR',
    monthlyPayment: 'Est. monthly instalment',
    debtRatio: 'Debt ratio',
    statusColumn: 'Status',
    meets: 'Qualifies',
    review: 'Review',
    creditDisclaimer:
      'Reference figures for educational purposes, calculated with approximate 2026 market rates and limits. Each bank sets its own rates, limits and risk policy. Always confirm current conditions directly with the institution.',
    rentalTitle: 'Short-term rental returns',
    rentalSubtitle:
      'For new Airbnb-style projects: NOI, Cap Rate, Cash-on-Cash and total first-year ROI.',
    purchaseFinancing: 'Purchase and financing',
    purchasePrice: 'Purchase price (COP)',
    furnishing: 'Fit-out and furnishing (COP)',
    financedPct: 'Percentage financed',
    rate: 'EAR rate',
    nightlyRate: 'Average nightly rate (COP)',
    occupancy: 'Estimated monthly occupancy',
    fixedCosts: 'Fixed operating costs / month',
    platformFee: 'Platform fee %',
    insuranceTax: 'Insurance + property tax /month',
    noiAnnual: 'Annual NOI',
    capRate: 'Cap Rate',
    cashOnCash: 'Cash-on-Cash',
    roiYear1: 'Total ROI year 1',
    grossIncome: 'Gross lodging income (annual)',
    platformCommission: 'Platform commission (annual)',
    operatingCosts: 'Operating costs (annual)',
    debtService: 'Debt service (annual)',
    cashInvested: 'Cash invested',
    netCashFlow: 'Annual net cash flow',
    rentalDisclaimer:
      'An estimate for planning purposes; it does not constitute financial advice. It includes estimated closing costs of 3% of the purchase price. Adjust rate and occupancy with real market data for each project.',
  },

  investments: {
    badge: 'International Investments',
    heroTitle: 'Invest abroad with expert backing',
    heroAlt: 'International skyline',
    heroCta: 'Discover your investor profile',
    metricManaged: 'under management',
    metricCountries: 'countries',
    metricInvestors: 'investors',
    oppsTitle: 'Investment opportunities',
    oppsSubtitle:
      'Access selected properties and funds in the most profitable markets in the world.',
    noOpps: 'New investment opportunities coming soon.',
    returnLabel: 'return',
    from: 'From',
    quizTitle: 'What kind of investor are you?',
    quizText:
      'In 3 minutes find out whether you are a conservative, moderate or aggressive investor, and which opportunities suit you.',
    quizButton: 'Take the free test',
    trust1Title: 'Personalised advice',
    trust1Desc:
      'A dedicated expert guides you at every step, from selection through to closing your investment.',
    trust2Title: 'Diversified portfolio',
    trust2Desc:
      'Access opportunities across multiple countries and sectors to minimise risk and maximise returns.',
    trust3Title: 'Documented returns',
    trust3Desc:
      'Transparent, audited reporting on the performance of every investment opportunity.',
  },

  investorTable: {
    badge: 'Community',
    title: 'Investors Table',
    subtitle:
      'One real estate investment tip every month, with a short video on our YouTube channel.',
    watchVideo: 'Watch video',
    watchChannel: 'Visit YouTube channel',
    months: [
      {
        month: 'August',
        topic: 'How to read an earnest money contract before signing',
        tips: [
          'Check the deposit deadline and what happens if you back out.',
          'Always ask for an up-to-date title and ownership certificate.',
          'Never hand over money without a signed purchase agreement.',
        ],
      },
      {
        month: 'September',
        topic: 'Short-term vs. traditional rentals in Antioquia',
        tips: [
          'Compare the Cap Rate of both models in the same area.',
          'Review the municipal rules for Airbnb-style rentals.',
          'Work out the minimum occupancy needed to match a fixed lease.',
        ],
      },
      {
        month: 'October',
        topic: 'Which bank fits your credit profile',
        tips: [
          'Your debt level weighs more than your gross income.',
          'Compare minimum down payments between lenders, not just rates.',
          'Self-employed: have two years of tax returns ready.',
        ],
      },
      {
        month: 'November',
        topic: 'Year-end: declaring your Airbnb income',
        tips: [
          'Keep the platform monthly reports all year round.',
          'Separate the platform fee from your real operating income.',
          'Talk to your accountant before the rental season.',
        ],
      },
      {
        month: 'December',
        topic: 'High season: how to set dynamic rates',
        tips: [
          'Raise your rate gradually so you do not lose bookings.',
          'Block single nights that are hard to fill between long stays.',
          'Check nearby competitors’ prices every week.',
        ],
      },
      {
        month: 'January',
        topic: 'Real estate investment goals for the new year',
        tips: [
          'Decide how much cash you want ready for a new purchase.',
          'Review the real Cash-on-Cash of last year’s properties.',
          'Mark on the calendar when to renegotiate your current mortgage.',
        ],
      },
    ],
  },

  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has been moved.',
    home: 'Back to home',
  },
};

export const dictionaries: Record<Language, typeof es> = { es, en };

export type Dictionary = typeof es;
