import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services, showServiceDetails } from "@/content/services";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** Présentation des 4 métiers en grille éditoriale (« bento »). */
export function ServicesGrid() {
  return (
    <section aria-labelledby="services-title" className="section-y bg-white pt-24 sm:pt-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            index={1}
            eyebrow="Nos métiers"
            id="services-title"
            title={
              <>
                Des solutions complètes pour <Highlight>transporter</Highlight> vos marchandises
              </>
            }
            intro="Quatre expertises complémentaires pour accompagner vos flux, du premier kilomètre à la livraison finale, au Mali et vers l'international."
          />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-navy-800 hover:text-gold-600"
          >
            Tous nos services
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
          {services.map((s, i) => {
            const featured = i === 0;
            return (
              <Reveal
                as="li"
                key={s.slug}
                delay={i * 80}
                className={cn(
                  featured && "md:col-span-2 lg:col-span-6 lg:row-span-2",
                  !featured && i === 1 && "lg:col-span-6",
                  !featured && i > 1 && "lg:col-span-3",
                )}
              >
                <article
                  className={cn(
                    "group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-navy-900 p-6 pt-24 text-white sm:p-8 sm:pt-28",
                    featured && "lg:min-h-[36rem]",
                  )}
                >
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes={
                      featured
                        ? "(min-width: 1024px) 50vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    }
                    className="-z-10 object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/75 via-45% to-navy-950/10" />

                  <div className="absolute top-6 right-6 left-6 flex items-start justify-between sm:top-8 sm:right-8 sm:left-8">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gold-400 text-navy-950 shadow-lg">
                      <ServiceIcon name={s.icon} className="size-6" />
                    </span>
                    <span className="font-display text-sm font-bold text-white/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className={cn("font-bold", featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl")}>
                    {s.title}
                  </h3>
                  <p className={cn("mt-2 leading-relaxed text-navy-100", !featured && i > 1 && "lg:line-clamp-3")}>
                    {s.excerpt}
                  </p>
                  {featured && showServiceDetails(s) && (
                    <ul className="mt-5 hidden gap-2 text-[0.95rem] text-navy-50 sm:grid sm:grid-cols-2">
                      {s.advantages.slice(0, 4).map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-gold-400" strokeWidth={3} aria-hidden="true" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 font-semibold text-gold-300 after:absolute after:inset-0 group-hover:text-gold-200"
                  >
                    Découvrir le service
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> : {s.title}</span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
