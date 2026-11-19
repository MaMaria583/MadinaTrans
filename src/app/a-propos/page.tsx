import Image from "next/image";
import Link from "next/link";
import { Compass, Gem, HeartHandshake, ShieldCheck, Target, Users } from "lucide-react";
import { DEMO_MODE, company, institutional, isConfirmed } from "@/config/site";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { DemoBadge } from "@/components/ui/DemoBadge";

export const metadata = pageMetadata({
  title: "Notre groupe — À propos de Madina Trans",
  description:
    "Madina Trans, société de transport et de logistique à Bamako : présentation, vision, mission, valeurs et expertise en transport de marchandises au Mali.",
  path: "/a-propos",
});

const valueIcons = [ShieldCheck, Target, HeartHandshake, Gem];

const quality = [
  "Analyse préalable de chaque demande",
  "Procédures de chargement et de sécurisation",
  "Suivi des opérations et information du client",
  "Contrôle à la livraison et retour d'expérience",
];

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
              index={1}
              eyebrow="Présentation"
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
        className="section-y-sm relative isolate overflow-clip bg-navy-950 text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-routes" />
        <Container>
          <h2 id="vision-title" className="sr-only">
            Vision et mission
          </h2>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {[
              { icon: Compass, title: "Notre vision", text: institutional.vision },
              { icon: Users, title: "Notre mission", text: institutional.mission },
            ].map((b, i) => (
              <Reveal
                key={b.title}
                delay={i * 100}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10"
              >
                <b.icon className="size-10 text-gold-400" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-bold">{b.title}</h3>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-navy-100 sm:text-lg">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Valeurs */}
      <section aria-labelledby="values-title" className="section-y">
        <Container>
          <SectionHeading
            align="center"
            index={2}
            eyebrow="Nos valeurs"
            id="values-title"
            title="Des valeurs qui guident chacune de nos actions"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
            {institutional.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <Reveal as="li" key={v.title} delay={i * 80} className="card card-hover p-7 text-center">
                  <span className="mx-auto inline-flex size-16 items-center justify-center rounded-2xl bg-navy-800 text-gold-300">
                    <Icon className="size-8" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-navy-900">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Expertise */}
      <section aria-labelledby="expertise-title" className="section-y bg-mist">
        <Container>
          <SectionHeading
            index={3}
            eyebrow="Notre expertise"
            id="expertise-title"
            title="Quatre métiers complémentaires"
            intro="Une offre intégrée pour gérer vos flux de bout en bout avec un interlocuteur unique."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 60}>
                <Link href={`/services/${s.slug}`} className="card card-hover flex h-full gap-5 p-6">
                  <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300">
                    <ServiceIcon name={s.icon} className="size-7" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-navy-900">{s.title}</span>
                    <span className="mt-1.5 block leading-relaxed text-muted">{s.excerpt}</span>
                  </span>
                </Link>
              </Reveal>
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
              index={4}
              eyebrow="Engagement qualité"
              id="quality-title"
              title="La qualité, à chaque étape de la chaîne"
              intro="Notre démarche qualité repose sur des pratiques simples, appliquées avec constance."
            />
            <ol className="mt-8 space-y-4">
              {quality.map((q, i) => (
                <li key={q} className="flex items-center gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display font-bold text-navy-950">
                    {i + 1}
                  </span>
                  <span className="text-[1.05rem] font-medium text-navy-900 sm:text-lg">{q}</span>
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
            <SectionHeading index={5} eyebrow="Galerie" id="gallery-title" title="Le transport en images" />
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

      <FinalCta />
    </>
  );
}
