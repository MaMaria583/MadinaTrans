import { ShieldCheck, Timer, UserCheck } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Container } from "@/components/ui/Section";

export const metadata = pageMetadata({
  title: "Demande de devis transport et logistique",
  description:
    "Demandez un devis à Madina Trans pour votre transport de marchandises au Mali : transport routier, transit, affrètement maritime ou logistique.",
  path: "/devis",
});

const reassurance = [
  {
    icon: Timer,
    title: "Réponse rapide",
    text: "Votre demande est étudiée par nos équipes dans les meilleurs délais.",
  },
  { icon: UserCheck, title: "Interlocuteur dédié", text: "Un conseiller suit votre dossier du devis à la livraison." },
  {
    icon: ShieldCheck,
    title: "Données protégées",
    text: "Vos informations servent uniquement à traiter votre demande.",
  },
];

export default function QuotePage() {
  return (
    <>
      <QuoteSection withParams headingLevel="h1" tone="ivory" />
      <section aria-label="Nos garanties" className="py-16">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {reassurance.map((r) => (
              <li key={r.title} className="flex gap-4 rounded-2xl bg-mist p-6">
                <r.icon className="size-8 shrink-0 text-gold-600" aria-hidden="true" />
                <div>
                  <p className="font-bold text-navy-900">{r.title}</p>
                  <p className="mt-1 text-muted">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
