import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsappButton } from "@/components/ui/WhatsappButton";
import { methodSteps } from "@/data/pillars";
import { site } from "@/data/site";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contato",
  description:
    "Traga seu desafio. A Impetus ADS responde com estratégia, criatividade e execução.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Contato", path: "/contato" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Vamos conversar?"
        title={
          <>
            O próximo resultado
            <br />
            pode ser o <span className="accent-word">seu.</span>
          </>
        }
        description="Traga seu desafio. Nós trazemos estratégia, criatividade e execução. Quanto mais contexto você der, melhor será a primeira conversa."
      />

      <section className="bg-bg py-16 lg:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Formulário */}
            <div className="lg:col-span-7 xl:col-span-8">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            {/* Apoio */}
            <div className="lg:col-span-5 xl:col-span-4">
              <Reveal delay={100}>
                <div className="border border-line rounded-lg bg-bg-warm p-6 lg:p-8">
                  <h2 className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
                    Prefere falar agora?
                  </h2>
                  <p className="mt-4 text-[0.9375rem] leading-[1.65] text-ink-soft">
                    Chame no WhatsApp e converse direto com nosso time
                    comercial.
                  </p>
                  <WhatsappButton
                    source="pagina_contato"
                    className="mt-6 w-full sm:w-auto"
                  >
                    Falar no WhatsApp
                  </WhatsappButton>

                  <div className="mt-8 border-t border-line pt-6">
                    <h3 className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
                      Contato direto
                    </h3>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="mt-3 block text-[0.9375rem] text-ink transition-colors hover:text-accent-strong"
                    >
                      {site.contact.email}
                    </a>
                    <p className="mt-1 text-[0.875rem] text-muted">
                      {site.location.label}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border border-line rounded-lg bg-surface p-6 lg:p-8">
                  <h2 className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-soft">
                    O que acontece depois
                  </h2>
                  <ol className="mt-5 space-y-4">
                    {methodSteps.map((step) => (
                      <li key={step.number} className="flex gap-3.5">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-wash text-[0.6875rem] font-medium tabular-nums text-ink-soft"
                        >
                          {step.number}
                        </span>
                        <span className="text-[0.8125rem] leading-[1.6] text-ink-soft">
                          <span className="font-semibold">{step.title}.</span>{" "}
                          {step.description}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
