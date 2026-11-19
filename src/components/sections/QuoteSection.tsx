import { ClipboardList, MessagesSquare, FileSignature, Phone, ShieldCheck } from "lucide-react";
import { contact, isConfirmed, isDisplayable } from "@/config/site";
import { ContactValue } from "@/components/ui/ContactValue";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { DemoBadge } from "@/components/ui/DemoBadge";

const steps = [
  {
    icon: ClipboardList,
    title: "Vous décrivez votre besoin",
    text: "Service, trajet, marchandise : trois étapes suffisent.",
  },
  {
    icon: MessagesSquare,
    title: "Nous étudions votre demande",
    text: "Nos équipes analysent la faisabilité et reviennent vers vous si besoin.",
  },
  {
    icon: FileSignature,
    title: "Vous recevez une proposition",
    text: "Une offre claire et détaillée, adaptée à votre projet.",
  },
];

export function QuoteSection({
  withParams = false,
  headingLevel = "h2",
  defaultService = "",
  index,
}: {
  withParams?: boolean;
  defaultService?: string;
  headingLevel?: "h1" | "h2";
  index?: number;
}) {
  return (
    <section id="devis" aria-labelledby="quote-title" className="section-y relative isolate overflow-clip bg-navy-950">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-routes" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full bg-navy-700/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-32 -z-10 size-[28rem] rounded-full bg-gold-500/10 blur-3xl"
      />
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            light
            as={headingLevel}
            index={index}
            eyebrow="Demande de devis"
            id="quote-title"
            title={
              <>
                Obtenez un devis <Highlight light>personnalisé</Highlight> pour votre transport
              </>
            }
            intro="Transport routier, transit, maritime ou logistique : décrivez votre projet, nous vous proposons une solution adaptée."
          />
          <ol className="mt-10 hidden space-y-6 sm:block">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/8 text-gold-400 ring-1 ring-white/10">
                  <s.icon className="size-6" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 inline-flex size-5 items-center justify-center rounded-full bg-gold-400 text-[0.7rem] font-bold text-navy-950">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <p className="font-bold text-white">{s.title}</p>
                  <p className="text-navy-200">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="mt-8 space-y-3 text-sm text-navy-100 sm:mt-10">
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-gold-400" aria-hidden="true" />
              Vos données servent uniquement à traiter votre demande.
            </li>
            {isDisplayable(contact.phone) && (
              <li className="flex flex-wrap items-center gap-2.5">
                <Phone className="size-4 text-gold-400" aria-hidden="true" />
                Une question ? <ContactValue kind="phone" className="font-semibold text-white" />
                {!isConfirmed(contact.phone) && <DemoBadge tone="dark" />}
              </li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white p-5 shadow-lift sm:p-9">
            <QuoteForm defaultService={defaultService} serviceFromUrl={withParams} />
          </div>
        </div>
      </Container>
    </section>
  );
}
