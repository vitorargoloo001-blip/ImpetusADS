"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { analyticsEvents, track } from "@/lib/analytics";
import { buildWhatsappUrl, defaultWhatsappMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface WhatsappButtonProps {
  children: ReactNode;
  /** Identifica o ponto do site que originou o contato. */
  source: string;
  /** Mensagem contextual — sobrescreve a padrão. */
  message?: string;
  variant?: "solid" | "inverse";
  className?: string;
}

/**
 * Abre o WhatsApp com mensagem contextual e a origem da visita (UTM).
 *
 * O link é montado no clique, e não na renderização, porque os parâmetros de
 * origem ficam no sessionStorage — que só existe no cliente. Sem número
 * configurado, o botão leva para a página de contato em vez de quebrar.
 */
export function WhatsappButton({
  children,
  source,
  message = defaultWhatsappMessage,
  variant = "solid",
  className,
}: WhatsappButtonProps) {
  const handleClick = () => {
    track(analyticsEvents.whatsappClick, { source });

    const url = buildWhatsappUrl({ message, source });

    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.875rem] font-medium transition-colors duration-300 sm:px-7",
        variant === "solid"
          ? "bg-ink text-white hover:bg-ink-soft"
          : "bg-white text-ink hover:bg-white/90",
        className,
      )}
    >
      {children}
      <ArrowRight className="arrow-shift size-4" />
    </button>
  );
}
