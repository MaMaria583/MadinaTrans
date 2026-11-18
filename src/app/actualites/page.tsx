import { images } from "@/content/images";
import { articleCategories, articles } from "@/content/articles";
import { DEMO_MODE } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ArticleCard } from "@/components/sections/ArticleCard";
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

  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Actualités & conseils"
        intro="Informations, conseils pratiques et nouvelles de Madina Trans sur le transport et la logistique."
        image={images.containerShip}
        crumbs={[{ label: "Actualités" }]}
      />

      <section aria-label="Articles" className="py-16 lg:py-24">
        <Container>
          {DEMO_MODE && (
            <div
              role="note"
              className="mb-10 rounded-2xl border border-dashed border-gold-400/70 bg-gold-50/60 p-5 text-sm leading-relaxed text-navy-800"
            >
              <strong>Articles d&apos;exemple.</strong> Les contenus ci-dessous sont des articles pédagogiques généraux
              rédigés pour illustrer la rubrique. Ils ne relatent aucun événement ni aucune actualité de Madina Trans et
              seront remplacés par les publications officielles de l&apos;entreprise.
            </div>
          )}

          <NewsFilter categories={articleCategories}>
            {sorted.map((a, i) => (
              <li
                key={a.slug}
                data-category={a.category}
                className={i === 0 ? "sm:col-span-2 lg:col-span-3" : undefined}
              >
                <ArticleCard article={a} featured={i === 0} />
              </li>
            ))}
          </NewsFilter>
        </Container>
      </section>
    </>
  );
}
