import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { contact, telHref, whatsappHref } from "@/config/site";
import { images } from "@/content/images";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { WhatsappIcon } from "@/components/ui/Icons";

export function FinalCta({
  title = "Vous avez un projet de transport ou de logistique ?",
  text = "Parlez-nous de vos besoins : nos équipes étudient votre projet et vous proposent une solution adaptée.",
}: {
  title?: string;
  text?: string;
}) {
  const tel = telHref();
  const wa = whatsappHref();

  return (
    <section aria-labelledby="cta-title" className="section-y-sm bg-white">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 shadow-lift sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <Image
            src={images.containerStack.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-10 object-cover opacity-30"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-900/60" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-routes" />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gold-400" />

          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-[clamp(1.7rem,4vw,2.5rem)] leading-tight font-extrabold text-white">
                {title}
              </h2>
              <p className="mt-4 text-[1.05rem] text-navy-100 sm:text-lg">{text}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/devis" size="lg">
                Parlons de votre projet <ArrowRight aria-hidden="true" />
              </ButtonLink>
              {tel ? (
                <a
                  href={tel}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/35 px-7 font-semibold text-white hover:bg-white/10"
                >
                  <Phone className="size-4" aria-hidden="true" /> {contact.phone.value}
                </a>
              ) : wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/35 px-7 font-semibold text-white hover:bg-white/10"
                >
                  <WhatsappIcon className="size-5" /> WhatsApp
                </a>
              ) : (
                <ButtonLink href="/contact" size="lg" variant="outlineLight">
                  Nous contacter
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
