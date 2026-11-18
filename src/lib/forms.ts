/**
 * Validation partagée entre le navigateur et l'API (/api/requests).
 * Aucune dépendance externe : règles simples et lisibles.
 */

export type FormKind = "quote" | "contact";

export type FieldErrors = Partial<Record<string, string>>;

export interface RequestPayload {
  kind: FormKind;
  fields: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepte +, chiffres, espaces, points, tirets, parenthèses — 8 à 15 chiffres
const PHONE_CHARS_RE = /^[+()\d\s.-]+$/;

export const serviceOptions = [
  { value: "transport-routier", label: "Transport routier" },
  { value: "transit-affretement", label: "Transit et affrètement" },
  { value: "affretement-maritime", label: "Affrètement maritime" },
  { value: "logistique-distribution", label: "Logistique et distribution" },
  { value: "autre", label: "Autre / je ne sais pas encore" },
] as const;

export const contactSubjects = [
  "Demande d'information",
  "Suivi d'une demande de devis",
  "Partenariat",
  "Recrutement",
  "Autre",
] as const;

interface Rule {
  required?: boolean;
  min?: number;
  max: number;
  type?: "email" | "phone";
  oneOf?: readonly string[];
  label: string;
}

const quoteRules: Record<string, Rule> = {
  fullName: { required: true, min: 2, max: 100, label: "Nom et prénom" },
  company: { max: 120, label: "Entreprise" },
  email: { required: true, type: "email", max: 160, label: "Adresse e-mail" },
  phone: { required: true, type: "phone", max: 30, label: "Téléphone" },
  service: { required: true, oneOf: serviceOptions.map((o) => o.value), max: 40, label: "Type de service" },
  origin: { required: true, min: 2, max: 100, label: "Ville de départ" },
  destination: { required: true, min: 2, max: 100, label: "Destination" },
  goods: { required: true, min: 2, max: 120, label: "Type de marchandise" },
  message: { required: true, min: 20, max: 3000, label: "Description du besoin" },
  consent: { required: true, oneOf: ["on"], max: 3, label: "Consentement" },
};

const contactRules: Record<string, Rule> = {
  fullName: { required: true, min: 2, max: 100, label: "Nom et prénom" },
  email: { required: true, type: "email", max: 160, label: "Adresse e-mail" },
  phone: { type: "phone", max: 30, label: "Téléphone" },
  subject: { required: true, oneOf: contactSubjects, max: 60, label: "Objet" },
  message: { required: true, min: 10, max: 3000, label: "Message" },
  consent: { required: true, oneOf: ["on"], max: 3, label: "Consentement" },
};

export const rulesFor = (kind: FormKind) => (kind === "quote" ? quoteRules : contactRules);

export function validateField(rule: Rule, raw: string | undefined): string | undefined {
  const value = (raw ?? "").trim();
  if (!value) {
    if (!rule.required) return undefined;
    if (rule.oneOf?.includes("on")) return "Veuillez accepter pour continuer.";
    if (rule.oneOf) return "Veuillez sélectionner une option.";
    return "Ce champ est obligatoire.";
  }
  if (rule.min && value.length < rule.min) return `Merci de saisir au moins ${rule.min} caractères.`;
  if (value.length > rule.max) return `Ce champ est limité à ${rule.max} caractères.`;
  if (rule.type === "email" && !EMAIL_RE.test(value)) return "Adresse e-mail invalide (ex. nom@entreprise.com).";
  if (rule.type === "phone") {
    const digits = value.replace(/\D/g, "");
    if (!PHONE_CHARS_RE.test(value) || digits.length < 8 || digits.length > 15)
      return "Numéro invalide (ex. +223 70 00 00 00).";
  }
  if (rule.oneOf && !rule.oneOf.includes(value)) return "Veuillez sélectionner une option valide.";
  return undefined;
}

export function validateForm(kind: FormKind, fields: Record<string, string>) {
  const rules = rulesFor(kind);
  const errors: FieldErrors = {};
  for (const [name, rule] of Object.entries(rules)) {
    const error = validateField(rule, fields[name]);
    if (error) errors[name] = error;
  }
  return errors;
}

/** Ne conserve que les champs connus, nettoyés. */
export function sanitize(kind: FormKind, fields: Record<string, unknown>) {
  const rules = rulesFor(kind);
  const clean: Record<string, string> = {};
  for (const [name, rule] of Object.entries(rules)) {
    const v = fields[name];
    clean[name] = typeof v === "string" ? v.trim().slice(0, rule.max) : "";
  }
  return clean;
}

export const labelFor = (kind: FormKind, name: string) => rulesFor(kind)[name]?.label ?? name;
