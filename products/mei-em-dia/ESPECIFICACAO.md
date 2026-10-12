# MEI em Dia — Especificação (v1)

> IA generativa só trabalhou antes de publicar (ficha, spec, código). Em produção roda regra pura.

## 1. A dor e a tese

**Dor:** o MEI não sabe responder três perguntas básicas sobre o próprio CNPJ:
(a) estou perto de estourar o limite de R$ 81 mil? (b) meus DAS estão pagos?
(c) entreguei a declaração anual? Descobrir errado custa caro: desenquadramento
retroativo com recálculo de imposto, CNPJ inapto, perda de benefícios do INSS.

**Tese:** uma triagem de 5 perguntas, anônima e em segundos, resolve a dúvida e
cria o momento de verdade para oferecer ajuda paga de regularização.

**Escala da dor (senso de mercado):** Brasil tem mais de 12 milhões de MEIs ativos;
o desenquadramento por excesso de faturamento e a inadimplência do DAS são as duas
maiores causas de irregularidade da categoria. Público exato do ecossistema comeca-ai.

## 2. O que a v1 faz

Formulário (5 campos) → regra pura → veredito com texto humano e próximo passo:

```
faturamentoAno, abriuEsteAno, mesAbertura, mesesDASAtrasados, entregouDASN
        │
        ├─ sem faturamento → aguardando_dados / falta_faturamento
        ├─ > limite + 20%  → desenquadrar_retroativo  (vira ME desde janeiro)
        ├─ > limite        → desenquadrar_janeiro     (vira ME em 1º de janeiro)
        ├─ DAS em atraso   → irregular / das_em_atraso
        ├─ DASN atrasada   → irregular / dasn_em_atraso  (depois de 31/05)
        ├─ DASN pendente   → atencao / dasn_prazo_aberto (até 31/05)
        ├─ ≥ 80% do limite → atencao / perto_do_limite
        └─ resto           → em_dia / tudo_certo
```

Limite proporcional para CNPJ aberto no ano (R$ 6.750 × meses de atividade).
Quem abriu no ano não deve DASN ainda.

## 3. Onde mora o negócio (funil)

1. Triagem gratuita (esta v1) — atrai e gera confiança.
2. Sinal de pagador: `oferecerAjudaEm` nos 4 motivos de irregularidade/excesso.
3. Produto pago futuro: regularização guiada (parcelamento de DAS, DASN atrasada,
   comunicação de desenquadramento, migração MEI → ME com contador parceiro).
4. Sinergia com o ecossistema: prova-digital (carimbar comprovantes) e funil
   alimentado pelos sinais anônimos.

## 4. Critério de morte

14 dias, 10 conversas reais, ao menos 1 pessoa disposta a deixar contato nos
motivos de ajuda. Se ninguém irregular quiser ajuda, a dor não dói o suficiente
para pagar — o produto morre no funil.

## 5. Roadmap

| Fase | Escopo | Gate |
|---|---|---|
| v1 | triagem de 5 perguntas (este produto) | — |
| v1.5 | lembrete de prazo (dia 20 DAS, 31/05 DASN) por contato consentido | funil das 10 conversas |
| v2 | regularização guiada paga (PIX) + parcelamento passo a passo | sinal de pagador |
| v3 | migração MEI→ME assistida com contador parceiro | receita da v2 |

## 6. Riscos e honestidade

- **Não é contador:** toda saída diz que é triagem, não aconselhamento. O
  próximo passo sempre aponta o canal oficial (Portal do Simples Nacional / PGMEI).
- **LGPD:** zero dado identificável — nem CNPJ. Sinais vão para a tabela anônima.
- **Mudança de lei:** o PLP 186/2026 pode elevar o teto a partir de 2027.
  FONTES.md marca o que revisar; a constante `LIMITE_ANUAL_CENTAVOS` é o único
  ponto de alteração.
