import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Análises da Impetus ADS sobre estratégia, performance, criação e tecnologia aplicadas a negócios reais.",
  path: "/insights",
});

/**
 * Insights ainda não tem conteúdo publicado.
 *
 * A rota já existe (navegação, sitemap e SEO consistentes) e a página comunica
 * o estado com honestidade, em vez de exibir cards falsos ou lorem ipsum.
 * Quando os artigos chegarem, criar `src/data/insights.ts` no mesmo padrão dos
 * demais arquivos de dados e listar aqui.
 */
export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Insights", path: "/insights" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Insights"
        title={
          <>
            O que aprendemos
            <br />
            operando <span className="accent-word">negócios.</span>
          </>
        }
        description="Análises sobre estratégia, performance, criação e tecnologia — escritas a partir do que roda, não do que está na moda."
      />

      <section className="bg-bg py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <div className="max-w-2xl border border-line rounded-lg bg-surface p-8 lg:p-12">
              <span
                aria-hidden="true"
                className="block h-px w-12 bg-accent/70"
              />
              <h2 className="display-compact mt-6">
                Primeiras publicações em preparo.
              </h2>
              <p className="lead mt-4">
                Estamos organizando os primeiros conteúdos. Enquanto isso, os
                cases mostram como o método se aplica na prática.
              </p>

              <Link
                href="/cases"
                className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-7 text-[0.875rem] font-medium text-white transition-colors hover:bg-ink-soft"
              >
                Ver cases
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
