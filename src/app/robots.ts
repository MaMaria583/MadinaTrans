import type { MetadataRoute } from "next";
import { DEMO_MODE, siteMeta } from "@/config/site";

/**
 * En mode démonstration, l'indexation est bloquée : le site contient des
 * informations non confirmées et ne doit pas apparaître dans Google.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteMeta.url.replace(/\/$/, "");
  if (DEMO_MODE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
