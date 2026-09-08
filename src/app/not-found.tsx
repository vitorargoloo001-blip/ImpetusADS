import Link from "next/link";
import { mainNav } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="bg-bg pb-24 pt-40 lg:pb-32 lg:pt-48">
      <div className="container-site">
        <p className="eyebrow">Erro 404</p>

        <h1 className="display-section mt-4 max-w-2xl">
          Essa página saiu de <span className="accent-word">movimento.</span>
        </h1>

        <p className="lead mt-6 max-w-lg">
          O endereço acessado não existe ou foi movido. Escolha um caminho
          abaixo para continuar.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-[0.875rem] font-medium text-white transition-colors hover:bg-ink-soft"
          >
            Voltar para o início
          </Link>
          <Link
            href="/contato"
            className="inline-flex h-12 items-center rounded-full border border-ink/25 px-7 text-[0.875rem] font-medium text-ink transition-colors hover:border-ink"
          >
            Falar com um especialista
          </Link>
        </div>

        <nav aria-label="Navegação alternativa" className="mt-14">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.875rem] text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
