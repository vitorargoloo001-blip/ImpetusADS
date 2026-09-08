/**
 * Contratos de dados do site.
 * Toda secao le desses tipos — trocar conteudo nunca exige mexer em layout.
 */

export type SegmentSlug =
  | "imobiliario"
  | "juridico"
  | "beleza-estetica"
  | "esporte"
  | "empresas";

export interface ImageAsset {
  /** Caminho a partir de /public. Ex.: "/images/cases/zenit.jpg" */
  src: string;
  /** Texto alternativo descritivo. Obrigatorio. */
  alt: string;
  /** Largura intrinseca em px — evita layout shift. */
  width: number;
  /** Altura intrinseca em px. */
  height: number;
}

/**
 * Destaque de um case.
 * `value` aceita numero ("+223%") ou palavra estrategica ("Autoridade"),
 * para nunca precisarmos inventar metrica onde nao existe dado real.
 */
export interface CaseHighlight {
  /** Numero ou palavra-chave em destaque. */
  value: string;
  /** Complemento: "em visualizacoes", "digital consolidada"... */
  label: string;
  /**
   * true quando `value` e uma metrica verificada e pode ser animada
   * como contador. false para destaque qualitativo.
   */
  isMetric: boolean;
}

export interface ClientBrand {
  id: string;
  /** Linha principal do logotipo. Ex.: "ZENIT" */
  name: string;
  /** Linha de apoio. Ex.: "INCORPORADORA" */
  qualifier?: string;
  /**
   * Logotipo oficial em SVG/PNG. Quando ausente, o site renderiza
   * um logotipo tipografico com o mesmo peso visual da referencia.
   */
  logoSrc?: string;
  /** Estilo do logotipo tipografico. */
  lockup?: "wide" | "serif" | "stacked" | "monogram";
  /** Monograma opcional exibido a esquerda do nome. */
  monogram?: string;
}

export interface CaseStudy {
  slug: string;
  client: ClientBrand;
  /** Rotulo do segmento exibido na pill. Ex.: "Imobiliario" */
  segment: string;
  segmentSlug: SegmentSlug;
  /** Titulo da pagina de case. */
  title: string;
  /** Resumo curto usado no card da home. */
  summary: string;
  highlight: CaseHighlight;
  cover: ImageAsset;
  /** Ano ou periodo do projeto. */
  period?: string;
  /** Frentes acionadas no projeto. */
  disciplines: string[];
  /** Conteudo longo da pagina interna. Opcional ate existir material real. */
  detail?: CaseDetail;
  /** Publica o card na home. */
  featured: boolean;
}

export interface CaseDetail {
  intro: string;
  chapters: CaseChapter[];
  results?: CaseHighlight[];
  testimonial?: Testimonial;
  gallery?: ImageAsset[];
}

export interface CaseChapter {
  /** "Desafio", "Diagnostico", "Estrategia", "Execucao"... */
  title: string;
  body: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Descricao curta do card (2 linhas na referencia). */
  summary: string;
  /** Texto longo da pagina de solucoes. */
  description: string;
  /** Entregas concretas. */
  deliverables: string[];
  icon: ServiceIcon;
  image: ImageAsset;
}

export type ServiceIcon = "strategy" | "growth" | "creative" | "technology";

export interface Segment {
  slug: SegmentSlug;
  name: string;
  /** Frase de apoio exibida na pagina de segmentos. */
  summary: string;
  /** O que a Impetus resolve nesse mercado. */
  challenges: string[];
  image: ImageAsset;
}

export interface Pillar {
  number: string;
  title: string;
  /** Frase curta ao lado do titulo na home. Ex.: "Com visao de negocio." */
  tagline: string;
  items: string[];
}

export interface MethodStepData {
  number: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

/** Payload validado do formulario comercial. */
export interface LeadPayload {
  name: string;
  whatsapp: string;
  email: string;
  company: string;
  segment: string;
  service: string;
  goal: string;
  message: string;
}

export type LeadFieldErrors = Partial<Record<keyof LeadPayload, string>>;
