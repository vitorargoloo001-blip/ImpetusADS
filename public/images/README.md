# Imagens do site

Todos os arquivos desta pasta são **placeholders tonais** gerados para que o
site funcione, mantenha as proporções corretas e não sofra layout shift.

Substitua cada arquivo pela fotografia real **mantendo o mesmo nome e a mesma
proporção**. Nada no código precisa mudar.

## Direção de arte

Fotografia cinematográfica, luz natural ou contrastada, paleta quente
(concreto, madeira, champanhe, preto). Evitar banco de imagem corporativo
genérico — pessoas sorrindo em sala de reunião, aperto de mão, gráfico
desenhado no ar.

## Slots

| Arquivo | Proporção | O que deve mostrar |
|---|---|---|
| `hero/hero.jpg` | 8:9 (vertical) | Profissional da Impetus com equipamento de captação, caminhando em arquitetura de concreto. É a imagem mais importante do site. |
| `hero/cta-panorama.jpg` | 12:5 (panorâmica) | Horizonte, montanha, expansão. Sem clichê de "vitória". |
| `manifesto/poster.jpg` | 16:9 | Frame de abertura do vídeo manifesto. |
| `about/imobiliario.jpg` | 4:5 | Edifício contemporâneo em perspectiva. |
| `about/juridico.jpg` | 4:5 | Balança da justiça em contraluz, ou arquitetura jurídica sóbria. |
| `about/beleza.jpg` | 5:4 | Still de produtos de beleza, luz suave. |
| `about/esporte.jpg` | 5:4 | Equipamento de treino, ambiente de alto rendimento. |
| `about/audiovisual.jpg` | 1:2 (vertical estreita) | Câmera de cinema, detalhe de lente. Recebe véu escuro e a frase da marca. |
| `about/tecnologia.jpg` | 1:1 | Interface de sistema, código, dashboard. |
| `about/equipe.jpg` | 4:3 | Equipe da Impetus em produção. |
| `services/estrategia.jpg` | 8:9 | Mesa de trabalho, planejamento, painel de indicadores. |
| `services/growth.jpg` | 8:9 | Dashboard de performance em tela escura. |
| `services/criativo.jpg` | 8:9 | Câmera de cinema em rig, set de produção. |
| `services/tecnologia.jpg` | 8:9 | Notebook e celular exibindo interface sob medida. |
| `cases/zenit.jpg` | 3:4 | Empreendimento residencial da ZENIT. |
| `cases/flex.jpg` | 3:4 | Residência contemporânea da FLEX. |
| `cases/vs-salonca.jpg` | 3:4 | Ambiente sóbrio de escritório de advocacia. |
| `cases/uniqueness-sports.jpg` | 3:4 | Atleta em treino de alto rendimento. |
| `cases/mb.jpg` | 3:4 | Recepção corporativa com identidade aplicada. |
| `segments/imobiliario.jpg` | 4:3 | Conjunto de edifícios contemporâneos. |
| `segments/juridico.jpg` | 4:3 | Detalhe jurídico sofisticado. |
| `segments/beleza-estetica.jpg` | 4:3 | Clínica ou still de produtos. |
| `segments/esporte.jpg` | 4:3 | Atleta em treino. |
| `segments/empresas.jpg` | 4:3 | Torres corporativas em perspectiva vertical. |
| `og/impetus-ads.jpg` | 1200×630 | Cartão de compartilhamento social. |

## Otimização

O `next/image` gera AVIF e WebP automaticamente e serve o tamanho certo para
cada tela. Envie o original em boa resolução (lado maior entre 1600px e
2400px) e deixe a otimização com o build.

Os textos alternativos (`alt`) ficam nos arquivos de dados em `src/data/` e no
componente da seção — atualize-os se o conteúdo da foto mudar.
