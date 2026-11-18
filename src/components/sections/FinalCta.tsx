import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { images } from "@/content/images";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export function FinalCta({
  title = "Vous avez un projet de transport ou de logistique ?",
  text = "Parlez-nous de vos besoins : nos équipes étudient votre projet et vous proposent une solution adaptée.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-20 lg:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900 px-6 py-14 shadow-lift sm:px-12 lg:px-16 lg:py-16">
          <Image
            src={images.portContainers.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-10 object-cover opacity-25"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/60" />
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-3xl leading-tight font-extrabold text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg text-navy-100">{text}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/devis" size="lg">
                Parlons de votre projet <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outlineLight">
                Nous contacter
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
