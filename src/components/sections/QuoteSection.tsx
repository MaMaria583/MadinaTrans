import { Calculator, CircleCheck, Clock, Phone } from "lucide-react";
import { contact, isConfirmed, isDisplayable } from "@/config/site";
import { ContactValue } from "@/components/ui/ContactValue";
import { Container, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { DemoBadge } from "@/components/ui/DemoBadge";

const steps = [
  {
    icon: Calculator,
    title: "Décrivez votre besoin",
    text: "Quelques informations suffisent pour étudier votre demande.",
  },
  {
    icon: Clock,
    title: "Nous analysons",
    text: "Nos équipes étudient votre demande et la faisabilité de l'opération.",
  },
  {
    icon: CircleCheck,
    title: "Recevez votre offre",
    text: "Une proposition claire et détaillée, adaptée à votre projet.",
  },
];

export function QuoteSection({
  withParams = false,
  headingLevel = "h2",
  defaultService = "",
}: {
  withParams?: boolean;
  defaultService?: string;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <section id="devis" aria-labelledby="quote-title" className="relative overflow-clip bg-navy-950 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 size-[32rem] rounded-full bg-navy-700/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-32 size-[28rem] rounded-full bg-gold-500/10 blur-3xl"
      />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            light
            as={headingLevel}
            eyebrow="Demande de devis"
            title={<span id="quote-title">Obtenez un devis personnalisé pour votre transport</span>}
            intro="Transport routier, transit, maritime ou logistique : décrivez votre projet, nous vous proposons une solution adaptée."
          />
          <ol className="mt-10 space-y-6">
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
          {isDisplayable(contact.phone) && (
            <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <Phone className="size-5 text-gold-400" aria-hidden="true" />
              <p className="text-navy-100">
                Une question ? <ContactValue kind="phone" className="font-semibold text-white" />
              </p>
              {!isConfirmed(contact.phone) && <DemoBadge tone="dark" />}
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white p-6 shadow-lift sm:p-9">
            <QuoteForm defaultService={defaultService} serviceFromUrl={withParams} />
          </div>
        </div>
      </Container>
    </section>
  );
}
