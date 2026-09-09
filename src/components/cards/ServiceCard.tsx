"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleAction } from "@/components/ui/CircleAction";
import { ServiceGlyph } from "@/components/ui/Icons";
import type { Service } from "@/types";
import { analyticsEvents, track } from "@/lib/analytics";

interface ServiceCardProps {
  service: Service;
}

/**
 * Card do ecossistema de soluções.
 * Painel bege à esquerda com o conteúdo, imagem à direita — como na referência.
 *
 * O conteúdo é dividido em dois blocos com `justify-between`: o de cima cresce
 * conforme o texto, o botão fica ancorado embaixo e nunca é empurrado para fora
 * do card. O `min-w-0` no painel evita que o texto force a largura do flex.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/solucoes#${service.slug}`}
        onClick={() =>
          track(analyticsEvents.serviceClick, { service: service.slug })
        }
        className="group flex h-full overflow-hidden rounded-lg border border-line bg-panel transition-colors duration-500 hover:border-accent/45"
      >
        {/* Conteúdo */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-5 lg:p-6">
          <div className="min-w-0">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-white lg:size-12">
              <ServiceGlyph name={service.icon} className="size-[1.15rem]" />
            </span>

            <h3 className="mt-5 text-[1.0625rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink lg:text-lg">
              {service.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-[0.75rem] leading-[1.55] text-muted lg:text-[0.8125rem]">
              {service.summary}
            </p>
          </div>

          <CircleAction
            icon="arrow"
            size="md"
            tone="accent"
            className="mt-5 shrink-0"
          />
        </div>

        {/* Imagem */}
        <div className="relative w-[36%] shrink-0 overflow-hidden sm:w-[40%]">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            loading="lazy"
            sizes="160px"
            className="media-zoom object-cover"
          />
        </div>
      </Link>
    </article>
  );
}
