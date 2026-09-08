import type { ClientBrand } from "@/types";

/**
 * Marcas atendidas pela Impetus.
 *
 * Enquanto nao houver o arquivo oficial do logotipo, cada marca e renderizada
 * como logotipo tipografico (componente ClientLogo) — mesmo peso visual da
 * referencia, sem distorcer nem inventar arte de terceiros.
 *
 * Para usar o logo real: coloque o SVG em /public/images/clients/ e informe
 * `logoSrc`. O componente passa a renderizar o arquivo automaticamente.
 */
export const clients: ClientBrand[] = [
  {
    id: "zenit",
    name: "ZENIT",
    qualifier: "Incorporadora",
    lockup: "wide",
  },
  {
    id: "flex",
    name: "FLEX",
    qualifier: "Imóveis",
    lockup: "wide",
  },
  {
    id: "vs-salonca",
    name: "Salonca",
    qualifier: "Advogados",
    lockup: "serif",
    monogram: "VS",
  },
  {
    id: "uniqueness-sports",
    name: "Uniqueness",
    qualifier: "Sports",
    lockup: "stacked",
  },
  {
    id: "mb",
    name: "MB",
    qualifier: "Grupo",
    lockup: "monogram",
  },
];

/** Frase da faixa de confianca, a direita dos logotipos. */
export const clientsStatement = {
  line1: "Marcas que confiam",
  line2: "em quem gera resultados.",
};
