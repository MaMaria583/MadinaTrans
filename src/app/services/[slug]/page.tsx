import { Suspense } from "react";
import { PageLoading } from "@/components/ui/PageLoading";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, CircleDot } from "lucide-react";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${slug}` });
}

/**
 * Les paramètres d'URL sont lus dans une frontière <Suspense> : la navigation
 * reste instantanée (Cache Components). Les slugs connus sont pré-rendus au build.
 */
export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<PageLoading />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.tagline}
        title={service.title}
        intro={service.excerpt}
        image={service.image}
        crumbs={[{ label: "Nos services", href: "/services" }, { label: service.title }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/devis?service=${service.slug}`} size="lg">
            Demander un devis <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outlineLight">
            Poser une question
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="desc-title" className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Le service" title={<span id="desc-title">{service.tagline}</span>} />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              {service.description.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-mist p-6">
                <h3 className="text-lg font-bold text-navy-900">Les avantages</h3>
                <ul className="mt-4 space-y-3">
                  {service.advantages.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-navy-800">
                      <Check className="mt-0.5 size-5 shrink-0 text-gold-500" strokeWidth={3} aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-mist p-6">
                <h3 className="text-lg font-bold text-navy-900">Applications</h3>
                <ul className="mt-4 space-y-3">
                  {service.applications.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-navy-800">
                      <CircleDot className="mt-0.5 size-5 shrink-0 text-navy-400" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={service.secondaryImage.src}
                alt={service.secondaryImage.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="steps-title" className="bg-mist py-20 lg:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Notre méthode"
            title={<span id="steps-title">Comment nous procédons</span>}
          />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80} className="relative rounded-2xl bg-white p-7 shadow-card">
                <span className="font-display text-5xl font-extrabold text-gold-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <QuoteSection defaultService={service.slug} />

      <section aria-labelledby="others-title" className="py-20 lg:py-24">
        <Container>
          <h2 id="others-title" className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Découvrez nos autres services
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-line p-5 transition-all hover:border-gold-300 hover:shadow-card"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300">
                    <ServiceIcon name={s.icon} className="size-6" />
                  </span>
                  <span className="flex-1 font-bold text-navy-900">{s.title}</span>
                  <ArrowRight
                    className="size-5 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-600"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
