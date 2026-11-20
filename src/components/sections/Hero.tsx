import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

const shortNames = ["Transport routier", "Transit", "Maritime", "Logistique"];

/**
 * Hero cinématographique plein cadre + bandeau de positionnement.
 * Visuel d'illustration (ne représente pas la flotte de Madina Trans).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative isolate flex min-h-[min(88svh,860px)] flex-col overflow-clip bg-navy-950 text-white">
        <div className="grain absolute inset-0 -z-10 animate-fade-in lg:left-[40%] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_34%)]">
          <Image
            src={images.truckSunset.src}
            alt={images.truckSunset.alt}
            fill
            preload
            quality={85}
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="photo-grade animate-slow-zoom object-cover object-[58%_70%] lg:object-[46%_62%]"
          />
          {/* Reflet champagne du couchant : donne à la photo la chaleur de la marque */}
          <div aria-hidden="true" className="absolute inset-0 hidden tone-warm lg:block" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_19_34/0.96)_0%,rgb(10_19_34/0.88)_45%,rgb(10_19_34/0.3)_72%,rgb(10_19_34/0.05)_100%)] lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-gradient-to-t from-navy-950/80 via-transparent via-40% to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-950/45 to-transparent"
          />
        </div>

        <Container className="relative flex flex-1 flex-col justify-end pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pb-24">
          <div className="max-w-[40rem]">
            <p className="hero-in mb-7 inline-flex items-center gap-4 label-caps text-gold-300">
              <span
                aria-hidden="true"
                className="hero-rule h-px w-12 bg-gold-400"
                style={{ ["--d" as string]: "200ms" }}
              />
              Transport, transit et logistique à Bamako
            </p>
            <h1
              id="hero-title"
              className="hero-in max-w-[16ch] text-[clamp(2.5rem,6.4vw,5rem)] leading-[0.98] font-normal tracking-[-0.032em] lg:max-w-[14ch] lg:text-[clamp(3.5rem,5.2vw,5.1rem)]"
              style={{ ["--d" as string]: "120ms" }}
            >
              Nous connectons les routes, les marchés et les <em className="text-gold-300 italic">opportunités</em>.
            </h1>
            <p
              className="hero-in mt-8 max-w-[34rem] border-l border-gold-400/50 pl-5 text-[1.05rem] leading-[1.7] text-navy-100 sm:text-lg"
              style={{ ["--d" as string]: "280ms" }}
            >
              Des solutions de transport, de transit et de logistique pensées pour accompagner vos ambitions au Mali et
              à l&apos;international.
            </p>
            <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "420ms" }}>
              <ButtonLink href="/services" size="lg">
                Découvrir nos solutions <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/devis" size="lg" variant="outlineLight">
                Demander un devis
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      {/* C. Bandeau de positionnement */}
      <nav id="positionnement" aria-label="Domaines d'expertise" className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl sm:px-8 lg:px-10">
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <li
                key={s.slug}
                className="border-white/10 max-lg:border-b max-lg:odd:border-r lg:border-l lg:last:border-r"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col gap-2 px-5 py-6 transition-colors hover:bg-white/[0.04] sm:px-7 sm:py-8"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-[1.25rem] leading-tight sm:text-[1.6rem]">{shortNames[i]}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-gold-400 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2 h-px w-8 bg-gold-400 transition-[width] duration-500 ease-[var(--ease-premium)] group-hover:w-16"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
}
