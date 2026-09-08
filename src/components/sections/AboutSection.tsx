import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { pillars } from "@/data/pillars";

/**
 * Mosaico editorial: cada peça representa um mercado atendido.
 * A grade é explícita — 12 colunas por 6 linhas, com áreas de tamanhos
 * diferentes e uma peça sobreposta, como na referência. Não é um grid genérico.
 */
const mosaic = [
  {
    src: "/images/about/imobiliario.jpg",
    alt: "Edifício residencial contemporâneo ao entardecer",
    area: "col-start-1 col-end-6 row-start-1 row-end-5",
    sizes: "(max-width: 1023px) 40vw, 19vw",
  },
  {
    src: "/images/about/juridico.jpg",
    alt: "Balança da justiça sobre mesa de escritório de advocacia",
    area: "col-start-6 col-end-10 row-start-1 row-end-4",
    sizes: "(max-width: 1023px) 32vw, 15vw",
  },
  {
    src: "/images/about/beleza.jpg",
    alt: "Produtos de estética em bancada de mármore ao pôr do sol",
    area: "col-start-1 col-end-6 row-start-5 row-end-7",
    sizes: "(max-width: 1023px) 40vw, 19vw",
  },
  {
    src: "/images/about/esporte.jpg",
    alt: "Atleta em treino de força em academia de alto rendimento",
    area: "col-start-6 col-end-10 row-start-4 row-end-7",
    sizes: "(max-width: 1023px) 32vw, 15vw",
  },
] as const;

export function AboutSection() {
  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* ----------------------------------------------------- Texto */}
          <div className="lg:col-span-3">
            <Reveal>
              <p className="eyebrow">Somos a Impetus</p>

              <h2 className="display-section mt-4">
                Diferentes negócios.
                <br />
                Um mesmo <span className="accent-word">propósito.</span>
              </h2>

              <p className="lead mt-6 max-w-md">
                Unimos estratégia, criatividade, tecnologia e pessoas para
                transformar negócios em resultados reais, independentemente do
                segmento ou desafio.
              </p>

              <Button href="/sobre" withArrow className="mt-8">
                Conheça a Impetus
              </Button>
            </Reveal>
          </div>

          {/* --------------------------------------------------- Mosaico */}
          <Reveal variant="media" delay={120} className="lg:col-span-6">
            <div className="relative grid aspect-[5/4] grid-cols-12 grid-rows-6 gap-1.5 lg:aspect-[4/3.3]">
              {mosaic.map((tile) => (
                <div
                  key={tile.src}
                  className={`relative overflow-hidden ${tile.area}`}
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    loading="lazy"
                    sizes={tile.sizes}
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Coluna escura com a frase da marca */}
              <div className="relative col-start-10 col-end-13 row-start-1 row-end-7 overflow-hidden">
                <Image
                  src="/images/about/audiovisual.jpg"
                  alt="Câmera de cinema durante produção audiovisual"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1023px) 24vw, 11vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/50" />
                <p className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.5rem] font-medium uppercase leading-[2.1] tracking-[0.18em] text-white/90 sm:left-4 sm:text-[0.5625rem] xl:text-[0.625rem]">
                  Disciplina
                  <br />
                  também constrói
                  <br />
                  marcas.
                </p>
              </div>

              {/*
                Peça sobreposta com anel na cor do fundo — quebra a régua da
                grade e dá o caráter editorial da referência.
              */}
              <div className="absolute left-[31%] top-[47%] aspect-square w-[24%] overflow-hidden ring-[5px] ring-bg">
                <Image
                  src="/images/about/tecnologia.jpg"
                  alt="Notebook e celular exibindo interface de sistema sob medida"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1023px) 20vw, 9vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* --------------------------------------------------- Pilares */}
          <div className="lg:col-span-3">
            <ul>
              {pillars.map((pillar, index) => (
                <li key={pillar.number}>
                  <Reveal delay={index * 80}>
                    <div
                      className={
                        index === 0
                          ? ""
                          : "border-t border-line-soft pt-5"
                      }
                    >
                      {/* traço champanhe curto acima de cada pilar */}
                      <span
                        aria-hidden="true"
                        className="block h-px w-12 bg-accent/70"
                      />

                      <div className="mt-4 flex items-start gap-5 pb-6">
                        <span className="shrink-0 text-[1.75rem] font-light leading-none tracking-[-0.03em] tabular-nums text-muted-soft lg:text-3xl">
                          {pillar.number}
                        </span>

                        <div className="min-w-0 pt-0.5">
                          <h3 className="text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink">
                            {pillar.title}
                          </h3>
                          <p className="mt-1 text-[0.8125rem] text-muted">
                            {pillar.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
