"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { ArrowRight, Menu } from "@/components/ui/Icons";
import { Wordmark } from "@/components/ui/Wordmark";
import { mainNav } from "@/data/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { analyticsEvents, captureUtmParams, track } from "@/lib/analytics";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Rotas cujo hero sangra até o topo: nelas o header entra transparente. */
const TRANSPARENT_ROUTES = new Set(["/"]);

export function Header() {
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const overHero = TRANSPARENT_ROUTES.has(pathname);

  // Guarda a origem da visita para acompanhar o lead ate o WhatsApp.
  useEffect(() => {
    captureUtmParams();
  }, []);

  // Fecha o menu ao navegar.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const openWhatsapp = useCallback((source: string) => {
    track(analyticsEvents.whatsappClick, { source });
    const url = buildWhatsappUrl({ source });

    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  }, []);

  const solid = scrolled || !overHero;

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          solid
            ? "border-b border-line/70 bg-bg/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            className="shrink-0 transition-opacity duration-300 hover:opacity-75"
          >
            <Wordmark size="md" priority />
          </Link>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {mainNav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative py-2 text-[0.875rem] transition-colors duration-300",
                        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300",
                        "hover:after:scale-x-100",
                        active
                          ? "text-ink after:scale-x-100"
                          : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openWhatsapp("header")}
              className="group hidden h-11 items-center gap-2.5 rounded-full bg-ink px-6 text-[0.8125rem] font-medium text-white transition-colors duration-300 hover:bg-ink-soft sm:inline-flex"
            >
              Falar com um especialista
              <ArrowRight className="arrow-shift size-4" />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onWhatsapp={() => openWhatsapp("menu_mobile")}
      />
    </>
  );
}
