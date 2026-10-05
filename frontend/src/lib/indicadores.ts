import { NATUREZAS, type Pesquisa, type Situacao } from '../types/pesquisa.ts'
import { compararTexto } from './formatacao.ts'

export type FiltroAno = number | 'todos'

export interface ItemDistribuicao {
  categoria: string
  quantidade: number
  /** Fração (0–1) das pesquisas consideradas que pertencem à categoria. */
  proporcao: number
  /** Presente só no item que soma as categorias excedentes ("Outros"). */
  agrupadas?: number
}

export interface Indicadores {
  cadastradas: number
  porSituacao: Record<Situacao, number>
  porInstituicao: ItemDistribuicao[]
  porUnidade: ItemDistribuicao[]
  porNatureza: ItemDistribuicao[]
  porDistrito: ItemDistribuicao[]
  porLinhaPesquisa: ItemDistribuicao[]
  porPrograma: ItemDistribuicao[]
  porAreaSms: ItemDistribuicao[]
}

type Extrator = (pesquisa: Pesquisa) => string | string[]

const instituicao: Extrator = (p) => `${p.instituicao.nome} (${p.instituicao.sigla})`
const unidades: Extrator = (p) => p.unidades.map((unidade) => unidade.nome)
const distritos: Extrator = (p) => p.unidades.map((unidade) => unidade.distrito)
const programa: Extrator = (p) => `${p.programa} (${p.instituicao.sigla})`
const areaSms: Extrator = (p) => p.areaSms

/** O filtro usa o ano da data de protocolo (critério ainda em validação). */
export function anoDoProtocolo(pesquisa: Pesquisa) {
  return Number(pesquisa.dataProtocolo.slice(0, 4))
}

export function anosDisponiveis(pesquisas: Pesquisa[]) {
  return [...new Set(pesquisas.map(anoDoProtocolo))].sort((a, b) => b - a)
}

/**
 * Indicadores gerais do período e distribuições das pesquisas em execução (RN02).
 */
export function calcularIndicadores(todas: Pesquisa[], ano: FiltroAno): Indicadores {
  const doPeriodo = ano === 'todos' ? todas : todas.filter((p) => anoDoProtocolo(p) === ano)
  const emExecucao = doPeriodo.filter((p) => p.situacao === 'em_execucao')

  const porSituacao: Record<Situacao, number> = {
    em_analise: 0,
    em_execucao: 0,
    finalizada: 0,
    cancelada: 0,
  }
  for (const pesquisa of doPeriodo) porSituacao[pesquisa.situacao] += 1

  return {
    cadastradas: doPeriodo.length,
    porSituacao,
    porInstituicao: distribuir(emExecucao, instituicao),
    porUnidade: distribuir(emExecucao, unidades),
    porNatureza: distribuir(emExecucao, (p) => p.natureza, NATUREZAS),
    // Colunas com categorias da base inteira: mesma ordem e mesmas colunas em qualquer ano.
    porDistrito: distribuir(emExecucao, distritos, categorias(todas, distritos)),
    porLinhaPesquisa: distribuir(emExecucao, (p) => p.linhaPesquisa),
    porPrograma: distribuir(emExecucao, programa),
    porAreaSms: distribuir(emExecucao, areaSms, categorias(todas, areaSms)),
  }
}

/**
 * Conta as pesquisas por categoria. Uma pesquisa com várias categorias (por
 * exemplo, mais de uma unidade) conta uma vez em cada, e a proporção é sempre
 * sobre o total de pesquisas. Sem `ordem`, os itens saem do maior para o menor.
 */
export function distribuir(
  pesquisas: Pesquisa[],
  extrair: Extrator,
  ordem?: readonly string[],
): ItemDistribuicao[] {
  const contagem = new Map<string, number>(ordem?.map((categoria) => [categoria, 0] as const))
  for (const pesquisa of pesquisas) {
    for (const categoria of new Set([extrair(pesquisa)].flat())) {
      contagem.set(categoria, (contagem.get(categoria) ?? 0) + 1)
    }
  }

  const itens = Array.from(contagem, ([categoria, quantidade]) => ({
    categoria,
    quantidade,
    proporcao: pesquisas.length > 0 ? quantidade / pesquisas.length : 0,
  }))
  if (ordem) return itens
  return itens.sort((a, b) => b.quantidade - a.quantidade || compararTexto(a.categoria, b.categoria))
}

/**
 * Mantém as `limite` primeiras categorias e soma as demais em um item só.
 * Use apenas em categorias de valor único, em que as proporções podem ser somadas.
 */
export function agruparExcedentes(
  itens: ItemDistribuicao[],
  limite: number,
  rotulo: string,
): ItemDistribuicao[] {
  if (itens.length <= limite + 1) return itens
  const excedentes = itens.slice(limite)
  return [
    ...itens.slice(0, limite),
    {
      categoria: rotulo,
      quantidade: excedentes.reduce((soma, item) => soma + item.quantidade, 0),
      proporcao: excedentes.reduce((soma, item) => soma + item.proporcao, 0),
      agrupadas: excedentes.length,
    },
  ]
}

function categorias(pesquisas: Pesquisa[], extrair: Extrator) {
  return [...new Set(pesquisas.flatMap(extrair))].sort(compararTexto)
}
