"use client";

import Image from "next/image";
import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { ArrowRight } from "@/components/ui/Icons";
import type { CaseStudy } from "@/types";
import { analyticsEvents, track } from "@/lib/analytics";

interface CaseCardProps {
  study: CaseStudy;
}

/**
 * Card de case.
 *
 * Imagem em sangria com véu claro vindo da esquerda, para o conteúdo ficar
 * legível sobre qualquer foto. O destaque aceita métrica ("+223%") ou palavra
 * estratégica ("Autoridade") no mesmo peso tipográfico — a grade não muda
 * quando ainda não existe número confirmado.
 */
export function CaseCard({ study }: CaseCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/cases/${study.slug}`}
        onClick={() => track(analyticsEvents.caseOpen, { case: study.slug })}
        aria-label={`Ver o case ${study.client.name}: ${study.title}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-line bg-surface p-5 transition-colors duration-500 hover:border-accent/45 lg:p-6"
      >
        {/* Imagem de fundo */}
        <Image
          src={study.cover.src}
          alt={study.cover.alt}
          fill
          loading="lazy"
          sizes="(max-width: 767px) 78vw, (max-width: 1023px) 45vw, (max-width: 1279px) 32vw, 20vw"
          className="media-zoom -z-10 object-cover"
        />

        {/* Véu de leitura */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-surface via-surface/88 to-surface/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-surface/80 via-transparent to-transparent"
        />

        <div>
          <div className="flex min-h-10 items-center text-ink">
            <ClientLogo brand={study.client} size="md" />
          </div>

          <span className="mt-4 inline-flex items-center rounded-full bg-accent-wash px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.01em] text-ink-soft">
            {study.segment}
          </span>
        </div>

        <div className="mt-7">
          <p className="text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.045em] text-ink xl:text-[2rem]">
            {study.highlight.isMetric ? (
              <Counter value={study.highlight.value} />
            ) : (
              study.highlight.value
            )}
          </p>

          <p className="mt-0.5 text-[0.9375rem] font-medium tracking-[-0.02em] text-ink">
            {study.highlight.label}
          </p>

          <p className="mt-3.5 max-w-[15rem] text-[0.75rem] leading-[1.6] text-muted">
            {study.summary}
          </p>

          <span className="mt-4 inline-flex items-center gap-2 text-[0.75rem] font-medium text-ink">
            Ver case completo
            <ArrowRight className="arrow-shift size-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
