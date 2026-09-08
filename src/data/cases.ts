import type { CaseStudy } from "@/types";
import { clients } from "@/data/clients";

/**
 * CASES
 *
 * O destaque de cada case aceita dois formatos, com o mesmo peso tipografico:
 * uma metrica (`isMetric: true`, que anima como contador ao entrar na tela) ou
 * uma palavra-chave qualitativa (`isMetric: false`). A grade nao muda entre os
 * dois — a escolha e editorial, feita caso a caso.
 *
 * Todo numero publicado aqui precisa ter origem verificada.
 */

const byId = (id: string) => {
  const found = clients.find((client) => client.id === id);
  if (!found) {
    throw new Error(`Cliente nao encontrado em data/clients.ts: ${id}`);
  }
  return found;
};

export const cases: CaseStudy[] = [
  {
    slug: "zenit",
    client: byId("zenit"),
    segment: "Imobiliário",
    segmentSlug: "imobiliario",
    title: "Reposicionamento digital com alto impacto de marca",
    summary: "Reposicionamento digital com alto impacto de marca.",
    highlight: {
      value: "+223%",
      label: "em visualizações",
      isMetric: true,
    },
    cover: {
      src: "/images/cases/zenit.jpg",
      alt: "Edifício residencial contemporâneo da ZENIT ao entardecer, com paisagismo e skyline ao fundo",
      width: 900,
      height: 1200,
    },
    disciplines: [
      "Posicionamento",
      "Direção criativa",
      "Audiovisual",
      "Tráfego pago",
    ],
    featured: true,
    detail: {
      intro:
        "A ZENIT precisava que a presença digital acompanhasse o padrão dos empreendimentos. O trabalho começou pelo posicionamento e desceu até a execução diária de conteúdo e mídia.",
      chapters: [
        {
          title: "Desafio",
          body: [
            "Comunicação fragmentada entre lançamentos, sem um território de marca reconhecível.",
            "O material disponível não sustentava o valor percebido dos produtos.",
          ],
        },
        {
          title: "Estratégia",
          body: [
            "Definimos um território visual único para a incorporadora e uma arquitetura de conteúdo que separa marca, produto e lançamento.",
            "A mídia paga passou a operar com públicos e criativos desenhados por etapa do funil.",
          ],
        },
        {
          title: "Execução",
          body: [
            "Produção audiovisual de fachada, áreas comuns e decorados, com direção de arte alinhada ao novo território.",
            "Rotina de conteúdo, campanhas de alcance e campanhas de conversão rodando em paralelo.",
          ],
        },
      ],
      results: [
        { value: "+223%", label: "em visualizações", isMetric: true },
      ],
    },
  },
  {
    slug: "flex",
    client: byId("flex"),
    segment: "Imobiliário",
    segmentSlug: "imobiliario",
    title: "Estratégia de conteúdo e geração de leads",
    summary: "Estratégia de conteúdo e geração de leads.",
    highlight: {
      value: "+45,9%",
      label: "em interações",
      isMetric: true,
    },
    cover: {
      src: "/images/cases/flex.jpg",
      alt: "Fachada de empreendimento da FLEX em luz de fim de tarde, com varandas e jardim",
      width: 900,
      height: 1200,
    },
    disciplines: ["Conteúdo", "Performance", "CRM", "Design"],
    featured: true,
    detail: {
      intro:
        "O objetivo era transformar audiência em conversa comercial qualificada, sem depender de volume de anúncio.",
      chapters: [
        {
          title: "Desafio",
          body: [
            "Alcance existia, mas a audiência não avançava para contato.",
            "Faltava consistência entre o conteúdo orgânico e o que a mídia paga prometia.",
          ],
        },
        {
          title: "Estratégia",
          body: [
            "Reorganizamos a pauta em torno de dúvidas reais de compra e financiamento.",
            "Criamos pontos de captura ao longo do conteúdo, com resposta comercial padronizada.",
          ],
        },
        {
          title: "Execução",
          body: [
            "Calendário editorial semanal, criativos por formato e testes contínuos de mensagem.",
            "Integração do lead com o fluxo de atendimento da equipe.",
          ],
        },
      ],
      results: [{ value: "+45,9%", label: "em interações", isMetric: true }],
    },
  },
  {
    slug: "vs-salonca",
    client: byId("vs-salonca"),
    segment: "Jurídico",
    segmentSlug: "juridico",
    title: "Autoridade digital dentro dos limites da publicidade jurídica",
    summary: "Autoridade digital e aquisição qualificada.",
    highlight: {
      value: "Autoridade",
      label: "digital consolidada",
      isMetric: false,
    },
    cover: {
      src: "/images/cases/vs-salonca.jpg",
      alt: "Balança da justiça sobre mesa de mármore em escritório de advocacia com vista para a cidade",
      width: 900,
      height: 1200,
    },
    disciplines: ["Posicionamento", "Conteúdo", "Branding", "Site"],
    featured: true,
    detail: {
      intro:
        "Escritório de advocacia exige construção de autoridade dentro das regras de publicidade da categoria. A estratégia foi desenhada nesse limite.",
      chapters: [
        {
          title: "Desafio",
          body: [
            "Comunicar competência sem recorrer a promessa de resultado, vedada pelo código de ética.",
            "Diferenciar o escritório em um mercado onde todos comunicam a mesma coisa.",
          ],
        },
        {
          title: "Estratégia",
          body: [
            "Conteúdo informativo e explicativo como principal ativo de autoridade.",
            "Identidade visual sóbria, consistente entre site, redes e material institucional.",
          ],
        },
        {
          title: "Execução",
          body: [
            "Produção editorial recorrente e presença digital estruturada.",
            "Canal de contato direto, com triagem antes do atendimento jurídico.",
          ],
        },
      ],
    },
  },
  {
    slug: "uniqueness-sports",
    client: byId("uniqueness-sports"),
    segment: "Esporte",
    segmentSlug: "esporte",
    title: "Conteúdo, comunidade e crescimento de marca",
    summary: "Conteúdo, comunidade e crescimento de marca.",
    highlight: {
      value: "Comunidade",
      label: "e presença de marca",
      isMetric: false,
    },
    cover: {
      src: "/images/cases/uniqueness-sports.jpg",
      alt: "Atleta em treino com cordas navais em academia de alto rendimento",
      width: 900,
      height: 1200,
    },
    disciplines: ["Audiovisual", "Conteúdo", "Branding", "Social"],
    featured: true,
    detail: {
      intro:
        "No esporte, marca se constrói com constância e prova. O trabalho priorizou produção contínua e um território visual reconhecível.",
      chapters: [
        {
          title: "Desafio",
          body: [
            "Transformar rotina de treino e resultado esportivo em narrativa de marca.",
            "Manter frequência de publicação sem perder padrão de produção.",
          ],
        },
        {
          title: "Estratégia",
          body: [
            "Formatos recorrentes que sustentam publicação contínua com custo previsível.",
            "Direção de arte com identidade própria, distante do padrão genérico do segmento.",
          ],
        },
        {
          title: "Execução",
          body: [
            "Captação audiovisual em treino e competição.",
            "Edição em múltiplos formatos a partir da mesma captação.",
          ],
        },
      ],
    },
  },
  {
    slug: "mb",
    client: byId("mb"),
    segment: "Empresas",
    segmentSlug: "empresas",
    title: "Rebranding e estratégia de aquisição B2B",
    summary: "Rebranding e estratégia de aquisição B2B.",
    highlight: {
      value: "Rebranding",
      label: "e aquisição B2B",
      isMetric: false,
    },
    cover: {
      src: "/images/cases/mb.jpg",
      alt: "Notebook e celular exibindo painel de sistema sob medida, com a cidade ao fundo",
      width: 900,
      height: 1200,
    },
    disciplines: ["Branding", "Site", "Conteúdo", "Performance"],
    featured: true,
    detail: {
      intro:
        "Venda B2B tem ciclo longo e decisão compartilhada. A marca precisava sustentar essa conversa do primeiro contato até a proposta.",
      chapters: [
        {
          title: "Desafio",
          body: [
            "Identidade antiga não representava mais o porte da operação.",
            "Aquisição dependia de indicação, sem canal próprio previsível.",
          ],
        },
        {
          title: "Estratégia",
          body: [
            "Rebranding completo, do logotipo à aplicação em ambiente e material comercial.",
            "Canal de aquisição próprio, com conteúdo de topo e captura qualificada.",
          ],
        },
        {
          title: "Execução",
          body: [
            "Novo site institucional e material de apoio à venda.",
            "Campanhas segmentadas por perfil de decisor.",
          ],
        },
      ],
    },
  },
];

export const featuredCases = cases.filter((item) => item.featured);

export const getCaseBySlug = (slug: string): CaseStudy | undefined =>
  cases.find((item) => item.slug === slug);

export const caseSlugs = cases.map((item) => item.slug);
