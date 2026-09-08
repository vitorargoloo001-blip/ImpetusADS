import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de Privacidade",
  description:
    "Como a Impetus ADS coleta, usa e protege os dados pessoais informados neste site.",
  path: "/privacidade",
});

/**
 * Base de política de privacidade alinhada à LGPD.
 * Revisar com assessoria jurídica antes de publicar — especialmente as seções
 * de retenção, compartilhamento e encarregado de dados.
 */
export default function PrivacidadePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de Privacidade"
      updatedAt="setembro de 2026"
      intro="Esta política explica quais dados a Impetus ADS coleta neste site, por que coleta e o que você pode exigir a respeito deles."
      sections={[
        {
          title: "1. Quem é o controlador",
          body: [
            `A ${site.name}, com atuação em ${site.location.label}, é a controladora dos dados pessoais tratados neste site. Contato para assuntos de privacidade: ${site.contact.email}.`,
          ],
        },
        {
          title: "2. Quais dados coletamos",
          body: [
            "Dados que você informa no formulário de contato: nome, WhatsApp, e-mail, empresa, segmento, serviço de interesse, objetivo e a mensagem que escrever.",
            "Dados de navegação coletados automaticamente por ferramentas de medição: páginas visitadas, origem do acesso (parâmetros UTM), tipo de dispositivo e navegador. Esses dados são tratados de forma agregada.",
          ],
        },
        {
          title: "3. Para que usamos",
          body: [
            "Responder ao seu contato e conduzir a conversa comercial.",
            "Entender a origem das visitas e melhorar o site e as campanhas.",
            "Cumprir obrigações legais quando aplicável.",
          ],
        },
        {
          title: "4. Base legal",
          body: [
            "O tratamento dos dados enviados no formulário se apoia no seu consentimento e na execução de procedimentos preliminares a um contrato. Os dados de navegação se apoiam no legítimo interesse em medir e melhorar nossos canais.",
          ],
        },
        {
          title: "5. Compartilhamento",
          body: [
            "Não vendemos dados pessoais. Podemos compartilhá-los com provedores que sustentam a operação do site e do atendimento — hospedagem, ferramentas de medição e sistema de gestão de relacionamento —, sempre limitados à finalidade descrita aqui.",
          ],
        },
        {
          title: "6. Cookies e medição",
          body: [
            "Este site pode usar cookies e tecnologias semelhantes para medir audiência e desempenho de campanhas. Você pode bloqueá-los nas configurações do navegador; algumas funções podem ficar limitadas.",
          ],
        },
        {
          title: "7. Retenção",
          body: [
            "Mantemos os dados de contato pelo tempo necessário ao relacionamento comercial e ao cumprimento de obrigações legais. Depois disso, são eliminados ou anonimizados.",
          ],
        },
        {
          title: "8. Seus direitos",
          body: [
            "A LGPD garante a você confirmar a existência de tratamento, acessar, corrigir, anonimizar, portar ou eliminar seus dados, além de revogar o consentimento a qualquer momento.",
            `Para exercer qualquer desses direitos, escreva para ${site.contact.email}.`,
          ],
        },
        {
          title: "9. Segurança",
          body: [
            "Adotamos medidas técnicas e administrativas para proteger os dados contra acesso não autorizado, perda ou alteração indevida — incluindo tráfego criptografado e restrição de acesso interno.",
          ],
        },
        {
          title: "10. Alterações",
          body: [
            "Esta política pode ser atualizada. A data da última revisão fica indicada no topo desta página.",
          ],
        },
      ]}
    />
  );
}
