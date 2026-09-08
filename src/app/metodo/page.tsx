import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { methodSteps, pillars } from "@/data/pillars";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Método",
  description:
    "Do diagnóstico à evolução: o processo da Impetus ADS para transformar estratégia em resultado mensurável.",
  path: "/metodo",
});

export default function MetodoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Método", path: "/metodo" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Nosso método"
        title={
          <>
            Do planejamento
            <br />à <span className="accent-word">performance.</span>
          </>
        }
        description="Um processo claro, estratégico e orientado a resultados. Cada etapa entrega algo concreto — e alimenta a seguinte."
      />

      {/* Etapas */}
      <section className="bg-bg py-16 lg:py-20">
        <div className="container-site">
          <ol className="space-y-4 lg:space-y-5">
            {methodSteps.map((step, index) => (
              <li key={step.number}>
                <Reveal delay={index * 70}>
                  <article className="grid gap-6 border border-line rounded-lg bg-surface p-6 sm:grid-cols-12 sm:gap-8 lg:p-10">
                    <div className="sm:col-span-3">
                      <span className="text-[3rem] font-light leading-none tracking-[-0.04em] tabular-nums text-accent-soft lg:text-[4rem]">
                        {step.number}
                      </span>
                    </div>

                    <div className="sm:col-span-9">
                      <h2 className="display-compact">{step.title}</h2>
                      <p className="lead mt-4 max-w-2xl">{step.description}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pilares */}
      <section className="border-t border-line bg-bg-warm py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Os quatro pilares</p>
            <h2 className="display-section mt-4 max-w-3xl">
              Estratégia, criatividade e tecnologia sustentando{" "}
              <span className="accent-word">resultado.</span>
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => (
              <li key={pillar.number}>
                <Reveal delay={index * 70}>
                  <article className="h-full border border-line rounded-lg bg-surface p-6 lg:p-7">
                    <span
                      aria-hidden="true"
                      className="block h-px w-12 bg-accent/70"
                    />
                    <p className="mt-5 text-[1.75rem] font-light leading-none tabular-nums text-muted-soft">
                      {pillar.number}
                    </p>
                    <h3 className="mt-4 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-[0.8125rem] text-muted">
                      {pillar.tagline}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-line-soft pt-5">
                      {pillar.items.map((item) => (
                        <li
                          key={item}
                          className="text-[0.8125rem] text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
