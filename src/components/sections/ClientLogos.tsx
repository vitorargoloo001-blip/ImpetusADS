import { Marquee } from "@/components/motion/Marquee";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { clients, clientsStatement } from "@/data/clients";

/**
 * Faixa de confiança em esteira contínua, da direita para a esquerda.
 *
 * Os logotipos ficam monocromáticos e com opacidade menor em repouso — a marca
 * da Impetus segue sendo a mais forte da página. A frase à direita fica fora da
 * esteira, ancorada, para o olho ter um ponto de parada.
 */
export function ClientLogos() {
  return (
    <section
      aria-label="Marcas atendidas pela Impetus ADS"
      className="border-y border-line bg-bg-soft"
    >
      <div className="flex flex-col gap-6 py-9 lg:flex-row lg:items-center lg:gap-0 lg:py-11">
        <div className="min-w-0 flex-1">
          <Marquee direction="left" duration={42} repeat={4} gap="clamp(2.5rem, 6vw, 5.5rem)">
            {clients.map((brand) => (
              <div
                key={brand.id}
                className="flex shrink-0 items-center justify-center text-ink opacity-65 transition-opacity duration-500 hover:opacity-100"
              >
                <ClientLogo brand={brand} size="sm" className="sm:scale-125" />
              </div>
            ))}
          </Marquee>
        </div>

        <div className="shrink-0 px-[clamp(1.25rem,4.5vw,5rem)] lg:border-l lg:border-line lg:pl-10">
          <p className="text-[0.625rem] font-medium uppercase leading-[1.9] tracking-[0.2em] text-muted">
            {clientsStatement.line1}
            <br />
            {clientsStatement.line2}
          </p>
        </div>
      </div>
    </section>
  );
}
