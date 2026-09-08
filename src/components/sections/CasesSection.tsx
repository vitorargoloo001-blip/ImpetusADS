import { CaseCard } from "@/components/cards/CaseCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredCases } from "@/data/cases";

/**
 * Cases em destaque — a seção que sustenta a autoridade da página.
 * Cinco cards no desktop, como na referência; trilho com snap no mobile.
 */
export function CasesSection() {
  return (
    <section className="bg-bg py-16 lg:py-20">
      <SectionHeader
        eyebrow="Cases em destaque"
        action={{ label: "Ver todos os cases", href: "/cases" }}
      />

      {/* Mobile / tablet */}
      <div className="mt-8 lg:hidden">
        <ul className="snap-rail no-scrollbar">
          {featuredCases.map((study) => (
            <li key={study.slug} className="w-[72vw] max-w-[20rem]">
              <div className="aspect-[3/4]">
                <CaseCard study={study} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop */}
      <div className="container-site mt-9 hidden lg:block lg:mt-10">
        <ul className="grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {featuredCases.map((study, index) => (
            <li key={study.slug} className="aspect-[3/4]">
              <Reveal delay={index * 80} className="h-full">
                <CaseCard study={study} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
