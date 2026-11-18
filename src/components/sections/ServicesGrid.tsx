import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesGrid() {
  return (
    <section aria-labelledby="services-title" className="bg-white pt-20 pb-20 sm:pt-24 lg:pb-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Nos métiers"
            title={<span id="services-title">Des solutions complètes pour transporter vos marchandises</span>}
            intro="Quatre domaines d'expertise complémentaires pour accompagner vos flux, du premier kilomètre à la livraison finale."
          />
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-navy-800 underline-offset-4 hover:text-gold-600 hover:underline"
          >
            Tous nos services <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 80}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <span className="absolute bottom-0 left-6 inline-flex size-14 translate-y-1/2 items-center justify-center rounded-2xl bg-gold-400 text-navy-950 shadow-lg ring-4 ring-white">
                    <ServiceIcon name={s.icon} className="size-7" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-6 pt-11 pb-6">
                  <h3 className="text-xl font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{s.excerpt}</p>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-800 after:absolute after:inset-0 group-hover:text-gold-600"
                  >
                    Découvrir le service
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> : {s.title}</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
