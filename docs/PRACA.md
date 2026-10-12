# Camada 4 · Praça — go-to-market como parte do produto

> Proposta de framework (branch `framework/*`): tornar o marketing uma camada da
> máquina, com o mesmo rigor das outras. Requer aprovação do dono.

## O problema

A máquina fabrica produto (funil → contrato → fábrica → chão) mas não fabrica
audiência. O funil mede conversas — mas alguém precisa trazer as pessoas.
Sem Praça, o critério de morte mede a nossa capacidade de distribuir,
não a dor do mercado. E pior: cada produto improvisa marketing do zero,
nos 14 dias mais escassos da vida dele.

## A camada

```
CAMADA 0 · FUNIL     decide se merece existir
CAMADA 1 · CONTRATO  defineProduto()
CAMADA 2 · FÁBRICA   agentes escrevem o produto
CAMADA 3 · CHÃO      Worker + Workflow + D1
CAMADA 4 · PRAÇA     GTM.md por produto + rotina de distribuição + sinais
```

## Regras da Praça

1. **Todo produto com `tela` (público) precisa de `GTM.md` antes de abrir o
   relógio do funil.** Sem GTM.md, não há plano de trazer as 10 conversas —
   e funil sem plano de tração é morte por inanição, não por falta de dor.
   (Fase 2, com aprovação: `cobertura.test.ts` exige GTM.md onde há `tela`,
   como já exige NAO-FAREMOS.md.)
2. **IA escreve as peças antes de publicar; humano aprova.** Em produção,
   marketing é dado e rotina. Nenhum texto público é gerado em runtime.
3. **Copy nunca promete o que a regra não entrega.** Os limites de honestidade
   do GTM.md herdam o NAO-FAREMOS.md do produto. Claim legal precisa de fonte
   no FONTES.md — mesma disciplina, mesmo padrão `NÃO CONFIRMADO`.
4. **Sinais fecham o loop:** as peças geram conversas → a tabela `sinais` mede →
   o funil decide. Marketing é INPUT mensurável do funil, não departamento.
5. **Diário de bordo obrigatório:** data, canal, ação, conversas, interesses.
   O funil aprende com o que já foi testado (hoje essa memória se perde).

## Estrutura do GTM.md (template)

```markdown
# GTM — <produto> (Camada 4 · Praça)
> Relógio: início DD/MM → veredito DD/MM (10 conversas reais, ≥1 pagador)

## 1. A dor em uma frase
## 2. Quem é o pagador (e o sinal de pagador no produto)
## 3. Canais (custo × velocidade; qual conta pros 14 dias e qual não)
## 4. Peças prontas (post de grupo ×2, roteiro de vídeo 30s, resposta-tipo)
## 5. Métrica (definição de conversa real ANTES de começar)
## 6. Janela de teste (se sazonal — ver proposta janelaDeTeste)
## 7. Limites de honestidade (herdados do NAO-FAREMOS.md)
## 8. Diário de bordo
```

## O que a Praça NÃO é

- Não é growth hacking escuro: sem spam, sem claim falso, sem dark pattern.
  A honestidade radical é o fosso do ecossistema; marketing que a corrói
  destrói todos os produtos ao mesmo tempo.
- Não é automação de postagem em produção (bot postando é contra a regra de
  canal e contra os termos dos grupos). A máquina escreve; a pessoa publica.
- Não é garantia de tração: ela mede honestamente e deixa o funil matar.

## Primeira implementação

`products/multa-contestavel/GTM.md` (branch `produto/multa-gtm`) — relógio
13/10 → 27/10/2026. Serve de piloto do template antes de virar obrigatório.
