import Link from "next/link";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { DEMO_MODE, agency, company, contact, isConfirmed, isDisplayable, siteMeta, socialLinks } from "@/config/site";
import { services } from "@/content/services";
import { imageCreditNote } from "@/content/images";
import { Container } from "@/components/ui/Section";
import { Logo } from "@/components/ui/Logo";
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
  return (
    <h2 className="mb-5 text-[0.95rem] font-bold tracking-wide text-white">
      {children}
      <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-gold-400" />
    </h2>
  );
}

export function Footer() {
  const configuredSocials = socialLinks.filter((s) => isConfirmed(s.url) && s.url.value);

  return (
    <footer className="relative overflow-clip bg-navy-950 text-navy-100">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"
      />
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-sm leading-relaxed text-navy-200">{company.shortDescription}</p>
          <p className="mt-4 font-medium text-gold-300 italic">{company.tagline}</p>

          <div className="mt-6">
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
                        className="inline-flex size-10 items-center justify-center rounded-full bg-white/8 transition-colors hover:bg-gold-400 hover:text-navy-950"
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
                          className="inline-flex size-10 items-center justify-center rounded-full bg-white/8"
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

        <nav aria-label="Liens utiles" className="lg:col-span-2">
          <FooterTitle>Liens utiles</FooterTitle>
          <ul className="space-y-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group inline-flex items-center gap-1.5 hover:text-white">
                  <ChevronRight
                    className="size-3.5 text-gold-400 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  {item.label === "Notre groupe" ? "À propos" : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Nos services" className="lg:col-span-3">
          <FooterTitle>Nos services</FooterTitle>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group inline-flex items-center gap-1.5 hover:text-white">
                  <ChevronRight
                    className="size-3.5 text-gold-400 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/devis"
                className="group inline-flex items-center gap-1.5 font-semibold text-gold-300 hover:text-gold-200"
              >
                <ChevronRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
                Demander un devis
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <FooterTitle>Contactez-nous</FooterTitle>
          <ul className="space-y-4">
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
          <div className="flex flex-col gap-1 md:items-end">
            <p>{agency.credit}</p>
            {DEMO_MODE && <p className="text-navy-400">{agency.proposal}</p>}
          </div>
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
