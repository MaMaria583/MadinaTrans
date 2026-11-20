import Image from "next/image";
import { FileCheck2, PackageCheck, PackageOpen, Ship, Truck } from "lucide-react";
import { DEMO_MODE } from "@/config/site";
import { images } from "@/content/images";
import { Highlight, SectionHeading } from "@/components/ui/Section";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { RouteJourney, type RouteStage } from "./RouteJourney";

const iconCls = "size-6 lg:size-7";

/**
 * F. Chaîne logistique intégrée : moment fort (« peak ») de la page.
 * La route d'or se trace au défilement et allume chaque étape.
 * Étapes indicatives : leur périmètre reste à confirmer par Madina Trans.
 */
const stages: RouteStage[] = [
  {
    title: "Collecte",
    text: "Enlèvement chez le fournisseur ou au point de départ convenu.",
    icon: <PackageOpen className={iconCls} strokeWidth={1.6} aria-hidden="true" />,
  },
  {
    title: "Transport",
    text: "Acheminement routier, préparé et sécurisé.",
    icon: <Truck className={iconCls} strokeWidth={1.6} aria-hidden="true" />,
  },
  {
    title: "Transit",
    text: "Coordination des formalités et des passages.",
    icon: <FileCheck2 className={iconCls} strokeWidth={1.6} aria-hidden="true" />,
  },
  {
    title: "Acheminement",
    text: "Liaison avec les ports et les corridors vers le Mali.",
    icon: <Ship className={iconCls} strokeWidth={1.6} aria-hidden="true" />,
  },
  {
    title: "Livraison",
    text: "Remise au destinataire et clôture de l'opération.",
    icon: <PackageCheck className={iconCls} strokeWidth={1.6} aria-hidden="true" />,
  },
];

export function IntegratedChain() {
  return (
    <section aria-labelledby="chain-title" className="relative isolate bg-navy-900 text-white">
      {/* Environnement : port vu du ciel, désaturé, très discret */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-clip">
        <Image
          src={images.portAerial.src}
          alt=""
          fill
          sizes="100vw"
          className="parallax-media object-cover opacity-[0.16] mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/75 to-navy-900" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-0">
        <RouteJourney
          stages={stages}
          header={
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                light
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
          }
        />
      </div>
    </section>
  );
}
