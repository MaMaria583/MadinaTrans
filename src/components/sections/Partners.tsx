import Image from "next/image";
import { Building2 } from "lucide-react";
import { DEMO_MODE, partners } from "@/config/site";
import { Container } from "@/components/ui/Section";
import { DemoBadge } from "@/components/ui/DemoBadge";

/**
 * Partenaires et références.
 * Aucun logo n'est affiché sans autorisation : en démo, emplacements neutres ;
 * en production sans partenaire confirmé, la section est masquée.
 */
export function Partners() {
  if (partners.length === 0 && !DEMO_MODE) return null;

  return (
    <section aria-labelledby="partners-title" className="border-y border-line bg-mist py-16">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 id="partners-title" className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Ils nous font confiance
          </h2>
          {partners.length === 0 && (
            <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
              Espace réservé aux partenaires et références officiels, publiés uniquement avec leur accord.
              <DemoBadge label="Références à fournir" />
            </p>
          )}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {partners.length > 0
            ? partners.map((p) => (
                <li key={p.name} className="flex h-24 items-center justify-center rounded-xl bg-white p-4 shadow-card">
                  <Image src={p.logo} alt={p.name} width={160} height={64} className="max-h-14 w-auto object-contain" />
                </li>
              ))
            : Array.from({ length: 5 }, (_, i) => (
                <li
                  key={i}
                  className={
                    "flex h-24 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-navy-100 bg-white/60 text-navy-300 " +
                    (i === 4 ? "max-lg:hidden" : "")
                  }
                >
                  <Building2 className="size-6" aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-wide uppercase">Partenaire {i + 1}</span>
                </li>
              ))}
        </ul>
      </Container>
    </section>
  );
}
