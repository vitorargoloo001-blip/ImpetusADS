import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "@/components/ui/Icons";
import { Wordmark } from "@/components/ui/Wordmark";
import { footerNav, legalNav } from "@/data/navigation";
import { site, socialLinks } from "@/data/site";
import { buildStaticWhatsappUrl } from "@/lib/whatsapp";

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-site py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block transition-opacity duration-300 hover:opacity-75"
            >
              <Wordmark size="lg" />
            </Link>
            <p className="mt-5 max-w-xs text-[0.8125rem] leading-relaxed text-muted">
              {site.taglineAccented}
            </p>
          </div>

          {/* Navegacao */}
          <nav
            aria-label="Navegação do rodapé"
            className="grid grid-cols-2 gap-8 sm:gap-10 lg:col-span-4"
          >
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.875rem] text-ink-soft transition-colors duration-300 hover:text-accent-strong"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contato */}
          <div className="lg:col-span-4">
            <h2 className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
              Contato
            </h2>

            <p className="mt-4 text-[0.875rem] text-ink-soft">
              {site.location.label}
            </p>

            <a
              href={buildStaticWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 block text-[0.875rem] text-ink-soft transition-colors duration-300 hover:text-accent-strong"
            >
              {site.contact.whatsappDisplay}
            </a>

            <a
              href={`mailto:${site.contact.email}`}
              className="mt-1 inline-block text-[0.875rem] text-ink-soft transition-colors duration-300 hover:text-accent-strong"
            >
              {site.contact.email}
            </a>

            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Impetus ADS no ${social.label}`}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-ink hover:text-ink"
                  >
                    <Icon className="size-[1.05rem]" />
                  </a>
                );
              })}

              <Link
                href="/contato"
                className="ml-1 text-[0.8125rem] text-muted transition-colors duration-300 hover:text-ink"
              >
                Fale conosco
              </Link>
            </div>
          </div>
        </div>

        {/* Base */}
        <div className="mt-12 flex flex-col gap-5 border-t border-line-soft pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <p className="text-xs text-muted-soft">
            © {year} {site.name}. Todos os direitos reservados.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-muted-soft transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-[0.625rem] uppercase leading-[1.7] tracking-[0.22em] text-muted-soft sm:text-right">
            Movemos ideias para
            <br />
            um mundo mais real.
          </p>
        </div>
      </div>
    </footer>
  );
}
