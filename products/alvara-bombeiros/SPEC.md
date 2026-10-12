# Alvará Bombeiros — Especificação (ficha de funil, v0)

> **Estágio: ficha.** Sem `index.ts` ainda — primeiro passa pelo funil (14 dias, 10 conversas reais).
> UF piloto: **Paraíba** (CBMPB). A regra de incêndio é estadual; cada UF é um dataset curado.
> Filosofia máquina de ativos: IA generativa só antes de publicar; em produção, regra pura.

---

## 1. A dor e a tese

**Dor:** o empresário assina o aluguel, reforma o ponto e aí descobre que precisa do
Corpo de Bombeiros. Na Paraíba, a análise do projeto tem prazo legal de **30 dias,
prorrogável por mais 30** (Lei 9.625/2011, art. 12, § 1º, redação da Lei 12.678/2023) —
e isso é só a análise. Falta executar as medidas e passar na **vistoria presencial**.
Quem erra o enquadramento (PCI vs. PCIS simplificado) paga projeto errado, DAR errado
e perde 2–4 meses de aluguel sem abrir. Quem abre sem regularizar arrisca multa,
interdição e cassação do certificado (Lei 9.625/2011, arts. 25 e 34).

**Tese:** a dor não é "fazer o projeto" (isso é do engenheiro credenciado) — é
**saber antes de assinar o aluguel** quanto tempo, quanto custa e o que o oficial
vai olhar na vistoria. Informação que hoje só despachante tem.

**Por que agora:** o CBMPB migrou tudo para o sistema eletrônico (Bravo/DAT) e
publicou o Vade Mecum consolidado (2024) — a regra está escrita, pública e estável
o suficiente para virar dataset.

---

## 2. Gargalo físico (por que a máquina não resolve, mas lucra em volta)

- A **vistoria é presencial**, feita por oficial do CBMPB no imóvel. Software não
  substitui — e nunca prometeremos isso.
- O projeto só pode ser submetido por **responsável técnico credenciado** no CBMPB
  (NT 01/2024, item 8.2). Nosso produto não é RT nem substitui um.
- O que é digital e nosso: **triagem de enquadramento, checklist de vistoria,
  estimativa de prazo/custo e prova documental** (sinergia com prova-digital).

---

## 3. O produto v1 (se passar no funil)

Formulário → regra pura → veredito com texto humano:

```
ocupação (loja, restaurante, escritório, galpão, evento...), área (m²),
pavimentos, lotação, novo ou já funcionando, já autuado?
        │
        ├─ residência unifamiliar → isento (Lei 9.625/2011, parágrafo único)
        ├─ evento temporário → fluxo próprio (protocolo mín. 10 dias antes)
        ├─ baixa complexidade → PCIS (processo simplificado)
        ├─ demais casos → PCI (projeto completo via RT credenciado)
        ├─ já autuado/notificado → regularização com prazo (sanções art. 25)
        └─ dados insuficientes → aguardando_dados
```

Entregável do veredito: enquadramento provável + checklist do que o oficial avalia
(saídas de emergência, extintores, sinalização, iluminação, hidrantes, SPDA — lista
da própria página de análise do CBMPB) + estimativa de prazo (30+30 de análise)
e custo (taxas em UFR-PB) + aviso: "confirme com um RT credenciado".

**Dataset (o fosso):** NTs do CBMPB curadas e versionadas no repo, com fonte e data
de leitura. Quem copiar a tela copia nada — o valor está na curadoria.

---

## 4. Ficha do funil (preenchida na origem)

| Campo do funil | Valor |
|---|---|
| evidenciaDor | sim — aluguel parado é dor com boleto; sanções previstas em lei |
| sacadaCopiavel | **não** — a tela copia em 1 dia; o dataset curado por UF, não |
| margemPorCasoCentavos | estimada: R$ 47–97 por triagem completa paga (a definir no teste) |
| conversasReais (alvo) | 10 em 14 dias, ≥1 disposta a pagar |
| janelaDeTeste | qualquer época (dor não é sazonal) |
| canal do teste | grupos de empresários de João Pessoa/Campina Grande, contadores, arquitetos |

**Sinal de pagador:** quem já assinou o aluguel ou foi notificado. O formulário
pergunta "já está pagando aluguel no ponto?" — quem diz sim tem dinheiro queimando.

---

## 5. Critério de morte

Padrão da casa: 14 dias, 10 conversas reais, ≥1 pagador. Específico desta ficha:
se **>50% das conversas** terminarem em "isso é com meu engenheiro", a dor é do RT,
não do empresário — a ficha morre e renasce como produto PARA o RT (outra ficha).

---

## 6. O que NÃO faremos

- Não fazemos projeto, não submetemos processo, não somos responsáveis técnicos
  (vedado por lei: só RT credenciado — NT 01/2024, item 8).
- Não prometemos prazo de vistoria nem aprovação: quem analisa é o CBMPB.
- Não cobramos para "agilizar" junto ao CBMPB — isso é tráfico de influência, não produto.
- Não cobrimos outras UFs na v1 (cada estado é outra lei, outro dataset).
- Não tratamos eventos temporários na v1 (fluxo próprio, cartilha específica — fase 2).
- Não pedimos matrícula do imóvel, CNPJ nem documento — triagem anônima.

---

## 7. Roadmap

| Fase | Escopo | Gate |
|---|---|---|
| ficha | esta especificação + FONTES | dono aprova teste |
| funil | landing + formulário triagem, sem cobrar | 10 conversas / 14 dias |
| v1 | produto completo (defineProduto + dataset PB) | funil vivo |
| v1.5 | estimativa de custo em UFR-PB + checklist de vistoria por ocupação | primeiros pagamentos |
| v2 | eventos temporários + canal para RTs (B2B) | receita recorrente |
| v3 | próxima UF (PE ou CE — mesma lógica, outro dataset) | PB sustentável |

---

## 8. Riscos

- **NT 01/2024 em consulta pública:** a norma nova ainda não é a vigente. O dataset
  deve codificar a NT 11/2014 (vigente) e marcar a NT 01/2024 como "em transição".
- **Enquadramento errado nosso:** o veredito é "provável enquadramento", com aviso
  explícito e link pro canal oficial. Quem confirma é o RT e o CBMPB.
- **Mercado pequeno:** a Paraíba é piloto barato de validar; a escala vem da
  replicação por UF. Se o piloto não pagar aqui, não replica.
