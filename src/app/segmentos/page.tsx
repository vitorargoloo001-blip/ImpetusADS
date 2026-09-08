import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { segments } from "@/data/segments";
import { cases } from "@/data/cases";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata = pageMetadata({
  title: "Segmentos",
  description:
    "Imobiliário, jurídico, beleza e estética, esporte e empresas. A Impetus ADS adapta estratégia, comunicação e tecnologia a cada mercado.",
  path: "/segmentos",
});

export default function SegmentosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Segmentos", path: "/segmentos" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Segmentos"
        title={
          <>
            Diferentes realidades.
            <br />
            Especialistas em <span className="accent-word">resultados.</span>
          </>
        }
        description="O método é o mesmo. O que muda é a leitura de mercado, a linguagem e o que conta como resultado em cada segmento."
      />

      <section className="bg-bg py-16 lg:py-20">
        <div className="container-site">
          <ul className="space-y-4 lg:space-y-5">
            {segments.map((segment, index) => {
              const related = cases.filter(
                (study) => study.segmentSlug === segment.slug,
              );

              return (
                <li
                  key={segment.slug}
                  id={segment.slug}
                  className="scroll-mt-28"
                >
                  <Reveal delay={index * 50}>
                    <article className="grid overflow-hidden border border-line rounded-lg bg-surface lg:grid-cols-12">
                      <div className="relative aspect-[16/10] lg:col-span-5 lg:aspect-auto">
                        <Image
                          src={segment.image.src}
                          alt={segment.image.alt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 1023px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="p-6 lg:col-span-7 lg:p-10 xl:p-12">
                        <h2 className="display-compact">{segment.name}</h2>
                        <p className="lead mt-3">{segment.summary}</p>

                        <h3 className="mt-8 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
                          O que resolvemos
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                          {segment.challenges.map((challenge) => (
                            <li
                              key={challenge}
                              className="flex items-start gap-2.5 text-[0.875rem] text-ink-soft"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.55em] block size-1 shrink-0 rounded-full bg-accent"
                              />
                              {challenge}
                            </li>
                          ))}
                        </ul>

                        {related.length > 0 && (
                          <div className="mt-8 border-t border-line-soft pt-6">
                            <h3 className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
                              Cases neste segmento
                            </h3>
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {related.map((study) => (
                                <li key={study.slug}>
                                  <Link
                                    href={`/cases/${study.slug}`}
                                    className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-[0.8125rem] text-ink-soft transition-colors hover:border-accent hover:text-ink"
                                  >
                                    {study.client.name}
                                    <ArrowRight className="arrow-shift size-3.5" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
