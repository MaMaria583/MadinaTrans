"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, MessageSquare, Phone } from "lucide-react";
import { telHref, whatsappHref } from "@/config/site";
import { WhatsappIcon } from "@/components/ui/Icons";

/**
 * Barre d'actions fixe sur mobile : demande de devis + appel / WhatsApp,
 * ces deux derniers UNIQUEMENT si les numéros sont confirmés.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const tel = telHref();
  const wa = whatsappHref();
  const onQuotePage = pathname === "/devis";

  const secondary =
    "flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.72rem] font-semibold text-navy-800";

  return (
    <nav
      aria-label="Actions rapides"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(16_29_50/0.25)] backdrop-blur-md md:hidden"
    >
      <div className="flex h-16 items-stretch gap-1 px-2">
        {tel ? (
          <a href={tel} className={secondary}>
            <Phone className="size-5" aria-hidden="true" /> Appeler
          </a>
        ) : (
          <Link href="/contact" className={secondary}>
            <MessageSquare className="size-5" aria-hidden="true" /> Contact
          </Link>
        )}
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className={secondary}>
            <WhatsappIcon className="size-5 text-whatsapp" /> WhatsApp
          </a>
        )}
        {!onQuotePage && (
          <Link
            href="/devis"
            className="my-2 flex flex-[1.6] items-center justify-center gap-2 rounded-[3px] bg-gold-400 text-[0.92rem] font-semibold text-navy-950"
          >
            <FileText className="size-4" aria-hidden="true" /> Demander un devis
          </Link>
        )}
      </div>
    </nav>
  );
}
