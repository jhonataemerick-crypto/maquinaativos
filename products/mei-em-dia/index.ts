import { z } from 'zod'
import { defineProduto, type Tela } from '@maquina/core'
import { regra, type EntradaMei, type EstadoMei, type MotivoMei } from './rule'

const tela: Tela<MotivoMei> = {
  titulo: 'Seu MEI está em dia?',
  subtitulo: 'Responda 5 perguntas e veja em segundos se o faturamento está dentro do limite, se falta DAS para pagar e se a declaração anual foi entregue.',
  aviso:
    'Esta ferramenta avalia só o que você informa — não consulta Receita nem PGMEI. As respostas seguem as regras oficiais do MEI (LC 123/2006 e manuais da Receita Federal). Não é aconselhamento contábil ou jurídico. Não pedimos CNPJ, CPF nem nome.',
  campos: [
    {
      nome: 'faturamentoAno',
      rotulo: 'Quanto o seu CNPJ faturou neste ano?',
      tipo: 'numero',
      opcional: true,
      ajuda: 'Some tudo o que entrou de janeiro até hoje (vendas, serviços, Pix de cliente). Se não souber agora, deixe em branco.',
    },
    {
      nome: 'abriuEsteAno',
      rotulo: 'Você abriu o CNPJ neste ano?',
      tipo: 'sim_nao',
      ajuda: 'Para quem abriu neste ano, o limite de faturamento é proporcional aos meses de atividade.',
    },
    {
      nome: 'mesAbertura',
      rotulo: 'Mês da abertura (1 a 12)',
      tipo: 'numero',
      opcional: true,
      ajuda: 'Só preencha se abriu o CNPJ neste ano. Janeiro = 1, dezembro = 12.',
    },
    {
      nome: 'mesesDASAtrasados',
      rotulo: 'Quantos meses de DAS estão sem pagar?',
      tipo: 'numero',
      ajuda: 'O DAS é a guia mensal do MEI (R$ 82,05 a R$ 87,05 em 2026) que vence todo dia 20. Deixe 0 se está tudo pago.',
    },
    {
      nome: 'entregouDASN',
      rotulo: 'Entregou a declaração anual (DASN-SIMEI) do ano passado?',
      tipo: 'sim_nao',
      ajuda: 'É a declaração que informa à Receita quanto você faturou no ano anterior. O prazo era 31 de maio.',
    },
  ],
  resultados: {
    falta_faturamento: {
      tom: 'espera',
      titulo: 'Precisamos do faturamento',
      explicacao: 'Sem o total que entrou no ano não dá para saber se você passou do limite de R$ 81 mil — a informação mais importante para o seu CNPJ.',
      proximoPasso: 'Some tudo o que entrou no CNPJ de janeiro até hoje (vendas, serviços, Pix de cliente) e preencha de novo.',
    },
    excesso_acima_20: {
      tom: 'alerta',
      titulo: 'Passou do limite em mais de 20%: vira ME com efeito retroativo',
      explicacao:
        'Pelo valor informado, você ultrapassou o limite do MEI em mais de 20%. Pela regra oficial, o desenquadramento volta a valer desde janeiro deste ano (ou desde a abertura do CNPJ), e o imposto dos meses passados é recalculado como microempresa.',
      proximoPasso:
        'Quanto antes comunicar no Portal do Simples Nacional, menor a conta. O prazo é o último dia útil do mês seguinte ao excesso. Um contador ajuda a recalcular os meses — este é o momento de ter um.',
    },
    excesso_ate_20: {
      tom: 'alerta',
      titulo: 'Passou do limite em até 20%: você vira ME em janeiro',
      explicacao:
        'Você passou do limite, mas ficou dentro da faixa de tolerância de 20%. Você termina o ano como MEI, paga um DAS extra sobre a parte que passou (na declaração anual) e vira microempresa (ME) a partir de 1º de janeiro do ano que vem.',
      proximoPasso: 'Comunique o desenquadramento no Portal do Simples Nacional até o último dia útil do mês que vem. E comece a cotar contador — ME não pode operar sem.',
    },
    das_em_atraso: {
      tom: 'alerta',
      titulo: 'Tem DAS sem pagar',
      explicacao:
        'Cada mês sem pagar soma multa e juros. A inadimplência longa pode levar o CNPJ à inaptidão e à dívida ativa — e corta benefícios do INSS, como aposentadoria e auxílio-doença.',
      proximoPasso:
        'Emita as guias em atraso no PGMEI (Portal do Simples Nacional) ou no app MEI — o próprio sistema já calcula multa e juros. Se a conta estiver alta, há parcelamento no próprio portal.',
    },
    dasn_em_atraso: {
      tom: 'alerta',
      titulo: 'A declaração anual está atrasada',
      explicacao:
        'A DASN-SIMEI do ano passado vencia em 31 de maio. Entregar fora do prazo gera multa, e a omissão prolongada pode deixar o CNPJ inapto, o que trava emissão de nota e benefícios.',
      proximoPasso: 'Ainda dá para entregar agora, no Portal do Simples Nacional. A multa é gerada na hora da transmissão — quanto antes, menor.',
    },
    dasn_prazo_aberto: {
      tom: 'neutro',
      titulo: 'A declaração anual ainda não foi entregue',
      explicacao:
        'Quem foi MEI por pelo menos um dia no ano passado precisa entregar a DASN-SIMEI até 31 de maio — mesmo com faturamento zero.',
      proximoPasso: 'Entregue grátis no Portal do Simples Nacional. Leva poucos minutos: é só informar o total faturado no ano.',
    },
    perto_do_limite: {
      tom: 'neutro',
      titulo: 'Você está perto do limite de faturamento',
      explicacao:
        'Seu faturamento já passou de 80% do teto de R$ 81 mil. Se estourar, você vira microempresa — com contador obrigatório e impostos diferentes.',
      proximoPasso: 'Projete o que ainda deve entrar até dezembro. Se for passar do limite, planejar a virada para ME com antecedência sai mais barato do que ser pego de surpresa.',
    },
    tudo_certo: {
      tom: 'ok',
      titulo: 'Seu MEI está em dia',
      explicacao: 'Faturamento dentro do limite, DAS pago e declaração anual entregue. É isso que mantém o CNPJ ativo e os benefícios do INSS garantidos.',
      proximoPasso: 'Para continuar assim: o DAS vence todo dia 20 e a declaração anual do ano que vem vai até 31 de maio.',
    },
  },
  oferecerAjudaEm: ['das_em_atraso', 'dasn_em_atraso', 'excesso_ate_20', 'excesso_acima_20'],
  textoAjuda: 'Estamos avaliando oferecer ajuda para regularizar o MEI (guias em atraso, declaração anual, migração para ME). Deixe um contato para conversarmos sobre o seu caso.',
}

export const meiEmDia = defineProduto<EstadoMei, MotivoMei, EntradaMei>({
  nome: 'mei-em-dia',
  versao: 'v1',
  entrada: z
    .object({
      faturamentoAno: z.number().min(0).nullable(),
      abriuEsteAno: z.boolean(),
      mesAbertura: z.number().int().min(1).max(12).nullable(),
      mesesDASAtrasados: z.number().int().min(0).max(600),
      entregouDASN: z.boolean(),
    })
    .superRefine((v, ctx) => {
      if (v.abriuEsteAno && v.mesAbertura === null) {
        ctx.addIssue({ code: 'custom', path: ['mesAbertura'], message: 'informe o mês de abertura (1 a 12)' })
      }
      if (!v.abriuEsteAno && v.mesAbertura !== null) {
        ctx.addIssue({ code: 'custom', path: ['mesAbertura'], message: 'mês de abertura só vale para CNPJ aberto neste ano' })
      }
    }),
  estados: {
    aguardando_dados: { final: false, prazoDias: 7 },
    em_dia: { final: true },
    atencao: { final: true },
    irregular: { final: true },
    desenquadrar_janeiro: { final: true },
    desenquadrar_retroativo: { final: true },
  },
  estadoInicial: 'aguardando_dados',
  motivos: {
    falta_faturamento: 'aguardando_dados',
    excesso_acima_20: 'desenquadrar_retroativo',
    excesso_ate_20: 'desenquadrar_janeiro',
    das_em_atraso: 'irregular',
    dasn_em_atraso: 'irregular',
    dasn_prazo_aberto: 'atencao',
    perto_do_limite: 'atencao',
    tudo_certo: 'em_dia',
  },
  regra,
  tela,
  criterioDeMorte: { prazoDias: 14, metrica: 'conversas_reais', minimo: 10 },
  naoFaremos: [
    'Não consulta Receita, PGMEI nem e-CAC: avalia apenas o que a pessoa declara no formulário.',
    'Não é aconselhamento contábil, fiscal ou jurídico, e não fala com a Receita em nome do usuário.',
    'Não avalia empregado, atividade vedada (Anexo XI), filial nem participação em outra empresa na v1.',
    'Não calcula multa e juros de DAS em atraso, não emite guia, não entrega declaração nem pede parcelamento.',
    'Não pede CNPJ, CPF, nome nem senha gov.br: o formulário é anônimo.',
    'Não trata o MEI caminhoneiro separadamente na v1 (DAS com alíquota de 12% do salário mínimo).',
  ],
})

export default meiEmDia
