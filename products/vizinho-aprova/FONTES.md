# FONTES — vizinho-aprova

Regra da casa: fato legal sem fonte oficial vira `NÃO CONFIRMADO` e nunca entra em
código como certeza. Verificado em 2026-10-13.

## Confirmado (com fonte)

### Responsabilidade da plataforma por conteúdo de terceiros

- Lei 12.965/2014 (Marco Civil da Internet), arts. 18, 19 e 21:
  https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm
- **STF, Temas 987 e 533 de repercussão geral (RE 1.037.396/SP e RE 1.057.258/MG)** —
  julgamento concluído em 26/06/2025, embargos ajustados em junho/2026. O art. 19
  foi declarado **parcialmente inconstitucional**:
  - Regra geral: plataforma notificada (judicial ou extrajudicialmente) de conteúdo
    criminoso/ilícito que não remove responde **solidariamente** com o autor, salvo
    dúvida razoável de ilicitude após diligência qualificada.
  - Ofensas à honra (calúnia, difamação, injúria): permanece o art. 19 — ordem
    judicial necessária para responsabilizar, mas a plataforma **pode** remover por
    notificação extrajudicial.
  - Contas denunciadas como inautênticas seguem a regra da responsabilidade solidária.
  Fonte oficial (andamento e tese):
  https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=5160549&numeroProcesso=1037396&classeProcesso=RE&numeroTema=987

**Consequência de design (não é opcional):** canal de denúncia com SLA de análise
humana, diligência documentada em cada notificação, direito de resposta do
estabelecimento.

### Proteção de dados dos avaliadores

- Lei 13.709/2018 (LGPD): https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
  Verificação de vizinhança deve minimizar dados: sem documento, sem geolocalização
  exata persistida.

### Publicidade e reviews

- CDC (Lei 8.078/1990), art. 6º, III (informação clara) e art. 37 (publicidade
  enganosa/abusiva): https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm
  Review comprada sem identificação pode configurar publicidade enganosa.

### Consulta de CNPJ

- Situação cadastral de CNPJ é dado público (Receita Federal). Serviço de consulta:
  https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp
  **Termos de uso/rate limit de API pública: NÃO CONFIRMADO** — no piloto a consulta
  é manual (humano), só vira automação depois de confirmar base legal e técnica.

## NÃO CONFIRMADO (não usar como certeza)

- Volume/percentual de reviews falsos em plataformas de avaliação no Brasil.
- Políticas internas de moderação do Google Maps (mudam sem aviso; não são base).
- Precificação de referência para selo/página (R$ 29/mês é chute de funil, o teste
  de pagador decide).
- Existência de concorrente hiperlocal ativo na Paraíba (checar no dia 1 do funil).

## Diligência pendente antes de qualquer código

1. Reler a tese final dos Temas 987/533 no portal do STF (link acima) e registrar
   o texto da versão vigente na data.
2. Confirmar forma de verificação de vizinhança compatível com LGPD (minimização).
3. Confirmar base legal/técnica da consulta automatizada de CNPJ.
