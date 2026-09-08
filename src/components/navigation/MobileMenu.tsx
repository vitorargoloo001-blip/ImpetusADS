"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Close } from "@/components/ui/Icons";
import { Wordmark } from "@/components/ui/Wordmark";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onWhatsapp: () => void;
}

/**
 * Menu mobile em tela cheia.
 *
 * Trava o scroll do corpo, fecha no Escape e prende o foco dentro do painel
 * enquanto estiver aberto.
 */
export function MobileMenu({ open, onClose, onWhatsapp }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      // foco circular dentro do painel
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      inert={!open}
      className={`fixed inset-0 z-50 flex flex-col bg-bg transition-opacity duration-300 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="container-site flex h-20 shrink-0 items-center justify-between">
        <Link href="/" onClick={onClose}>
          <Wordmark size="sm" />
        </Link>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
        >
          <Close className="size-5" />
        </button>
      </div>

      <nav className="container-site flex flex-1 flex-col justify-center pb-24">
        <ul className="flex flex-col gap-1">
          {mainNav.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
                className={`block border-b border-line-soft py-4 text-[1.75rem] font-semibold tracking-[-0.035em] text-ink transition-all duration-500 ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => {
              onClose();
              onWhatsapp();
            }}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-white"
          >
            Falar com um especialista
          </button>

          <p className="mt-6 text-xs tracking-[0.16em] text-muted-soft uppercase">
            {site.location.label}
          </p>
        </div>
      </nav>
    </div>
  );
}
