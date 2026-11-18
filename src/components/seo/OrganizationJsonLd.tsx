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
