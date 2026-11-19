import Image from "next/image";
import { ArrowRight, Check, CircleDot } from "lucide-react";
import { showServiceDetails, type Service } from "@/content/services";
import { ServiceScopeNotice } from "@/components/ui/ServiceScopeNotice";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

/** Bloc de présentation détaillée d'un service (page Services). */
export function ServiceDetail({ service, reverse = false }: { service: Service; reverse?: boolean }) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal className={"relative " + (reverse ? "lg:order-2" : "")}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <span className="absolute -bottom-6 left-6 inline-flex size-16 items-center justify-center rounded-2xl bg-gold-400 text-navy-950 shadow-lg ring-8 ring-white">
          <ServiceIcon name={service.icon} className="size-8" />
        </span>
      </Reveal>

      <Reveal delay={100}>
        <p className="text-sm font-bold tracking-[0.12em] text-gold-600 uppercase">{service.tagline}</p>
        <h2 id={`${service.slug}-title`} className="mt-2 text-3xl font-medium text-navy-900 sm:text-4xl">
          {service.title}
        </h2>
        {showServiceDetails(service) ? (
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            {service.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        ) : (
          <p className="mt-5 leading-relaxed text-muted">{service.excerpt}</p>
        )}
        <ServiceScopeNotice service={service} className="mt-5" />

        {showServiceDetails(service) && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-bold text-navy-900">Les avantages</h3>
              <ul className="mt-3 space-y-2.5">
                {service.advantages.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-[0.95rem] text-navy-800">
                    <Check className="mt-0.5 size-4.5 shrink-0 text-gold-500" strokeWidth={3} aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-navy-900">Applications</h3>
              <ul className="mt-3 space-y-2.5">
                {service.applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-[0.95rem] text-navy-800">
                    <CircleDot className="mt-0.5 size-4.5 shrink-0 text-navy-400" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/devis?service=${service.slug}`}>
            Demander un devis <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={`/services/${service.slug}`} variant="outline">
            Voir le détail du service
          </ButtonLink>
        </div>
      </Reveal>
    </article>
  );
}
