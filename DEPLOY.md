# Deploy — GitHub + Vercel

O repositório já está pronto e commitado localmente. Faltam três passos que
exigem login na sua conta.

> **Este será o primeiro build real do projeto.** Não há Node.js nesta máquina,
> então `npm run build` nunca rodou. A Vercel vai compilar do zero. Se algo
> falhar, o log dela aponta o arquivo e a linha — me mande que eu corrijo.

---

## 1. Criar o repositório no GitHub

Não há `gh` (GitHub CLI) instalado, então crie pela web:

1. Acesse **github.com/new**
2. Nome sugerido: `impetus-ads-site`
3. Visibilidade: **Private** (recomendado — é o código-fonte do seu site)
4. **Não** marque "Add a README", "Add .gitignore" nem "Choose a license".
   O repositório local já tem tudo; qualquer arquivo inicial cria conflito.
5. Clique em **Create repository**

## 2. Enviar o código

No terminal, dentro da pasta `site`:

```bash
git remote add origin https://github.com/SEU-USUARIO/impetus-ads-site.git
git push -u origin main
```

Na primeira vez, o Git Credential Manager abre o navegador para você
autenticar no GitHub. Depois disso a credencial fica salva.

> Se aparecer `remote origin already exists`, use
> `git remote set-url origin <url>` no lugar de `add`.

## 3. Publicar na Vercel

1. Acesse **vercel.com/new**
2. Conecte sua conta do GitHub e escolha o repositório
3. A Vercel detecta Next.js sozinha — **não altere** Framework, Build Command
   nem Output Directory
4. Em **Environment Variables**, adicione:

   | Nome | Valor | Obrigatória |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://www.impetusads.com.br` | **Sim** |
   | `LEAD_WEBHOOK_URL` | destino dos leads do formulário | Não |
   | `NEXT_PUBLIC_GTM_ID` | ID do Google Tag Manager | Não |
   | `NEXT_PUBLIC_GA4_ID` | ID do GA4 (se não usar GTM) | Não |
   | `NEXT_PUBLIC_META_PIXEL_ID` | ID do Meta Pixel | Não |

   WhatsApp, e-mail e Instagram **não** precisam ser configurados: já estão
   como padrão em `src/data/site.ts`. As variáveis existem só para
   sobrescrever por ambiente.

   `NEXT_PUBLIC_SITE_URL` é a única realmente necessária — ela alimenta a URL
   canônica, o sitemap e os cartões de compartilhamento. Sem ela, tudo aponta
   para o domínio de exemplo.

5. **Deploy**

---

## 4. Domínio

### Se o DNS estiver na Cloudflare

Em **Vercel → Settings → Domains**, adicione o domínio. A Vercel mostra os
registros. Na Cloudflare:

| Tipo | Nome | Valor |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

**Deixe o proxy da Cloudflare desligado** (nuvem cinza, "DNS only") nesses dois
registros. Com a nuvem laranja, dois CDNs ficam empilhados: a Vercel perde a
capacidade de invalidar cache e emitir o certificado, e o IP real do visitante
não chega direito no analytics. Confirme os valores no painel da Vercel — eles
podem mudar.

### Se não houver domínio ainda

O site já fica no ar em `seu-projeto.vercel.app`. Dá para apontar o domínio
depois sem refazer nada — só lembre de atualizar `NEXT_PUBLIC_SITE_URL`.

---

## Depois do primeiro deploy

- **Rode o Lighthouse** na URL de produção (DevTools → Lighthouse). Os alvos do
  briefing: Performance ≥ 90, Acessibilidade ≥ 95, Boas Práticas ≥ 95, SEO ≥ 95.
- **Teste os CTAs de WhatsApp** no celular — são cinco pontos: header, menu
  mobile, CTA final, página de contato e rodapé.
- **Envie o formulário** uma vez. Sem `LEAD_WEBHOOK_URL`, o lead aparece no log
  de funções da Vercel; nada se perde, mas ninguém é avisado.
- **Cadastre o sitemap** no Google Search Console: `/sitemap.xml`.

## Detalhes que podem gerar dúvida

**A barra de ferramentas da Vercel some nos previews.** A CSP em
`next.config.ts` é restritiva e bloqueia `vercel.live`. Produção não é afetada.
Se quiser a toolbar nos previews, me peça que eu libero o domínio na CSP.

**Vercel Analytics e Speed Insights** também precisam de liberação na CSP para
funcionar. Se for ativar, me avise.

**Rate limit do formulário é em memória** (`src/lib/rate-limit.ts`). Em
serverless, cada instância tem o próprio contador — segura flood trivial, mas
não é um limite global. Se o volume justificar, trocar por Upstash Redis.

**O repositório da pasta-mãe** (`Impetus ADS/.git`) aponta para
`mazzeoia/MazyOs`, que é o template do MazyOS, não seu. Ele não tem relação com
este deploy — mas cuidado ao rodar `/salvar` por lá, porque tentaria enviar para
o repositório do autor do template.
