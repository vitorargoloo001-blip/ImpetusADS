import { ServiceCard } from "@/components/cards/ServiceCard";
import { Marquee } from "@/components/motion/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";

/**
 * Ecossistema de soluções em esteira contínua, da esquerda para a direita —
 * sentido oposto ao da faixa de clientes, para as duas faixas não parecerem
 * a mesma coisa repetida.
 *
 * A largura fixa do card garante que título e descrição caibam sem espremer o
 * botão, que era o que estava acontecendo na grade de quatro colunas.
 */
export function ServicesSection() {
  return (
    <section className="border-y border-line bg-bg-warm py-16 lg:py-20">
      <SectionHeader
        eyebrow="Nosso ecossistema de soluções"
        action={{ label: "Ver todas as soluções", href: "/solucoes" }}
      />

      <div className="mt-9 lg:mt-10">
        <Marquee direction="right" duration={56} repeat={4} gap="1rem">
          {services.map((service) => (
            <div
              key={service.slug}
              className="h-[13.5rem] w-[20rem] sm:h-[14.5rem] sm:w-[23rem]"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
