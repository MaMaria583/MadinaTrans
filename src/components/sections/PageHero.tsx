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
    <section className="relative isolate overflow-clip bg-navy-950">
      {path && <BreadcrumbJsonLd items={crumbs.map((c) => ({ name: c.label, path: c.href ?? path }))} />}
      <Image src={image.src} alt="" fill preload sizes="100vw" className="-z-10 animate-slow-zoom object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/30" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 w-full bg-routes md:w-1/2" />
      <Container
        className={cn("pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24", overlap && "pb-20 sm:pb-28 lg:pb-32")}
      >
        <nav aria-label="Fil d'Ariane" className="mb-7">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-navy-200">
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
                  <span aria-current="page" className="font-medium text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.16em] text-gold-300 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-gold-400" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-[clamp(2rem,5.4vw,3.4rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white">
            {title}
          </h1>
          {intro && <p className="mt-5 text-[1.05rem] leading-relaxed text-navy-100 sm:text-xl">{intro}</p>}
          {children}
        </div>
      </Container>
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-transparent" />
    </section>
  );
}
