import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type Article } from "@/content/articles";
import { DemoBadge } from "@/components/ui/DemoBadge";

/** Ligne éditoriale d'article (liste « magazine »). */
export function ArticleRow({ article }: { article: Article }) {
  return (
    <article className="group relative grid items-center gap-5 border-b border-line py-8 sm:grid-cols-[10rem_1fr_9rem] sm:gap-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted sm:flex-col sm:items-start">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span className="label-caps text-gold-700">{article.category}</span>
      </div>
      <div>
        <h3 className="font-display text-[1.6rem] leading-tight font-normal text-navy-900 transition-colors group-hover:text-navy-600 sm:text-[1.85rem]">
          <Link href={`/actualites/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-navy-900">
            Lire l&apos;article
            <ArrowUpRight
              className="size-4 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
          {article.isSample && <DemoBadge label="Article d'exemple" />}
        </div>
      </div>
      <div className="relative hidden aspect-[4/3] overflow-hidden rounded-sm sm:block">
        <Image
          src={article.cover.src}
          alt=""
          fill
          sizes="144px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </article>
  );
}
