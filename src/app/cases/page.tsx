import { CaseCard } from "@/components/cards/CaseCard";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { cases } from "@/data/cases";
import { jsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cases",
  description:
    "Projetos da Impetus ADS em imobiliário, jurídico, esporte e empresas. Estratégia, criatividade e tecnologia aplicadas a mercados diferentes.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Cases", path: "/cases" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Cases"
        title={
          <>
            Diferentes negócios.
            <br />
            Um mesmo <span className="accent-word">propósito.</span>
          </>
        }
        description="Cada projeto começa por um diagnóstico próprio. O que se repete é o método — não a fórmula."
      />

      <section className="bg-bg py-16 lg:py-20">
        <div className="container-site">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((study, index) => (
              <li key={study.slug} className="aspect-[3/4]">
                <Reveal delay={(index % 3) * 90} className="h-full">
                  <CaseCard study={study} />
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
