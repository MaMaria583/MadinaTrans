import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { company } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";
import Link from "next/link";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative isolate bg-navy-950">
        <div className="absolute inset-0 -z-10 overflow-hidden lg:left-[46%]">
          <Image
            src={images.heroTruck.src}
            alt={images.heroTruck.alt}
            fill
            preload
            quality={85}
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover object-[42%_center]"
          />
          <div className="absolute inset-0 bg-navy-950/75 lg:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-navy-950 via-navy-950/40 via-15% to-transparent to-40% lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent via-40% to-transparent" />
        </div>

        <Container className="relative pt-20 pb-36 sm:pt-24 sm:pb-40 lg:pt-28 lg:pb-44">
          <div className="max-w-2xl animate-fade-up lg:max-w-[34rem] xl:max-w-[36rem]">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.8rem] font-semibold tracking-wide text-gold-200 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-gold-400" aria-hidden="true" />
              Transport · Transit · Maritime · Logistique — Bamako, Mali
            </p>
            <h1
              id="hero-title"
              className="text-[2.35rem] leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-[3.3rem] xl:text-[3.6rem]"
            >
              Votre partenaire de confiance pour un transport <span className="text-gold-400">sans frontières</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
              Transport routier, transit, affrètement maritime et logistique au service du développement du Mali et de
              l&apos;Afrique.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services" size="lg">
                Découvrir nos services <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/devis" size="lg" variant="outlineLight">
                Demander un devis
              </ButtonLink>
            </div>
            <p className="mt-10 text-sm font-medium text-gold-200/90 italic">« {company.tagline} »</p>
          </div>
        </Container>
      </div>

      {/* Bandeau des 4 métiers, en chevauchement */}
      <div className="relative z-10">
        <Container>
          <ul className="-mt-24 grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-lift sm:-mt-20 lg:grid-cols-4">
            {services.map((s, i) => (
              <li
                key={s.slug}
                className={
                  "border-line " +
                  (i % 2 === 0 ? "border-r " : "") +
                  (i < 2 ? "border-b lg:border-b-0 " : "") +
                  (i === 1 ? "lg:border-r " : "")
                }
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col items-center gap-3 px-3 py-6 text-center transition-colors hover:bg-mist sm:px-6 sm:py-7"
                >
                  <span className="inline-flex size-13 items-center justify-center rounded-full bg-navy-800 text-gold-300 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-navy-950">
                    <ServiceIcon name={s.icon} className="size-6" />
                  </span>
                  <span className="text-[0.95rem] font-bold text-navy-900 sm:text-base">{s.shortTitle}</span>
                  <span className="hidden text-[0.85rem] text-muted sm:block">{s.tagline}</span>
                  <span className="inline-flex items-center gap-1 text-[0.8rem] font-semibold text-gold-600 opacity-0 transition-opacity group-hover:opacity-100 max-sm:hidden">
                    En savoir plus <ChevronRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
