import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Gem, HeartHandshake, ShieldCheck, Target, Users } from "lucide-react";
import { DEMO_MODE, company, institutional, isConfirmed } from "@/config/site";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ImmersiveBand } from "@/components/sections/ImmersiveBand";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { DemoBadge } from "@/components/ui/DemoBadge";

export const metadata = pageMetadata({
  title: "À propos : transport et logistique à Bamako",
  description:
    "Madina Trans, société de transport et de logistique à Bamako : présentation, vision, mission, valeurs et expertise en transport de marchandises au Mali.",
  path: "/a-propos",
});

const valueIcons = [ShieldCheck, Target, HeartHandshake, Gem];

const gallery = [
  images.deliveryVan,
  images.containerShip,
  images.warehouseAisles,
  images.truckSunset,
  images.portContainers,
  images.warehouseAerial,
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre groupe"
        title="Une expertise au service de vos ambitions"
        intro="Madina Trans accompagne les entreprises dans le transport, le transit, l'affrètement maritime et la logistique, au Mali et en Afrique."
        image={images.portAerial}
        crumbs={[{ label: "À propos" }]}
        path="/a-propos"
      />

      {/* Présentation */}
      <section aria-labelledby="presentation-title" className="section-y">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              id="presentation-title"
              title={
                <>
                  Madina Trans, votre partenaire <Highlight>transport</Highlight> et logistique
                </>
              }
            />
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted sm:text-lg">
              {institutional.presentation.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
            {DEMO_MODE && !isConfirmed(company.history) && (
              <div className="mt-7 rounded-2xl border border-dashed border-gold-400/70 bg-gold-50/60 p-5 text-sm text-navy-800">
                <p className="flex flex-wrap items-center gap-2 font-semibold">
                  Historique de l&apos;entreprise <DemoBadge />
                </p>
                <p className="mt-1.5 text-muted">
                  Date de création, étapes clés et réalisations seront intégrées à partir des informations officielles
                  fournies par Madina Trans. Aucun élément n&apos;a été inventé.
                </p>
              </div>
            )}
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={images.portCranes.src}
                alt={images.portCranes.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={images.truckTrailer.src}
                alt={images.truckTrailer.alt}
                fill
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={images.warehouse.src}
                alt={images.warehouse.alt}
                fill
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Vision & mission */}
      <section
        aria-labelledby="vision-title"
        className="section-y relative isolate overflow-clip bg-navy-950 text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-routes" />
        <Container>
          <h2 id="vision-title" className="sr-only">
            Vision et mission
          </h2>
          <div className="grid gap-14 md:grid-cols-2 md:gap-0">
            {[
              { icon: Compass, title: "Notre vision", text: institutional.vision },
              { icon: Users, title: "Notre mission", text: institutional.mission },
            ].map((b, i) => (
              <Reveal
                key={b.title}
                delay={i * 100}
                className="md:px-10 md:first:border-r md:first:border-white/10 md:first:pl-0 md:last:pr-0"
              >
                <p className="inline-flex items-center gap-3 label-caps text-gold-300">
                  <b.icon className="size-4" aria-hidden="true" />
                  {b.title}
                </p>
                <p className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.15rem)] leading-[1.3] font-normal text-white">
                  « {b.text} »
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Valeurs : typographie sur filets, pas de cartes identiques */}
      <section aria-labelledby="values-title" className="section-y">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            className="lg:col-span-4"
            size="md"
            id="values-title"
            title={
              <>
                Des valeurs qui guident <Highlight>chacune de nos actions</Highlight>
              </>
            }
          />
          <dl className="grid border-t border-navy-900/15 sm:grid-cols-2 lg:col-span-8">
            {institutional.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <Reveal
                  key={v.title}
                  delay={i * 60}
                  className="border-b border-navy-900/15 py-8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
                >
                  <dt className="flex items-center gap-3 font-display text-[1.7rem] leading-tight text-navy-900">
                    <Icon className="size-5 shrink-0 text-gold-600" strokeWidth={1.6} aria-hidden="true" />
                    {v.title}
                  </dt>
                  <dd className="mt-3 max-w-[36ch] leading-relaxed text-muted">{v.text}</dd>
                </Reveal>
              );
            })}
          </dl>
        </Container>
      </section>

      {/* Expertise : rangées éditoriales cliquables */}
      <section aria-labelledby="expertise-title" className="section-y bg-ivory">
        <Container>
          <SectionHeading
            id="expertise-title"
            title="Quatre métiers complémentaires"
            intro="Une offre intégrée pour gérer vos flux de bout en bout avec un interlocuteur unique."
          />
          <ul className="mt-12 border-t border-navy-900/15">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-navy-900/15">
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid items-baseline gap-2 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:gap-10"
                >
                  <span className="flex items-center gap-3 font-display text-[1.6rem] leading-tight text-navy-900 transition-colors duration-200 group-hover:text-gold-700 sm:text-[1.9rem]">
                    <ServiceIcon name={s.icon} className="size-5 shrink-0 text-gold-600" />
                    {s.title}
                  </span>
                  <span className="leading-relaxed text-muted">{s.excerpt}</span>
                  <ArrowUpRight
                    className="hidden size-5 text-navy-300 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-600 sm:block"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Engagement qualité */}
      <section aria-labelledby="quality-title" className="section-y">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={images.warehouseWorker.src}
              alt={images.warehouseWorker.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              id="quality-title"
              title="La qualité, à chaque étape de la chaîne"
              intro="Notre démarche qualité repose sur des pratiques simples, appliquées avec constance."
            />
            <ol className="mt-8 space-y-4">
              {institutional.qualityApproach.map((q, i) => (
                <li key={q.title} className="flex items-center gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display font-bold text-navy-950">
                    {i + 1}
                  </span>
                  <span className="text-[1.05rem] font-medium text-navy-900 sm:text-lg">{q.title}</span>
                </li>
              ))}
            </ol>
            {DEMO_MODE && (
              <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
                Certifications et agréments : publiés uniquement sur justificatifs. <DemoBadge />
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      {/* Galerie */}
      <section aria-labelledby="gallery-title" className="section-y bg-mist">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading id="gallery-title" title="Le transport en images" />
            <p className="max-w-sm text-sm text-muted">
              Visuels d&apos;illustration. Ils seront remplacés par les photographies officielles de la flotte et des
              équipes Madina Trans.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {gallery.map((img, i) => (
              <li
                key={img.src}
                className={
                  "group relative overflow-hidden rounded-2xl " +
                  (i === 0 ? "col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto" : "aspect-square")
                }
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ImmersiveBand image={images.portCranes} />
    </>
  );
}
