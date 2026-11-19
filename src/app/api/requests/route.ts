import { NextResponse } from "next/server";
import { MIN_FILL_TIME_MS, sanitize, validateForm, type FormKind } from "@/lib/forms";
import { createReference, deliver, deliveryChannel } from "@/lib/server/delivery";
import { isRateLimited } from "@/lib/server/rate-limit";

/**
 * Point de réception des formulaires (devis et contact).
 *
 * Sécurité :
 *  - taille de requête limitée, JSON strict, type de formulaire contrôlé ;
 *  - vérification de l'origine (même site uniquement) ;
 *  - anti-spam : champ piège invisible + délai minimal de remplissage ;
 *  - limitation de débit par IP ;
 *  - validation serveur identique à celle du navigateur ;
 *  - aucune donnée stockée ; secrets uniquement en variables d'environnement.
 *
 * Réponses : "sent" (transmis, avec référence), "demo" (aucun service
 * configuré : rien n'est transmis), "invalid", "rate_limited", "error".
 */

const MAX_BODY_BYTES = 16_000;

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // certains navigateurs/outils n'envoient pas Origin sur same-origin
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ status: "error", message: "Origine de la requête non autorisée." }, 403);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return json({ status: "error", message: "Demande trop volumineuse." }, 413);
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ status: "error", message: "Demande trop volumineuse." }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ status: "error", message: "Requête invalide." }, 400);
  }

  const { kind, fields, website, elapsed } = (body ?? {}) as {
    kind?: string;
    fields?: Record<string, unknown>;
    website?: string;
    elapsed?: number;
  };

  if (kind !== "quote" && kind !== "contact") {
    return json({ status: "error", message: "Type de formulaire inconnu." }, 400);
  }

  // Anti-spam : champ piège rempli ou envoi quasi instantané → réponse neutre, rien n'est transmis.
  const tooFast = typeof elapsed !== "number" || elapsed < MIN_FILL_TIME_MS;
  if (website || tooFast) {
    return json({ status: "demo", reason: "filtered" });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (isRateLimited(`${kind}:${ip}`)) {
    return json(
      {
        status: "rate_limited",
        message: "Vous avez envoyé plusieurs demandes en peu de temps. Merci de réessayer dans quelques minutes.",
      },
      429,
    );
  }

  const clean = sanitize(kind as FormKind, fields ?? {});
  const errors = validateForm(kind as FormKind, clean);
  if (Object.keys(errors).length > 0) {
    return json({ status: "invalid", errors }, 422);
  }

  // Aucun service configuré : on le dit clairement, rien n'est simulé.
  if (deliveryChannel() === "none") {
    return json({ status: "demo" });
  }

  const submittedAt = new Date();
  const reference = createReference(submittedAt);
  const result = await deliver(kind as FormKind, clean, reference, submittedAt);

  if (!result.ok) {
    return json(
      {
        status: "error",
        message: "Votre demande n'a pas pu être transmise. Merci de réessayer dans quelques instants.",
      },
      502,
    );
  }
  return json({ status: "sent", reference });
}
