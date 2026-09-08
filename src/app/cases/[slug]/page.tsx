import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArrowRight } from "@/components/ui/Icons";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { cases, getCaseBySlug } from "@/data/cases";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

/** Gera as rotas estáticas de todos os cases em tempo de build. */
export function generateStaticParams() {
  return cases.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseBySlug(slug);

  if (!study) return { title: "Case não encontrado" };

  return pageMetadata({
    title: `${study.client.name} — ${study.title}`,
    description: `${study.segment}. ${study.summary}`,
    path: `/cases/${study.slug}`,
    image: {
      url: study.cover.src,
      width: study.cover.width,
      height: study.cover.height,
      alt: study.cover.alt,
    },
  });
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = getCaseBySlug(slug);

  if (!study) notFound();

  const others = cases.filter((item) => item.slug !== study.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Cases", path: "/cases" },
              { name: study.client.name, path: `/cases/${study.slug}` },
            ]),
          ),
        }}
      />

      {/* ------------------------------------------------------------- Capa */}
      <section className="border-b border-line bg-bg pb-14 pt-32 lg:pb-16 lg:pt-40">
        <div className="container-site">
          <Reveal>
            <Link
              href="/cases"
              className="group inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-ink"
            >
              <ArrowRight className="size-4 rotate-180" />
              Todos os cases
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="flex h-10 items-center text-ink">
                  <ClientLogo brand={study.client} size="md" />
                </div>

                <span className="mt-5 inline-flex items-center rounded-full bg-accent-wash px-3 py-1 text-[0.6875rem] font-medium text-ink-soft">
                  {study.segment}
                </span>

                <h1 className="display-section mt-5 max-w-3xl">
                  {study.title}
                </h1>

                {study.detail && (
                  <p className="lead mt-6 max-w-2xl">{study.detail.intro}</p>
                )}
              </div>

              {/* Destaque + frentes acionadas */}
              <div className="lg:col-span-5">
                <div className="border border-line rounded-lg bg-bg-soft p-6 lg:p-7">
                  <p className="text-[2.5rem] font-extrabold leading-none tracking-[-0.045em] text-ink">
                    {study.highlight.isMetric ? (
                      <Counter value={study.highlight.value} />
                    ) : (
                      study.highlight.value
                    )}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] font-medium text-ink">
                    {study.highlight.label}
                  </p>

                  <h2 className="mt-7 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
                    Frentes acionadas
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {study.disciplines.map((discipline) => (
                      <li
                        key={discipline}
                        className="rounded-full border border-line px-3 py-1 text-[0.75rem] text-ink-soft"
                      >
                        {discipline}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Imagem */}
      <section className="bg-bg">
        <Reveal variant="media">
          <div className="relative aspect-[16/9] w-full lg:aspect-[21/9]">
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* -------------------------------------------------------- Capítulos */}
      {study.detail && (
        <section className="bg-bg py-16 lg:py-20">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8 lg:col-start-3">
                <ol className="space-y-12">
                  {study.detail.chapters.map((chapter, index) => (
                    <li key={chapter.title}>
                      <Reveal delay={index * 60}>
                        <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
                          <div className="sm:col-span-3">
                            <span
                              aria-hidden="true"
                              className="block h-px w-12 bg-accent/70"
                            />
                            <h2 className="mt-4 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink">
                              {chapter.title}
                            </h2>
                          </div>

                          <div className="space-y-4 sm:col-span-9">
                            {chapter.body.map((paragraph) => (
                              <p
                                key={paragraph}
                                className="text-[0.9375rem] leading-[1.75] text-ink-soft"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>

                {study.detail.results && study.detail.results.length > 0 && (
                  <Reveal>
                    <div className="mt-14 border-t border-line pt-10">
                      <h2 className="eyebrow">Resultados</h2>
                      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                        {study.detail.results.map((result) => (
                          <li key={result.value}>
                            <p className="text-[2.25rem] font-extrabold leading-none tracking-[-0.045em] text-ink">
                              {result.isMetric ? (
                                <Counter value={result.value} />
                              ) : (
                                result.value
                              )}
                            </p>
                            <p className="mt-1.5 text-[0.875rem] text-muted">
                              {result.label}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}

                {study.detail.testimonial && (
                  <Reveal>
                    <blockquote className="mt-14 border-l-2 border-accent pl-6">
                      <p className="text-[1.25rem] font-medium leading-[1.5] tracking-[-0.02em] text-ink">
                        “{study.detail.testimonial.quote}”
                      </p>
                      <footer className="mt-4 text-[0.8125rem] text-muted">
                        {study.detail.testimonial.author} ·{" "}
                        {study.detail.testimonial.role}
                      </footer>
                    </blockquote>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ Outros cases */}
      <section className="border-t border-line bg-bg py-16 lg:py-20">
        <div className="container-site">
          <h2 className="eyebrow">Outros cases</h2>

          <ul className="mt-7 grid gap-4 sm:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/cases/${item.slug}`}
                  className="group flex items-center justify-between gap-4 border border-line rounded-lg bg-surface p-5 transition-colors duration-500 hover:border-accent/45"
                >
                  <span>
                    <span className="block text-[0.9375rem] font-semibold tracking-[-0.025em] text-ink">
                      {item.client.name}
                    </span>
                    <span className="mt-1 block text-[0.75rem] text-muted">
                      {item.segment}
                    </span>
                  </span>
                  <ArrowRight className="arrow-shift size-4 shrink-0 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
