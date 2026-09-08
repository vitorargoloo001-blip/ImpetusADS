import type { Segment } from "@/types";

/** Mercados atendidos. A Impetus adapta o metodo, nao o padrao de entrega. */
export const segments: Segment[] = [
  {
    slug: "imobiliario",
    name: "Imobiliário",
    summary: "Lançamentos, incorporadoras e imobiliárias.",
    challenges: [
      "Sustentar valor percebido do produto na comunicação",
      "Gerar lead qualificado em ciclo de decisão longo",
      "Separar marca institucional de campanha de lançamento",
    ],
    image: {
      src: "/images/segments/imobiliario.jpg",
      alt: "Edifício residencial de arquitetura contemporânea ao entardecer",
      width: 1200,
      height: 900,
    },
  },
  {
    slug: "juridico",
    name: "Jurídico",
    summary: "Escritórios e advogados.",
    challenges: [
      "Construir autoridade dentro das regras da publicidade jurídica",
      "Diferenciar o escritório em um mercado homogêneo",
      "Transformar conteúdo técnico em linguagem acessível",
    ],
    image: {
      src: "/images/segments/juridico.jpg",
      alt: "Balança da justiça sobre mesa de escritório de advocacia, com a cidade ao fundo",
      width: 1200,
      height: 900,
    },
  },
  {
    slug: "beleza-estetica",
    name: "Beleza & Estética",
    summary: "Clínicas, salões e marcas.",
    challenges: [
      "Comunicar procedimento com responsabilidade e desejo",
      "Encher agenda sem depender só de promoção",
      "Padronizar a identidade em alto volume de conteúdo",
    ],
    image: {
      src: "/images/segments/beleza-estetica.jpg",
      alt: "Produtos de estética em bancada de mármore, com vista para o mar ao pôr do sol",
      width: 1200,
      height: 900,
    },
  },
  {
    slug: "esporte",
    name: "Esporte",
    summary: "Atletas, clubes e marcas esportivas.",
    challenges: [
      "Transformar rotina e resultado em narrativa de marca",
      "Manter frequência de produção com padrão alto",
      "Construir comunidade além do resultado esportivo",
    ],
    image: {
      src: "/images/segments/esporte.jpg",
      alt: "Atleta preparando suplemento em academia, diante de painel com o lema da marca",
      width: 1200,
      height: 900,
    },
  },
  {
    slug: "empresas",
    name: "Empresas",
    summary: "Soluções sob medida para diversos mercados.",
    challenges: [
      "Estruturar canal de aquisição próprio",
      "Sustentar venda B2B de ciclo longo",
      "Alinhar marca ao porte real da operação",
    ],
    image: {
      src: "/images/segments/empresas.jpg",
      alt: "Notebook com painel de indicadores em mesa executiva, com a cidade ao entardecer",
      width: 1200,
      height: 900,
    },
  },
];

export const getSegmentBySlug = (slug: string): Segment | undefined =>
  segments.find((item) => item.slug === slug);
