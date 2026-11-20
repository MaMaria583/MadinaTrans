import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/content/images";
import { Container, Highlight, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** D. Présentation éditoriale de Madina Trans : photographie forte + texte court. */
export function EditorialIntro() {
  return (
    <section aria-labelledby="intro-title" className="section-y overflow-clip bg-ivory">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-7">
          <div className="grain relative aspect-[5/4] overflow-hidden rounded-sm lg:-ml-[max(0px,calc((100vw_-_80rem)/2_+_2.5rem))] lg:aspect-[16/12]">
            <Image
              src={images.portTerminal.src}
              alt={images.portTerminal.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <figure className="absolute -bottom-8 left-6 max-w-[16rem] bg-navy-900 p-5 text-white shadow-lift sm:left-10 sm:p-6">
            <p className="label-caps text-gold-300">Depuis Bamako</p>
            <p className="mt-2 font-display text-xl leading-snug">
              Route, mer et entrepôt : <em className="text-gold-300 italic">une seule chaîne</em>.
            </p>
          </figure>
        </Reveal>

        <Reveal delay={120} className="pt-10 lg:col-span-5 lg:pt-0">
          <SectionHeading
            eyebrow="Madina Trans"
            id="intro-title"
            size="md"
            title={
              <>
                Une entreprise malienne au service de vos <Highlight>flux</Highlight>
              </>
            }
          />
          <p className="mt-6 text-[1.05rem] leading-[1.8] text-muted sm:text-lg">
            Madina Trans accompagne les entreprises et les institutions dans l&apos;acheminement de leurs marchandises :
            transport routier, transit, affrètement maritime et logistique. Notre conviction : chaque expédition mérite
            une organisation rigoureuse et une communication transparente.
          </p>
          <div className="rule-gold mt-9 w-24" />
          <Link
            href="/a-propos"
            className="group mt-6 inline-flex min-h-11 items-center gap-3 font-semibold text-navy-900"
          >
            <span className="link-underline">Découvrir Madina Trans</span>
            <ArrowRight
              className="size-4 text-gold-600 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
