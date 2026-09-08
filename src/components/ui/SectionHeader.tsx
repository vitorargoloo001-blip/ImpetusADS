import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Sobrelinha em caixa alta. Ex.: "CASES EM DESTAQUE" */
  eyebrow: string;
  /** Título opcional — algumas faixas da referência usam só a sobrelinha. */
  title?: ReactNode;
  /** Link alinhado à direita. Ex.: "Ver todos os cases" */
  action?: { label: string; href: string };
  className?: string;
  /** Nível semântico do título. */
  as?: "h2" | "h3";
  /** "compact" para faixas horizontais; "section" para blocos com respiro. */
  titleSize?: "section" | "compact";
}

/**
 * Cabeçalho de seção: sobrelinha à esquerda, link opcional à direita.
 *
 * Quando não há título visível, a própria sobrelinha vira o heading da seção —
 * assim os h3 dos cards nunca ficam órfãos na árvore de cabeçalhos, sem que
 * nada mude visualmente.
 */
export function SectionHeader({
  eyebrow,
  title,
  action,
  className,
  as: Heading = "h2",
  titleSize = "section",
}: SectionHeaderProps) {
  return (
    <div className={cn("container-site", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div className="min-w-0">
          {title ? (
            <>
              <p className="eyebrow">{eyebrow}</p>
              <Heading
                className={cn(
                  "mt-3 max-w-4xl sm:mt-4",
                  titleSize === "compact"
                    ? "display-compact"
                    : "display-section",
                )}
              >
                {title}
              </Heading>
            </>
          ) : (
            <Heading className="eyebrow">{eyebrow}</Heading>
          )}
        </div>

        {action && (
          <Link
            href={action.href}
            className="group inline-flex shrink-0 items-center gap-2 pb-1 text-[0.8125rem] text-muted transition-colors duration-300 hover:text-ink"
          >
            {action.label}
            <ArrowRight className="arrow-shift size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
