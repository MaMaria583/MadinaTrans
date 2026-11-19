import type { Metadata } from "next";
import { company, siteMeta } from "@/config/site";

/**
 * Métadonnées complètes d'une page : titre, description, canonique,
 * Open Graph (avec image) et Twitter Card.
 * Next.js remplace l'objet openGraph du parent : tout est donc redéfini ici.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  /** Image de partage : par défaut, l'image générée /opengraph-image. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const ogImage = image
    ? { url: image, width: 1200, height: 630, alt: imageAlt ?? title }
    : { url: "/opengraph-image", width: 1200, height: 630, alt: siteMeta.defaultTitle };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url: path,
      type,
      siteName: company.name,
      locale: siteMeta.locale,
      images: [ogImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.name}`,
      description,
      images: [ogImage.url],
    },
  };
}

/** Image Unsplash recadrée au format Open Graph (1200 × 630). */
export const ogFromUnsplash = (src: string) => src.replace(/w=\d+/, "w=1200").replace("fit=crop", "fit=crop&h=630");
