import Image from "next/image";
import { Check } from "lucide-react";
import { commitments } from "@/content/commitments";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CommitmentIconView } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Nos engagements : sécurité, délais, qualité",
  description:
    "Sécurité, respect des délais, qualité de service, transparence : découvrez les engagements de Madina Trans pour le transport de vos marchandises au Mali.",
  path: "/engagements",
});

export default function CommitmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos engagements"
        title="Des engagements concrets pour des opérations maîtrisées"
        intro="La confiance se construit opération après opération. Voici les principes qui guident notre travail au quotidien."
        image={images.truckSunset}
        crumbs={[{ label: "Nos engagements" }]}
      />

      <section aria-labelledby="engagements-list" className="py-20 lg:py-28">
        <Container>
          <h2 id="engagements-list" className="sr-only">
            Liste de nos engagements
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.id} delay={(i % 3) * 80}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lift">
                  <span
                    aria-hidden="true"
                    className="absolute top-6 right-7 font-display text-6xl font-extrabold text-navy-50 transition-colors group-hover:text-gold-100"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-navy-800 text-gold-300">
                    <CommitmentIconView name={c.icon} className="size-7" />
                  </span>
                  <h3 className="relative mt-6 text-xl font-bold text-navy-900">{c.title}</h3>
                  <p className="relative text-sm font-semibold text-gold-600">{c.subtitle}</p>
                  <p className="relative mt-4 leading-relaxed text-muted">{c.text}</p>
                  {c.points && (
                    <ul className="relative mt-5 space-y-2 border-t border-line pt-5">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[0.95rem] text-navy-800">
                          <Check
                            className="mt-0.5 size-4.5 shrink-0 text-gold-500"
                            strokeWidth={3}
                            aria-hidden="true"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="promise-title" className="bg-navy-950 py-20 text-white lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Notre promesse"
              title={<span id="promise-title">Votre marchandise, notre responsabilité</span>}
              intro="Nous considérons chaque expédition comme si elle était la nôtre. C'est cette exigence qui fonde la relation de confiance avec nos clients."
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
            <Image
              src={images.handshake.src}
              alt={images.handshake.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
