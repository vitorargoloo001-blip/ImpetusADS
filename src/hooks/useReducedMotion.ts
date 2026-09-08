"use client";

import { useEffect, useState } from "react";

/**
 * Le a preferencia do sistema por menos movimento.
 * O CSS ja neutraliza as transicoes; este hook serve para desligar tambem o
 * que e controlado por JS (contadores animados, parallax).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
