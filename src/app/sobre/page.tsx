import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ManifestoTrigger } from "@/components/media/ManifestoTrigger";
import { pillars } from "@/data/pillars";
import { site } from "@/data/site";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "A Impetus ADS conecta estratégia, criatividade e tecnologia em uma operação única, aplicada a mercados diferentes.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Sobre", path: "/sobre" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Somos a Impetus"
        title={
          <>
            Diferentes negócios.
            <br />
            Um mesmo <span className="accent-word">propósito.</span>
          </>
        }
        description="Unimos estratégia, criatividade, tecnologia e pessoas para transformar negócios em resultados reais, independentemente do segmento ou desafio."
      />

      {/* Manifesto */}
      <section className="bg-bg py-16 lg:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow">O que nos move</p>

                <h2 className="display-compact mt-4">
                  Estratégia que gera movimento.
                </h2>

                <div className="lead mt-6 space-y-4">
                  <p>
                    A maior parte do mercado entrega peça. Nós entregamos
                    operação: o plano que define o caminho, a produção que
                    sustenta o posicionamento e a tecnologia que faz tudo isso
                    escalar.
                  </p>
                  <p>
                    Trabalhamos com incorporadoras, escritórios de advocacia,
                    marcas esportivas, clínicas e empresas de serviço. Muda o
                    mercado, muda a linguagem — não muda o rigor.
                  </p>
                </div>

                <div className="mt-8 border-t border-line pt-8">
                  <ManifestoTrigger tone="ink" source="sobre" />
                </div>
              </Reveal>
            </div>

            <Reveal variant="media" delay={120} className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/about/equipe.jpg"
                  alt="Equipe da Impetus ADS em ilha de edição, com o território de marca aplicado ao ambiente"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="border-y border-line bg-bg-warm py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Como operamos</p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => (
              <li key={pillar.number}>
                <Reveal delay={index * 70}>
                  <article className="h-full border border-line rounded-lg bg-surface p-6">
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
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClientLogos />

      {/* Onde estamos */}
      <section className="bg-bg py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-8 border border-line rounded-lg bg-surface p-8 sm:grid-cols-2 lg:p-12">
              <div>
                <h2 className="eyebrow">Onde estamos</h2>
                <p className="display-compact mt-4">{site.location.label}</p>
              </div>
              <div className="sm:text-right">
                <h2 className="eyebrow">Contato</h2>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-4 inline-block text-[1.125rem] font-medium tracking-[-0.02em] text-ink transition-colors hover:text-accent-strong"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
