"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CircleAction } from "@/components/ui/CircleAction";
import { Close } from "@/components/ui/Icons";
import { manifesto } from "@/data/manifesto";
import { analyticsEvents, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ManifestoTriggerProps {
  /** "light" sobre imagem escura, "ink" sobre fundo claro. */
  tone?: "light" | "ink";
  className?: string;
  /** Identifica de onde partiu o play. */
  source?: string;
}

/**
 * Chamada "Assista ao nosso manifesto".
 *
 * O video so entra no DOM depois do clique — nada e baixado no carregamento
 * inicial. Aceita arquivo proprio (MP4/WebM), YouTube ou Vimeo.
 * Sem fonte configurada, o botao aparece desabilitado com aviso discreto.
 */
export function ManifestoTrigger({
  tone = "light",
  className,
  source = "hero",
}: ManifestoTriggerProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const available = manifesto.source !== null;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const handlePlay = () => {
    if (!available) return;
    track(analyticsEvents.manifestoPlay, { source });
    setOpen(true);
  };

  const textColor = tone === "light" ? "text-white" : "text-ink";
  const mutedColor = tone === "light" ? "text-white/65" : "text-muted";

  return (
    <>
      <button
        type="button"
        onClick={handlePlay}
        disabled={!available}
        aria-label={
          available
            ? "Assistir ao manifesto da Impetus ADS"
            : "Manifesto em breve"
        }
        className={cn(
          "group inline-flex items-center gap-3.5 text-left",
          !available && "cursor-default",
          className,
        )}
      >
        <CircleAction
          icon="play"
          size="lg"
          tone={tone === "light" ? "light" : "accent"}
        />
        <span className="leading-[1.5]">
          <span
            className={cn(
              "block text-[0.625rem] font-medium uppercase tracking-[0.2em]",
              textColor,
            )}
          >
            Assista
          </span>
          <span
            className={cn(
              "block text-[0.625rem] font-medium uppercase tracking-[0.2em]",
              textColor,
            )}
          >
            ao nosso manifesto
          </span>
          <span className={cn("block text-[0.625rem] tracking-[0.16em]", mutedColor)}>
            {available ? manifesto.duration : "em breve"}
          </span>
        </span>
      </button>

      {open && manifesto.source && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Manifesto Impetus ADS"
          onClick={close}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Fechar vídeo"
            className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 sm:right-8 sm:top-8"
          >
            <Close className="size-5" />
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-5xl overflow-hidden rounded-lg bg-black shadow-2xl"
          >
            <div className="relative aspect-video">
              {manifesto.source.kind === "file" && (
                <video
                  controls
                  autoPlay
                  playsInline
                  poster={manifesto.poster}
                  className="size-full"
                >
                  {manifesto.source.webm && (
                    <source src={manifesto.source.webm} type="video/webm" />
                  )}
                  <source src={manifesto.source.src} type="video/mp4" />
                  Seu navegador não suporta reprodução de vídeo.
                </video>
              )}

              {manifesto.source.kind === "youtube" && (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${manifesto.source.id}?autoplay=1&rel=0`}
                  title="Manifesto Impetus ADS"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              )}

              {manifesto.source.kind === "vimeo" && (
                <iframe
                  src={`https://player.vimeo.com/video/${manifesto.source.id}?autoplay=1`}
                  title="Manifesto Impetus ADS"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
