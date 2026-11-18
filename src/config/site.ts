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
];

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
