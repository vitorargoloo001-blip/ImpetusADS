import type { NavItem } from "@/types";

/** Menu principal — header desktop, drawer mobile e rodape. */
export const mainNav: NavItem[] = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Cases", href: "/cases" },
  { label: "Segmentos", href: "/segmentos" },
  { label: "Método", href: "/metodo" },
  { label: "Sobre", href: "/sobre" },
  { label: "Insights", href: "/insights" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Navegação",
    items: [
      { label: "Soluções", href: "/solucoes" },
      { label: "Cases", href: "/cases" },
      { label: "Segmentos", href: "/segmentos" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Método", href: "/metodo" },
      { label: "Sobre", href: "/sobre" },
      { label: "Insights", href: "/insights" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos", href: "/termos" },
];
