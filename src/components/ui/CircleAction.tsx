import { ArrowRight, Play } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface CircleActionProps {
  /** Glifo exibido dentro do circulo. */
  icon?: "arrow" | "play";
  size?: "sm" | "md" | "lg";
  tone?: "accent" | "ink" | "light";
  className?: string;
}

const sizes = {
  sm: "size-9 [&>svg]:size-[0.9rem]",
  md: "size-11 [&>svg]:size-4",
  lg: "size-14 [&>svg]:size-[1.15rem]",
};

const tones = {
  accent: "border-accent/45 text-ink group-hover:border-accent group-hover:bg-accent/10",
  ink: "border-ink/25 text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-white",
  light: "border-white/45 text-white group-hover:border-white group-hover:bg-white/15",
};

/**
 * Circulo de acao com contorno fino — repete-se nos cards, no player e nas
 * chamadas secundarias. Puramente visual: quem carrega a semantica de link
 * ou botao e o elemento que o envolve.
 */
export function CircleAction({
  icon = "arrow",
  size = "md",
  tone = "accent",
  className,
}: CircleActionProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border",
        "transition-all duration-300",
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {icon === "play" ? (
        <Play className="translate-x-[6%]" />
      ) : (
        <ArrowRight className="arrow-shift" />
      )}
    </span>
  );
}
