"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Bandeau d'invitation du pied de page : masqué là où la section devis se
 * trouve juste au-dessus (accueil, page devis), pour ne pas répéter deux fois
 * le même appel à l'action (passe « œil neuf », design-critique).
 */
export function FooterInvite({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/devis") return null;
  return <>{children}</>;
}
