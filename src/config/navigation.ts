export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Notre groupe", href: "/a-propos" },
  { label: "Nos services", href: "/services" },
  { label: "Nos engagements", href: "/engagements" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const quoteHref = "/devis";
