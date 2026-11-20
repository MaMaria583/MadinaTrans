"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { DEMO_MODE, contact, isConfirmed } from "@/config/site";
import { WhatsappIcon } from "@/components/ui/Icons";

/**
 * Bouton WhatsApp flottant.
 * - Numéro confirmé : ouvre une conversation WhatsApp.
 * - Numéro de démonstration : ouvre une info-bulle indiquant que le canal
 *   n'est pas encore opérationnel (aucune fausse redirection).
 * - Production sans numéro confirmé : rien n'est affiché.
 */
export function WhatsAppButton() {
  const confirmed = isConfirmed(contact.whatsapp) && contact.whatsapp.value.length > 0;
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const buttonClass =
    "inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_28px_-8px_rgb(31_175_84/0.45)] transition-transform hover:scale-105";

  if (confirmed) {
    const message = encodeURIComponent("Bonjour Madina Trans, je souhaite obtenir des informations.");
    return (
      <a
        href={`https://wa.me/${contact.whatsapp.value}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Madina Trans sur WhatsApp"
        className={`fixed right-6 bottom-6 z-40 max-md:hidden ${buttonClass}`}
      >
        <WhatsappIcon className="size-7" />
      </a>
    );
  }

  if (!DEMO_MODE) return null;

  return (
    <div ref={panelRef} className="fixed right-6 bottom-6 z-40 flex flex-col items-end gap-3 max-md:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp non configuré"
          className="w-[min(18rem,calc(100vw-2rem))] animate-fade-up rounded-2xl border border-line bg-white p-4 text-sm text-navy-900 shadow-lift"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-bold">WhatsApp (démonstration)</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="-m-1 rounded-full p-1 text-muted hover:bg-mist"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2 leading-relaxed text-muted">
            Le numéro configuré (<span className="font-mono text-xs">+{contact.whatsapp.value}</span>) est{" "}
            <strong className="text-navy-900">fictif et non opérationnel</strong>. Ce bouton ouvrira une conversation
            WhatsApp dès que le numéro officiel de Madina Trans sera renseigné.
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="WhatsApp (démonstration, non opérationnel)"
        className={`relative ${buttonClass}`}
      >
        <WhatsappIcon className="size-7" />
        <span className="absolute -top-1 -right-1 rounded-full bg-gold-400 px-1.5 py-0.5 text-[0.6rem] font-bold text-navy-950 ring-2 ring-white">
          DÉMO
        </span>
      </button>
    </div>
  );
}
