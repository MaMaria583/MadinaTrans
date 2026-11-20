import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { images, type SiteImage } from "@/content/images";
import { Container } from "@/components/ui/Section";

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
  text = "Décrivez-nous votre besoin : nous étudions votre demande et vous proposons une organisation adaptée.",
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
        <Image src={image.src} alt="" fill sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 scrim-band md:hidden" />
        <div aria-hidden="true" className="absolute inset-0 hidden scrim-column md:block" />
      </div>
      <Container className="flex min-h-[32rem] flex-col justify-end py-20 md:justify-center lg:min-h-[38rem] lg:py-28">
        <p className="inline-flex items-center gap-3 label-caps text-gold-300">
          <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
          {eyebrow}
        </p>
        <p className="mt-6 max-w-[16ch] font-display text-[clamp(2.1rem,5.4vw,4.2rem)] leading-[1.03] font-normal tracking-[-0.025em]">
          {title}
        </p>
        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-navy-100 sm:text-lg">{text}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href={cta.href}
            className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-[3px] bg-gold-400 px-7 font-semibold text-navy-950 transition-colors hover:bg-gold-300"
          >
            {cta.label} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex min-h-13 items-center justify-center rounded-[3px] border border-white/40 px-7 font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy-950"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
