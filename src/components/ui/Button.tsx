"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import {
  track,
  type AnalyticsEvent,
  type AnalyticsParams,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "inverse";
type Size = "sm" | "md";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Mostra a seta que avanca no hover. */
  withArrow?: boolean;
  /** Evento disparado no clique, pela camada central de analytics. */
  trackEvent?: AnalyticsEvent;
  trackParams?: AnalyticsParams;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-white hover:bg-ink-soft border border-ink hover:border-ink-soft",
  outline:
    "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink/[0.03]",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-ink/[0.04]",
  inverse:
    "bg-white text-ink border border-white hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-6 sm:px-7 text-[0.875rem]",
};

/**
 * CTA principal do site — pilula com seta.
 * Renderiza como link interno, link externo ou botao, conforme as props.
 */
export function Button({
  children,
  href,
  variant = "solid",
  size = "md",
  withArrow = false,
  trackEvent,
  trackParams,
  onClick,
  type = "button",
  disabled,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium",
    "transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-55",
    variants[variant],
    sizes[size],
    className,
  );

  const handleClick = () => {
    if (trackEvent) track(trackEvent, trackParams);
    onClick?.();
  };

  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="arrow-shift size-[1.05em]" />}
    </>
  );

  if (href && !disabled) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          onClick={handleClick}
          aria-label={ariaLabel}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        onClick={handleClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
}
