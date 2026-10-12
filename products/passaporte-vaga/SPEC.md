# Passaporte Vaga — Especificação (ficha de funil, v0)

> **Estágio: ficha.** Sem `index.ts` ainda — primeiro passa pelo funil, **na janela certa**
> (dor sazonal: dez/jan e jul). Testar fora de temporada mede errado — ver melhoria
> proposta ao funil na seção 4.
> Filosofia máquina de ativos: IA generativa só antes de publicar; em produção, regra pura.

---

## 1. A dor e a tese

**Dor:** quem precisa do passaporte descobre tarde demais que o processo tem uma
**ordem obrigatória** (formulário → GRU → esperar a compensação → só então agendar),
que a coleta biométrica é **presencial** num posto da PF, que as vagas somem em horas
na alta temporada, e que qualquer documento errado no dia = semanas perdidas. E há
pegadinhas caras: passaporte pronto não retirado em **90 dias corridos é cancelado
com perda total da taxa** (R$ 257,25); GRU paga vale por 5 anos, mas quem não sabe
disso paga de novo.

**Tese:** a dor tem duas camadas. A permanente é o **checklist à prova de erro**
(documentos por perfil: primeira via, renovação, extravio — taxa dobra para R$ 514,50
se o anterior válido foi perdido —, menor de idade, quitação eleitoral e militar).
A sazonal é a **vaga**: na alta temporada, quem monitora cancelamentos consegue
semana que vem; quem não monitora, pega mês que vem.

**Por que agora (e quando):** em meses normais de 2026 há vaga na mesma semana — ou
seja, **o funil só mede de verdade na janela de dez/jan ou jul**. Testar em novembro
daria falso negativo.

---

## 2. Gargalo físico (por que a máquina não resolve, mas lucra em volta)

- **Coleta biométrica presencial** em posto da PF: insubstituível. A retirada também
  é na mesma unidade do atendimento (escolha de posto = compromisso logístico).
- Não existe lista de espera oficial: o sistema abre vagas e quem vê primeiro, pega.
- O que é digital e nosso: **ordem correta dos passos** (a maioria erra tentando
  agendar antes de pagar), **checklist por perfil**, **alertas de prazo** (90 dias
  de retirada; compensação do boleto em até 72h) e, na fase 2, **radar de vagas**
  (kit isolado de monitoramento — é efeito/integração, nunca parte da regra pura).

---

## 3. O produto v1 (se passar no funil)

Formulário → regra pura → veredito com texto humano:

```
perfil (primeira via / renovação / extravio ou perda / menor de idade),
tem passagem comprada? para quando? já pagou a GRU? há quanto tempo?
posto pretendido (qualquer um do país vale), tem todos os documentos?
        │
        ├─ ordem errada (tentando agendar sem pagar) → "pague a GRU primeiro"
        ├─ boleto pago há <72h → "aguarde a compensação; Pix/cartão caem em minutos"
        ├─ extravio com anterior válido → alerta de taxa dobrada (R$ 514,50)
        ├─ menor de idade → checklist de responsáveis
        ├─ passagem em <30 dias sem vaga → "avalie outro posto + urgência (+R$ 77,17)"
        ├─ passaporte pronto não retirado perto de 90 dias → alerta de cancelamento
        └─ dados insuficientes → aguardando_dados
```

---

## 4. Ficha do funil (preenchida na origem)

| Campo do funil | Valor |
|---|---|
| evidenciaDor | sim — sazonal documentada: vagas de terça-feira somem em horas em jul e dez/jan |
| sacadaCopiavel | parcialmente — o checklist copia; o radar de vagas com histórico, não |
| margemPorCasoCentavos | estimada: R$ 19–37 pelo alerta de vaga na janela (a definir) |
| conversasReais (alvo) | 10 em 14 dias, ≥1 disposta a pagar |
| **janelaDeTeste** | **dez–jan ou jul** (fora dela, o teste mede errado — ver proposta abaixo) |
| canal do teste | grupos de viagem, agências pequenas de turismo, "passagem comprada e passaporte vencido" |

**Proposta de melhoria do framework (dor sazonal):** o funil hoje tem só
`inicio` + prazo de 14 dias. Sugerir campo `janelaDeTeste` (livre: "só dez/jan") —
ficha sazonal **não entra em teste fora da janela**, e o relógio de 14 dias conta
dentro dela. Sem isso, o funil mata ideia boa testada no mês errado (falso negativo)
ou aprova ideia fraca testada no pico (falso positivo).

**Sinal de pagador:** quem tem passagem comprada para menos de 60 dias. Urgência +
capacidade de pagamento na mesma pessoa.

---

## 5. Critério de morte

Padrão da casa, **dentro da janela**: 14 dias de alta temporada, 10 conversas reais,
≥1 pagador. Específico desta ficha: se ninguém pagar pelo alerta de vaga mas todos
usarem o checklist, o produto vira isca gratuita (SEO forte: "documentos passaporte
2026") e a camada paga morre — desfecho honesto e barato.

---

## 6. O que NÃO faremos

- Não agendamos em nome do usuário nem pedimos senha gov.br — o agendamento é
  exclusivamente no site oficial da PF.
- Não vendemos "vaga garantida" nem intermediamos — sites que cobram pelo agendamento
  são fraude conhecida; nosso posicionamento é o antídoto, nunca o golpe.
- Não emitimos nem prometemos documento: quem emite é só a Polícia Federal.
- Radar de vagas (fase 2) é consulta pública ao sistema da PF em frequência educada;
  se houver bloqueio ou termo de uso contrário, o radar morre e o checklist fica.
- Não cobrimos vistos consulares na v1 (outro órgão, outra regra, outra ficha).

---

## 7. Roadmap

| Fase | Escopo | Gate |
|---|---|---|
| ficha | esta especificação + FONTES | dono aprova teste |
| funil | landing + checklist por perfil, sem cobrar — **só na janela dez/jan** | 10 conversas / 14 dias |
| v1 | produto completo (defineProduto) + alertas de prazo | funil vivo |
| v2 | radar de vagas pago (alerta por contato consentido) | sinal de pagador |
| v3 | canal B2B para agências de turismo pequenas | receita recorrente |

---

## 8. Riscos

- **Sazonalidade:** o produto dorme 8–10 meses por ano. É feature de portfólio, não
  negócio standalone — os custos fixos têm que ser ~zero (Cloudflare free tier cobre).
- **Dependência do sistema da PF:** o radar depende de o SINPA seguir público e
  estável. Mudança de layout derruba a fase 2 (mas não o checklist).
- **Margem pequena:** ticket baixo, volume sazonal — a margem por caso precisa ser
  medida de verdade no funil, não estimada com carinho.
