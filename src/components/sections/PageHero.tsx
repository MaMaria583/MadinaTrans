import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import type { SiteImage } from "@/content/images";
import { Container } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * En-tête des pages intérieures : visuel, fil d'Ariane (visible + structuré),
 * sur-titre, titre H1 et introduction.
 */
export function PageHero({
  title,
  intro,
  image,
  crumbs,
  eyebrow,
  path,
  overlap = false,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  image: SiteImage;
  crumbs: Crumb[];
  eyebrow?: string;
  /** URL de la page courante : active le fil d'Ariane structuré (SEO). */
  path?: string;
  /** Réserve de l'espace en bas pour un contenu qui chevauche l'en-tête. */
  overlap?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-clip bg-navy-950 text-white">
      {path && <BreadcrumbJsonLd items={crumbs.map((c) => ({ name: c.label, path: c.href ?? path }))} />}
      <div className="grain absolute inset-0 -z-10">
        <Image src={image.src} alt="" fill preload sizes="100vw" className="animate-slow-zoom object-cover" />
        <div aria-hidden="true" className="absolute inset-0 scrim-band md:hidden" />
        <div aria-hidden="true" className="absolute inset-0 hidden scrim-column md:block" />
        <div aria-hidden="true" className="absolute inset-0 bg-navy-950/35" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/50 to-transparent"
        />
      </div>
      <Container
        className={cn(
          "flex min-h-[26rem] flex-col justify-between gap-12 pt-8 pb-12 sm:min-h-[30rem] sm:pb-16 lg:min-h-[34rem] lg:pb-20",
          overlap && "pb-24 sm:pb-28 lg:pb-32",
        )}
      >
        <nav aria-label="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.82rem] text-navy-200">
            <li>
              <Link href="/" className="hover:text-white">
                Accueil
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 text-gold-400" aria-hidden="true" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-4xl animate-fade-up">
          {eyebrow && (
            <p className="mb-6 inline-flex items-center gap-3 label-caps text-gold-300">
              <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-[clamp(2.4rem,6.2vw,4.8rem)] leading-[1.02] font-normal tracking-[-0.03em]">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.7] text-navy-100 sm:text-lg">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
