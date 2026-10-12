# Perícia INSS — Especificação (ficha de funil, v0)

> **Estágio: ficha.** Sem `index.ts` ainda — primeiro passa pelo funil (14 dias, 10 conversas reais).
> Nome de trabalho: "Seu atestado passa?" — triagem documental do Novo Atestmed.
> Filosofia máquina de ativos: IA generativa só antes de publicar; em produção, regra pura.

---

## 1. A dor e a tese

**Dor:** o segurado adoece, fica sem renda e entra na fila do INSS — o estoque nacional
é de milhões de requerimentos. Desde março/2026 o jogo mudou: o **Novo Atestmed**
(Portarias Conjuntas MPS/INSS 13, 14 e 15/2026, base na Lei 15.265/2025) permite
concessão do auxílio por incapacidade temporária **sem perícia presencial**, por
análise documental. Mas a análise deixou de ser formal e virou **substantiva**: o
perito avalia se o conjunto de documentos *demonstra* a incapacidade. Atestado fraco
= indeferimento. **Três indeferimentos documentais consecutivos = perícia presencial
obrigatória** — a pessoa volta para o fim da fila física.

**Tese:** a diferença entre receber em dias e esperar meses está na **qualidade do
documento**, e isso é verificável por checklist puro antes de enviar. O segurado não
precisa de advogado para saber que falta CID, prazo de afastamento ou que a foto está
ilegível — precisa de uma triagem honesta em segundos.

**Por que agora:** a regra é de março/2026 — milhões de segurados (e boa parte dos
advogados pequenos) ainda operam com a mentalidade do Atestmed antigo. Janela aberta.

---

## 2. Gargalo físico (por que a máquina não resolve, mas lucra em volta)

- A **perícia presencial** continua existindo: para incapacidade permanente, BPC,
  prorrogação, quem estourou o saldo de 90 dias documentais ou quem acumulou 3
  indeferimentos. Ninguém "fura" isso com software — e não prometeremos.
- O que é digital e nosso: **triagem documental antes do envio** (o requerimento é
  100% online no Meu INSS), **gestão de prazos** (recurso 30 dias; novo pedido 30
  dias; prorrogação indeferida 180 dias; saldo documental 90 dias cumulativos) e
  **prova** do que foi enviado (sinergia com prova-digital: carimbar o conjunto
  documental na data do envio).

---

## 3. O produto v1 (se passar no funil)

Formulário → regra pura → veredito com texto humano:

```
já teve indeferimento documental? quantos? atestado tem CID? tem prazo de
afastamento? tem CRM/assinatura legível? tem laudo/exame além do atestado?
é prorrogação? já usou quantos dias de Atestmed no ano?
        │
        ├─ 3+ indeferimentos documentais → perícia presencial obrigatória (orienta)
        ├─ prorrogação → presencial/telemedicina (documental não prorroga)
        ├─ documento fraco (sem CID, sem prazo, ilegível) → "arruma antes de enviar"
        ├─ conjunto forte (atestado + laudo + exames) → "documentação completa"
        ├─ prazos mortos (recurso/novo pedido) vencendo → alerta de prazo
        └─ dados insuficientes → aguardando_dados
```

O veredito nunca diz "vai ser concedido" — diz "seu documento está pronto para ser
analisado" ou "falta X, Y, Z; junte antes de pedir".

---

## 4. Ficha do funil (preenchida na origem)

| Campo do funil | Valor |
|---|---|
| evidenciaDor | sim — fila nacional documentada; indeferimento documental é queixa massiva |
| sacadaCopiavel | **não** — fosso = checklist vivo das portarias + base de desfechos reais |
| margemPorCasoCentavos | estimada: R$ 27–47 por "revisão completa do conjunto" paga (a definir) |
| conversasReais (alvo) | 10 em 14 dias, ≥1 disposta a pagar |
| janelaDeTeste | qualquer época (dor contínua) |
| canal do teste | grupos de MEI/autônomos (segurado contribuinte individual = nosso público), advogados previdenciaristas pequenos como canal B2B2C |

**Sinal de pagador:** quem marcar "já tive um indeferimento". Quem perdeu 30 dias de
benefício por um atestado ilegível paga para não perder de novo.

---

## 5. Critério de morte

Padrão da casa: 14 dias, 10 conversas reais, ≥1 pagador. Específico desta ficha:
se as conversas mostrarem que a dor real é "quero alguém que faça por mim"
(serviço), e não "quero saber se está certo" (triagem), a ficha morre como produto
self-service e renasce como canal de advogados parceiros (outra ficha).

---

## 6. O que NÃO faremos

- Não é aconselhamento jurídico nem previdenciário; não protocolamos nada no Meu INSS.
- **Nunca pedimos senha gov.br.** O usuário opera o próprio pedido.
- Não prometemos concessão nem "acelerar" o INSS — golpe clássico; nossa honestidade é o fosso.
- Não avaliamos mérito médico (se a doença incapacita): só completude e coerência documental.
- Não tratamos aposentadoria por incapacidade permanente, BPC nem auxílio-acidente na v1
  (análise documental deles é triagem para perícia, não substituição — Portaria 15/2026).
- Não guardamos atestado nem dado de saúde: triagem por respostas, não por upload, na v1.

---

## 7. Roadmap

| Fase | Escopo | Gate |
|---|---|---|
| ficha | esta especificação + FONTES | dono aprova teste |
| funil | landing + triagem por respostas, sem cobrar | 10 conversas / 14 dias |
| v1 | produto completo (defineProduto) + alertas de prazo | funil vivo |
| v1.5 | leitura assistida do atestado (IA propõe campos, usuário confirma, regra decide) — kit isolado, nunca decide | primeiros pagamentos |
| v2 | carimbo do conjunto documental no prova-digital + lembretes de prazo | receita recorrente |
| v3 | canal B2B para advogados previdenciaristas | volume B2C provado |

---

## 8. Riscos

- **Caráter transitório da regra:** a ampliação para 90 dias é "excepcional e
  transitória" (Portaria 14/2026). Se o Executivo revogar, o produto muda textos e
  constantes — por isso tudo vive em dados, não espalhado no código.
- **Sensibilidade regulatória:** flertar com advocacia é o risco existencial. O
  NAO-FAREMOS é a defesa: triagem documental, nunca parecer.
- **Fonte oficial ruim de ler:** as portarias são densas e as páginas gov.br mudam.
  FONTES.md separa o que veio de lei/DOU do que veio de doutrina (marcado).
