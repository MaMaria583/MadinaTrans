/**
 * Validation partagée entre le navigateur et l'API (/api/requests).
 * Aucune dépendance externe : règles simples, lisibles et testables.
 */

export type FormKind = "quote" | "contact";

export type FieldErrors = Partial<Record<string, string>>;

export const serviceOptions = [
  { value: "transport-routier", label: "Transport routier", hint: "Camions, liaisons nationales et régionales" },
  { value: "transit-affretement", label: "Transit et affrètement", hint: "Formalités import-export, affrètement" },
  { value: "affretement-maritime", label: "Affrètement maritime", hint: "Conteneurs, groupage, ports" },
  { value: "logistique-distribution", label: "Logistique et distribution", hint: "Stockage, préparation, livraison" },
  { value: "autre", label: "Autre / je ne sais pas encore", hint: "Nous vous orientons" },
] as const;

export const contactSubjects = [
  "Demande d'information",
  "Suivi d'une demande de devis",
  "Partenariat",
  "Recrutement",
  "Autre",
] as const;

export interface Rule {
  required?: boolean;
  min?: number;
  max: number;
  type?: "email" | "phone" | "date";
  oneOf?: readonly string[];
  label: string;
}

const quoteRules: Record<string, Rule> = {
  // Étape 1
  service: { required: true, oneOf: serviceOptions.map((o) => o.value), max: 40, label: "Type de service" },
  // Étape 2
  origin: { required: true, min: 2, max: 100, label: "Ville de départ" },
  destination: { required: true, min: 2, max: 100, label: "Destination" },
  goods: { required: true, min: 2, max: 120, label: "Type de marchandise" },
  volume: { max: 80, label: "Poids / volume estimé" },
  date: { type: "date", max: 10, label: "Date souhaitée" },
  // Étape 3
  fullName: { required: true, min: 2, max: 100, label: "Nom et prénom" },
  company: { max: 120, label: "Entreprise" },
  email: { required: true, type: "email", max: 160, label: "Adresse e-mail" },
  phone: { required: true, type: "phone", max: 30, label: "Téléphone" },
  message: { required: true, min: 20, max: 3000, label: "Description du besoin" },
  consent: { required: true, oneOf: ["on"], max: 3, label: "Consentement" },
};

/** Découpage du formulaire de devis en étapes. */
export const quoteSteps = [
  { id: "service", title: "Service", fields: ["service"] },
  { id: "trajet", title: "Trajet & marchandise", fields: ["origin", "destination", "goods", "volume", "date"] },
  {
    id: "coordonnees",
    title: "Vos coordonnées",
    fields: ["fullName", "company", "email", "phone", "message", "consent"],
  },
] as const;

const contactRules: Record<string, Rule> = {
  fullName: { required: true, min: 2, max: 100, label: "Nom et prénom" },
  email: { required: true, type: "email", max: 160, label: "Adresse e-mail" },
  phone: { type: "phone", max: 30, label: "Téléphone" },
  subject: { required: true, oneOf: contactSubjects, max: 60, label: "Objet" },
  message: { required: true, min: 10, max: 3000, label: "Message" },
  consent: { required: true, oneOf: ["on"], max: 3, label: "Consentement" },
};

export const rulesFor = (kind: FormKind) => (kind === "quote" ? quoteRules : contactRules);

/* ——— Formats ——— */

// local@domaine.tld — pas d'espace, pas de point en double, extension alphabétique de 2 lettres minimum
const EMAIL_RE =
  /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
const PHONE_CHARS_RE = /^\+?[\d\s().-]+$/;

/** Vérifie un numéro : format malien (+223 + 8 chiffres) ou international (8 à 15 chiffres). */
export function checkPhone(value: string): string | undefined {
  if (!PHONE_CHARS_RE.test(value))
    return "Utilisez uniquement des chiffres, espaces et le signe + (ex. +223 70 00 00 00).";
  const digits = value.replace(/\D/g, "");
  const malian = value.trim().startsWith("+223") || value.trim().startsWith("00223");
  if (malian) {
    const local = digits.replace(/^(00)?223/, "");
    if (local.length !== 8) return "Un numéro malien comporte 8 chiffres après +223 (ex. +223 70 00 00 00).";
    return undefined;
  }
  if (digits.length === 8) return undefined; // numéro malien saisi sans indicatif
  if (digits.length < 8 || digits.length > 15)
    return "Numéro invalide : indiquez 8 chiffres, ou l'indicatif international (ex. +223 70 00 00 00).";
  if (!value.trim().startsWith("+") && !value.trim().startsWith("00"))
    return "Pour un numéro étranger, ajoutez l'indicatif du pays (ex. +33 6 12 34 56 78).";
  return undefined;
}

export function checkEmail(value: string): string | undefined {
  if (!EMAIL_RE.test(value)) return "Adresse e-mail invalide : vérifiez le format (ex. nom@entreprise.com).";
  return undefined;
}

export function validateField(rule: Rule, raw: string | undefined): string | undefined {
  const value = (raw ?? "").trim();
  if (!value) {
    if (!rule.required) return undefined;
    if (rule.oneOf?.includes("on")) return "Merci d'accepter le traitement de vos données pour envoyer la demande.";
    if (rule.oneOf) return "Veuillez sélectionner une option.";
    return `Le champ « ${rule.label} » est obligatoire.`;
  }
  if (rule.min && value.length < rule.min) {
    const missing = rule.min - value.length;
    return `Encore ${missing} caractère${missing > 1 ? "s" : ""} minimum : précisez votre ${rule.label.toLowerCase()}.`;
  }
  if (value.length > rule.max) return `Ce champ est limité à ${rule.max} caractères.`;
  if (rule.type === "email") return checkEmail(value);
  if (rule.type === "phone") return checkPhone(value);
  if (rule.type === "date") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) return "Date invalide.";
  }
  if (rule.oneOf && !rule.oneOf.includes(value)) return "Veuillez sélectionner une option valide.";
  return undefined;
}

export function validateFields(kind: FormKind, fields: Record<string, string>, names?: readonly string[]) {
  const rules = rulesFor(kind);
  const errors: FieldErrors = {};
  for (const name of names ?? Object.keys(rules)) {
    const rule = rules[name];
    if (!rule) continue;
    const error = validateField(rule, fields[name]);
    if (error) errors[name] = error;
  }
  return errors;
}

export const validateForm = (kind: FormKind, fields: Record<string, string>) => validateFields(kind, fields);

/** Ne conserve que les champs connus, nettoyés (et sans retour à la ligne pour les champs courts). */
export function sanitize(kind: FormKind, fields: Record<string, unknown>) {
  const rules = rulesFor(kind);
  const clean: Record<string, string> = {};
  for (const [name, rule] of Object.entries(rules)) {
    const v = fields[name];
    let s = typeof v === "string" ? v.trim().slice(0, rule.max) : "";
    if (name !== "message") s = s.replace(/[\r\n\t]+/g, " ");
    clean[name] = s;
  }
  return clean;
}

export const labelFor = (kind: FormKind, name: string) => rulesFor(kind)[name]?.label ?? name;

export const serviceLabel = (value: string) => serviceOptions.find((o) => o.value === value)?.label ?? value;

/** Délai minimal (ms) entre l'affichage du formulaire et l'envoi : en dessous, il s'agit d'un robot. */
export const MIN_FILL_TIME_MS = 3000;
