import { NextResponse } from "next/server";
import { sanitize, validateForm, type FormKind } from "@/lib/forms";

/**
 * Point de réception des formulaires (devis et contact).
 *
 * - Si FORM_WEBHOOK_URL est défini (variable d'environnement serveur), la
 *   demande validée est transmise en JSON à ce service (Formspree, Make,
 *   Zapier, n8n, Google Apps Script, CRM…). Voir README › Formulaires.
 * - Sinon, la demande est validée puis IGNORÉE et la réponse indique
 *   clairement le mode démonstration : rien n'est transmis ni stocké.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "error", message: "Requête invalide." }, { status: 400 });
  }

  const { kind, fields, website } = (body ?? {}) as {
    kind?: string;
    fields?: Record<string, unknown>;
    website?: string;
  };

  if (kind !== "quote" && kind !== "contact") {
    return NextResponse.json({ status: "error", message: "Type de formulaire inconnu." }, { status: 400 });
  }

  // Champ piège anti-robots : rempli = robot. On répond normalement sans rien faire.
  if (website) {
    return NextResponse.json({ status: "demo" });
  }

  const clean = sanitize(kind as FormKind, fields ?? {});
  const errors = validateForm(kind as FormKind, clean);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "invalid", errors }, { status: 422 });
  }

  const webhook = process.env.FORM_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ status: "demo" });
  }

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
    if (process.env.FORM_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.FORM_WEBHOOK_TOKEN}`;

    const res = await fetch(webhook, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: "site-madina-trans",
        type: kind === "quote" ? "Demande de devis" : "Message de contact",
        submittedAt: new Date().toISOString(),
        ...clean,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return NextResponse.json({ status: "sent" });
  } catch (error) {
    console.error("[api/requests] Échec de transmission :", error);
    return NextResponse.json(
      { status: "error", message: "La demande n'a pas pu être transmise. Merci de réessayer plus tard." },
      { status: 502 },
    );
  }
}
