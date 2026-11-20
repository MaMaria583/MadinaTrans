"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * E. Nos expertises — composition interactive :
 * sur ordinateur, une liste éditoriale à gauche pilote un grand visuel à droite ;
 * l'expertise active se déplie (accroche + description lisibles sur fond clair)
 * pendant que la photographie change en fondu. Sur mobile et tablette, chaque
 * expertise est présentée avec sa propre photographie.
 */
export function ExpertiseExplorer({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <>
      {/* Ordinateur */}
      <div className="hidden items-start gap-16 lg:grid lg:grid-cols-12">
        <ol className="lg:col-span-6" aria-label="Nos expertises">
          {services.map((s, i) => {
            const selected = i === active;
            return (
              <li key={s.slug} className="relative border-t border-line last:border-b">
                {/* Repère actif : filet or vertical + filet or sous la ligne */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 -left-6 h-full w-px origin-top bg-gold-400 transition-transform duration-500 ease-[var(--ease-premium)]",
                    selected ? "scale-y-100" : "scale-y-0",
                  )}
                />
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group block py-7"
                >
                  <span className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                    <span
                      className={cn(
                        "font-display text-[2.15rem] leading-tight transition-[color] duration-500 ease-[var(--ease-premium)]",
                        selected ? "text-navy-900 italic" : "text-navy-400 group-hover:text-navy-700",
                      )}
                    >
                      {s.title}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "size-5 transition-[transform,opacity,color] duration-500 ease-[var(--ease-premium)]",
                        selected ? "text-gold-600 opacity-100" : "-translate-x-1 translate-y-1 opacity-0",
                      )}
                      aria-hidden="true"
                    />
                  </span>
                  {/* Panneau dépliant : la description se lit sur fond clair, pas sur la photo */}
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-premium)]",
                      selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-3 label-caps text-gold-700">{s.tagline}</span>
                      <span className="mt-3 block max-w-[46ch] text-[1.02rem] leading-relaxed text-muted">
                        {s.excerpt}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-navy-900">
                        <span className="link-underline">Découvrir l&apos;expertise</span>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="lg:col-span-6">
          <div className="sticky top-28">
            <Reveal kind="media">
              <div className="grain relative aspect-square overflow-hidden rounded-sm bg-navy-900 frame-inset">
                {services.map((s, i) => (
                  <Image
                    key={s.slug}
                    src={s.image.src}
                    alt={i === active ? s.image.alt : ""}
                    fill
                    sizes="45vw"
                    className={cn(
                      "photo-grade object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-premium)]",
                      i === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0",
                    )}
                  />
                ))}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/75 to-transparent"
                />
                {/* Légende : nom de l'expertise, en fondu au changement */}
                <p
                  key={current.slug}
                  aria-hidden="true"
                  className="absolute bottom-6 left-7 flex animate-fade-in items-center gap-3 label-caps text-white"
                >
                  <span className="h-px w-8 bg-gold-400" />
                  {current.title}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Mobile et tablette */}
      <ol className="grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:hidden" aria-label="Nos expertises">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="group block">
              <Reveal kind="media">
                <div className="grain relative aspect-[4/3] overflow-hidden rounded-sm bg-navy-900">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="photo-grade object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Reveal>
              <p className="mt-5 flex items-center gap-3 label-caps text-gold-700">
                <span aria-hidden="true" className="h-px w-6 bg-gold-400" />
                {s.tagline}
              </p>
              <h3 className="mt-3 font-display text-[1.7rem] leading-tight font-normal text-navy-900">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.excerpt}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-navy-900">
                Découvrir l&apos;expertise
                <ArrowUpRight
                  className="size-4 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
