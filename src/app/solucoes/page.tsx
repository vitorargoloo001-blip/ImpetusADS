import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MethodSection } from "@/components/sections/MethodSection";
import { ServiceGlyph } from "@/components/ui/Icons";
import { services } from "@/data/services";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Soluções",
  description:
    "Estratégia, Growth & Performance, Criativo & Audiovisual e Tecnologia. As quatro frentes da Impetus ADS operando como uma só.",
  path: "/solucoes",
});

export default function SolucoesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Soluções", path: "/solucoes" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Nosso ecossistema de soluções"
        title={
          <>
            Mais que marketing.
            <br />
            Uma operação <span className="accent-word">completa.</span>
          </>
        }
        description="Quatro frentes que trabalham no mesmo plano. Não são serviços avulsos vendidos em pacote — é uma operação única aplicada ao seu negócio."
      />

      <section className="bg-bg py-16 lg:py-20">
        <div className="container-site">
          <ul className="space-y-4 lg:space-y-5">
            {services.map((service, index) => (
              <li key={service.slug} id={service.slug} className="scroll-mt-28">
                <Reveal delay={index * 60}>
                  <article className="grid gap-0 overflow-hidden border border-line rounded-lg bg-surface lg:grid-cols-12">
                    {/* Conteúdo */}
                    <div className="order-2 p-6 lg:order-1 lg:col-span-7 lg:p-10 xl:p-12">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-white">
                          <ServiceGlyph
                            name={service.icon}
                            className="size-[1.2rem]"
                          />
                        </span>
                        <span className="text-[0.75rem] font-medium tabular-nums text-muted-soft">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h2 className="display-compact mt-6">{service.title}</h2>

                      <p className="lead mt-4 max-w-xl">
                        {service.description}
                      </p>

                      <h3 className="mt-8 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
                        O que entregamos
                      </h3>
                      <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[0.875rem] text-ink-soft"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.55em] block size-1 shrink-0 rounded-full bg-accent"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Imagem */}
                    <div className="relative order-1 aspect-[16/10] lg:order-2 lg:col-span-5 lg:aspect-auto">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 1023px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MethodSection />
      <FinalCTA />
    </>
  );
}
