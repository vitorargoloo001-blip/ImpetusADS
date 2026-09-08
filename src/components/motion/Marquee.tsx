import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** "left" desloca da direita para a esquerda; "right", o contrário. */
  direction?: "left" | "right";
  /** Duração de um ciclo completo, em segundos. Maior = mais lento. */
  duration?: number;
  /**
   * Quantas vezes o conteúdo é repetido no trilho.
   * Precisa ser suficiente para que, ao deslocar uma cópia, as restantes ainda
   * cubram a tela inteira — senão abre um vão na volta do laço.
   */
  repeat?: number;
  /** Espaço entre itens. */
  gap?: string;
  className?: string;
}

/**
 * Esteira infinita, só com CSS — sem JavaScript e sem biblioteca.
 *
 * As cópias além da primeira recebem `inert`, então não entram na ordem de
 * tabulação nem são anunciadas por leitor de tela: o conteúdo existe uma vez
 * só para quem navega por teclado, e N vezes para quem enxerga o movimento.
 *
 * A animação pausa no hover e no foco, e vira rolagem manual quando o sistema
 * pede menos movimento.
 */
export function Marquee({
  children,
  direction = "left",
  duration = 48,
  repeat = 4,
  gap = "1rem",
  className,
}: MarqueeProps) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-shift": `-${100 / repeat}%`,
    "--marquee-gap": gap,
  } as CSSProperties;

  return (
    <div
      data-direction={direction}
      className={cn("marquee", className)}
      role="region"
      aria-label="Conteúdo em rolagem contínua"
    >
      <div className="marquee-track" style={style}>
        {Array.from({ length: repeat }, (_, index) => (
          <div
            key={index}
            className="marquee-group"
            aria-hidden={index > 0 || undefined}
            inert={index > 0}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
