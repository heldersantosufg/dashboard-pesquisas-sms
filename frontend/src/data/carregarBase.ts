import type { BaseDePesquisas } from '../types/pesquisa.ts'

/**
 * Ponto único de acesso aos dados do painel. No protótipo, devolve a base
 * fictícia; na versão final, deve ler o arquivo publicado mensalmente a partir
 * da planilha (por exemplo, `fetch('dados/pesquisas.json')`) no mesmo formato.
 */
export async function carregarBaseDePesquisas(): Promise<BaseDePesquisas> {
  const { gerarBaseFicticia } = await import('./baseFicticia.ts')
  return gerarBaseFicticia()
}
