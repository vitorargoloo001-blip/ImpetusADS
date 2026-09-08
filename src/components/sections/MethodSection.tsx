import { MethodStep } from "@/components/cards/MethodStep";
import { Reveal } from "@/components/motion/Reveal";
import { methodSteps } from "@/data/pillars";

/**
 * Método Impetus.
 * Desktop: faixa horizontal com as quatro etapas encadeadas por chevrons.
 * Mobile: lista vertical com trilho contínuo ligando os discos numerados.
 */
export function MethodSection() {
  return (
    <section className="bg-bg pb-20 lg:pb-24">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Título */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Reveal>
              <p className="eyebrow">Nosso método</p>
              <h2 className="display-compact mt-3">
                Do planejamento à performance.
              </h2>
              <p className="mt-4 text-[0.875rem] leading-[1.6] text-muted">
                Um processo claro, estratégico e orientado a resultados.
              </p>
            </Reveal>
          </div>

          {/* Etapas */}
          <Reveal delay={120} className="lg:col-span-8 xl:col-span-9">
            <ol className="relative flex flex-col gap-7 border border-line rounded-lg bg-bg-soft p-6 sm:gap-8 lg:flex-row lg:items-start lg:gap-0 lg:p-7">
              {/* trilho vertical, só no mobile */}
              <span
                aria-hidden="true"
                className="absolute bottom-12 left-[2.875rem] top-12 w-px bg-line lg:hidden"
              />

              {methodSteps.map((step, index) => (
                <li
                  key={step.number}
                  className="relative flex flex-1 items-start gap-4 lg:gap-0"
                >
                  <div className="relative z-10 flex-1 lg:pr-5">
                    <MethodStep step={step} />
                  </div>

                  {/* chevron entre etapas, só no desktop */}
                  {index < methodSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden shrink-0 self-center text-muted-soft lg:block"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <path d="m9 5 7 7-7 7" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
