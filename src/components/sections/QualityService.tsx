import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { institutional, partners } from "@/config/site";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section institutionnelle : démarche qualité et promesse de service.
 * Remplace l'ancien espace « références » : aucun logo, aucun témoignage.
 * Les partenaires ne s'affichent que s'ils sont confirmés dans la configuration.
 */
export function QualityService() {
  return (
    <section aria-labelledby="quality-home-title" className="section-y border-y border-line bg-mist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Qualité de service"
              id="quality-home-title"
              title={
                <>
                  Une exigence de <Highlight>qualité</Highlight> à chaque étape
                </>
              }
              intro="Notre démarche repose sur des pratiques simples, appliquées avec constance à chaque opération, quelle que soit sa taille."
            />
            <figure className="mt-8 rounded-2xl bg-navy-950 p-6 text-white sm:p-7">
              <ShieldCheck className="size-8 text-gold-400" aria-hidden="true" />
              <blockquote className="mt-3 font-display text-lg leading-snug font-semibold">
                « Votre marchandise, notre responsabilité. »
              </blockquote>
              <figcaption className="mt-2 text-sm text-navy-200">
                Chaque expédition est traitée comme si elle était la nôtre.
              </figcaption>
            </figure>
            <Link
              href="/engagements"
              className="group mt-7 inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-gold-600"
            >
              Découvrir nos engagements
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <ol className="relative grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {institutional.qualityApproach.map((q, i) => (
              <Reveal as="li" key={q.title} delay={i * 80} className="card relative p-6 sm:p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-gold-400 font-display text-lg font-extrabold text-navy-950">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-900">{q.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{q.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Références clients : uniquement si confirmées et autorisées */}
        {partners.length > 0 && (
          <div className="mt-14">
            <h2 className="text-center text-sm font-bold tracking-[0.14em] text-muted uppercase">
              Ils nous font confiance
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {partners.map((p) => (
                <li key={p.name} className="card flex h-24 items-center justify-center p-4">
                  <Image src={p.logo} alt={p.name} width={160} height={64} className="max-h-14 w-auto object-contain" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
