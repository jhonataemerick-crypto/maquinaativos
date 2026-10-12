import type { CasoDeTeste } from '@maquina/core'

const base = {
  faturamentoAno: 30_000,
  abriuEsteAno: false,
  mesAbertura: null,
  mesesDASAtrasados: 0,
  entregouDASN: true,
}
const hoje = { hoje: '2026-10-13' }

export const casos: CasoDeTeste[] = [
  { nome: 'sem faturamento informado, pede o dado', entrada: { ...base, faturamentoAno: null }, ctx: hoje, espera: { estado: 'aguardando_dados', motivo: 'falta_faturamento' } },
  { nome: 'tudo certo fica em dia', entrada: base, ctx: hoje, espera: { estado: 'em_dia', motivo: 'tudo_certo' } },
  { nome: 'no limite exato não é excesso, mas acende o alerta', entrada: { ...base, faturamentoAno: 81_000 }, ctx: hoje, espera: { estado: 'atencao', motivo: 'perto_do_limite' } },
  { nome: 'abaixo de 80% do limite não acende alerta', entrada: { ...base, faturamentoAno: 64_799 }, ctx: hoje, espera: { estado: 'em_dia', motivo: 'tudo_certo' } },
  { nome: 'excesso até 20% desenquadra em janeiro', entrada: { ...base, faturamentoAno: 90_000 }, ctx: hoje, espera: { estado: 'desenquadrar_janeiro', motivo: 'excesso_ate_20' } },
  { nome: 'excesso de exatos 20% ainda é janeiro', entrada: { ...base, faturamentoAno: 97_200 }, ctx: hoje, espera: { estado: 'desenquadrar_janeiro', motivo: 'excesso_ate_20' } },
  { nome: 'um centavo acima dos 20% é retroativo', entrada: { ...base, faturamentoAno: 97_200.01 }, ctx: hoje, espera: { estado: 'desenquadrar_retroativo', motivo: 'excesso_acima_20' } },
  { nome: 'limite proporcional no ano de abertura', entrada: { faturamentoAno: 50_000, abriuEsteAno: true, mesAbertura: 7, mesesDASAtrasados: 0, entregouDASN: false }, ctx: hoje, espera: { estado: 'desenquadrar_retroativo', motivo: 'excesso_acima_20' } },
  { nome: 'excesso vence DAS em atraso (mais grave primeiro)', entrada: { ...base, faturamentoAno: 90_000, mesesDASAtrasados: 3 }, ctx: hoje, espera: { estado: 'desenquadrar_janeiro', motivo: 'excesso_ate_20' } },
  { nome: 'DAS em atraso é irregular', entrada: { ...base, mesesDASAtrasados: 2 }, ctx: hoje, espera: { estado: 'irregular', motivo: 'das_em_atraso' } },
  { nome: 'DASN depois de 31 de maio é irregular', entrada: { ...base, entregouDASN: false }, ctx: { hoje: '2026-06-01' }, espera: { estado: 'irregular', motivo: 'dasn_em_atraso' } },
  { nome: 'até 31 de maio a DASN é só atenção', entrada: { ...base, entregouDASN: false }, ctx: { hoje: '2026-05-31' }, espera: { estado: 'atencao', motivo: 'dasn_prazo_aberto' } },
  { nome: 'quem abriu este ano ainda não deve DASN', entrada: { faturamentoAno: 10_000, abriuEsteAno: true, mesAbertura: 9, mesesDASAtrasados: 0, entregouDASN: false }, ctx: hoje, espera: { estado: 'em_dia', motivo: 'tudo_certo' } },
]
