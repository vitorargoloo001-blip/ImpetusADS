"use client";

import { useEffect, useState } from "react";

/**
 * Indica se a pagina passou de um deslocamento vertical.
 * Usado pelo header, que comeca transparente sobre o hero e vira solido.
 * A leitura acontece dentro de requestAnimationFrame para nao forcar
 * reflow a cada evento de scroll.
 */
export function useScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > offset);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [offset]);

  return scrolled;
}
