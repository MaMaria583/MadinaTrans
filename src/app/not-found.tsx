import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="bg-mist py-24 lg:py-32">
      <Container className="max-w-2xl text-center">
        <p className="font-display text-7xl font-extrabold text-gold-400">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-navy-900 sm:text-4xl">
          Cette page a changé d&apos;itinéraire
        </h1>
        <p className="mt-4 text-lg text-muted">La page demandée n&apos;existe pas ou a été déplacée.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="navy" size="lg">
            Retour à l&apos;accueil
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            Nos services <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
