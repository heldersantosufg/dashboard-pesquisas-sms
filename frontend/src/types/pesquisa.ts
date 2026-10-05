/** Ordem de exibição: níveis acadêmicos primeiro, depois os demais vínculos. */
export const NATUREZAS = [
  'Graduação',
  'Residência',
  'Especialização',
  'Mestrado',
  'Doutorado',
  'Institucional',
  'Extensão',
] as const

export type Natureza = (typeof NATUREZAS)[number]

/**
 * Situação da pesquisa no fluxo da SMS. A regra que classifica cada registro da
 * planilha ainda está em validação (docs/pendencias-validacao.md, item 1).
 */
export type Situacao = 'em_analise' | 'em_execucao' | 'finalizada' | 'cancelada'

export interface Instituicao {
  sigla: string
  nome: string
}

export interface UnidadeSaude {
  nome: string
  distrito: string
}

/** Registro de pesquisa já normalizado. Não contém dados pessoais (RN06). */
export interface Pesquisa {
  protocolo: string
  /** Data no formato AAAA-MM-DD. */
  dataProtocolo: string
  situacao: Situacao
  instituicao: Instituicao
  programa: string
  natureza: Natureza
  linhaPesquisa: string
  /** Diretoria da SMS relacionada à pesquisa. */
  areaSms: string
  unidades: UnidadeSaude[]
}

export interface BaseDePesquisas {
  /** Data da última publicação, no formato AAAA-MM-DD. */
  atualizadoEm: string
  /** Base de demonstração, com números fictícios. */
  ficticia: boolean
  pesquisas: Pesquisa[]
}
