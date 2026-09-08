/**
 * Manifesto da Impetus.
 *
 * Enquanto `source` for null, o site exibe a arte com o botao desabilitado e
 * uma legenda de "em breve" — nunca um player quebrado.
 *
 * Para publicar, preencha `source` com uma das formas:
 *   { kind: "file",    src: "/videos/manifesto.mp4", webm: "/videos/manifesto.webm" }
 *   { kind: "youtube", id: "ID_DO_VIDEO" }
 *   { kind: "vimeo",   id: "ID_DO_VIDEO" }
 */

export type ManifestoSource =
  | { kind: "file"; src: string; webm?: string }
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string };

export const manifesto: {
  source: ManifestoSource | null;
  duration: string;
  poster: string;
  posterAlt: string;
} = {
  source: null,
  duration: "1:32",
  poster: "/images/manifesto/poster.jpg",
  posterAlt: "Estúdio da Impetus ADS durante produção de conteúdo audiovisual",
};
