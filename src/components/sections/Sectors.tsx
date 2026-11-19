import Image from "next/image";
import { Building2, Factory, HardHat, Pickaxe, ShoppingBasket, Wheat } from "lucide-react";
import { DEMO_MODE, institutional, partners } from "@/config/site";
import { Container, SectionHeading } from "@/components/ui/Section";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/ui/Reveal";

const sectorIcons = [ShoppingBasket, HardHat, Wheat, Factory, Pickaxe, Building2];

/**
 * Secteurs pour lesquels les solutions sont pensées (capacités, pas des
 * références) + partenaires UNIQUEMENT s'ils sont confirmés.
 * Aucun faux logo, aucun faux témoignage.
 */
export function Sectors() {
  return (
    <section aria-labelledby="sectors-title" className="section-y-sm border-y border-line bg-mist">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <SectionHeading
            className="lg:col-span-4"
            eyebrow="Secteurs"
            id="sectors-title"
            title="Des solutions pour chaque secteur d'activité"
            intro="Nos prestations s'adaptent aux contraintes propres à chaque type de marchandise."
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8">
            {institutional.sectors.map((sector, i) => {
              const Icon = sectorIcons[i % sectorIcons.length];
              return (
                <Reveal
                  as="li"
                  key={sector}
                  delay={i * 50}
                  className="card flex items-center gap-3 p-4 sm:gap-4 sm:p-5"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-800 sm:size-11">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-[0.92rem] leading-snug font-semibold text-navy-900 sm:text-base">{sector}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {partners.length > 0 ? (
          <div className="mt-14">
            <h2 className="text-center text-sm font-bold tracking-[0.14em] text-muted uppercase">
              Ils nous font confiance
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {partners.map((p) => (
                <li key={p.name} className="card flex h-24 items-center justify-center p-4">
                  <Image src={p.logo} alt={p.name} width={160} height={64} className="max-h-14 w-auto object-contain" />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          DEMO_MODE && (
            <p className="mt-10 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-dashed border-navy-200 px-5 py-4 text-center text-sm text-muted">
              Espace « Références clients » : les logos de partenaires seront publiés uniquement avec leur accord écrit.
              <DemoBadge label="Références à fournir" />
            </p>
          )
        )}
      </Container>
    </section>
  );
}
