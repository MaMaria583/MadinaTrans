import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeCommitments } from "@/content/commitments";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CommitmentIconView } from "@/components/ui/Icons";

/**
 * G. Nos engagements — axes de positionnement (et non des garanties ni des
 * certifications). Composition éditoriale en grille à filets.
 */
export function CommitmentAxes() {
  return (
    <section aria-labelledby="axes-title" className="section-y bg-white">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
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
        </div>

        <ol className="grid border-t border-line sm:grid-cols-2 lg:col-span-8">
          {homeCommitments.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              delay={i * 90}
              className="group relative isolate border-b border-line py-10 sm:px-9 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0 lg:py-12"
            >
              {/* Filet or qui se trace sur la bordure haute au survol */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-x-100 sm:group-odd:right-9 sm:group-even:left-9"
              />
              <span
                aria-hidden="true"
                className="inline-flex size-12 items-center justify-center rounded-sm border border-gold-400/60 text-gold-600 transition-[background-color,color,border-color] duration-500 ease-[var(--ease-premium)] group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-gold-300"
              >
                <CommitmentIconView name={c.icon} className="size-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-7 font-display text-[1.75rem] leading-tight font-normal text-navy-900 sm:text-[2.05rem]">
                {c.title}
              </h3>
              <p className="mt-3 label-caps text-gold-700">{c.subtitle}</p>
              <p className="mt-5 max-w-sm text-[1.02rem] leading-relaxed text-muted">{c.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
