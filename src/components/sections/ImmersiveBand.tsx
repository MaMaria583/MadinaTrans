import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { images, type SiteImage } from "@/content/images";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * H. Composition photographique pleine largeur avec accroche et appel à l'action.
 * Réutilisée en fin de page sur les pages internes.
 */
export function ImmersiveBand({
  image = images.containerShipAerial,
  eyebrow = "Votre prochaine expédition",
  title = (
    <>
      Vos marchandises méritent un partenaire à la hauteur de <em className="text-gold-300 italic">vos ambitions</em>.
    </>
  ),
  text = "Décrivez-nous votre besoin : nous étudions votre demande et vous proposons une organisation adaptée.",
  cta = { href: "/devis", label: "Demander un devis" },
  secondary = { href: "/contact", label: "Nous contacter" },
}: {
  image?: SiteImage;
  eyebrow?: string;
  title?: ReactNode;
  text?: string;
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section aria-label={eyebrow} className="relative isolate overflow-clip bg-navy-950 text-white">
      <div className="grain absolute inset-0 -z-10">
        {/* Parallaxe douce : la photo glisse plus lentement que la page */}
        <div className="parallax-media absolute inset-0">
          <Image src={image.src} alt="" fill sizes="100vw" className="photo-grade object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 tone-warm" />
        <div aria-hidden="true" className="absolute inset-0 scrim-band md:hidden" />
        <div aria-hidden="true" className="absolute inset-0 hidden scrim-column md:block" />
      </div>
      <Container className="flex min-h-[34rem] flex-col justify-end py-20 md:justify-center lg:min-h-[42rem] lg:py-32">
        <Reveal className="max-w-[44rem]">
          <p className="inline-flex items-center gap-4 label-caps text-gold-300">
            <Reveal kind="rule" as="span" delay={200} className="h-px w-12 bg-gold-400" />
            {eyebrow}
          </p>
          <p className="mt-7 max-w-[16ch] font-display text-[clamp(2.2rem,5.4vw,4.3rem)] leading-[1.02] font-normal tracking-[-0.028em]">
            {title}
          </p>
          <p className="mt-7 max-w-xl border-l border-gold-400/50 pl-5 text-[1.05rem] leading-relaxed text-navy-100 sm:text-lg">
            {text}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={cta.href} size="lg">
              {cta.label} <ArrowRight aria-hidden="true" />
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} size="lg" variant="outlineLight">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
