"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { serviceOptions } from "@/lib/forms";

/**
 * Raccourci « devis express » du hero : choix du service puis redirection
 * vers le formulaire complet, service pré-sélectionné.
 */
export function HeroQuickQuote() {
  const router = useRouter();
  const [service, setService] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(service ? `/devis?service=${service}` : "/devis");
      }}
      className="rounded-2xl border border-white/15 bg-navy-950/75 p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] backdrop-blur-md sm:p-6"
      aria-label="Démarrer une demande de devis"
    >
      <p className="text-[0.78rem] font-bold tracking-[0.14em] text-gold-300 uppercase">Devis express</p>
      <p className="mt-1 font-display text-lg font-bold text-white">De quoi avez-vous besoin ?</p>
      <label htmlFor="hero-service" className="sr-only">
        Type de service
      </label>
      <div className="relative mt-4">
        <select
          id="hero-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-white/20 bg-navy-950/60 pr-11 pl-4 text-[1rem] text-white outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20"
        >
          <option value="">Choisir un service…</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-gold-300"
          aria-hidden="true"
        />
      </div>
      <button
        type="submit"
        className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold-400 font-bold text-navy-950 transition-colors hover:bg-gold-300"
      >
        Continuer ma demande <ArrowRight className="size-4" aria-hidden="true" />
      </button>
      <p className="mt-3 text-center text-[0.78rem] text-navy-200">Formulaire en 3 étapes · environ 2 minutes</p>
    </form>
  );
}
