"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleAction } from "@/components/ui/CircleAction";
import type { Segment } from "@/types";
import { analyticsEvents, track } from "@/lib/analytics";

interface SegmentCardProps {
  segment: Segment;
}

/**
 * Tile de segmento: fotografia contextual, nome na base e seta à direita.
 * O gradiente inferior garante contraste do rótulo sobre qualquer imagem.
 */
export function SegmentCard({ segment }: SegmentCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/segmentos#${segment.slug}`}
        onClick={() =>
          track(analyticsEvents.segmentClick, { segment: segment.slug })
        }
        className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-lg bg-ink"
      >
        <Image
          src={segment.image.src}
          alt={segment.image.alt}
          fill
          loading="lazy"
          sizes="(max-width: 767px) 72vw, (max-width: 1023px) 45vw, 20vw"
          className="media-zoom object-cover"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/5"
        />

        <div className="relative flex w-full items-center justify-between gap-3 p-4 lg:p-5">
          <h3 className="text-[0.9375rem] font-semibold tracking-[-0.025em] text-white lg:text-base">
            {segment.name}
          </h3>
          <CircleAction icon="arrow" size="sm" tone="light" />
        </div>
      </Link>
    </article>
  );
}
