import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CircleLink } from "@/components/ui/CircleLink";
import { WhatsappButton } from "@/components/ui/WhatsappButton";
import { analyticsEvents } from "@/lib/analytics";

/** Palavras à direita da imagem panorâmica. */
const closingWords = ["Marcas", "Pessoas", "Negócios"];

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      {/* Panorâmica: horizonte e expansão */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/cta-panorama.jpg"
          alt="Profissional da Impetus ADS atravessando plataforma de concreto com a cidade ao fundo"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Véu que abre da esquerda, para o texto ler em qualquer tela */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/30 lg:via-bg/75 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent lg:hidden" />
      </div>

      <div className="container-site py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7 xl:col-span-6">
            <Reveal>
              <p className="eyebrow">Vamos conversar?</p>

              <h2 className="display-section mt-4 max-w-2xl">
                O próximo resultado pode ser o seu.
              </h2>

              <p className="lead mt-5 max-w-xl">
                Traga seu desafio. Nós trazemos estratégia, criatividade e
                execução.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <WhatsappButton source="cta_final">
                  Falar com um especialista
                </WhatsappButton>

                <CircleLink
                  href="/cases"
                  label="Ver cases"
                  icon="play"
                  trackEvent={analyticsEvents.heroCtaClick}
                  trackParams={{ cta: "ver_cases_final" }}
                />
              </div>
            </Reveal>
          </div>

          {/* Assinatura tipográfica */}
          <div className="lg:col-span-5 xl:col-span-6">
            <Reveal delay={140}>
              <ul
                aria-hidden="true"
                className="space-y-1.5 lg:text-right"
              >
                {closingWords.map((word) => (
                  <li
                    key={word}
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-ink-soft/70"
                  >
                    {word}
                  </li>
                ))}
                <li className="pt-1 text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-ink">
                  Em movimento.
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
