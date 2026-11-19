import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/content/articles";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ArticleCard } from "./ArticleCard";

export function LatestArticles() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section aria-labelledby="latest-title" className="section-y bg-white">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            index={6}
            eyebrow="Actualités & conseils"
            id="latest-title"
            title="Bien préparer vos expéditions"
          />
          <Link
            href="/actualites"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-navy-800 hover:text-gold-600"
          >
            Toutes les actualités
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
