# Impetus ADS — site oficial

Site institucional e comercial da Impetus ADS.
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

---

## Rodando

Requer **Node.js 18.18+** ([nodejs.org](https://nodejs.org) — versão LTS).

```bash
cd site
npm install
cp .env.example .env.local   # preencha WhatsApp, e-mail e redes
npm run dev                  # http://localhost:3000
```

Antes de publicar:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## O que precisa ser preenchido

O site funciona sem nada disso, mas fica incompleto. Em ordem de urgência:

1. **`.env.local`** — `NEXT_PUBLIC_WHATSAPP` é o mais importante. Sem ele,
   todos os botões "Falar com um especialista" levam para `/contato` em vez
   de abrir o WhatsApp.
2. **Fotografia** — tudo em `public/images/` é placeholder tonal. As
   proporções e os nomes de arquivo estão prontos: veja
   [`public/images/README.md`](public/images/README.md) para o que cada slot
   deve mostrar.
3. **Logotipos dos clientes** — hoje são renderizados tipograficamente. Para
   usar o arquivo oficial, coloque o SVG em `public/images/clients/` e informe
   `logoSrc` em `src/data/clients.ts`.
4. **Vídeo do manifesto** — `src/data/manifesto.ts`. Aceita MP4/WebM, YouTube
   ou Vimeo. Enquanto for `null`, o botão aparece como "em breve" em vez de
   quebrar.
5. **Métricas dos cases** — só ZENIT e FLEX têm número confirmado. Os outros
   três usam destaque qualitativo. Ver a nota em `src/data/cases.ts`.
6. **Prova social do hero** — `src/data/proof.ts`. O "+50 marcas" só aparece
   depois que o número for confirmado.
7. **Textos legais** — `/privacidade` e `/termos` são uma base sólida, mas
   precisam de revisão jurídica antes de publicar.

---

## Como o conteúdo é organizado

Nada de conteúdo mora dentro de componente. Tudo vem de `src/data/`:

| Arquivo | O que controla |
|---|---|
| `site.ts` | Nome, contato, redes, localização, IDs de analytics |
| `navigation.ts` | Menu principal, rodapé, links legais |
| `clients.ts` | Marcas da faixa de confiança |
| `cases.ts` | Cases, métricas e conteúdo das páginas internas |
| `services.ts` | As quatro soluções e suas entregas |
| `segments.ts` | Mercados atendidos |
| `pillars.ts` | Os quatro pilares e as etapas do método |
| `proof.ts` | Prova social do hero |
| `manifesto.ts` | Vídeo do manifesto |

Trocar um case, um cliente ou uma métrica é editar um objeto — o layout não
muda. É o caminho natural para migrar a um CMS depois: basta trocar a origem
desses módulos por uma chamada de API.

---

## Arquitetura

```
src/
├── app/                    rotas (App Router)
│   ├── page.tsx            home
│   ├── cases/[slug]/       páginas de case, geradas de data/cases.ts
│   ├── api/contato/        recepção de leads
│   ├── sitemap.ts          gerado a partir das rotas reais
│   └── robots.ts
├── components/
│   ├── layout/             Header, Footer, PageHero, LegalPage
│   ├── navigation/         MobileMenu
│   ├── sections/           blocos da home
│   ├── cards/              ServiceCard, CaseCard, SegmentCard, MethodStep
│   ├── ui/                 Wordmark, Button, Icons, ClientLogo…
│   ├── motion/             Reveal, Counter
│   ├── media/              ManifestoTrigger
│   ├── forms/              ContactForm
│   └── analytics/          carregamento condicional das tags
├── data/                   todo o conteúdo
├── lib/                    analytics, whatsapp, seo, validação, rate limit
├── hooks/                  useInView, useScrolled, useReducedMotion
└── types/                  contratos de dados
```

### Decisões que valem explicação

**Sem biblioteca de animação.** As animações do briefing (entrada escalonada,
fade no scroll, hover, contador, parallax leve) são resolvidas com CSS
+ `IntersectionObserver` em ~2 KB. Motion ou GSAP custariam 40 KB+ e forçariam
`"use client"` em mais componentes — o oposto da meta de performance.

**Server Components por padrão.** Só as folhas interativas carregam JS:
botões, cards com tracking, formulário, menu, player e o wrapper `Reveal`.
As páginas e seções são renderizadas no servidor.

**Analytics centralizado.** Nenhum componente chama `gtag`/`fbq`/`dataLayer`
direto — tudo passa por `track()` em `lib/analytics.ts`. Trocar de ferramenta
é mexer em um arquivo. Sem IDs no ambiente, nenhum script de terceiro é
carregado.

**Sem métrica inventada.** `CaseHighlight` aceita número ou palavra
estratégica no mesmo peso tipográfico, então a grade fica idêntica com ou sem
dado confirmado.

---

## Analytics

Eventos disparados: `hero_cta_click`, `case_open`, `service_click`,
`segment_click`, `whatsapp_click`, `form_start`, `form_submit`,
`manifesto_play`.

Suporta GTM, GA4 direto e Meta Pixel. Se `NEXT_PUBLIC_GTM_ID` estiver
preenchido, o GA4 direto não é carregado (o GTM assume).

Os parâmetros de origem (UTM, `gclid`, `fbclid`) são capturados na primeira
página da sessão e viajam junto no link do WhatsApp e no envio do formulário.

---

## Formulário

`POST /api/contato`, com estas camadas na ordem: limite de tamanho do corpo →
rate limit por IP (5 envios / 10 min) → honeypot + tempo mínimo de
preenchimento → validação e sanitização no servidor.

O destino do lead é `LEAD_WEBHOOK_URL` (variável **de servidor**, nunca
exposta ao navegador). Sem webhook configurado, o lead é registrado no log do
servidor para não se perder.

> O rate limit é em memória — suficiente para uma instância. Em deploy
> serverless com várias instâncias, trocar por um store compartilhado
> (Upstash Redis, Cloudflare KV). Ver nota em `src/lib/rate-limit.ts`.

---

## Segurança

CSP restritiva em `next.config.ts`, liberando apenas GTM/GA4/Meta Pixel e os
domínios de embed de vídeo. Mais `HSTS`, `X-Frame-Options: DENY`,
`X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy`.

Nenhum segredo no cliente: só variáveis `NEXT_PUBLIC_*` chegam ao navegador, e
todas elas são dados públicos (telefone, e-mail, IDs de medição).

---

## Deploy

Funciona em qualquer host com Node. Na Vercel ou Cloudflare Pages, o build é
`npm run build` sem configuração extra.

Defina as variáveis de ambiente no painel do host — principalmente
`NEXT_PUBLIC_SITE_URL`, que alimenta canonical, sitemap e Open Graph.
