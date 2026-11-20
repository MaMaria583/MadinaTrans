import { contact, isConfirmed } from "@/config/site";
import { DemoBadge } from "./DemoBadge";

/** Libellé unique des coordonnées fictives, utilisé partout sur le site. */
export const FICTIVE_LABEL = "Fictif";
export const FICTIVE_TITLE = "Coordonnée fictive de démonstration : ne permet pas de joindre Madina Trans";

/**
 * Affiche une coordonnée (téléphone ou e-mail).
 * - Confirmée : lien cliquable (tel: / mailto:).
 * - Fictive : texte simple, jamais cliquable, suivi du badge « Fictif »
 *   et d'une mention lue par les lecteurs d'écran.
 */
export function ContactValue({
  kind,
  className,
  tone = "light",
  withBadge = true,
}: {
  kind: "phone" | "email";
  className?: string;
  tone?: "light" | "dark";
  withBadge?: boolean;
}) {
  const item = kind === "phone" ? contact.phone : contact.email;
  if (!isConfirmed(item)) {
    return (
      <>
        <span className={className} title={FICTIVE_TITLE}>
          {item.value}
          <span className="sr-only"> (coordonnée fictive, non opérationnelle)</span>
        </span>
        {withBadge && <DemoBadge tone={tone} label={FICTIVE_LABEL} />}
      </>
    );
  }
  const href = kind === "phone" ? `tel:${item.value.replace(/[^\d+]/g, "")}` : `mailto:${item.value}`;
  return (
    <a href={href} className={className}>
      {item.value}
    </a>
  );
}
