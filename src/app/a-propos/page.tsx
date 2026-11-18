import Image from "next/image";
import { Compass, Gem, HeartHandshake, ShieldCheck, Target, Users } from "lucide-react";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { DemoBadge } from "@/components/ui/DemoBadge";

export const metadata = pageMetadata({
  title: "Notre groupe — À propos de Madina Trans",
  description:
    "Découvrez Madina Trans, société de transport à Bamako spécialisée dans le transport de marchandises, le transit, l'affrètement maritime et la logistique au Mali.",
  path: "/a-propos",
});

const values = [
  { icon: ShieldCheck, title: "Intégrité", text: "Des engagements tenus et une relation fondée sur la confiance." },
  {
    icon: Target,
    title: "Rigueur",
    text: "Une organisation méthodique pour chaque opération, quelle que soit sa taille.",
  },
  { icon: HeartHandshake, title: "Proximité", text: "Une écoute attentive et un dialogue permanent avec nos clients." },
  { icon: Gem, title: "Excellence", text: "La recherche constante de la qualité dans chacun de nos services." },
];

const quality = [
  "Analyse préalable de chaque demande",
  "Procédures de chargement et de sécurisation",
  "Suivi des opérations et information du client",
  "Contrôle à la livraison et retour d'expérience",
];

const gallery = [
  images.truckHighway,
  images.portContainers,
  images.warehouseRacks,
  images.truckSunset,
  images.containersAerial,
  images.parcels,
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre groupe"
        title="Une expertise au service de vos ambitions"
        intro="Madina Trans accompagne les entreprises dans le transport, le transit, l'affrètement maritime et la logistique, au Mali et en Afrique."
        image={images.containersAerial}
        crumbs={[{ label: "À propos" }]}
      />

      {/* Présentation */}
      <section aria-labelledby="presentation-title" className="py-20 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Présentation"
              title={<span id="presentation-title">Madina Trans, votre partenaire transport et logistique</span>}
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Basée à Bamako, Madina Trans est une entreprise malienne qui intervient dans l&apos;ensemble de la
                chaîne du transport de marchandises : transport routier, transit, affrètement maritime, logistique et
                distribution.
              </p>
              <p>
                Pour un pays sans littoral comme le Mali, la maîtrise de la chaîne de transport est un enjeu majeur de
                développement économique. Madina Trans met son savoir-faire au service des entreprises, des commerçants
                et des institutions qui ont besoin de solutions fiables pour acheminer leurs marchandises.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-gold-400/70 bg-gold-50/60 p-5 text-sm text-navy-800">
              <p className="flex flex-wrap items-center gap-2 font-semibold">
                Historique de l&apos;entreprise <DemoBadge />
              </p>
              <p className="mt-1.5 text-muted">
                Date de création, étapes clés et réalisations seront intégrées à partir des informations officielles
                fournies par Madina Trans. Aucun élément n&apos;a été inventé.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
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
      <section aria-labelledby="vision-title" className="bg-navy-950 py-20 text-white lg:py-24">
        <Container>
          <h2 id="vision-title" className="sr-only">
            Vision et mission
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
              <Compass className="size-10 text-gold-400" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-bold">Notre vision</h3>
              <p className="mt-3 text-lg leading-relaxed text-navy-100">
                Contribuer au développement économique du Mali et de l&apos;Afrique de l&apos;Ouest en rendant les
                échanges de marchandises plus simples, plus sûrs et plus efficaces.
              </p>
            </Reveal>
            <Reveal delay={100} className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
              <Users className="size-10 text-gold-400" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-bold">Notre mission</h3>
              <p className="mt-3 text-lg leading-relaxed text-navy-100">
                Offrir à chaque client une solution de transport et de logistique adaptée à ses besoins, avec un
                accompagnement personnalisé, une communication transparente et le respect des engagements pris.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Valeurs */}
      <section aria-labelledby="values-title" className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Nos valeurs"
            title={<span id="values-title">Des valeurs qui guident chacune de nos actions</span>}
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 80} className="rounded-2xl bg-mist p-7 text-center">
                <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-white text-navy-800 shadow-card">
                  <v.icon className="size-8" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy-900">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Expertise */}
      <section aria-labelledby="expertise-title" className="bg-mist py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Notre expertise"
            title={<span id="expertise-title">Quatre métiers complémentaires</span>}
            intro="Une offre intégrée pour gérer vos flux de bout en bout avec un interlocuteur unique."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 60} className="flex gap-5 rounded-2xl bg-white p-6 shadow-card">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300">
                  <ServiceIcon name={s.icon} className="size-7" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{s.excerpt}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Engagement qualité */}
      <section aria-labelledby="quality-title" className="py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={images.logisticsWorker.src}
              alt={images.logisticsWorker.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Engagement qualité"
              title={<span id="quality-title">La qualité, à chaque étape de la chaîne</span>}
              intro="Notre démarche qualité repose sur des pratiques simples, appliquées avec constance."
            />
            <ol className="mt-8 space-y-4">
              {quality.map((q, i) => (
                <li key={q} className="flex items-center gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display font-bold text-navy-950">
                    {i + 1}
                  </span>
                  <span className="text-lg font-medium text-navy-900">{q}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
              Certifications et agréments : à renseigner uniquement sur justificatifs. <DemoBadge />
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Galerie */}
      <section aria-labelledby="gallery-title" className="bg-mist py-20 lg:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Galerie" title={<span id="gallery-title">Le transport en images</span>} />
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
                  (i === 0 ? "col-span-2 row-span-2 aspect-square lg:col-span-2 lg:aspect-auto" : "aspect-square")
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
