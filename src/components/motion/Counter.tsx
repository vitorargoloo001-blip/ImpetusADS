"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatNumber, parseMetric } from "@/lib/utils";

interface CounterProps {
  /** Valor final, ja formatado. Ex.: "+223%" ou "+45,9%". */
  value: string;
  className?: string;
}

const DURATION_MS = 1400;

/**
 * Contador que so anima quando entra na viewport.
 *
 * Se o valor nao for numerico (destaque qualitativo como "Autoridade"), o
 * texto e renderizado direto. O valor final tambem aparece no HTML inicial,
 * entao nao ha perda para leitores de tela nem para indexacao.
 */
export function Counter({ value, className }: CounterProps) {
  // memoizado: e dependencia do efeito de animacao
  const parsed = useMemo(() => parseMetric(value), [value]);
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState<string | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!parsed || !inView || reducedMotion) return;

    const start = performance.now();
    const { number, decimals } = parsed;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      // easeOutExpo — rapido no inicio, assenta no fim
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setDisplay(formatNumber(number * eased, decimals));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, reducedMotion, parsed]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {display === null ? (
        value
      ) : (
        <>
          {parsed.prefix}
          {display}
          {parsed.suffix}
        </>
      )}
    </span>
  );
}
