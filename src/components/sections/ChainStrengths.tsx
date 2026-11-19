import { FileText, MapPin, Package, Route, Ship, Truck, UserRound, Warehouse, FileCheck2 } from "lucide-react";
import { institutional, isConfirmed, keyFigures } from "@/config/site";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { FigureIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const chain = [
  { icon: Package, title: "Enlèvement", text: "Chez le fournisseur ou au port" },
  { icon: Truck, title: "Transport routier", text: "Acheminement sécurisé" },
  { icon: FileCheck2, title: "Transit", text: "Formalités coordonnées" },
  { icon: Ship, title: "Maritime", text: "Liaison avec les ports" },
  { icon: Warehouse, title: "Logistique", text: "Stockage et distribution" },
];

const strengthIcons = { route: Route, user: UserRound, pin: MapPin, file: FileText };

/**
 * Remplace les compteurs non confirmés par une présentation qualitative :
 * la chaîne multimodale et les atouts de l'entreprise. Les chiffres clés
 * n'apparaissent que lorsqu'ils sont confirmés dans la configuration.
 */
export function ChainStrengths() {
  const figures = keyFigures.filter((k) => isConfirmed(k.figure) && k.figure.value);

  return (
    <section aria-labelledby="chain-title" className="section-y relative isolate overflow-clip bg-navy-950 text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-routes" />
      <div
        aria-hidden="true"
        className="absolute -top-32 right-[-10%] -z-10 size-[34rem] rounded-full bg-navy-600/30 blur-3xl"
      />
      <Container>
        <SectionHeading
          light
          index={2}
          eyebrow="Une chaîne maîtrisée"
          id="chain-title"
          title={
            <>
              De la route au port, <Highlight light>un seul partenaire</Highlight>
            </>
          }
          intro="Chaque maillon de votre chaîne d'approvisionnement est coordonné : moins d'intermédiaires, moins de ruptures, plus de visibilité."
        />

        {/* Chaîne multimodale */}
        <ol className="relative mt-14 grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-3">
          <li
            aria-hidden="true"
            className="pointer-events-none absolute top-8 right-[10%] left-[10%] hidden border-t-2 border-dashed border-gold-400/50 sm:block"
          />
          {chain.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 90}
              className="relative flex items-center gap-4 sm:flex-col sm:text-center"
            >
              <span className="relative z-10 inline-flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-navy-900 text-gold-400 shadow-[0_0_0_6px_var(--color-navy-950)]">
                <step.icon className="size-7" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-bold">{step.title}</span>
                <span className="text-sm text-navy-200">{step.text}</span>
              </span>
            </Reveal>
          ))}
        </ol>

        {/* Chiffres clés — uniquement s'ils sont confirmés */}
        {figures.length > 0 && (
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {figures.map((k) => (
              <li key={k.id} className="flex items-center gap-4 bg-navy-950 p-6">
                <FigureIcon name={k.icon} className="size-8 text-gold-400" />
                <div>
                  <p className="font-display text-3xl font-extrabold text-gold-400">{k.figure.value}</p>
                  <p className="font-semibold">{k.label}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Atouts (sans chiffres) */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {institutional.strengths.map((s, i) => {
            const Icon = strengthIcons[s.icon];
            return (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 80}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-gold-400/40 hover:bg-white/[0.07]"
              >
                <Icon className="size-7 text-gold-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-navy-200">{s.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
