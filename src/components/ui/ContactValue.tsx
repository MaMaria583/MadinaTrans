import { contact, isConfirmed } from "@/config/site";

/**
 * Affiche une coordonnée. Elle n'est cliquable (tel: / mailto:) que si
 * elle est confirmée : une valeur de démonstration n'est jamais un lien.
 */
export function ContactValue({ kind, className }: { kind: "phone" | "email"; className?: string }) {
  const item = kind === "phone" ? contact.phone : contact.email;
  if (!isConfirmed(item)) {
    return (
      <span className={className} title="Valeur de démonstration non opérationnelle">
        {item.value}
      </span>
    );
  }
  const href = kind === "phone" ? `tel:${item.value.replace(/\s+/g, "")}` : `mailto:${item.value}`;
  return (
    <a href={href} className={className}>
      {item.value}
    </a>
  );
}
