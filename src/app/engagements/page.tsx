import Image from "next/image";
import { commitments } from "@/content/commitments";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ImmersiveBand } from "@/components/sections/ImmersiveBand";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { CommitmentIconView } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Nos engagements : sécurité, délais, qualité",
  description:
    "Sécurité, respect des délais, qualité de service, transparence : découvrez les engagements de Madina Trans pour le transport de vos marchandises au Mali.",
  path: "/engagements",
});

/**
 * Page Engagements — composition éditoriale en lignes (numéro, titre, texte,
 * points d'attention). Ce sont des principes de travail, pas des garanties
 * contractuelles ni des certifications.
 */
export default function CommitmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos engagements"
        title={
          <>
            Des principes clairs pour des opérations <em className="text-gold-300 italic">maîtrisées</em>
          </>
        }
        intro="La confiance se construit opération après opération. Voici les principes qui guident notre travail au quotidien."
        image={images.truckTrailer}
        crumbs={[{ label: "Nos engagements" }]}
        path="/engagements"
      />

      <section aria-labelledby="engagements-list" className="section-y bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <SectionHeading
              className="lg:col-span-5"
              eyebrow="Six principes"
              id="engagements-list"
              size="md"
              title={
                <>
                  Ce qui guide <Highlight>notre manière de travailler</Highlight>
                </>
              }
            />
            <p className="self-end leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
              Ces engagements décrivent notre approche. Ils ne constituent ni des garanties contractuelles, ni des
              certifications : les conditions de chaque opération sont précisées dans la proposition commerciale.
            </p>
          </div>

          <ol className="mt-14 border-t border-navy-900/15">
            {commitments.map((c, i) => (
              <Reveal
                as="li"
                key={c.id}
                className="group grid gap-6 border-b border-navy-900/15 py-10 lg:grid-cols-12 lg:gap-10 lg:py-12"
              >
                <div className="flex min-w-0 items-start gap-4 sm:gap-5 lg:col-span-5">
                  <span className="font-display text-[2rem] leading-none text-gold-500 tabular-nums sm:text-[2.6rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight font-normal [overflow-wrap:anywhere] hyphens-auto text-navy-900 sm:text-[1.9rem]">
                      {c.title}
                    </h3>
                    <p className="mt-2 label-caps text-navy-400">{c.subtitle}</p>
                  </div>
                </div>
                <p className="leading-[1.8] text-muted lg:col-span-4">{c.text}</p>
                {c.points && (
                  <ul className="space-y-2.5 lg:col-span-3">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[0.95rem] text-navy-800">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-gold-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="promise-title" className="section-y overflow-clip bg-ivory">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="grain relative aspect-[4/3] overflow-hidden rounded-sm lg:col-span-6">
            <Image
              src={images.handshake.src}
              alt={images.handshake.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Notre promesse"
              id="promise-title"
              title={
                <>
                  Votre marchandise, <Highlight>notre responsabilité</Highlight>
                </>
              }
              intro="Nous traitons chaque expédition comme si elle était la nôtre. C'est cette exigence qui fonde la relation de confiance avec nos clients."
            />
            <ul className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {commitments.slice(0, 3).map((c) => (
                <li key={c.id} className="flex flex-col gap-3">
                  <CommitmentIconView name={c.icon} className="size-6 text-gold-600" strokeWidth={1.6} />
                  <span className="font-semibold text-navy-900">{c.title.replace(/^(La |Le |Les |L')/, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ImmersiveBand image={images.containerShip} />
    </>
  );
}
