import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import type { SiteImage } from "@/content/images";
import { Container } from "@/components/ui/Section";

export interface Crumb {
  label: string;
  href?: string;
}

/** En-tête des pages intérieures, avec fil d'Ariane. */
export function PageHero({
  title,
  intro,
  image,
  crumbs,
  eyebrow,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  image: SiteImage;
  crumbs: Crumb[];
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-clip bg-navy-950">
      <Image src={image.src} alt="" fill preload sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/25" />
      <Container className="py-16 sm:py-20 lg:py-24">
        <nav aria-label="Fil d'Ariane" className="mb-6">
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
            <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-gold-300 uppercase">{eyebrow}</p>
          )}
          <h1 className="text-4xl leading-[1.1] font-extrabold text-white sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 text-lg leading-relaxed text-navy-100 sm:text-xl">{intro}</p>}
          {children}
        </div>
      </Container>
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-transparent" />
    </section>
  );
}
