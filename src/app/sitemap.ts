import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { siteUrl } from "@/data/site";

/** Sitemap gerado a partir das rotas reais e dos dados de cases. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/solucoes", priority: 0.9, changeFrequency: "monthly" },
    { path: "/cases", priority: 0.9, changeFrequency: "monthly" },
    { path: "/segmentos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/metodo", priority: 0.7, changeFrequency: "yearly" },
    { path: "/sobre", priority: 0.7, changeFrequency: "yearly" },
    { path: "/insights", priority: 0.5, changeFrequency: "weekly" },
    { path: "/contato", priority: 0.9, changeFrequency: "yearly" },
    { path: "/privacidade", priority: 0.2, changeFrequency: "yearly" },
    { path: "/termos", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...cases.map((study) => ({
      url: `${siteUrl}/cases/${study.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
