import type { Metadata } from "next";
import { siteMeta } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ChainStrengths } from "@/components/sections/ChainStrengths";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { CommitmentsStrip } from "@/components/sections/CommitmentsStrip";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { QualityService } from "@/components/sections/QualityService";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: { absolute: siteMeta.defaultTitle },
  description: siteMeta.defaultDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ChainStrengths />
      <AboutPreview />
      <CommitmentsStrip />
      <QuoteSection index={5} />
      <QualityService />
      <LatestArticles />
      <FinalCta />
    </>
  );
}
