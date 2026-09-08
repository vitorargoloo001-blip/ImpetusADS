"use client";

import Link from "next/link";
import { CircleAction } from "@/components/ui/CircleAction";
import {
  track,
  type AnalyticsEvent,
  type AnalyticsParams,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface CircleLinkProps {
  href: string;
  label: string;
  icon?: "arrow" | "play";
  tone?: "accent" | "ink" | "light";
  trackEvent?: AnalyticsEvent;
  trackParams?: AnalyticsParams;
  className?: string;
}

/**
 * Chamada secundaria: circulo contornado + rotulo.
 * Aparece ao lado do CTA principal no hero e no bloco final.
 */
export function CircleLink({
  href,
  label,
  icon = "play",
  tone = "accent",
  trackEvent,
  trackParams,
  className,
}: CircleLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (trackEvent) track(trackEvent, trackParams);
      }}
      className={cn(
        "group inline-flex items-center gap-3.5 text-[0.875rem] font-medium transition-colors duration-300",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <CircleAction icon={icon} size="lg" tone={tone} />
      {label}
    </Link>
  );
}
