import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Clock, Info, Mail, MapPin, MapPinned, Phone } from "lucide-react";
import {
  DEMO_MODE,
  contact,
  isConfirmed,
  isDisplayable,
  mailHref,
  mapReady,
  telHref,
  whatsappHref,
} from "@/config/site";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Section";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { FICTIVE_LABEL, FICTIVE_TITLE } from "@/components/ui/ContactValue";
import { WhatsappIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Contact, société de transport à Bamako",
  description:
    "Contactez Madina Trans à Bamako pour vos besoins en transport routier, transit, affrètement maritime et logistique au Mali : téléphone, e-mail, formulaire.",
  path: "/contact",
});

/** Carte de contact : cliquable uniquement si l'information est confirmée. */
function ContactCard({
  icon,
  label,
  value,
  href,
  action,
  confirmed,
  external,
  badge = "À confirmer",
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  href: string | null;
  action?: string;
  confirmed: boolean;
  external?: boolean;
  /** Libellé du badge affiché quand l'information n'est pas confirmée. */
  badge?: string;
}) {
  const body = (
    <>
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-[0.8rem] font-semibold tracking-wide text-muted uppercase">
          {label} {!confirmed && <DemoBadge label={badge} />}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[1.05rem] font-bold [overflow-wrap:anywhere] sm:text-lg",
            confirmed ? "text-navy-900" : "text-navy-400",
          )}
          title={confirmed ? undefined : FICTIVE_TITLE}
        >
          {value}
          {!confirmed && <span className="sr-only"> (information non opérationnelle)</span>}
        </span>
        {href && action && <span className="mt-1 block text-sm font-semibold text-gold-700">{action} →</span>}
      </span>
    </>
  );
  const cls = cn(
    "group flex min-w-0 items-start gap-4 p-5 sm:p-6",
    "card",
    href && "card-hover",
    !confirmed && "border-dashed bg-white/95",
  );
  if (!href) return <div className={cls}>{body}</div>;
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  );
}

export default function ContactPage() {
  const tel = telHref();
  const mail = mailHref();
  const wa = whatsappHref();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        intro="Une question, un besoin de transport ou de logistique ? Nos équipes vous répondent et vous orientent vers la bonne solution."
        image={images.meeting}
        crumbs={[{ label: "Contact" }]}
        path="/contact"
        overlap
      />

      {/* Coordonnées en accès direct */}
      <section aria-labelledby="coords-title" className="relative z-10 -mt-10 sm:-mt-12">
        <Container>
          <h2 id="coords-title" className="sr-only">
            Nos coordonnées
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isDisplayable(contact.phone) && (
              <ContactCard
                icon={<Phone className="size-5" aria-hidden="true" />}
                label="Téléphone"
                value={contact.phone.value}
                href={tel}
                action="Appeler"
                confirmed={isConfirmed(contact.phone)}
                badge={FICTIVE_LABEL}
              />
            )}
            {isDisplayable(contact.email) && (
              <ContactCard
                icon={<Mail className="size-5" aria-hidden="true" />}
                label="E-mail"
                value={contact.email.value}
                href={mail}
                action="Écrire un e-mail"
                confirmed={isConfirmed(contact.email)}
                badge={FICTIVE_LABEL}
              />
            )}
            {(wa || DEMO_MODE) && (
              <ContactCard
                icon={<WhatsappIcon className="size-5" />}
                label="WhatsApp"
                value={wa ? "Discuter avec nous" : "Non configuré"}
                href={wa}
                action="Ouvrir WhatsApp"
                confirmed={!!wa}
                badge="À configurer"
                external
              />
            )}
            <ContactCard
              icon={<MapPin className="size-5" aria-hidden="true" />}
              label="Adresse"
              value={isConfirmed(contact.address) ? contact.address.value : contact.city.value}
              href={null}
              confirmed={isConfirmed(contact.address)}
            />
          </div>
          {DEMO_MODE && !(isConfirmed(contact.phone) && isConfirmed(contact.email)) && (
            <p
              role="note"
              className="mt-4 flex items-start gap-2.5 rounded-2xl border border-dashed border-gold-400/70 bg-gold-50/70 px-4 py-3 text-sm leading-relaxed text-navy-800"
            >
              <Info className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
              <span>
                <strong>Coordonnées de démonstration.</strong> Le téléphone et l&apos;e-mail affichés sont fictifs : ils
                ne permettent pas de joindre Madina Trans. Les coordonnées officielles seront intégrées après
                confirmation par l&apos;entreprise.
              </span>
            </p>
          )}
        </Container>
      </section>

      <section aria-label="Formulaire et localisation" className="section-y-sm">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="card p-5 sm:p-9">
              <p className="text-[0.78rem] font-bold tracking-[0.16em] text-gold-600 uppercase">
                Formulaire de contact
              </p>
              <h2 className="mt-2 text-2xl font-medium text-navy-900 sm:text-3xl">Envoyez-nous un message</h2>
              <p className="mt-2 mb-7 text-muted">
                Pour une demande de prix, utilisez plutôt notre{" "}
                <Link
                  href="/devis"
                  className="font-semibold text-navy-800 underline underline-offset-4 hover:text-gold-600"
                >
                  formulaire de devis
                </Link>{" "}
                en 3 étapes.
              </p>
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-5 lg:col-span-5">
            {/* Carte : uniquement après vérification de l'adresse */}
            {mapReady() ? (
              <div className="card overflow-hidden">
                <iframe
                  title="Localisation de Madina Trans"
                  src={contact.mapEmbedUrl.value}
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="relative flex min-h-64 flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.25rem] bg-navy-950 px-6 py-10 text-center text-white">
                <div aria-hidden="true" className="absolute inset-0 bg-routes" />
                <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-white/10 text-gold-400">
                  <MapPinned className="size-7" aria-hidden="true" />
                </span>
                <p className="relative font-bold">Bamako, Mali</p>
                <p className="relative max-w-xs text-sm text-navy-200">
                  La carte de localisation s&apos;affichera une fois l&apos;adresse exacte du siège vérifiée auprès de
                  Madina Trans.
                </p>
              </div>
            )}

            {isDisplayable(contact.openingHours) && (
              <div className="card flex items-start gap-4 p-5 sm:p-6">
                <Clock className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
                <div>
                  <p className="flex flex-wrap items-center gap-2 font-bold text-navy-900">
                    Horaires {!isConfirmed(contact.openingHours) && <DemoBadge />}
                  </p>
                  <p className="text-muted">{contact.openingHours.value}</p>
                </div>
              </div>
            )}

            <Link
              href="/devis"
              className="group flex items-center justify-between gap-4 rounded-[1.25rem] bg-gold-400 p-6 text-navy-950 transition-transform hover:-translate-y-0.5"
            >
              <span>
                <span className="block text-lg font-medium">Besoin d&apos;un devis ?</span>
                <span className="text-navy-900/80">Formulaire en 3 étapes, environ 2 minutes.</span>
              </span>
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-950 text-gold-300 transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-5" aria-hidden="true" />
              </span>
            </Link>
          </aside>
        </Container>
      </section>
    </>
  );
}
