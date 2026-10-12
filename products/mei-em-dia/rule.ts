import type { Contexto, Veredito } from '@maquina/core'
import { reaisParaCentavos } from '@maquina/core'

export type EstadoMei =
  | 'aguardando_dados'
  | 'em_dia'
  | 'atencao'
  | 'irregular'
  | 'desenquadrar_janeiro'
  | 'desenquadrar_retroativo'

export type MotivoMei =
  | 'falta_faturamento'
  | 'excesso_acima_20'
  | 'excesso_ate_20'
  | 'das_em_atraso'
  | 'dasn_em_atraso'
  | 'dasn_prazo_aberto'
  | 'perto_do_limite'
  | 'tudo_certo'

export interface EntradaMei {
  /** Receita bruta acumulada no ano corrente, em reais. null = a pessoa não sabe informar. */
  faturamentoAno: number | null
  /** CNPJ aberto no ano corrente (ativa o limite proporcional). */
  abriuEsteAno: boolean
  /** Mês de abertura (1–12). Obrigatório quando abriuEsteAno; fração de mês conta como mês inteiro. */
  mesAbertura: number | null
  /** Quantas guias DAS vencidas estão sem pagar. */
  mesesDASAtrasados: number
  /** Entregou a DASN-SIMEI do ano anterior? Irrelevante para quem abriu o CNPJ neste ano. */
  entregouDASN: boolean
}

/** LC 123/2006, art. 18-A, § 1º: R$ 81.000/ano. Vigente em 2026 — o PLP 186/2026 (110 mil em 2027) NÃO virou lei (ver FONTES.md). */
export const LIMITE_ANUAL_CENTAVOS = 8_100_000

/** Limite mensal do ano de abertura: R$ 6.750 (81.000 / 12). Manual do Desenquadramento do SIMEI, Receita. */
export const LIMITE_MENSAL_CENTAVOS = 675_000

/** Limite do caso em centavos: anual, ou proporcional aos meses de atividade no ano de abertura. */
export function limiteDe(c: EntradaMei): number {
  if (!c.abriuEsteAno || c.mesAbertura === null) return LIMITE_ANUAL_CENTAVOS
  return LIMITE_MENSAL_CENTAVOS * (12 - c.mesAbertura + 1)
}

/** Prazo da DASN-SIMEI do ano anterior: 31 de maio do ano corrente (gov.br e Manual DASN-SIMEI). */
export function prazoDASN(hoje: string): string {
  return `${hoje.slice(0, 4)}-05-31`
}

/**
 * Regra pura. Avalia a situação declarada pelo próprio MEI; não consulta Receita nem PGMEI.
 * Comparações em centavos inteiros (dinheiro nunca é float no motor).
 * Ordem: excesso de limite (mais grave) → DAS/DASN em atraso → alertas → em dia.
 */
export function regra(c: EntradaMei, ctx: Contexto): Veredito<EstadoMei, MotivoMei> {
  if (c.faturamentoAno === null) return { estado: 'aguardando_dados', motivo: 'falta_faturamento' }

  const limite = limiteDe(c)
  const fat = reaisParaCentavos(c.faturamentoAno)

  // Manual do Desenquadramento: até 20% acima do limite → efeitos em 1º de janeiro do ano seguinte;
  // acima de 20% → retroativo a 1º de janeiro do ano do excesso (ou à abertura, no ano de início).
  if (fat * 5 > limite * 6) return { estado: 'desenquadrar_retroativo', motivo: 'excesso_acima_20' }
  if (fat > limite) return { estado: 'desenquadrar_janeiro', motivo: 'excesso_ate_20' }

  if (c.mesesDASAtrasados > 0) return { estado: 'irregular', motivo: 'das_em_atraso' }

  // Quem abriu o CNPJ neste ano ainda não deve DASN (a primeira vence em 31/05 do ano que vem).
  if (!c.abriuEsteAno && !c.entregouDASN) {
    if (ctx.hoje > prazoDASN(ctx.hoje)) return { estado: 'irregular', motivo: 'dasn_em_atraso' }
    return { estado: 'atencao', motivo: 'dasn_prazo_aberto' }
  }

  // Faixa de alerta de 80% é heurística DO PRODUTO (não é regra legal — ver FONTES.md).
  if (fat * 5 >= limite * 4) return { estado: 'atencao', motivo: 'perto_do_limite' }

  return { estado: 'em_dia', motivo: 'tudo_certo' }
}
