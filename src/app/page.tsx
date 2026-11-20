import type { Metadata } from "next";
import { siteMeta } from "@/config/site";
import { services } from "@/content/services";
import { Hero } from "@/components/sections/Hero";
import { EditorialIntro } from "@/components/sections/EditorialIntro";
import { ExpertiseExplorer } from "@/components/sections/ExpertiseExplorer";
import { IntegratedChain } from "@/components/sections/IntegratedChain";
import { CommitmentAxes } from "@/components/sections/CommitmentAxes";
import { ImmersiveBand } from "@/components/sections/ImmersiveBand";
import { MethodSteps } from "@/components/sections/MethodSteps";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: siteMeta.defaultTitle },
  description: siteMeta.defaultDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* A–C : navigation (layout), hero, bandeau de positionnement */}
      <Hero />
      {/* D : présentation */}
      <EditorialIntro />
      {/* E : expertises */}
      <section aria-labelledby="expertises-title" className="section-y bg-white">
        <Container>
          <SectionHeading
            id="expertises-title"
            title={
              <>
                Quatre métiers, une même <Highlight>exigence</Highlight>
              </>
            }
            intro="Du premier kilomètre à la livraison finale, des expertises complémentaires pour accompagner vos flux au Mali et vers l'international."
            className="mb-14 lg:mb-16"
          />
          <ExpertiseExplorer services={services} />
        </Container>
      </section>
      {/* F : chaîne intégrée */}
      <IntegratedChain />
      {/* G : engagements */}
      <CommitmentAxes />
      {/* H : composition immersive */}
      <ImmersiveBand />
      {/* I : méthode */}
      <MethodSteps />
      {/* J : devis — K : pied de page (layout) */}
      <QuoteSection />
    </>
  );
}
