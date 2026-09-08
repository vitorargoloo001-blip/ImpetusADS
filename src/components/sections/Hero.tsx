import Image from "next/image";
import { ManifestoTrigger } from "@/components/media/ManifestoTrigger";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CircleLink } from "@/components/ui/CircleLink";
import { clients } from "@/data/clients";
import { proofHeadline, socialProof } from "@/data/proof";
import { analyticsEvents } from "@/lib/analytics";

/** Palavras gravadas na parede, à direita da composição. */
const wallWords = ["Disciplina", "Criatividade", "Estratégia", "Resultados"];

const heroImage = {
  src: "/images/hero/hero.jpg",
  alt: "Profissional da Impetus ADS com equipamento de captação audiovisual em arquitetura de concreto",
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/*
        Conteúdo vem antes da mídia no DOM: garante ordem de leitura e de foco
        corretas. No desktop a mídia é absoluta, então a ordem visual não muda.
      */}
      <div className="flex flex-col lg:block">
        {/* ------------------------------------------------ Coluna editorial */}
        <div className="container-site relative z-10 pb-12 pt-28 sm:pt-32 lg:min-h-[46rem] lg:pb-24 lg:pt-40">
          <div className="lg:max-w-[52%] xl:max-w-[50%]">
            <Reveal>
              <p className="eyebrow">
                Estratégia. Criatividade. Tecnologia. Resultados.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="display-hero mt-6 sm:mt-7">
                Negócios
                <br />
                em <span className="accent-word">movimento.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="lead mt-6 max-w-[33rem] sm:mt-7">
                Impulsionamos marcas, produtos e pessoas através de estratégias
                inteligentes, conteúdo de alto nível e tecnologia sob medida. Do
                planejamento à performance, transformamos ideias em resultados
                reais.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-10">
                <Button
                  href="/contato"
                  withArrow
                  trackEvent={analyticsEvents.heroCtaClick}
                  trackParams={{ cta: "quero_impulsionar" }}
                >
                  Quero impulsionar meu negócio
                </Button>

                <CircleLink
                  href="/cases"
                  label="Ver cases"
                  icon="play"
                  trackEvent={analyticsEvents.heroCtaClick}
                  trackParams={{ cta: "ver_cases" }}
                />
              </div>
            </Reveal>

            {/* Prova social — iniciais das marcas atendidas */}
            <Reveal delay={340}>
              <div className="mt-10 flex items-center gap-4 sm:mt-12">
                <ul
                  aria-hidden="true"
                  className="flex shrink-0 items-center -space-x-2.5"
                >
                  {clients.map((brand, index) => (
                    <li
                      key={brand.id}
                      style={{ zIndex: clients.length - index }}
                      className="inline-flex size-10 items-center justify-center rounded-full border-2 border-bg bg-panel text-[0.5625rem] font-semibold uppercase tracking-[0.06em] text-ink-soft"
                    >
                      {brand.name.slice(0, 2)}
                    </li>
                  ))}
                </ul>

                <p className="text-[0.8125rem] leading-[1.55]">
                  <span className="text-muted">{proofHeadline()}</span>{" "}
                  <span className="font-semibold text-ink">
                    {socialProof.closingLine}
                  </span>
                </p>
              </div>
            </Reveal>

            {/* Manifesto em mobile: fica no fluxo, fora da imagem */}
            <div className="mt-10 lg:hidden">
              <span
                aria-hidden="true"
                className="block h-px w-14 bg-line"
              />
              <p className="mt-4 text-[0.625rem] font-medium uppercase leading-[1.8] tracking-[0.2em] text-ink-soft">
                Mais que marketing.
                <br />
                Movemos negócios.
              </p>
              <ManifestoTrigger
                tone="ink"
                className="mt-5"
                source="hero_mobile"
              />
            </div>
          </div>
        </div>

        {/*
          Mídia. O ponto focal (52% 44%) mantém o profissional enquadrado:
          o corte acontece na vertical no desktop e na horizontal no mobile,
          e o viés para cima evita cortar a cabeça em telas baixas.
        */}
        <div className="relative z-0 aspect-[4/5] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[57%] xl:w-[56%]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 57vw"
            className="object-cover object-[52%_44%]"
          />

          {/* Dissolve da borda esquerda no fundo do site (só no desktop) */}
          <div className="hero-fade-left absolute inset-y-0 left-0 hidden w-[62%] lg:block" />

          {/* Escurecimento que sustenta o texto branco do manifesto */}
          <div className="hero-scrim absolute inset-x-0 bottom-0 h-2/3" />

          {/*
            Dissolve da borda inferior. Sem isto a foto termina numa linha reta
            contra a faixa de clientes — era o corte visível.
          */}
          <div className="hero-fade-bottom absolute inset-x-0 bottom-0 h-[26%] lg:h-[22%]" />

          {/* Palavras gravadas + manifesto (desktop).
              O padding inferior mantém o bloco acima da zona de dissolve. */}
          <div className="absolute inset-0 hidden flex-col justify-between p-8 pb-[24%] lg:flex xl:p-12 xl:pb-[24%]">
            <ul
              aria-hidden="true"
              className="ml-auto space-y-3 text-right"
            >
              {wallWords.map((word) => (
                <li
                  key={word}
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.32em] text-white/45 xl:text-xs"
                >
                  {word}
                </li>
              ))}
            </ul>

            <div className="ml-auto max-w-[15rem] text-right">
              <span
                aria-hidden="true"
                className="ml-auto block h-px w-14 bg-white/40"
              />
              <p className="mt-4 text-[0.625rem] font-medium uppercase leading-[1.8] tracking-[0.2em] text-white">
                Mais que marketing.
                <br />
                Movemos negócios.
              </p>
              <ManifestoTrigger
                tone="light"
                className="mt-6 flex-row-reverse"
                source="hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
