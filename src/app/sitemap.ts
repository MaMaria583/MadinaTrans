import type { MetadataRoute } from "next";
import { siteMeta } from "@/config/site";
import { services } from "@/content/services";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMeta.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/a-propos",
    "/services",
    "/engagements",
    "/actualites",
    "/contact",
    "/devis",
    "/mentions-legales",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path || "/"}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/services" || path === "/devis" ? 0.9 : 0.6,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${base}/actualites/${a.slug}`,
      lastModified: a.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
