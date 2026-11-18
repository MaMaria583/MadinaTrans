import Link from "next/link";
import { Info } from "lucide-react";
import { DEMO_MODE, agency } from "@/config/site";

/** Bandeau signalant que le site est une maquette de démonstration. */
export function DemoBanner() {
  if (!DEMO_MODE) return null;
  return (
    <div role="note" className="bg-gold-400 text-navy-950">
      <div className="mx-auto flex max-w-7xl items-start justify-center gap-2 px-4 py-2 text-center text-[0.8rem] leading-snug font-medium sm:items-center sm:px-6">
        <Info className="mt-0.5 size-4 shrink-0 sm:mt-0" aria-hidden="true" />
        <p>
          <strong>Site de démonstration</strong>
          <span className="hidden sm:inline"> — {agency.proposal}</span>. Les éléments « À confirmer » sont fictifs.{" "}
          <Link
            href="/mentions-legales#demonstration"
            className="whitespace-nowrap underline underline-offset-2 hover:no-underline"
          >
            En savoir plus
          </Link>
        </p>
      </div>
    </div>
  );
}
