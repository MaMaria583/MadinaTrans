import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MapPinned, Phone } from "lucide-react";
import { DEMO_MODE, contact, isConfirmed } from "@/config/site";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Section";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ContactValue } from "@/components/ui/ContactValue";
import { WhatsappIcon } from "@/components/ui/Icons";

export const metadata = pageMetadata({
  title: "Contact — Société de transport à Bamako",
  description:
    "Contactez Madina Trans, société de transport à Bamako, pour vos besoins en transport routier, transit, affrètement maritime et logistique au Mali.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappReady = isConfirmed(contact.whatsapp) && contact.whatsapp.value;
  const mapReady = isConfirmed(contact.address) && isConfirmed(contact.mapEmbedUrl) && contact.mapEmbedUrl.value;

  const items = [
    {
      icon: Phone,
      label: "Téléphone",
      content: <ContactValue kind="phone" className="hover:text-gold-600" />,
      confirmed: isConfirmed(contact.phone),
    },
    {
      icon: Mail,
      label: "E-mail",
      content: <ContactValue kind="email" className="break-all hover:text-gold-600" />,
      confirmed: isConfirmed(contact.email),
    },
    {
      icon: MapPin,
      label: "Adresse",
      content: <span>{isConfirmed(contact.address) ? contact.address.value : contact.city.value}</span>,
      confirmed: isConfirmed(contact.address),
    },
    {
      icon: Clock,
      label: "Horaires",
      content: <span>{contact.openingHours.value}</span>,
      confirmed: isConfirmed(contact.openingHours),
    },
  ].filter((i) => i.confirmed || DEMO_MODE || i.label === "Adresse");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        intro="Une question, un besoin de transport ou de logistique ? Nos équipes sont à votre écoute."
        image={images.meeting}
        crumbs={[{ label: "Contact" }]}
      />

      <section aria-label="Coordonnées et formulaire" className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="space-y-5 lg:col-span-5">
            <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">Nos coordonnées</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.label} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
                      {item.label} {!item.confirmed && <DemoBadge />}
                    </p>
                    <p className="mt-0.5 text-lg font-semibold text-navy-900">{item.content}</p>
                  </div>
                </li>
              ))}
            </ul>

            {whatsappReady ? (
              <a
                href={`https://wa.me/${contact.whatsapp.value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#1FAF54] px-5 font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <WhatsappIcon className="size-6" /> Écrire sur WhatsApp
              </a>
            ) : (
              DEMO_MODE && (
                <div className="flex items-center gap-3 rounded-2xl border border-dashed border-line bg-mist p-4 text-sm text-muted">
                  <WhatsappIcon className="size-6 shrink-0 text-[#1FAF54] opacity-60" />
                  <p>
                    Contact WhatsApp : disponible dès confirmation du numéro officiel. <DemoBadge />
                  </p>
                </div>
              )
            )}

            {/* Carte : uniquement après vérification de l'adresse */}
            {mapReady ? (
              <div className="overflow-hidden rounded-2xl border border-line">
                <iframe
                  title="Localisation de Madina Trans"
                  src={contact.mapEmbedUrl.value}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-navy-100 bg-mist px-6 py-10 text-center">
                <MapPinned className="size-10 text-navy-300" aria-hidden="true" />
                <p className="font-semibold text-navy-800">Carte de localisation</p>
                <p className="max-w-xs text-sm text-muted">
                  La carte sera affichée une fois l&apos;adresse exacte vérifiée auprès de Madina Trans.
                </p>
              </div>
            )}
          </aside>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-10">
              <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">Envoyez-nous un message</h2>
              <p className="mt-2 mb-8 text-muted">
                Pour une demande de prix, utilisez plutôt notre{" "}
                <Link
                  href="/devis"
                  className="font-semibold text-navy-800 underline underline-offset-4 hover:text-gold-600"
                >
                  formulaire de devis
                </Link>
                .
              </p>
              <ContactForm />
            </div>
            <Link
              href="/devis"
              className="group mt-6 flex items-center justify-between gap-4 rounded-2xl bg-navy-950 p-6 text-white transition-colors hover:bg-navy-900"
            >
              <span>
                <span className="block text-lg font-bold">Besoin d&apos;un devis ?</span>
                <span className="text-navy-200">Recevez une proposition adaptée à votre projet.</span>
              </span>
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-950 transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
