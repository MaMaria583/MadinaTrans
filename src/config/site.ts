/**
 * ============================================================================
 *  CONFIGURATION CENTRALE — MADINA TRANS (site de démonstration)
 * ============================================================================
 *
 *  Toutes les informations de l'entreprise sont regroupées ici.
 *  Chaque donnée porte un statut de fiabilité :
 *
 *   - "verified"  : information publiquement vérifiée (source à citer)
 *   - "provided"  : information transmise officiellement par Madina Trans
 *   - "demo"      : valeur de démonstration (fictive, NON opérationnelle)
 *   - "missing"   : information manquante, rien n'est affiché en production
 *
 *  Règle : une donnée "demo" ou "missing" n'est JAMAIS présentée comme réelle.
 *  En mode démonstration elle est signalée par un badge « À confirmer ».
 *  En mode production (NEXT_PUBLIC_DEMO_MODE=false), elle est masquée.
 *
 *  ➜ Pour mettre le site en production : remplacez les valeurs, passez le
 *    statut à "provided" (ou "verified"), puis désactivez le mode démo.
 *  ➜ Liste complète des points à valider : INFORMATIONS-A-CONFIRMER.md
 * ============================================================================
 */

export type InfoStatus = "verified" | "provided" | "demo" | "missing";

export interface ConfigValue<T = string> {
  value: T;
  status: InfoStatus;
  /** Note interne (source, date de vérification, remarque). Non affichée. */
  note?: string;
}

/** Une valeur est « confirmée » si elle provient d'une source fiable. */
export const isConfirmed = (item: { status: InfoStatus }) => item.status === "verified" || item.status === "provided";

/**
 * Mode démonstration : actif par défaut tant que la variable n'est pas
 * explicitement passée à "false".
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

/**
 * Une donnée est affichable si elle est confirmée, ou si le mode démo est
 * actif (elle est alors accompagnée d'un badge « À confirmer »).
 */
export const isDisplayable = (item: { status: InfoStatus }) => isConfirmed(item) || DEMO_MODE;

export const company = {
  name: "Madina Trans",
  legalName: {
    value: "Raison sociale à confirmer",
    status: "missing",
    note: "Forme juridique, RCCM, NIF à obtenir auprès de l'entreprise.",
  } satisfies ConfigValue,
  tagline: "Ensemble, transportons vos ambitions",
  baseline: "Transport • Transit • Logistique",
  shortDescription:
    "Madina Trans accompagne les entreprises au Mali et en Afrique de l'Ouest dans le transport routier de marchandises, le transit, l'affrètement maritime et la logistique.",
  activities: {
    value: ["Transport routier", "Transit et affrètement", "Affrètement maritime", "Logistique et distribution"],
    status: "provided",
    note: "Domaines d'activité issus du brief de refonte. À valider avec la direction.",
  } satisfies ConfigValue<string[]>,
  /** Historique, date de création, réalisations : rien n'est inventé. */
  history: {
    value: "",
    status: "missing",
    note: "Date de création, étapes clés et réalisations à obtenir auprès de la direction.",
  } satisfies ConfigValue,
};

/**
 * Informations institutionnelles (textes de présentation).
 * Rédaction de démonstration à valider : aucune date, aucun chiffre,
 * aucune certification ni référence n'y figure.
 */
export const institutional = {
  status: "demo" as InfoStatus,
  presentation: [
    "Basée à Bamako, Madina Trans est une entreprise malienne qui intervient sur l'ensemble de la chaîne du transport de marchandises : transport routier, transit, affrètement maritime, logistique et distribution.",
    "Pour un pays sans littoral comme le Mali, la maîtrise de la chaîne de transport est un enjeu majeur de développement économique. Madina Trans met son savoir-faire au service des entreprises, des commerçants et des institutions qui ont besoin de solutions fiables pour acheminer leurs marchandises.",
  ],
  vision:
    "Contribuer au développement économique du Mali et de l'Afrique de l'Ouest en rendant les échanges de marchandises plus simples, plus sûrs et plus efficaces.",
  mission:
    "Offrir à chaque client une solution de transport et de logistique adaptée à ses besoins, avec un accompagnement personnalisé, une communication transparente et le respect des engagements pris.",
  values: [
    { title: "Intégrité", text: "Des engagements tenus et une relation fondée sur la confiance." },
    { title: "Rigueur", text: "Une organisation méthodique pour chaque opération, quelle que soit sa taille." },
    { title: "Proximité", text: "Une écoute attentive et un dialogue permanent avec nos clients." },
    { title: "Excellence", text: "La recherche constante de la qualité dans chacun de nos services." },
  ],
  /** Atouts mis en avant à la place de chiffres non confirmés. */
  strengths: [
    {
      icon: "route",
      title: "Une chaîne multimodale",
      text: "Route, mer et entrepôt coordonnés par un même partenaire, du point d'enlèvement à la livraison finale.",
    },
    {
      icon: "user",
      title: "Un interlocuteur unique",
      text: "Un contact dédié suit votre dossier, centralise les informations et vous tient informé.",
    },
    {
      icon: "pin",
      title: "Un ancrage à Bamako",
      text: "Une connaissance du terrain malien et des réalités des corridors d'acheminement vers le Mali.",
    },
    {
      icon: "file",
      title: "Des devis détaillés",
      text: "Des propositions claires et détaillées, construites à partir de votre besoin réel.",
    },
  ] as const,
  /** Secteurs pour lesquels les solutions sont conçues (capacités, pas des références clients). */
  sectors: [
    "Commerce et distribution",
    "Construction et matériaux",
    "Agro-alimentaire",
    "Industrie et équipements",
    "Mines et énergie",
    "Projets et organisations",
  ],
};

export const contact = {
  phone: {
    value: "+223 00 00 00 00",
    status: "demo",
    note: "Numéro fictif de démonstration. Le numéro visible sur la maquette n'a pas été vérifié.",
  } satisfies ConfigValue,
  email: {
    value: "contact@madinatrans.example",
    status: "demo",
    note: "Domaine .example réservé : adresse volontairement non fonctionnelle.",
  } satisfies ConfigValue,
  whatsapp: {
    /** Format international sans + ni espaces, ex. 22370000000 */
    value: "22300000000",
    status: "demo",
    note: "Numéro WhatsApp fictif. Le bouton n'ouvre aucune conversation tant qu'il n'est pas confirmé.",
  } satisfies ConfigValue,
  city: {
    value: "Bamako, Mali",
    status: "provided",
    note: "Ville indiquée dans le brief. Adresse précise à obtenir.",
  } satisfies ConfigValue,
  address: {
    value: "Adresse postale à confirmer — Bamako, Mali",
    status: "missing",
    note: "La carte de localisation ne s'affiche qu'une fois l'adresse vérifiée.",
  } satisfies ConfigValue,
  /** Lien d'intégration Google Maps (iframe src) — uniquement après vérification. */
  mapEmbedUrl: {
    value: "",
    status: "missing",
  } satisfies ConfigValue,
  openingHours: {
    value: "Lundi – Vendredi : horaires à confirmer",
    status: "missing",
  } satisfies ConfigValue,
};

export const socialLinks: Array<{
  network: "facebook" | "linkedin" | "youtube" | "instagram";
  label: string;
  url: ConfigValue;
}> = [
  { network: "facebook", label: "Facebook", url: { value: "", status: "missing" } },
  { network: "linkedin", label: "LinkedIn", url: { value: "", status: "missing" } },
  { network: "youtube", label: "YouTube", url: { value: "", status: "missing" } },
  { network: "instagram", label: "Instagram", url: { value: "", status: "missing" } },
];

/* ——— Liens d'action : générés UNIQUEMENT pour des coordonnées confirmées ——— */
export const telHref = () => (isConfirmed(contact.phone) ? `tel:${contact.phone.value.replace(/[^\d+]/g, "")}` : null);
export const mailHref = () => (isConfirmed(contact.email) ? `mailto:${contact.email.value}` : null);
export const whatsappHref = (message = "Bonjour Madina Trans, je souhaite obtenir des informations.") =>
  isConfirmed(contact.whatsapp) && contact.whatsapp.value
    ? `https://wa.me/${contact.whatsapp.value}?text=${encodeURIComponent(message)}`
    : null;
export const mapReady = () =>
  isConfirmed(contact.address) && isConfirmed(contact.mapEmbedUrl) && contact.mapEmbedUrl.value.length > 0;

/**
 * Chiffres clés — AUCUNE valeur n'est inventée.
 * Renseignez `value` (ex. "15+") et passez le statut à "provided".
 * En production, un indicateur sans valeur confirmée est masqué.
 */
export const keyFigures: Array<{
  id: string;
  label: string;
  detail: string;
  icon: "calendar" | "truck" | "globe" | "users";
  figure: ConfigValue<string | null>;
}> = [
  {
    id: "experience",
    label: "Années d'expérience",
    detail: "Depuis la création de l'entreprise",
    icon: "calendar",
    figure: { value: null, status: "missing" },
  },
  {
    id: "fleet",
    label: "Véhicules",
    detail: "Flotte en exploitation",
    icon: "truck",
    figure: { value: null, status: "missing" },
  },
  {
    id: "coverage",
    label: "Pays desservis",
    detail: "Zone d'intervention",
    icon: "globe",
    figure: { value: null, status: "missing" },
  },
  {
    id: "clients",
    label: "Clients accompagnés",
    detail: "Entreprises et institutions",
    icon: "users",
    figure: { value: null, status: "missing" },
  },
];

/**
 * Partenaires et références : uniquement avec autorisation écrite.
 * Laisser vide tant qu'aucune référence n'est validée.
 */
export const partners: Array<{ name: string; logo: string; url?: string }> = [];

export const agency = {
  name: "MD Digital Solutions",
  credit: "Conception & réalisation : MD Digital Solutions",
  proposal: "Proposition de conception réalisée par MD Digital Solutions",
};

export const siteMeta = {
  /** URL publique — définie par NEXT_PUBLIC_SITE_URL ou par Vercel. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "fr_ML",
  defaultTitle: "Madina Trans — Transport, transit et logistique au Mali",
  defaultDescription:
    "Madina Trans, société de transport à Bamako : transport routier de marchandises, transit au Mali, affrètement maritime et logistique. Demandez votre devis.",
  copyrightYear: 2026,
};

/**
 * Données structurées (schema.org) : publiées uniquement si les informations
 * essentielles sont confirmées. Aucune donnée fictive n'est envoyée à Google.
 */
export const structuredDataEnabled = !DEMO_MODE && isConfirmed(contact.phone) && isConfirmed(contact.address);
