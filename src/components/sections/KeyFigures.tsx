import { DEMO_MODE, isConfirmed, keyFigures } from "@/config/site";
import { Container } from "@/components/ui/Section";
import { FigureIcon } from "@/components/ui/Icons";
import { DemoBadge } from "@/components/ui/DemoBadge";

/**
 * Chiffres clés. Aucune valeur n'est inventée :
 * - valeur confirmée  → affichée ;
 * - sinon, en démo    → emplacement « XX » signalé « À confirmer » ;
 * - sinon, en prod    → indicateur masqué (section masquée si tout est vide).
 */
export function KeyFigures() {
  const visible = keyFigures.filter((k) => (isConfirmed(k.figure) && k.figure.value) || DEMO_MODE);
  if (visible.length === 0) return null;

  return (
    <section aria-labelledby="figures-title" className="relative overflow-clip bg-navy-900 py-14 text-white sm:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]"
      />
      <Container className="relative">
        <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h2 id="figures-title" className="text-2xl font-bold sm:text-3xl">
            Madina Trans <span className="text-gold-400">en chiffres</span>
          </h2>
          {DEMO_MODE && (
            <p className="max-w-md text-[0.82rem] text-navy-200">
              Emplacements prêts à recevoir les indicateurs officiels. Aucune donnée n&apos;est inventée.
            </p>
          )}
        </div>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {visible.map((k) => {
            const confirmed = isConfirmed(k.figure) && k.figure.value;
            return (
              <li key={k.id} className="flex items-center gap-4 bg-navy-900 p-6 sm:p-7">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-gold-400 ring-1 ring-white/10">
                  <FigureIcon name={k.icon} className="size-7" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-3xl font-extrabold text-gold-400 sm:text-[2.1rem]">
                    {confirmed ? k.figure.value : <span aria-label="Valeur à confirmer">XX</span>}
                  </p>
                  <p className="font-semibold text-white">{k.label}</p>
                  {confirmed ? (
                    <p className="text-sm text-navy-200">{k.detail}</p>
                  ) : (
                    <DemoBadge tone="dark" className="mt-1.5" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
