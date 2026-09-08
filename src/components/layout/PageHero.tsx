import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

/**
 * Cabeçalho das páginas internas.
 * Mantém o mesmo ritmo do hero da home, sem imagem — o header já entra sólido
 * nessas rotas, então o espaçamento superior compensa a altura fixa dele.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="border-b border-line bg-bg pb-14 pt-32 lg:pb-20 lg:pt-40">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-section mt-4 max-w-4xl">{title}</h1>
          {description && (
            <p className="lead mt-6 max-w-2xl">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
