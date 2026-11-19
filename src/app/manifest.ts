import type { MetadataRoute } from "next";
import { company, siteMeta } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.defaultTitle,
    short_name: company.name,
    description: siteMeta.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b1a38",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
