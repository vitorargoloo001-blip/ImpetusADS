"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Atraso da entrada, em ms — usado para escalonar listas. */
  delay?: number;
  /** "fade" sobe o conteúdo; "media" entra com leve zoom-out. */
  variant?: "fade" | "media";
  className?: string;
}

/**
 * Entrada suave quando o elemento chega na viewport.
 *
 * É o único ponto do site que observa scroll para animar. Os filhos continuam
 * sendo Server Components — este wrapper só adiciona o observer e um atributo
 * que o CSS usa para animar.
 *
 * Renderiza sempre uma <div>: quando precisar de outra semântica (li, section),
 * envolva o Reveal com o elemento correto em vez de trocar a tag daqui.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  className,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-visible={inView}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
      className={cn(variant === "media" ? "reveal-media" : "reveal", className)}
    >
      {children}
    </div>
  );
}
