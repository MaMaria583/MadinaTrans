import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { Container } from "@/components/ui/Section";

const shortNames = ["Transport routier", "Transit", "Maritime", "Logistique"];

/**
 * Hero cinématographique plein cadre + bandeau de positionnement.
 * Visuel d'illustration (ne représente pas la flotte de Madina Trans).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative isolate flex min-h-[min(88svh,860px)] flex-col overflow-clip bg-navy-950 text-white">
        <div className="grain absolute inset-0 -z-10">
          <Image
            src={images.truckSunset.src}
            alt={images.truckSunset.alt}
            fill
            preload
            quality={85}
            sizes="100vw"
            className="animate-slow-zoom object-cover object-[58%_70%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 via-35% to-navy-950/40" />
        </div>

        <Container className="relative flex flex-1 flex-col justify-end pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pb-20">
          <p className="mb-7 inline-flex items-center gap-3 label-caps text-gold-300">
            <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
            Transport · Transit · Logistique — Bamako
          </p>
          <h1
            id="hero-title"
            className="max-w-[17ch] animate-fade-up text-[clamp(2.6rem,7.2vw,5.9rem)] leading-[0.98] font-normal tracking-[-0.03em]"
          >
            Nous connectons les routes, les marchés et les <em className="text-gold-300 italic">opportunités</em>.
          </h1>
          <div
            className="mt-9 flex animate-fade-up flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            style={{ animationDelay: "150ms" }}
          >
            <p className="max-w-xl text-[1.05rem] leading-[1.7] text-navy-100 sm:text-lg">
              Des solutions de transport, de transit et de logistique pensées pour accompagner vos ambitions au Mali et
              à l&apos;international.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-[3px] bg-gold-400 px-7 font-semibold text-navy-950 transition-colors hover:bg-gold-300"
              >
                Découvrir nos solutions <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/devis"
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-[3px] border border-white/40 px-7 font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy-950"
              >
                Demander un devis
              </Link>
            </div>
          </div>
          <div className="mt-12 hidden items-center justify-between border-t border-white/15 pt-5 text-sm text-navy-200 sm:flex">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold-400" aria-hidden="true" /> Bamako, Mali — vers la sous-région et
              l&apos;international
            </span>
            <a href="#positionnement" className="inline-flex items-center gap-2 hover:text-white">
              Défiler <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
            </a>
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
                  <span className="font-display text-sm text-gold-400 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[1.25rem] leading-tight sm:text-[1.6rem]">{shortNames[i]}</span>
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
