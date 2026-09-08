import type { Service } from "@/types";

/** Ecossistema de solucoes — quatro frentes que operam como uma so. */
export const services: Service[] = [
  {
    slug: "estrategia",
    title: "Estratégia",
    summary: "Diagnóstico, posicionamento e planos de crescimento.",
    description:
      "Antes de produzir qualquer peça, entendemos o negócio: onde ele ganha dinheiro, onde trava e o que o mercado já entendeu sobre ele. O plano nasce daí, não de um formato pronto.",
    deliverables: [
      "Diagnóstico de negócio e canais",
      "Posicionamento e território de marca",
      "Pesquisa de mercado e concorrência",
      "Arquitetura de funil",
      "Plano de crescimento com metas",
    ],
    icon: "strategy",
    image: {
      src: "/images/services/estrategia.jpg",
      alt: "Caderno de planejamento aberto ao lado de notebook, em mesa com vista para a cidade",
      width: 800,
      height: 900,
    },
  },
  {
    slug: "growth-performance",
    title: "Growth & Performance",
    summary: "Tráfego pago, aquisição e inteligência de dados.",
    description:
      "Mídia paga tratada como operação de aquisição, não como impulsionamento. Estrutura de campanha, criativo, oferta e mensuração trabalhando juntos.",
    deliverables: [
      "Meta Ads e Google Ads",
      "Estruturação de conta e campanhas",
      "Testes de criativo e oferta",
      "Rastreamento e eventos de conversão",
      "Otimização de conversão (CRO)",
    ],
    icon: "growth",
    image: {
      src: "/images/services/growth.jpg",
      alt: "Notebook exibindo painel de performance com curva de crescimento, ao lado de caneca da Impetus",
      width: 800,
      height: 900,
    },
  },
  {
    slug: "criativo-audiovisual",
    title: "Criativo & Audiovisual",
    summary: "Conteúdo que emociona, posiciona e converte.",
    description:
      "Produção com padrão de direção: fotografia, vídeo, design e copy que sustentam o posicionamento em vez de só preencher calendário.",
    deliverables: [
      "Direção criativa e direção de arte",
      "Produção audiovisual e fotografia",
      "Branding e identidade visual",
      "Campanhas e conceito",
      "Copywriting",
    ],
    icon: "creative",
    image: {
      src: "/images/services/criativo.jpg",
      alt: "Câmera de cinema em tripé e refletor montados em set de produção",
      width: 800,
      height: 900,
    },
  },
  {
    slug: "tecnologia",
    title: "Tecnologia",
    summary: "Sites, plataformas, automações e soluções sob medida.",
    description:
      "Tecnologia como infraestrutura de crescimento: o site que converte, a automação que economiza time e a integração que faz o dado chegar onde decide.",
    deliverables: [
      "Sites e landing pages de alta performance",
      "Sistemas e plataformas sob medida",
      "Automações e integrações",
      "Integração com CRM",
      "Aplicações com inteligência artificial",
    ],
    icon: "technology",
    image: {
      src: "/images/services/tecnologia.jpg",
      alt: "Notebook e smartphone exibindo interface de sistema sob medida",
      width: 800,
      height: 900,
    },
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((item) => item.slug === slug);
