import Link from "next/link";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { ImmersiveBand } from "@/components/sections/ImmersiveBand";
import { Container } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";

export const metadata = pageMetadata({
  title: "Nos services de transport et de logistique",
  description:
    "Transport routier, transit, affrètement maritime, logistique et distribution : découvrez les services de Madina Trans pour le transport de marchandises au Mali.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Le transport de vos marchandises, organisé de bout en bout"
        intro="De la route au port, de l'entrepôt au client final : Madina Trans vous accompagne sur l'ensemble de votre chaîne logistique."
        image={images.portContainers}
        crumbs={[{ label: "Nos services" }]}
        path="/services"
      />

      {/* Navigation rapide */}
      <nav
        aria-label="Accès rapide aux services"
        className="sticky top-[68px] z-30 border-b border-line bg-white/95 backdrop-blur-md"
      >
        <Container>
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0">
            {services.map((s) => (
              <li key={s.slug} className="shrink-0">
                <Link
                  href={`#${s.slug}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-line px-4 text-sm font-medium whitespace-nowrap text-navy-800 transition-colors hover:border-navy-800 hover:bg-navy-50"
                >
                  <ServiceIcon name={s.icon} className="size-4 text-gold-600" />
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div className="section-y">
        <Container className="space-y-24 lg:space-y-32">
          {services.map((s, i) => (
            <ServiceDetail key={s.slug} service={s} reverse={i % 2 === 1} />
          ))}
        </Container>
      </div>

      <ImmersiveBand
        image={images.warehouseAerial}
        eyebrow="Sur mesure"
        title={
          <>
            Chaque projet est unique. <em className="text-gold-300 italic">Parlons du vôtre.</em>
          </>
        }
        text="Décrivez-nous votre besoin : nous construisons avec vous l'organisation la plus adaptée."
      />
    </>
  );
}
