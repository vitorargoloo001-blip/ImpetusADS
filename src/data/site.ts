/**
 * Configuracao central do site.
 * Dados de contato vem de variaveis de ambiente (ver .env.example) para que
 * telefone, e-mail e redes possam mudar sem tocar em componente algum.
 */

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.impetusads.com.br";

/** URL canonica sem barra final. */
export const siteUrl = rawSiteUrl.replace(/\/+$/, "");

export const site = {
  name: "Impetus ADS",
  legalName: "Impetus ADS",
  url: siteUrl,
  tagline: "Estrategia. Criatividade. Tecnologia. Resultados.",
  taglineAccented: "Estratégia. Criatividade. Tecnologia. Resultados.",
  description:
    "A Impetus ADS conecta estratégia, marketing, performance, audiovisual e tecnologia para transformar marcas e empresas em negócios mais fortes.",
  locale: "pt_BR",
  location: {
    city: "Atibaia",
    state: "São Paulo",
    country: "Brasil",
    label: "Atibaia • São Paulo • Brasil",
    countryCode: "BR",
  },
  /**
   * Dados de contato reais como padrão.
   *
   * São informações públicas (não segredos), então ficam no código para o
   * site funcionar mesmo se o host esquecer de definir as variáveis. As
   * variáveis de ambiente continuam tendo precedência — úteis para apontar
   * um número diferente em homologação, por exemplo.
   */
  contact: {
    /** Somente dígitos, formato internacional. */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5511945189191",
    /** Formato de exibição. */
    whatsappDisplay: "+55 11 94518-9191",
    email: process.env.NEXT_PUBLIC_EMAIL ?? "argolos.impetus01@gmail.com",
  },
  social: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM ?? "https://www.instagram.com/impetus.ad",
    /** Sem perfil ainda: fica vazio e o ícone não é renderizado. */
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE ?? "",
  },
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
} as const;

/** Perfis sociais preenchidos, na ordem de exibicao do rodape. */
export const socialLinks = (
  [
    { id: "instagram", label: "Instagram", href: site.social.instagram },
    { id: "linkedin", label: "LinkedIn", href: site.social.linkedin },
    { id: "youtube", label: "YouTube", href: site.social.youtube },
  ] as const
).filter((item) => item.href.length > 0);
