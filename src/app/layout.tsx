import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics, AnalyticsNoscript } from "@/components/analytics/Analytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site, siteUrl } from "@/data/site";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

/**
 * Inter variável, com itálico real — o destaque champanhe do hero usa o
 * itálico verdadeiro, não uma oblíqua sintetizada pelo navegador.
 * Servida pelo próprio domínio via next/font: sem requisição a terceiros
 * e sem layout shift de fonte.
 *
 * Se algum dia o build reclamar do eixo itálico, remover `style` resolve —
 * o navegador sintetiza a oblíqua e só o destaque do hero muda levemente.
 */
const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-inter",
});

const defaultTitle =
  "Impetus ADS | Estratégia, Criatividade, Tecnologia e Performance";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Impetus ADS",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "agência de marketing",
    "tráfego pago",
    "performance",
    "audiovisual",
    "branding",
    "desenvolvimento de sites",
    "Atibaia",
    "São Paulo",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    images: [
      {
        url: "/images/og/impetus-ads.jpg",
        width: 1200,
        height: 630,
        alt: "Impetus ADS — Estratégia, Criatividade, Tecnologia e Resultados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: ["/images/og/impetus-ads.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">
        {/* Dados estruturados — o Next hoista estas tags para o <head> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema()) }}
        />

        <AnalyticsNoscript />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
