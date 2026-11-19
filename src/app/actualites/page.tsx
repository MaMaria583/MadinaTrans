import { images } from "@/content/images";
import { articleCategories, articles } from "@/content/articles";
import { DEMO_MODE } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ArticleRow } from "@/components/sections/ArticleRow";
import { Container } from "@/components/ui/Section";
import { NewsFilter } from "@/components/sections/NewsFilter";

export const metadata = pageMetadata({
  title: "Actualités et conseils transport & logistique",
  description:
    "Conseils pratiques sur le transport de marchandises, le transit au Mali, l'affrètement maritime et la logistique. Le blog de Madina Trans.",
  path: "/actualites",
});

export default function NewsPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted[0];

  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title={
          <>
            Actualités <em className="text-gold-300 italic">&amp;</em> conseils
          </>
        }
        intro="Informations, conseils pratiques et nouvelles de Madina Trans sur le transport et la logistique."
        image={images.tracking}
        crumbs={[{ label: "Actualités" }]}
        path="/actualites"
      />

      <section aria-label="Articles" className="section-y bg-white">
        <Container>
          {DEMO_MODE && (
            <div
              role="note"
              className="mb-12 rounded-sm border border-dashed border-gold-400/70 bg-ivory p-5 text-sm leading-relaxed text-navy-800"
            >
              <strong>Articles d&apos;exemple.</strong> Les contenus ci-dessous sont des articles pédagogiques généraux
              rédigés pour illustrer la rubrique. Ils ne relatent aucun événement ni aucune actualité de Madina Trans et
              seront remplacés par les publications officielles de l&apos;entreprise.
            </div>
          )}

          {featured && (
            <div className="mb-16 lg:mb-20">
              <ArticleCard article={featured} featured />
            </div>
          )}

          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-navy-900/15 pb-6 sm:flex-row sm:items-end">
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight font-normal text-navy-900">
              Toutes les publications
            </h2>
          </div>
          <NewsFilter categories={articleCategories} listClassName="border-t border-line">
            {sorted.map((a) => (
              <li key={a.slug} data-category={a.category}>
                <ArticleRow article={a} />
              </li>
            ))}
          </NewsFilter>
        </Container>
      </section>
    </>
  );
}
