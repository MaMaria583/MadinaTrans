import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeCommitments } from "@/content/commitments";
import { images } from "@/content/images";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { CommitmentIconView } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function CommitmentsStrip() {
  return (
    <section aria-labelledby="commitments-title" className="section-y bg-white">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              index={4}
              eyebrow="Nos engagements"
              id="commitments-title"
              title={
                <>
                  Nos engagements, <Highlight>votre satisfaction</Highlight>
                </>
              }
              intro="Quatre principes guident chacune de nos opérations, du premier contact à la livraison."
            />
            <Reveal className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-3xl shadow-lift lg:block">
              <Image
                src={images.truckHighway.src}
                alt={images.truckHighway.alt}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </Reveal>
            <Link
              href="/engagements"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-gold-600"
            >
              Découvrir tous nos engagements
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
          {homeCommitments.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              delay={i * 80}
              className="card card-hover group relative flex flex-col p-7 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute top-6 right-7 font-display text-5xl font-extrabold text-navy-50 transition-colors duration-500 group-hover:text-gold-100"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-navy-800 text-gold-300 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-950">
                <CommitmentIconView name={c.icon} className="size-7" />
              </span>
              <h3 className="relative mt-6 text-xl font-bold text-navy-900">{c.title}</h3>
              <p className="relative text-sm font-semibold text-gold-600">{c.subtitle}</p>
              <p className="relative mt-3 leading-relaxed text-muted">{c.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
