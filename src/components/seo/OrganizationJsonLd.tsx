import { company, contact, siteMeta, structuredDataEnabled } from "@/config/site";

/**
 * Données structurées schema.org — publiées UNIQUEMENT lorsque les
 * informations clés (téléphone, adresse) sont confirmées et que le mode
 * démonstration est désactivé. Aucune donnée fictive n'est transmise à Google.
 */
export function OrganizationJsonLd() {
  if (!structuredDataEnabled) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.shortDescription,
    url: siteMeta.url,
    telephone: contact.phone.value,
    email: contact.email.value,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.value,
      addressLocality: "Bamako",
      addressCountry: "ML",
    },
    areaServed: "ML",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const ldScript = (data: Record<string, unknown>) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
  />
);

/** Site web (nom et URL uniquement : aucune donnée d'entreprise non vérifiée). */
export function WebsiteJsonLd() {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: siteMeta.url,
    inLanguage: "fr",
  });
}

/** Description d'un service. Le prestataire n'est détaillé que si ses coordonnées sont confirmées. */
export function ServiceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${siteMeta.url.replace(/\/$/, "")}${path}`,
    provider: structuredDataEnabled
      ? { "@type": "LocalBusiness", name: company.name, telephone: contact.phone.value, url: siteMeta.url }
      : { "@type": "Organization", name: company.name },
  });
}
