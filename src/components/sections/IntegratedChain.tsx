import Image from "next/image";
import { FileCheck2, PackageCheck, PackageOpen, Ship, Truck } from "lucide-react";
import { DEMO_MODE } from "@/config/site";
import { images } from "@/content/images";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DemoBadge } from "@/components/ui/DemoBadge";

/**
 * F. Chaîne logistique intégrée — parcours type des marchandises.
 * Les étapes correspondent aux domaines d'activité du brief ; leur périmètre
 * exact reste à confirmer par Madina Trans (voir INFORMATIONS-A-CONFIRMER.md).
 */
const stages = [
  { icon: PackageOpen, title: "Collecte", text: "Enlèvement chez le fournisseur ou au point de départ convenu." },
  { icon: Truck, title: "Transport", text: "Acheminement routier, préparé et sécurisé." },
  { icon: FileCheck2, title: "Transit", text: "Coordination des formalités et des passages." },
  { icon: Ship, title: "Acheminement", text: "Liaison avec les ports et les corridors vers le Mali." },
  { icon: PackageCheck, title: "Livraison", text: "Remise au destinataire et clôture de l'opération." },
];

export function IntegratedChain() {
  return (
    <section aria-labelledby="chain-title" className="section-y relative isolate overflow-clip bg-navy-900 text-white">
      <Image
        src={images.portAerial.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-[0.18] mix-blend-luminosity"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900 via-navy-900/80 to-navy-900"
      />

      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            light
            index={3}
            eyebrow="Chaîne intégrée"
            id="chain-title"
            title={
              <>
                Du point de départ à la <Highlight light>livraison</Highlight>
              </>
            }
            intro="Un parcours coordonné pour réduire les ruptures, limiter les intermédiaires et vous donner de la visibilité."
          />
          {DEMO_MODE && (
            <p className="flex max-w-xs flex-wrap items-center gap-2 text-sm text-navy-200">
              Étapes indicatives, selon les prestations réellement proposées. <DemoBadge tone="dark" />
            </p>
          )}
        </div>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          <li
            aria-hidden="true"
            className="pointer-events-none absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-gold-400/0 via-gold-400/70 to-gold-400/0 lg:block"
          />
          {stages.map((stage, i) => (
            <Reveal as="li" key={stage.title} delay={i * 90} className="relative lg:px-5 lg:text-center">
              <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-full border border-gold-400/50 bg-navy-900 text-gold-300">
                <stage.icon className="size-6" aria-hidden="true" strokeWidth={1.6} />
              </span>
              <p className="mt-5 font-display text-sm text-gold-400 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-display text-2xl font-normal">{stage.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-200">{stage.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
