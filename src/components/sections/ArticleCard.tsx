import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { formatDate, type Article } from "@/content/articles";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const Heading = featured ? "h2" : "h3";
  return (
    <article
      className={
        "group relative flex h-full overflow-hidden rounded-sm border border-line bg-white transition-shadow duration-500 hover:shadow-lift " +
        (featured ? "flex-col lg:flex-row" : "flex-col")
      }
    >
      <div
        className={
          "relative overflow-hidden " + (featured ? "aspect-[16/10] lg:aspect-auto lg:w-3/5" : "aspect-[16/10]")
        }
      >
        <Image
          src={article.cover.src}
          alt={article.cover.alt}
          fill
          sizes={
            featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-[2px] bg-navy-950/85 px-3 py-1.5 label-caps text-gold-200">
          {article.category}
        </span>
      </div>
      <div className={"flex flex-1 flex-col p-6 " + (featured ? "lg:justify-center lg:p-10" : "")}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {article.readingMinutes} min de lecture
          </span>
          {article.isSample && <DemoBadge label="Article d'exemple" />}
        </div>
        <Heading
          className={
            "mt-3 font-display font-normal text-navy-900 " +
            (featured ? "text-[1.9rem] leading-tight lg:text-[2.6rem]" : "text-[1.5rem] leading-tight")
          }
        >
          <Link href={`/actualites/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-navy-700">
            {article.title}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-800 group-hover:text-gold-600">
          Lire l&apos;article <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
