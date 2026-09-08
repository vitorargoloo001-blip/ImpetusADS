import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Termos de Uso",
  description:
    "Condições de uso do site da Impetus ADS: conteúdo, propriedade intelectual e responsabilidades.",
  path: "/termos",
});

/** Base de termos de uso. Revisar com assessoria jurídica antes de publicar. */
export default function TermosPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Termos de Uso"
      updatedAt="setembro de 2026"
      intro="Ao navegar neste site, você concorda com as condições descritas abaixo."
      sections={[
        {
          title: "1. Objeto",
          body: [
            `Este site é um canal institucional da ${site.name}, destinado a apresentar serviços, projetos e conteúdos, e a receber contatos comerciais.`,
          ],
        },
        {
          title: "2. Uso do site",
          body: [
            "O acesso é livre e gratuito. Você se compromete a não utilizá-lo para fins ilícitos, nem a tentar comprometer sua segurança, disponibilidade ou integridade.",
          ],
        },
        {
          title: "3. Propriedade intelectual",
          body: [
            "Textos, identidade visual, layout, código e materiais audiovisuais publicados aqui pertencem à Impetus ADS ou a seus licenciantes.",
            "Marcas, logotipos e materiais de clientes exibidos nos cases pertencem aos respectivos titulares e são apresentados a título de portfólio, com autorização.",
            "É vedada a reprodução total ou parcial sem autorização prévia por escrito.",
          ],
        },
        {
          title: "4. Cases e resultados",
          body: [
            "Os indicadores apresentados nos cases referem-se a projetos específicos, em contextos específicos. Não constituem promessa nem garantia de resultado equivalente para outros negócios.",
          ],
        },
        {
          title: "5. Links externos",
          body: [
            "O site pode conter links para páginas de terceiros. Não temos controle sobre esses conteúdos e não respondemos por eles.",
          ],
        },
        {
          title: "6. Disponibilidade",
          body: [
            "Trabalhamos para manter o site disponível e atualizado, mas ele pode passar por interrupções para manutenção, atualização ou por fatores fora do nosso controle.",
          ],
        },
        {
          title: "7. Privacidade",
          body: [
            "O tratamento de dados pessoais está descrito na Política de Privacidade, que integra estes termos.",
          ],
        },
        {
          title: "8. Alterações e foro",
          body: [
            "Estes termos podem ser alterados a qualquer momento, com a data de revisão indicada no topo desta página.",
            `Fica eleito o foro da comarca de ${site.location.city}, ${site.location.state}, para dirimir eventuais controvérsias.`,
          ],
        },
      ]}
    />
  );
}
