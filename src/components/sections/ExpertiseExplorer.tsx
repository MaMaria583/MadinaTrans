"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * E. Nos expertises — composition interactive :
 * sur ordinateur, une liste éditoriale à gauche pilote un grand visuel à droite ;
 * sur mobile, chaque expertise est présentée avec sa propre photographie.
 */
export function ExpertiseExplorer({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <>
      {/* Ordinateur */}
      <div className="hidden gap-14 lg:grid lg:grid-cols-12">
        <ol className="lg:col-span-6" aria-label="Nos expertises">
          {services.map((s, i) => {
            const selected = i === active;
            return (
              <li key={s.slug} className="border-t border-line last:border-b">
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-describedby={selected ? "expertise-desc" : undefined}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7"
                >
                  <span
                    className={cn(
                      "font-display text-sm tabular-nums transition-colors",
                      selected ? "text-gold-600" : "text-navy-300",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[2.1rem] leading-tight transition-all duration-500 ease-[var(--ease-premium)]",
                      selected ? "translate-x-2 text-navy-900 italic" : "text-navy-400",
                    )}
                  >
                    {s.title}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-5 transition-all duration-500",
                      selected ? "text-gold-600 opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="lg:col-span-6">
          <div className="sticky top-28">
            <div className="grain relative aspect-[6/5] overflow-hidden rounded-sm bg-navy-900">
              {services.map((s, i) => (
                <Image
                  key={s.slug}
                  src={s.image.src}
                  alt={i === active ? s.image.alt : ""}
                  fill
                  sizes="45vw"
                  className={cn(
                    "object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-premium)]",
                    i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/95 via-navy-950/70 to-transparent p-8 pt-28 text-white">
                <p className="label-caps text-gold-300">{current.tagline}</p>
                <p id="expertise-desc" className="mt-3 max-w-md leading-relaxed text-navy-100">
                  {current.excerpt}
                </p>
                <Link
                  href={`/services/${current.slug}`}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-white hover:text-gold-300"
                >
                  <span className="link-underline">Découvrir l&apos;expertise</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile et tablette */}
      <ol className="grid gap-10 sm:grid-cols-2 lg:hidden" aria-label="Nos expertises">
        {services.map((s, i) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="group block">
              <div className="grain relative aspect-[4/3] overflow-hidden rounded-sm bg-navy-900">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-5 font-display text-sm text-gold-600 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-display text-[1.65rem] leading-tight font-normal text-navy-900">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 font-semibold text-navy-900">
                Découvrir <ArrowUpRight className="size-4 text-gold-600" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
