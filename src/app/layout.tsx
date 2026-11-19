import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { DEMO_MODE, company, siteMeta } from "@/config/site";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/OrganizationJsonLd";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
// Titres : serif contemporaine à axe optique (élégante et expressive)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: { default: siteMeta.defaultTitle, template: `%s | ${company.name}` },
  description: siteMeta.defaultDescription,
  applicationName: company.name,
  keywords: [
    "transport au Mali",
    "transport routier Bamako",
    "transit au Mali",
    "logistique au Mali",
    "transport de marchandises",
    "affrètement maritime",
    "société de transport à Bamako",
    "transitaire Bamako",
    "logistique Bamako",
    "fret Mali",
  ],
  category: "transport",
  openGraph: {
    type: "website",
    locale: siteMeta.locale,
    siteName: company.name,
    title: siteMeta.defaultTitle,
    description: siteMeta.defaultDescription,
  },
  twitter: { card: "summary_large_image" },
  // Le site de démonstration n'est pas indexé tant que les informations ne sont pas validées.
  robots: DEMO_MODE ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  // Référencement local : zone géographique (ville confirmée dans le brief)
  other: { "geo.region": "ML-BKO", "geo.placename": "Bamako, Mali" },
};

export const viewport: Viewport = {
  themeColor: "#101d32",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable} antialiased`}>
      <body className="flex min-h-screen flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-950"
        >
          Aller au contenu
        </a>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <DemoBanner />
        <TopBar />
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileActionBar />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </body>
    </html>
  );
}
