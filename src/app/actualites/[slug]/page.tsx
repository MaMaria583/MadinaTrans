import { Suspense } from "react";
import { PageLoading } from "@/components/ui/PageLoading";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { articles, formatDate, getArticle } from "@/content/articles";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ogFromUnsplash, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Section";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { DEMO_MODE } from "@/config/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/actualites/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/actualites/${slug}`,
    type: "article",
    image: ogFromUnsplash(article.cover.src),
    imageAlt: article.cover.alt,
    publishedTime: article.date,
  });
}

/**
 * Les paramètres d'URL sont lus dans une frontière <Suspense> : la navigation
 * reste instantanée (Cache Components). Les slugs connus sont pré-rendus au build.
 */
export default function ArticlePage({ params }: PageProps<"/actualites/[slug]">) {
  return (
    <Suspense fallback={<PageLoading />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: PageProps<"/actualites/[slug]">["params"] }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Actualités", path: "/actualites" },
          { name: article.title, path: `/actualites/${article.slug}` },
        ]}
      />
      <article>
        <header className="bg-mist pt-12 pb-10 lg:pt-16">
          <Container className="max-w-4xl">
            <nav aria-label="Fil d'Ariane" className="mb-8">
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600"
              >
                <ArrowLeft className="size-4" aria-hidden="true" /> Toutes les actualités
              </Link>
            </nav>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-bold text-white">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden="true" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" /> {article.readingMinutes} min de lecture
              </span>
              {article.isSample && <DemoBadge label="Article d'exemple" />}
            </div>
            <h1 className="mt-5 text-3xl leading-tight font-extrabold text-navy-900 sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-muted">{article.excerpt}</p>
          </Container>
        </header>

        <Container className="max-w-5xl">
          <div className="relative -mb-4 aspect-[16/8] translate-y-0 overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={article.cover.src}
              alt={article.cover.alt}
              fill
              preload
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>

        <Container className="max-w-3xl py-14 lg:py-20">
          {DEMO_MODE && article.isSample && (
            <p
              role="note"
              className="mb-10 rounded-xl border border-dashed border-gold-400/70 bg-gold-50/60 p-4 text-sm text-navy-800"
            >
              Article d&apos;exemple à caractère pédagogique, rédigé pour la démonstration. Il ne relate aucun fait
              concernant Madina Trans. La date affichée est fictive.
            </p>
          )}
          <div className="prose-mt">
            {article.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>
        </Container>
      </article>

      <section aria-labelledby="related-title" className="bg-mist section-y-sm">
        <Container>
          <h2 id="related-title" className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
            À lire également
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
