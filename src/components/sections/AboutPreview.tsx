import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const strengths = [
  "Sécurité des marchandises à chaque étape",
  "Respect des délais convenus",
  "Interlocuteur dédié et réactif",
  "Solutions adaptées à chaque secteur",
];

export function AboutPreview() {
  return (
    <section aria-labelledby="about-title" className="overflow-clip bg-mist py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={images.portContainers.src}
              alt={images.portContainers.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-8 hidden w-56 overflow-hidden rounded-2xl border-[6px] border-mist shadow-lift sm:block lg:-right-10">
            <div className="relative aspect-square">
              <Image
                src={images.warehouse.src}
                alt={images.warehouse.alt}
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute -top-5 -left-5 -z-0 hidden h-28 w-28 rounded-3xl border-2 border-dashed border-gold-400/60 sm:block"
          />
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading
            eyebrow="À propos de Madina Trans"
            title={<span id="about-title">Une expertise au service de vos ambitions</span>}
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Madina Trans est une entreprise malienne spécialisée dans le{" "}
              <strong className="text-navy-900">transport et la logistique</strong>. Depuis Bamako, elle accompagne les
              entreprises et les institutions dans l&apos;acheminement de leurs marchandises, au Mali comme à
              l&apos;international.
            </p>
            <p>
              Notre approche repose sur une conviction simple : chaque expédition mérite une organisation rigoureuse,
              une communication transparente et un engagement sans faille.
            </p>
          </div>

          <h3 className="mt-8 text-sm font-bold tracking-[0.12em] text-navy-800 uppercase">
            Domaines d&apos;expertise
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {services.map((s) => (
              <li
                key={s.slug}
                className="rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-800"
              >
                {s.title}
              </li>
            ))}
          </ul>

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

          <ButtonLink href="/a-propos" variant="navy" size="lg" className="mt-9">
            En savoir plus <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
