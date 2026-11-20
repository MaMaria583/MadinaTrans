import "server-only";
import { labelFor, serviceLabel, type FormKind } from "@/lib/forms";

/**
 * Acheminement des demandes reçues par le site.
 *
 * Ordre de priorité :
 *  1. Resend (e-mail)  — RESEND_API_KEY + RESEND_FROM_EMAIL + ADMIN_EMAIL
 *  2. Webhook JSON     — FORM_WEBHOOK_URL (+ FORM_WEBHOOK_TOKEN facultatif)
 *  3. Aucun service    — mode démonstration : RIEN n'est envoyé ni stocké.
 *
 * Aucune clé n'est présente dans le code : tout passe par les variables
 * d'environnement du serveur (jamais exposées au navigateur).
 */

export type DeliveryChannel = "resend" | "webhook" | "none";

export interface DeliveryResult {
  ok: boolean;
  channel: DeliveryChannel;
  error?: string;
}

const env = (name: string) => process.env[name]?.trim() || "";

export function deliveryChannel(): DeliveryChannel {
  if (env("RESEND_API_KEY") && env("RESEND_FROM_EMAIL") && env("ADMIN_EMAIL")) return "resend";
  if (env("FORM_WEBHOOK_URL")) return "webhook";
  return "none";
}

/** Référence lisible transmise au client et à l'administrateur, ex. MT-261119-K7Q2. */
export function createReference(now = new Date()) {
  const d = now.toISOString().slice(2, 10).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `MT-${d}-${suffix}`;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const displayValue = (name: string, value: string) => {
  if (name === "service") return serviceLabel(value);
  if (name === "consent") return value === "on" ? "Accepté" : "Non";
  if (name === "date" && value) return new Date(`${value}T00:00:00Z`).toLocaleDateString("fr-FR", { timeZone: "UTC" });
  return value;
};

function buildEmail(kind: FormKind, fields: Record<string, string>, reference: string, submittedAt: Date) {
  const isQuote = kind === "quote";
  const title = isQuote ? "Nouvelle demande de devis" : "Nouveau message de contact";
  const subjectDetail = isQuote ? serviceLabel(fields.service) : fields.subject;
  const subject = `${title} : ${subjectDetail}, ${fields.fullName} [${reference}]`
    .replace(/[\r\n]+/g, " ")
    .slice(0, 200);

  const rows = Object.entries(fields)
    .filter(([name, value]) => value && name !== "consent")
    .map(([name, value]) => [labelFor(kind, name), displayValue(name, value)] as const);

  const dateStr = submittedAt.toLocaleString("fr-FR", { timeZone: "Africa/Bamako" });

  const text = [
    `${title} (${reference})`,
    `Reçue le ${dateStr} (heure de Bamako) depuis le site Madina Trans.`,
    "",
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    "Répondez directement à cet e-mail pour contacter le demandeur.",
  ].join("\n");

  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#f4f6fa;font-family:Arial,Helvetica,sans-serif;color:#0f1b33">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#0b1a38;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:bold">MADINA <span style="color:#e8b42a">TRANS</span></td></tr>
<tr><td style="padding:24px">
<p style="margin:0 0 4px;font-size:20px;font-weight:bold">${escapeHtml(title)}</p>
<p style="margin:0 0 20px;color:#55627a;font-size:14px">Référence <strong>${escapeHtml(reference)}</strong> · reçue le ${escapeHtml(dateStr)} (heure de Bamako)</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:10px 12px;border-bottom:1px solid #e3e8f0;color:#55627a;width:38%;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #e3e8f0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin:20px 0 0;color:#55627a;font-size:13px">Répondez directement à cet e-mail pour contacter le demandeur.</p>
</td></tr></table></td></tr></table></body></html>`;

  return { subject, text, html };
}

async function sendWithResend(kind: FormKind, fields: Record<string, string>, reference: string, submittedAt: Date) {
  const { subject, text, html } = buildEmail(kind, fields, reference, submittedAt);
  const admin = kind === "contact" && env("CONTACT_EMAIL") ? env("CONTACT_EMAIL") : env("ADMIN_EMAIL");
  const to = admin
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const res = await fetch(env("RESEND_API_URL") || "https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
      // Évite les doublons si la requête est rejouée
      "Idempotency-Key": reference,
    },
    body: JSON.stringify({
      from: env("RESEND_FROM_EMAIL"),
      to,
      reply_to: fields.email,
      subject,
      text,
      html,
      tags: [{ name: "type", value: kind }],
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status} ${detail.slice(0, 300)}`);
  }
}

async function sendWithWebhook(kind: FormKind, fields: Record<string, string>, reference: string, submittedAt: Date) {
  const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
  if (env("FORM_WEBHOOK_TOKEN")) headers.Authorization = `Bearer ${env("FORM_WEBHOOK_TOKEN")}`;
  const res = await fetch(env("FORM_WEBHOOK_URL"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      source: "site-madina-trans",
      type: kind === "quote" ? "Demande de devis" : "Message de contact",
      reference,
      submittedAt: submittedAt.toISOString(),
      ...fields,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook ${res.status}`);
}

export async function deliver(
  kind: FormKind,
  fields: Record<string, string>,
  reference: string,
  submittedAt: Date,
): Promise<DeliveryResult> {
  const channel = deliveryChannel();
  if (channel === "none") return { ok: true, channel };
  try {
    if (channel === "resend") await sendWithResend(kind, fields, reference, submittedAt);
    else await sendWithWebhook(kind, fields, reference, submittedAt);
    return { ok: true, channel };
  } catch (error) {
    // Journal serveur uniquement (Vercel → Logs). Jamais renvoyé au navigateur.
    console.error(`[delivery:${channel}] échec ${reference}:`, error);
    return { ok: false, channel, error: "delivery_failed" };
  }
}
