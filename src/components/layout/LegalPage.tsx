import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";

interface LegalSection {
  title: string;
  body: ReactNode[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}

/** Layout comum das páginas legais — tipografia de leitura longa. */
export function LegalPage({
  eyebrow,
  title,
  updatedAt,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro} />

      <section className="bg-bg py-16 lg:py-20">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.16em] text-muted-soft">
              Última atualização: {updatedAt}
            </p>

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-[1.125rem] font-bold tracking-[-0.03em] text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph, index) => (
                      <div
                        key={index}
                        className="text-[0.9375rem] leading-[1.75] text-ink-soft"
                      >
                        {paragraph}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
