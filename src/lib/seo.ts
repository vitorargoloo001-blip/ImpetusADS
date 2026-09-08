import type { Metadata } from "next";
import { site, siteUrl } from "@/data/site";

const defaultOgImage = {
  url: "/images/og/impetus-ads.jpg",
  width: 1200,
  height: 630,
  alt: "Impetus ADS — Estratégia, Criatividade, Tecnologia e Resultados",
};

interface PageMetaOptions {
  title: string;
  description: string;
  /** Caminho relativo, começando com "/". */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}

/** Metadata consistente para todas as páginas internas. */
export function pageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageMetaOptions): Metadata {
  const canonical = path === "/" ? "/" : path;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title,
      description,
      url: `${siteUrl}${canonical}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/** Schema.org da organização — injetado no layout raiz. */
export function organizationSchema() {
  const sameAs = [
    site.social.instagram,
    site.social.linkedin,
    site.social.youtube,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    description: site.description,
    slogan: site.taglineAccented,
    email: site.contact.email,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.state,
      addressCountry: site.location.countryCode,
    },
    areaServed: { "@type": "Country", name: site.location.country },
  };
}

/** Schema.org do site, com ação de busca desabilitada (não há busca). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

/** Trilha de navegação estruturada para as páginas internas. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/** Serializa JSON-LD com escape das sequências que fecham a tag script. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
