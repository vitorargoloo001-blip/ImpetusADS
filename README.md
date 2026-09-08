# Impetus ADS — site oficial

Site institucional e comercial da Impetus ADS.
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

---

## Rodando localmente

Requer **Node.js 18.18+**.

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

Antes de publicar:

```bash
npm run lint
npm run typecheck
npm run build
```

Deploy: ver [DEPLOY.md](DEPLOY.md).

---

## Configuração

A única variável obrigatória é `NEXT_PUBLIC_SITE_URL` — ela alimenta a URL
canônica, o sitemap e os cartões de compartilhamento social.

Contato (WhatsApp, e-mail, Instagram) já tem valor padrão em `src/data/site.ts`,
então o site funciona sem `.env`. As variáveis servem para sobrescrever por
ambiente. Ver [.env.example](.env.example) para a lista completa.

| Área | Onde configurar |
|---|---|
| Contato e redes | `src/data/site.ts` ou `.env.local` |
| Analytics (GTM / GA4 / Meta) | `.env.local` — sem ID, nenhum script é carregado |
| Destino dos leads | `LEAD_WEBHOOK_URL` (variável de servidor) |
| Vídeo do manifesto | `src/data/manifesto.ts` — aceita MP4/WebM, YouTube ou Vimeo |

---

## Como o conteúdo é organizado

Nada de conteúdo mora dentro de componente. Tudo vem de `src/data/`:

| Arquivo | O que controla |
|---|---|
| `site.ts` | Nome, contato, redes, localização, IDs de analytics |
| `navigation.ts` | Menu principal, rodapé, links legais |
| `clients.ts` | Marcas da faixa de confiança |
| `cases.ts` | Cases, destaques e conteúdo das páginas internas |
| `services.ts` | As quatro soluções e suas entregas |
| `segments.ts` | Mercados atendidos |
| `pillars.ts` | Os quatro pilares e as etapas do método |
| `proof.ts` | Prova social do hero |
| `manifesto.ts` | Vídeo do manifesto |

Trocar um case, um cliente ou um destaque é editar um objeto — o layout não
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
│   ├── motion/             Reveal, Counter, Marquee
│   ├── media/              ManifestoTrigger
│   ├── forms/              ContactForm
│   └── analytics/          carregamento condicional das tags
├── data/                   todo o conteúdo
├── lib/                    analytics, whatsapp, seo, validação, rate limit
├── hooks/                  useInView, useScrolled, useReducedMotion
└── types/                  contratos de dados
```

### Decisões que valem explicação

**Sem biblioteca de animação.** Entrada escalonada, fade no scroll, hover,
contador e as esteiras infinitas são resolvidos com CSS + `IntersectionObserver`
em cerca de 2 KB. Motion ou GSAP custariam 40 KB+ e forçariam `"use client"` em
mais componentes — o oposto da meta de performance.

**Server Components por padrão.** Só as folhas interativas carregam JS: botões,
cards com tracking, formulário, menu e player. As páginas e seções são
renderizadas no servidor. As esteiras são puro CSS, sem hidratação.

**Analytics centralizado.** Nenhum componente chama `gtag`/`fbq`/`dataLayer`
direto — tudo passa por `track()` em `lib/analytics.ts`. Trocar de ferramenta é
mexer em um arquivo. Sem IDs no ambiente, nenhum script de terceiro é baixado.

**Identidade.** Laranja `#EA7E06` (amostrado do logotipo) sobre base editorial
branco e preto. O laranja puro é usado em preenchimentos; para texto pequeno,
foco e seleção existe `--color-accent-strong`, que atinge 4,8:1 de contraste.
Tokens em `src/app/globals.css`.

---

## Analytics

Eventos: `hero_cta_click`, `case_open`, `service_click`, `segment_click`,
`whatsapp_click`, `form_start`, `form_submit`, `manifesto_play`.

Suporta GTM, GA4 direto e Meta Pixel. Com `NEXT_PUBLIC_GTM_ID` preenchido, o GA4
direto não é carregado — o GTM assume.

Parâmetros de origem (UTM, `gclid`, `fbclid`) são capturados na primeira página
da sessão e viajam junto no link do WhatsApp e no envio do formulário.

---

## Formulário

`POST /api/contato`, com estas camadas na ordem: limite de tamanho do corpo →
rate limit por IP (5 envios / 10 min) → honeypot + tempo mínimo de preenchimento
→ validação e sanitização no servidor.

O destino do lead é `LEAD_WEBHOOK_URL`, variável **de servidor** — nunca exposta
ao navegador. Sem webhook configurado, o lead é registrado no log do servidor.

> O rate limit é em memória, suficiente para uma instância. Em deploy serverless
> com várias instâncias, trocar por um store compartilhado (Upstash Redis,
> Cloudflare KV). Ver nota em `src/lib/rate-limit.ts`.

---

## Segurança

CSP restritiva em `next.config.ts`, liberando apenas GTM/GA4/Meta Pixel e os
domínios de embed de vídeo. Mais `HSTS`, `X-Frame-Options: DENY`,
`X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy`.

Nenhum segredo no cliente: só variáveis `NEXT_PUBLIC_*` chegam ao navegador, e
todas são dados públicos (telefone, e-mail, IDs de medição).
