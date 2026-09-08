"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Fracao do elemento visivel para disparar. */
  threshold?: number;
  /** Margem do root — negativo antecipa/atrasa o disparo. */
  rootMargin?: string;
  /** Dispara uma vez e desconecta (padrao). */
  once?: boolean;
}

/**
 * Observa a entrada de um elemento na viewport.
 * Base de todas as animacoes de scroll do site — sem biblioteca externa.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Sem suporte a IntersectionObserver, mostra o conteudo imediatamente.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
