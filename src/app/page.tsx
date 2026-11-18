import type { Metadata } from "next";
import { siteMeta } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { KeyFigures } from "@/components/sections/KeyFigures";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { CommitmentsStrip } from "@/components/sections/CommitmentsStrip";
import { Partners } from "@/components/sections/Partners";
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
      <KeyFigures />
      <AboutPreview />
      <QuoteSection />
      <CommitmentsStrip />
      <Partners />
      <FinalCta />
    </>
  );
}
