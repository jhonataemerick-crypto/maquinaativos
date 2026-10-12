# Fontes legais e o que NÃO foi confirmado

## Confirmado na fonte oficial (lido em 13/10/2026)

- **Teto de R$ 81.000/ano**: LC 123/2006, art. 18-A, § 1º.
  https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm
  Página oficial do Ministério do Empreendedorismo confirma "atualmente, o limite é de R$ 81 mil":
  https://www.gov.br/memp/pt-br/teto-do-mei
- **Limite proporcional no ano de abertura**: R$ 6.750 (81.000/12) × meses de atividade, fração de mês conta como mês inteiro.
  Manual do Desenquadramento do SIMEI (Receita Federal), item 4.2:
  https://www8.receita.fazenda.gov.br/SimplesNacional/Arquivos/manual/MANUAL_DESENQUADRAMENTO_SIMEI.pdf
- **Excesso até 20%** (acima de R$ 81.000 e até R$ 97.200): desenquadramento obrigatório com efeitos a partir de 1º de janeiro do ano seguinte; comunicar até o último dia útil do mês subsequente ao excesso; recolhe-se DAS de excesso sobre a parcela que passou.
  Mesmo manual, item 4.1.1.
- **Excesso acima de 20%** (acima de R$ 97.200): desenquadramento retroativo a 1º de janeiro do ano do excesso (ou à data de abertura, no ano-calendário de início de atividades); comunicar até o último dia útil do mês subsequente.
  Mesmo manual, itens 4.1.2 e 4.2.2.
- **DASN-SIMEI até 31 de maio** do ano seguinte, obrigatória para quem foi MEI por ao menos um dia no ano-calendário, mesmo com faturamento zero:
  https://www.gov.br/pt-br/servicos/declarar-receita-bruta-anual-para-o-mei
  Manual DASN-SIMEI (Receita): "até o último dia do mês de maio do ano-calendário seguinte":
  https://www8.receita.fazenda.gov.br/simplesnacional/arquivos/manual/manual_dasn-simei.pdf
- **DAS vence todo dia 20** (prorroga-se para o próximo dia útil):
  https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/pagamento-de-contribuicao-mensal/como-pagar-o-das
- **Valores do DAS em 2026** (R$ 82,05 comércio/indústria; R$ 86,05 serviços; R$ 87,05 misto): composição de 5% do salário mínimo (INSS, LC 123/2006, art. 18-A) + R$ 1 de ICMS e/ou R$ 5 de ISS. Salário mínimo de 2026 = R$ 1.621,00:
  Decreto 12.797/2025 — https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm
  Conferência cruzada com divulgação do Sebrae (jan/2026).

## Interpretação adotada (não é regra legal)

- **"Perto do limite" (80%)**: faixa de alerta definida pelo produto para avisar antes de estourar o teto. Não existe na lei; é heurística de UX.

## NÃO CONFIRMADO (não codificado como certeza)

- **PLP 186/2026** (teto de R$ 110 mil em 2027, R$ 140 mil em 2028 e 2 empregados): em tramitação na Câmara, NÃO votado nem sancionado até 13/10/2026. A regra usa R$ 81 mil. Se virar lei, atualizar `LIMITE_ANUAL_CENTAVOS` por ano-calendário.
  https://www.camara.leg.br/enquetes/2635476
- **Valor da multa por atraso da DASN-SIMEI** (mínimo de R$ 50, citado por fontes secundárias): o Manual DASN-SIMEI confirma a existência da multa (MAED, com DARF na transmissão fora do prazo) mas o valor mínimo não foi conferido em fonte oficial. Por isso os textos dizem apenas "gera multa".
- **Prazo de inadimplência que leva o CNPJ à inaptidão por falta de DASN** (costuma-se citar 2 anos consecutivos): não conferido em fonte oficial nesta sessão. Textos falam em "omissão prolongada", sem prazo.
