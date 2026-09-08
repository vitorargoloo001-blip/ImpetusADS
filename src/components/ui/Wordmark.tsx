import Image from "next/image";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  /** Altura do logotipo. */
  size?: "sm" | "md" | "lg";
  /**
   * "brand" — laranja da marca, para fundo claro (padrão).
   * "white" — versão branca, para fundo escuro ou sobre foto.
   * "ink"   — versão monocromática escura, para uso sóbrio.
   */
  tone?: "brand" | "white" | "ink";
  /** Prioriza o carregamento (use apenas no logotipo do header). */
  priority?: boolean;
  className?: string;
}

/**
 * Logotipo oficial IMPETU'S ADS.
 *
 * Arquivos gerados a partir da arte da marca em `public/images/brand/`, com
 * fundo transparente. As contraformas de "ADS" são vazadas — deixam passar a
 * cor de fundo, como no original — então o logotipo só deve ser aplicado sobre
 * superfícies de contraste suficiente, nunca sobre foto movimentada.
 *
 * Proporção original: 1200 × 518.
 */
const sources = {
  brand: "/images/brand/impetus-lockup.png",
  white: "/images/brand/impetus-lockup-white.png",
  ink: "/images/brand/impetus-lockup-ink.png",
} as const;

const heights = {
  sm: { className: "h-9", px: 36 },
  md: { className: "h-11 lg:h-12", px: 48 },
  lg: { className: "h-16", px: 64 },
} as const;

const RATIO = 1200 / 518;

export function Wordmark({
  size = "md",
  tone = "brand",
  priority = false,
  className,
}: WordmarkProps) {
  const { className: heightClass, px } = heights[size];

  return (
    <Image
      src={sources[tone]}
      alt="Impetus ADS"
      width={Math.round(px * RATIO)}
      height={px}
      priority={priority}
      className={cn("w-auto object-contain", heightClass, className)}
    />
  );
}
