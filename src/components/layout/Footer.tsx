import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { DEMO_MODE, agency, company, contact, isConfirmed, isDisplayable, siteMeta, socialLinks } from "@/config/site";
import { services } from "@/content/services";
import { imageCreditNote } from "@/content/images";
import { Container } from "@/components/ui/Section";
import { FooterInvite } from "./FooterInvite";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ContactValue } from "@/components/ui/ContactValue";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/Icons";

const socialIcon = {
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
};

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 border-b border-white/10 pb-4 label-caps text-gold-300">{children}</h2>;
}

const linkCls =
  "inline-block py-1.5 text-navy-200 transition-colors duration-300 hover:text-white focus-visible:text-white link-underline";

export function Footer() {
  const configuredSocials = socialLinks.filter((s) => isConfirmed(s.url) && s.url.value);

  return (
    <footer className="relative isolate overflow-clip bg-navy-950 text-navy-100">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-routes opacity-60" />

      {/* Bandeau d'invitation */}
      <FooterInvite>
        <Container className="border-b border-white/10 py-16 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="label-caps text-gold-300">Madina Trans · Bamako, Mali</p>
              <p className="mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] font-normal tracking-[-0.02em] text-white">
                Parlons de votre <em className="text-gold-300 italic">prochaine expédition</em>.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row [&>a]:whitespace-nowrap">
              <ButtonLink href="/devis" size="lg">
                Demander un devis <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outlineLight">
                Nous contacter
              </ButtonLink>
            </div>
          </div>
        </Container>
      </FooterInvite>

      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-sm leading-relaxed text-navy-200">{company.shortDescription}</p>
          <p className="mt-5 font-display text-lg text-gold-300 italic">{company.tagline}</p>

          <div className="mt-7">
            {configuredSocials.length > 0 ? (
              <ul className="flex gap-3" aria-label="Réseaux sociaux">
                {configuredSocials.map((s) => {
                  const Icon = socialIcon[s.network];
                  return (
                    <li key={s.network}>
                      <a
                        href={s.url.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="inline-flex size-10 items-center justify-center rounded-[3px] border border-white/15 transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950"
                      >
                        <Icon className="size-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              DEMO_MODE && (
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex gap-2 opacity-40" aria-hidden="true">
                    {socialLinks.map((s) => {
                      const Icon = socialIcon[s.network];
                      return (
                        <span
                          key={s.network}
                          className="inline-flex size-10 items-center justify-center rounded-[3px] border border-white/15"
                        >
                          <Icon className="size-5" />
                        </span>
                      );
                    })}
                  </div>
                  <DemoBadge tone="dark" label="Réseaux à configurer" />
                </div>
              )
            )}
          </div>
        </div>

        <nav aria-label="Navigation du pied de page" className="lg:col-span-2">
          <FooterTitle>Navigation</FooterTitle>
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkCls}>
                  {item.label === "Notre groupe" ? "À propos" : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Nos expertises" className="lg:col-span-3">
          <FooterTitle>Expertises</FooterTitle>
          <ul className="space-y-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={linkCls}>
                  {s.title}
                </Link>
              </li>
            ))}
            <li className="mt-4 border-t border-white/10 pt-4">
              <Link
                href="/devis"
                className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-gold-300 transition-colors hover:text-gold-200"
              >
                Demander un devis{" "}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <FooterTitle>Contact</FooterTitle>
          <ul className="space-y-4 text-navy-100">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden="true" />
              <span>{contact.city.value}</span>
            </li>
            {isDisplayable(contact.phone) && (
              <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Phone className="size-5 shrink-0 text-gold-400" aria-hidden="true" />
                <ContactValue kind="phone" tone="dark" className="hover:text-white" />
              </li>
            )}
            {isDisplayable(contact.email) && (
              <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Mail className="size-5 shrink-0 text-gold-400" aria-hidden="true" />
                <ContactValue kind="email" tone="dark" className="break-all hover:text-white" />
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-[0.82rem] text-navy-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {siteMeta.copyrightYear} {company.name}. Tous droits réservés.{" "}
            <Link href="/mentions-legales" className="underline-offset-2 hover:text-white hover:underline">
              Mentions légales
            </Link>
          </p>
          {/* En démonstration, la mention de proposition remplace le crédit (même information, sans doublon) */}
          <p>{DEMO_MODE ? agency.proposal : agency.credit}</p>
        </Container>
        {DEMO_MODE && (
          <Container className="pb-6 text-[0.75rem] text-navy-400">
            <p>{imageCreditNote}</p>
          </Container>
        )}
      </div>
    </footer>
  );
}
