import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeCommitments } from "@/content/commitments";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CommitmentIconView } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function CommitmentsStrip() {
  return (
    <section aria-labelledby="commitments-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Nos engagements"
          title={<span id="commitments-title">Nos engagements, votre satisfaction</span>}
          intro="Quatre principes guident chacune de nos opérations, du premier contact à la livraison."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeCommitments.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:border-gold-300 hover:shadow-card">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-800 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-gold-300">
                  <CommitmentIconView name={c.icon} className="size-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{c.title}</h3>
                <p className="text-sm font-semibold text-gold-600">{c.subtitle}</p>
                <p className="mt-3 leading-relaxed text-muted">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link
            href="/engagements"
            className="inline-flex items-center gap-2 font-semibold text-navy-800 underline-offset-4 hover:text-gold-600 hover:underline"
          >
            Découvrir tous nos engagements <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
