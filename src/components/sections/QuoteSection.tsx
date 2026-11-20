import { Phone, ShieldCheck } from "lucide-react";
import { contact, isConfirmed } from "@/config/site";
import { ContactValue } from "@/components/ui/ContactValue";
import { Container } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";

const points = [
  "Trois étapes, environ deux minutes",
  "Une proposition adaptée à votre besoin réel",
  "Un interlocuteur pour répondre à vos questions",
];

/**
 * J. Demande de devis — composition en deux volets :
 * panneau bleu nuit (intention) + formulaire en 3 étapes sur fond blanc.
 */
export function QuoteSection({
  withParams = false,
  headingLevel = "h2",
  defaultService = "",
  tone = "white",
}: {
  tone?: "white" | "ivory";
  withParams?: boolean;
  defaultService?: string;
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section
      id="devis"
      aria-labelledby="quote-title"
      className={tone === "ivory" ? "section-y bg-ivory" : "section-y bg-white"}
    >
      <Container>
        <div className="grid overflow-hidden rounded-sm border border-line shadow-lift lg:grid-cols-12">
          <div className="relative isolate flex flex-col overflow-clip bg-navy-900 p-7 text-white sm:p-10 lg:col-span-5 lg:p-14">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-routes" />
            {/* Halo champagne discret en haut à droite : profondeur du panneau */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-gold-400/10 blur-3xl"
            />
            <Heading
              id="quote-title"
              className="font-display text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.05] font-normal tracking-[-0.02em]"
            >
              Parlez-nous de votre <em className="text-gold-300 italic">projet</em>.
            </Heading>
            <p className="mt-5 leading-relaxed text-navy-100">
              Transport routier, transit, maritime ou logistique : décrivez votre besoin, nous vous proposons une
              solution adaptée.
            </p>
            <ul className="mt-8 space-y-3.5 border-t border-white/10 pt-7 lg:mt-10 lg:pt-8">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-navy-100">
                  <span aria-hidden="true" className="mt-2.5 h-px w-5 shrink-0 bg-gold-400" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm text-navy-200 lg:mt-auto lg:pt-7">
              <p className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-gold-400" aria-hidden="true" />
                Vos données servent uniquement à traiter votre demande.
              </p>
              {isConfirmed(contact.phone) && (
                <p className="flex flex-wrap items-center gap-2.5">
                  <Phone className="size-4 text-gold-400" aria-hidden="true" />
                  Une question ? <ContactValue kind="phone" className="font-semibold text-white" />
                </p>
              )}
            </div>
          </div>

          <div className="bg-white px-5 py-8 sm:p-10 lg:col-span-7 lg:p-14">
            <QuoteForm defaultService={defaultService} serviceFromUrl={withParams} />
          </div>
        </div>
      </Container>
    </section>
  );
}
