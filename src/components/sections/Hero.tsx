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

/**
 * Hero.
 *
 * A composição muda de estratégia entre mobile e desktop, e não só de tamanho:
 *
 * · Desktop — a foto é absoluta e ocupa a metade direita da seção inteira.
 * · Mobile  — a foto entra no fluxo logo depois dos CTAs, e a prova social vem
 *   abaixo dela. Antes a foto só aparecia após todo o texto, e o visitante
 *   percorria mais de mil pixels de tipografia antes de ver qualquer imagem.
 *
 * Os três blocos são irmãos, e não aninhados, justamente para essa ordem poder
 * mudar. No desktop a mídia sai do fluxo, então texto e prova social voltam a
 * ficar coladas na coluna da esquerda, como se fossem um bloco só.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden lg:min-h-[46rem]">
      <div className="flex flex-col lg:block">
        {/* ------------------------------------------ Texto principal (1) */}
        <div className="container-site relative z-10 pb-8 pt-24 sm:pt-28 lg:pb-0 lg:pt-40">
          <div className="lg:max-w-[52%] xl:max-w-[50%]">
            <Reveal>
              <p className="eyebrow">
                Estratégia. Criatividade. Tecnologia. Resultados.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="display-hero mt-5 sm:mt-7">
                Negócios
                <br />
                em <span className="accent-word">movimento.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="lead mt-5 max-w-[33rem] sm:mt-7">
                Impulsionamos marcas, produtos e pessoas através de estratégias
                inteligentes, conteúdo de alto nível e tecnologia sob medida. Do
                planejamento à performance, transformamos ideias em resultados
                reais.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-10">
                <Button
                  href="/contato"
                  withArrow
                  className="max-sm:w-full"
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
          </div>
        </div>

        {/* ------------------------------------------------------ Mídia (2)
            O ponto focal (52% 44%) mantém o profissional enquadrado: o corte
            acontece na vertical no desktop e na horizontal no mobile, e o viés
            para cima evita cortar a cabeça em telas baixas. */}
        <div className="relative z-0 mt-8 aspect-[16/11] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[57%] xl:w-[56%]">
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
          <div className="hero-scrim absolute inset-x-0 bottom-0 hidden h-2/3 lg:block" />

          {/* Dissolve da borda inferior: sem ele a foto termina numa linha reta */}
          <div className="hero-fade-bottom absolute inset-x-0 bottom-0 h-[18%] lg:h-[22%]" />

          {/* Palavras gravadas + manifesto (desktop) */}
          <div className="absolute inset-0 hidden flex-col justify-between p-8 pb-[24%] lg:flex xl:p-12 xl:pb-[24%]">
            <ul aria-hidden="true" className="ml-auto space-y-3 text-right">
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

        {/* --------------------------------------------- Prova social (3) */}
        <div className="container-site relative z-10 pb-12 pt-7 lg:pb-24 lg:pt-9">
          <div className="lg:max-w-[52%] xl:max-w-[50%]">
            <Reveal delay={340}>
              <div className="flex items-center gap-4">
                <ul
                  aria-hidden="true"
                  className="flex shrink-0 items-center -space-x-2.5"
                >
                  {clients.map((brand, index) => (
                    <li
                      key={brand.id}
                      style={{ zIndex: clients.length - index }}
                      className="inline-flex size-9 items-center justify-center rounded-full border-2 border-bg bg-panel text-[0.5rem] font-semibold uppercase tracking-[0.06em] text-ink-soft sm:size-10 sm:text-[0.5625rem]"
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
          </div>
        </div>
      </div>
    </section>
  );
}
