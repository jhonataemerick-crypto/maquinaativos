# vizinho-aprova — Ficha de produto

> Status: **ficha**. Não tem código. Não entra no registro. Não abre relógio de funil
> até o dono decidir. Ficha escrita em 2026-10-13.

## Dor

Você vai contratar a diarista, a oficina, o petshop, a farmácia de manipulação do
seu bairro — e não tem como saber se presta. Google Maps tem estrelas, mas ninguém
garante que quem avaliou mora ali, já pisou no lugar ou não foi pago pra avaliar.
A informação existe; a **confiança**, não.

## Tese

O Mercado Livre provou o modelo: reputação não é opinião solta, é **ficha de sinais
objetivos** (tempo de conta, vendas concretizadas, reclamações respondidas). O
bairro brasileiro não tem isso. O produto é a **ficha verificada do estabelecimento
do bairro**: sinais objetivos coletados na borda, selo decidido por regra pura,
avaliação de vizinho verificado como fase 2.

## O adversário honesto (o que já existe)

- **Google Maps** — avalia qualquer estabelecimento, inclusive do bairro. Tem escala
  infinita e zero verificação de vizinhança.
- **iFood / TripAdvisor** — avaliam restaurantes e turismo, não a oficina da rua de
  trás.
- **GetNinjas / Reclame Aqui** — serviços e marcas grandes, não o comércio de rua.

**Conclusão do adversário:** "avaliar estabelecimento" não é o vazio. O vazio é
**provar que quem fala é vizinho** e **separar fato verificável de opinião**. Se o
funil mostrar que o morador confia no Google Maps e pronto, a ficha morre aqui —
e está tudo bem.

## Encaixe no framework (nota honesta)

| Critério da casa | Nota | Comentário |
|---|---|---|
| gargaloFisico | **FRACO** | Não tem fila nem perito. O físico é o estabelecimento existir na rua. Pior nota do portfólio. |
| sacadaCopiavel | **SIM** | Google copia a feature em uma sprint. A defesa não é a ideia: é dado proprietário hiperlocal + operação bairro a bairro, chata de copiar de baixo pra cima. |
| evidenciaDor | **A VERIFICAR** | Hipótese. O funil decide. |
| riscoLegal | **MÉDIO** | Pós-STF Temas 987/533 (2025/2026): plataforma notificada de conteúdo ilícito que não remove responde solidariamente. Moderação e canal de denúncia são obrigação de design, não opcional. |

**Por isso esta ficha entra por último na fila.** O framework não proíbe ideia fraca
em um critério — proíbe esconder a fraqueza.

## Produto v1 (escopo mínimo)

**Ficha verificada do estabelecimento.** O dono (ou um morador) cadastra o
estabelecimento; na borda, coletamos sinais objetivos; a regra pura decide o selo.

Sinais (entrada da regra):
- CNPJ informado e situação na Receita (consulta pública na borda — nunca na regra)
- Tempo de operação declarado
- Endereço confirmado (foto da fachada com placa, conferida por humano no piloto)
- Reclamações recebidas × respondidas (quando houver canal)

Estados propostos:
- `aguardando_dados` (não-final, prazoDias 7 — ficha incompleta)
- `verificado` (final — sinais ok)
- `atencao` (final — sinais parciais: ex. CNPJ ativo mas endereço não confirmado)
- `sem_selo` (final — não deu pra verificar o mínimo)
- `suspenso` (final — denúncia acatada; reação humana, nunca automática)

Selo por regra pura, centavos inteiros, sem IA em produção — padrão da casa.

## Camada de avaliações (FASE 2 — não é v1)

Só depois do selo provar demanda:
- Avalia **quem é vizinho verificado** (prova de proximidade a desenhar — nunca
  documento, nunca geolocalização exata; hipótese: confirmação por código enviado
  a endereço/telefone + vínculo declarado ao bairro)
- Moderação = regra + humano. Nunca IA decidindo publicação.
- **Todo estabelecimento tem direito de resposta sempre visível** — não é
  gentileza, é defesa legal e moral.
- Canal de denúncia com SLA de análise humana (obrigação pós-Temas 987/533).

## Ficha do funil

| Campo | Valor |
|---|---|
| evidenciaDor | A VERIFICAR — hipótese: morador desconfia de review genérico |
| sacadaCopiavel | SIM — defesa é operação local, não tecnologia |
| margemPorCasoCentavos | 2900/mês (selo + página do estabelecimento). Morador nunca paga. |
| conversasReais | 10 em 14 dias — donos de estabelecimento de **1 bairro piloto** |
| janelaDeTeste | 14 dias, qualquer época do ano |
| canalDoTeste | Porta a porta / WhatsApp comerciante a comerciante, em 1 bairro de uma cidade da PB (escolher no dia 1) |
| sinalDePagador | 1 dono topando pagar o selo (ou sinal forte: pedir "quando sai?") |

## Critério de morte

`{ prazoDias: 14, metrica: 'conversas_reais', minimo: 10 }` — e morte imediata se
as 10 conversas mostrarem que o dono não vê valor no selo **ou** que o morador já
confia no Google Maps sem hesitar.

## O que NÃO faremos

1. Não cobramos do morador. Quem paga é o estabelecimento.
2. Não vendemos posição no ranking. Vender posição mata o único ativo: confiança.
3. Não publicamos avaliação sem moderação (regra + humano). Nunca IA moderando em
   produção.
4. Não escondemos avaliação negativa de quem paga. Selo suspenso por denúncia é
   decisão humana documentada, com direito de resposta.
5. Não guardamos documento, localização exata ou dado sensível de vizinho.
6. Não lançamos "o Brasil inteiro". Um bairro. Depois outro. Escala é consequência.
7. Não prometemos "o melhor do bairro" — a ficha mostra sinais, quem decide é o
   morador.

## Roadmap se o funil viver

1. Piloto manual em 1 bairro: fichas feitas na mão, selo de papel/WhatsApp.
2. `index.ts` com regra de selo + tela de cadastro (só aqui vira código).
3. Fase 2: avaliações de vizinho verificado + canal de denúncia com SLA.
4. Segundo bairro. Playbook de replicação bairro a bairro.

## Riscos

- **Cold start de dois lados** — o maior risco. Mitigação: v1 não depende de
  avaliação de morador; depende só do dono querer o selo.
- **Google copiar** — mitigação: operação local chata, dado proprietário por bairro.
- **Risco legal de conteúdo de terceiros** — mitigado por desenho: direito de
  resposta, denúncia com SLA, moderação humana, suspensão documentada.
- **Review falso comprado** — mitigação: verificação de vizinhança na fase 2 e
  regra anti-rajada (padrão de avaliações em lote derruba o selo pra revisão humana).
