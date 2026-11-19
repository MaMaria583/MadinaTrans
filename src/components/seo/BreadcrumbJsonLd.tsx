import { siteMeta } from "@/config/site";

/**
 * Fil d'Ariane structuré (schema.org BreadcrumbList).
 * Ne contient que la structure du site : aucune donnée d'entreprise non vérifiée.
 */
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; path: string }> }) {
  const base = siteMeta.url.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.path === "/" ? "" : item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
