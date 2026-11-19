import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { company } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Highlight } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";
import { HeroQuickQuote } from "./HeroQuickQuote";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative isolate overflow-clip bg-navy-950">
        {/* Visuel */}
        <div className="absolute inset-0 -z-10 overflow-hidden lg:left-[40%]">
          <Image
            src={images.heroTruck.src}
            alt={images.heroTruck.alt}
            fill
            preload
            quality={85}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="animate-slow-zoom object-cover object-[42%_center]"
          />
          <div className="absolute inset-0 bg-navy-950/75 lg:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-navy-950 via-navy-950/45 via-20% to-transparent to-50% lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent via-45% to-navy-950/20" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-routes [mask-image:linear-gradient(to_right,black_25%,transparent_65%)]"
        />
        {/* Trait doré signature */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-24 left-0 -z-10 hidden h-24 w-full text-gold-400/40 lg:block"
        >
          <path
            d="M0 100 C 360 100, 520 20, 900 30 S 1300 70, 1440 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="10 18"
            className="animate-dash"
          />
        </svg>

        <Container className="relative grid gap-10 pt-14 pb-32 sm:pt-20 sm:pb-36 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-24 lg:pb-44">
          <div className="animate-fade-up lg:col-span-7 xl:col-span-6">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.78rem] font-semibold text-gold-200 backdrop-blur-sm">
              <MapPin className="size-3.5 text-gold-400" aria-hidden="true" />
              Société de transport et de logistique à Bamako, Mali
            </p>
            <h1
              id="hero-title"
              className="text-[clamp(2.15rem,6.2vw,3.85rem)] leading-[1.06] font-extrabold tracking-[-0.025em] text-white"
            >
              Votre partenaire de confiance pour un transport <Highlight light>sans frontières</Highlight>
            </h1>
            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-navy-100 sm:text-xl">
              Transport routier, transit, affrètement maritime et logistique au service du développement du Mali et de
              l&apos;Afrique.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/devis" size="lg">
                Demander un devis <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="outlineLight">
                Découvrir nos services
              </ButtonLink>
            </div>
            <p className="mt-8 text-sm font-medium text-gold-200/90 italic">« {company.tagline} »</p>
          </div>

          <div
            className="animate-fade-up lg:col-span-5 lg:col-start-8 lg:max-w-sm lg:justify-self-end xl:col-start-9 xl:col-span-4"
            style={{ animationDelay: "180ms" }}
          >
            <HeroQuickQuote />
          </div>
        </Container>
      </div>

      {/* Bandeau des 4 métiers, en chevauchement */}
      <div className="relative z-10">
        <Container>
          <ul className="-mt-20 grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-line lg:grid-cols-4">
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
                  className="group flex h-full flex-col items-center gap-2.5 px-3 py-5 text-center transition-colors hover:bg-mist sm:gap-3 sm:px-6 sm:py-7 lg:flex-row lg:items-center lg:text-left"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300 transition-all duration-300 group-hover:bg-gold-400 group-hover:text-navy-950 sm:size-13">
                    <ServiceIcon name={s.icon} className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.92rem] leading-tight font-bold text-navy-900 sm:text-base">
                      {s.shortTitle}
                    </span>
                    <span className="mt-1 hidden text-[0.83rem] leading-snug text-muted sm:block">{s.tagline}</span>
                  </span>
                  <ChevronRight
                    className="ml-auto hidden size-4 shrink-0 text-navy-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-600 lg:block"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
