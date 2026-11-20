import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeCommitments } from "@/content/commitments";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * G. Nos engagements — axes de positionnement (et non des garanties ni des
 * certifications). Composition éditoriale en grille à filets.
 */
export function CommitmentAxes() {
  return (
    <section aria-labelledby="axes-title" className="section-y bg-white">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="axes-title"
            size="md"
            title={
              <>
                Quatre axes qui guident <Highlight>chaque opération</Highlight>
              </>
            }
            intro="Quatre repères concrets pour chaque opération, de la demande à la livraison."
          />
          <Link
            href="/engagements"
            className="group mt-8 inline-flex min-h-11 items-center gap-3 font-semibold text-navy-900"
          >
            <span className="link-underline">Nos engagements en détail</span>
            <ArrowRight
              className="size-4 text-gold-600 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ol className="grid border-t border-line sm:grid-cols-2 lg:col-span-8">
          {homeCommitments.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              delay={i * 80}
              className="group border-b border-line py-9 sm:px-8 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[1.6rem] leading-tight font-normal text-navy-900 sm:text-[1.9rem]">
                  {c.title}
                </h3>
              </div>
              <p className="mt-2 label-caps text-navy-400">{c.subtitle}</p>
              <p className="mt-4 max-w-sm leading-relaxed text-muted">{c.text}</p>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-10 bg-gold-400 transition-[width] duration-700 ease-[var(--ease-premium)] group-hover:w-24"
              />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
