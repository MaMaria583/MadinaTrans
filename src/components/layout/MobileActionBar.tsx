"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, MessageSquare, Phone } from "lucide-react";
import { telHref, whatsappHref } from "@/config/site";
import { WhatsappIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/**
 * Barre d'actions fixe sur mobile : demande de devis + appel / WhatsApp,
 * ces deux derniers UNIQUEMENT si les numéros sont confirmés.
 * Elle s'efface quand la section devis (#devis) est à l'écran : le formulaire
 * est déjà là, la barre ferait doublon et masquerait ses boutons.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const tel = telHref();
  const wa = whatsappHref();
  const onQuotePage = pathname === "/devis";
  // Visibilité mémorisée avec la page observée : un changement de page la remet à zéro
  const [seen, setSeen] = useState({ path: "", inView: false });
  const quoteInView = seen.path === pathname && seen.inView;

  useEffect(() => {
    const section = document.getElementById("devis");
    if (!section || !("IntersectionObserver" in window)) return;
    // Masquée dès que la section occupe le bas de l'écran (là où se trouve la barre)
    const observer = new IntersectionObserver(([entry]) => setSeen({ path: pathname, inView: entry.isIntersecting }), {
      rootMargin: "0px 0px -15% 0px",
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  const secondary =
    "flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.72rem] font-semibold text-navy-800";

  return (
    <nav
      aria-label="Actions rapides"
      aria-hidden={quoteInView || undefined}
      inert={quoteInView || undefined}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(16_29_50/0.25)] backdrop-blur-md transition-transform duration-300 ease-[var(--ease-premium)] md:hidden",
        quoteInView && "translate-y-full",
      )}
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
