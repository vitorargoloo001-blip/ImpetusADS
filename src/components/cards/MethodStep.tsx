import type { MethodStepData } from "@/types";

interface MethodStepProps {
  step: MethodStepData;
}

/** Uma etapa do método: disco numerado + título + descrição curta. */
export function MethodStep({ step }: MethodStepProps) {
  return (
    <div className="flex items-start gap-4">
      <span
        aria-hidden="true"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-wash text-[0.8125rem] font-medium tabular-nums text-ink-soft"
      >
        {step.number}
      </span>

      <div className="min-w-0">
        <h3 className="text-[0.9375rem] font-bold tracking-[-0.025em] text-ink">
          {step.title}
        </h3>
        <p className="mt-1.5 text-[0.75rem] leading-[1.65] text-muted">
          {step.description}
        </p>
      </div>
    </div>
  );
}
