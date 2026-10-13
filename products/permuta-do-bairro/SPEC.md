# permuta-do-bairro — Ficha de produto

> Status: **ficha**. Não tem código. Não entra no registro. Não abre relógio de funil
> até o dono decidir. Ficha escrita em 2026-10-13.

## Dor

A lanchonete do bairro precisa de divulgação e não tem dinheiro pra agência. O
nano-influencer do bairro tem audiência local e toparia divulgar em troca de lanche.
Os dois existem, se conhecem de vista — e o match hoje acontece no WhatsApp, sem
padrão, sem termo, sem marcação de publi (risco CONAR pros dois lados) e sem registro
do valor da permuta (risco fiscal). A dor não é falta de influencer: é **falta de
match confiável e de formalização simples**.

## Tese

Marketplace de permuta hiperlocal: o estabelecimento oferece produto/serviço, o
influencer verificado do bairro entrega divulgação real (indo ao lugar, consumindo,
filmando). O match e o fechamento rodam em **regra pura** — distância, nicho, faixa
de seguidores, valor declarado, prova de entrega. A plataforma cobra **do
estabelecimento, em dinheiro**; o influencer recebe em produto. Nunca somos escrow:
o lanche vai direto da mão do dono pra mão do influencer.

## Por que essa ficha passa na frente do vizinho-aprova

| Critério da casa | permuta-do-bairro | vizinho-aprova |
|---|---|---|
| gargaloFisico | **MÉDIO-FORTE** — o influencer precisa ir ao lugar e consumir | FRACO |
| evidenciaDor | A VERIFICAR, mas testável com 1 transação real | A VERIFICAR, difusa |
| sinalDePagador | Claro: dono paga taxa na permuta fechada | Indireto: selo |
| custoDoTeste | 1 bairro, WhatsApp, zero código | Exige fichas de vários estabelecimentos |
| sinergia | Alimenta o vizinho-aprova com estabelecimentos verificados | Recebe de bandeja |

Mesma trincheira (confiança hiperlocal), trincheira mais barata de cavar.

## O adversário honesto (o que já existe)

- **Plataformas nacionais de influência** (agências e marketplaces de creators) —
  existem, mas operam ticket grande e marcas nacionais; não descem pro balcão da
  lanchonete.
- **A permuta informal do WhatsApp** — esse é o concorrente real. Grátis, rápido,
  sem regra. Ganhamos dele em três coisas: termo padronizado com cláusulas CONAR,
  prova de entrega, e reputação acumulada (quem furou não fecha de novo).
- Busca por plataforma de permuta hiperlocal pra pequeno negócio brasileiro:
  **não encontrada em 2026-10-13** — conferir de novo no dia 1 do funil.

## Produto v1 (escopo mínimo)

**Quadro de permutas do bairro.** Estabelecimento cadastra oferta ("1 combo por um
Reels de 30s + 3 stories, com marcação de parceria paga"); influencer verificado do
raio se candidata; regra pura decide elegibilidade e ordena.

Estados propostos (contrato defineProduto):
- `aguardando_match` (não-final, prazoDias 7 — oferta sem candidato)
- `aguardando_aceite` (não-final, prazoDias 3 — candidato escolhido, esperando o dono)
- `em_execucao` (não-final, prazoDias 10 — permuta aceita, influencer executando)
- `aguardando_prova` (não-final, prazoDias 5 — consumiu, falta o post com link)
- `fechada` (final — post conferido: marcação nativa ou #publi presente)
- `vencida` / `cancelada` / `disputa` (finais — disputa sempre vira humano)

Regra pura: elegível se dentro do raio, nicho compatível, seguidores na faixa
declarada, valor declarado da permuta dentro do teto da oferta. Sem IA, sem rede,
`ctx.hoje` injetado. Conferência da marcação de publi no piloto é **humana**.

## O termo de permuta (o produto dentro do produto)

Toda permuta gera um termo simples entre as partes, com:
- Identificação publicitária obrigatória: ferramenta nativa da plataforma
  ("parceria paga") OU #publi em primeiro plano — exigência do Guia CONAR 2026,
  que trata permuta/brinde como conexão material
- Valor de mercado declarado da permuta (proteção fiscal das duas partes)
- Entregáveis objetivos (formato, quantidade, prazo) e prova (link do post)
- Vedação a menores de 18 anos (ECA Digital — Lei 15.211/2025 e Decreto 12.880/2026
  exigem autorização judicial pra uso de imagem de menores em campanha)
- Direito de ambos desistirem antes da execução, sem multa

## Ficha do funil

| Campo | Valor |
|---|---|
| evidenciaDor | A VERIFICAR — hipótese: dono já fez permuta informal e se estressou |
| sacadaCopiavel | SIM — defesa é operação bairro a bairro + reputação acumulada |
| margemPorCasoCentavos | 3900 por permuta fechada (taxa do estabelecimento) |
| conversasReais | 10 em 14 dias — donos de estabelecimento do bairro piloto |
| janelaDeTeste | 14 dias, qualquer época do ano |
| canalDoTeste | Balcão/WhatsApp comerciante a comerciante + grupos de creators locais |
| sinalDePagador | **1 permuta real fechada com a taxa paga** (concierge manual, sem código) |

## Critério de morte

`{ prazoDias: 14, metrica: 'conversas_reais', minimo: 10 }` — e morte imediata se:
nenhum dono topar pagar a taxa ("eu faço no WhatsApp de graça") **ou** nenhuma
permuta manual fechar nos 14 dias.

## O que NÃO faremos

1. Não somos escrow e não tocamos no produto/dinheiro da permuta — entrega direta
   entre as partes; a plataforma cobra só a taxa do estabelecimento.
2. Não prometemos venda, movimento ou "vai bombar". Prometemos entregável objetivo
   com prova.
3. Nenhuma permuta fecha sem identificação publicitária (nativa ou #publi). Post
   sem marcação = permuta não fechada.
4. Não trabalhamos com menores de 18 anos. Nem influencer, nem personagem.
5. Não damos conselho fiscal — o termo **informa** que permuta é receita pelo valor
   de mercado e recomenda contador. (Fato relevante: atividade de publicidade é
   vedada ao MEI — quem vive disso precisa de ME/Simples. NÃO CONFIRMADO na fonte
   primária, ver FONTES.md.)
6. Não aceitamos influencer sem checagem humana inicial de seguidores comprados.
7. Não fazemos match fora do raio. Permuta sem presença física vira outra coisa
   (e pior).
8. Não usamos IA pra escrever o post do influencer nem pra moderar disputa.

## Roadmap se o funil viver

1. Concierge manual: 1 bairro, match no WhatsApp, termo em PDF, taxa no Pix.
2. `index.ts` com regra de elegibilidade + tela de oferta (só aqui vira código).
3. Reputação interna (permutas fechadas × furadas) alimentando o vizinho-aprova.
4. Segundo bairro. Playbook de replicação.

## Riscos

- **Influencer come e não posta** — mitigação: permuta só fecha com prova de post;
  quem fura entra em registro interno e não fecha de novo.
- **Publi não marcada (CONAR)** — mitigação: termo obriga, conferência humana no
  fechamento; anunciante também responde, então é interesse dos dois.
- **Fisco ignorado pelas partes** — mitigação: valor de mercado declarado no termo;
  aviso expresso; sem conselho fiscal.
- **O WhatsApp informal ganhar** — mitigação: se o teste mostrar isso, a ficha morre
  e a gente aprende por R$ 0 de código.
