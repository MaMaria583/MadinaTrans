import Image from "next/image";
import { ArrowRight, Check, Quote } from "lucide-react";
import { images } from "@/content/images";
import { institutional } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const strengths = [
  "Sécurité des marchandises à chaque étape",
  "Respect des délais convenus",
  "Interlocuteur dédié et réactif",
  "Solutions adaptées à chaque secteur",
];

export function AboutPreview() {
  return (
    <section aria-labelledby="about-title" className="section-y overflow-clip bg-mist">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Composition d'images */}
        <Reveal className="relative lg:col-span-6">
          <div className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4">
            <div className="relative col-span-4 row-span-6 aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={images.portTerminal.src}
                alt={images.portTerminal.alt}
                fill
                sizes="(min-width: 1024px) 34vw, 66vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-2xl">
              <Image
                src={images.warehouseRacks.src}
                alt={images.warehouseRacks.alt}
                fill
                sizes="(min-width: 1024px) 17vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 row-span-3 flex flex-col justify-end overflow-hidden rounded-2xl bg-navy-900 p-4 text-white sm:p-5">
              <div aria-hidden="true" className="absolute inset-0 bg-routes" />
              <span className="relative font-display text-[0.7rem] font-bold tracking-[0.14em] text-gold-300 uppercase sm:text-xs">
                Bamako · Mali
              </span>
              <span className="relative mt-1 font-display text-sm leading-tight font-bold sm:text-lg">
                Route · Mer · Entrepôt
              </span>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute -top-5 -left-5 -z-0 hidden h-28 w-28 rounded-3xl border-2 border-dashed border-gold-400/60 sm:block"
          />
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <SectionHeading
            index={3}
            eyebrow="À propos de Madina Trans"
            id="about-title"
            title={
              <>
                Une expertise au service de <Highlight>vos ambitions</Highlight>
              </>
            }
          />
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            <p>
              Madina Trans est une entreprise malienne spécialisée dans le{" "}
              <strong className="text-navy-900">transport et la logistique</strong>. Depuis Bamako, elle accompagne les
              entreprises et les institutions dans l&apos;acheminement de leurs marchandises, au Mali comme à
              l&apos;international.
            </p>
          </div>

          <figure className="mt-7 rounded-2xl border-l-4 border-gold-400 bg-white p-5 shadow-card sm:p-6">
            <Quote className="size-6 text-gold-500" aria-hidden="true" />
            <blockquote className="mt-2 font-display text-[1.05rem] leading-snug font-semibold text-navy-900 sm:text-lg">
              {institutional.mission}
            </blockquote>
            <figcaption className="mt-3 text-sm font-medium text-muted">Notre mission</figcaption>
          </figure>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {strengths.map((item) => (
              <li key={item} className="flex items-start gap-3 text-navy-900">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-gold-400 text-navy-950">
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/a-propos" variant="navy" size="lg">
              En savoir plus <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Rencontrer nos équipes
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
