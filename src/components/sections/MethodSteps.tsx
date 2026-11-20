import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** I. Notre méthode de travail — les grandes étapes d'une demande de transport. */
const steps = [
  {
    title: "Expression du besoin",
    text: "Vous décrivez votre projet : nature de la marchandise, trajet, volumes, délais et contraintes.",
  },
  {
    title: "Étude de la demande",
    text: "Nos équipes analysent la faisabilité, les moyens nécessaires et reviennent vers vous si besoin.",
  },
  {
    title: "Proposition chiffrée",
    text: "Vous recevez une proposition claire et détaillée, construite à partir de votre besoin réel.",
  },
  {
    title: "Organisation et suivi",
    text: "Une fois validée, l'opération est organisée et vous êtes informé de son avancement.",
  },
];

export function MethodSteps() {
  return (
    <section aria-labelledby="method-title" className="section-y bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="Notre méthode"
          id="method-title"
          title={
            <>
              Une demande, <Highlight>quatre étapes</Highlight>
            </>
          }
          intro="Un processus simple et lisible, pour que vous sachiez à chaque instant où en est votre projet."
        />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 90}
              className="group relative bg-ivory p-7 transition-colors duration-500 hover:bg-white sm:p-8"
            >
              <span className="font-display text-[3.5rem] leading-none font-normal text-gold-400 transition-colors duration-500 group-hover:text-gold-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
