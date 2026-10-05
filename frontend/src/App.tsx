import { useMemo, useState } from 'react'
import { AvisoPrototipo } from './components/AvisoPrototipo.tsx'
import { Cabecalho } from './components/Cabecalho.tsx'
import { CartaoIndicador } from './components/CartaoIndicador.tsx'
import { EstadoCarga } from './components/EstadoCarga.tsx'
import { Painel } from './components/Painel.tsx'
import { PainelDistribuicao } from './components/PainelDistribuicao.tsx'
import { Rodape } from './components/Rodape.tsx'
import { TabelaDistribuicao } from './components/TabelaDistribuicao.tsx'
import { useBaseDePesquisas } from './hooks/useBaseDePesquisas.ts'
import { formatarPercentual, pluralizar } from './lib/formatacao.ts'
import { anosDisponiveis, calcularIndicadores, type FiltroAno } from './lib/indicadores.ts'

export default function App() {
  const carga = useBaseDePesquisas()
  const [ano, setAno] = useState<FiltroAno>('todos')
  const base = carga.status === 'pronta' ? carga.base : undefined

  const anos = useMemo(() => (base ? anosDisponiveis(base.pesquisas) : []), [base])
  const indicadores = useMemo(() => base && calcularIndicadores(base.pesquisas, ano), [base, ano])
  const distritoPorUnidade = useMemo(
    () => new Map(base?.pesquisas.flatMap((p) => p.unidades.map((u) => [u.nome, u.distrito] as const))),
    [base],
  )

  return (
    <div className="flex min-h-dvh flex-col">
      <Cabecalho
        anos={anos}
        ano={ano}
        aoMudarAno={setAno}
        atualizadoEm={base?.atualizadoEm}
        ficticia={base?.ficticia}
      />
      {base?.ficticia && <AvisoPrototipo />}

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6">
        {!indicadores ? (
          <EstadoCarga erro={carga.status === 'erro'} />
        ) : (
          <>
            <section aria-label="Indicadores gerais" className="grid gap-4 md:grid-cols-3">
              <CartaoIndicador
                titulo="Total de pesquisas cadastradas"
                valor={indicadores.cadastradas}
                detalhe={descreverDemaisSituacoes(indicadores.porSituacao.em_analise, indicadores.porSituacao.cancelada)}
              />
              <CartaoIndicador
                titulo="Total de pesquisas em execução"
                valor={indicadores.porSituacao.em_execucao}
                detalhe={`${parcela(indicadores.porSituacao.em_execucao, indicadores.cadastradas)} das cadastradas`}
              />
              <CartaoIndicador
                titulo="Total de pesquisas finalizadas"
                valor={indicadores.porSituacao.finalizada}
                detalhe={`${parcela(indicadores.porSituacao.finalizada, indicadores.cadastradas)} das cadastradas`}
              />
            </section>

            <section aria-labelledby="titulo-execucao" className="mt-8">
              <h2 id="titulo-execucao" className="text-lg font-semibold">
                Pesquisas em execução
              </h2>
              <p className="mt-0.5 text-sm text-slate-600">
                Base: {pluralizar(indicadores.porSituacao.em_execucao, 'pesquisa', 'pesquisas')} em execução, com
                protocolo {ano === 'todos' ? `de ${anos.at(-1)} a ${anos[0]}` : `em ${ano}`}. As proporções são
                calculadas sobre esse total.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
                <PainelDistribuicao
                  className="xl:col-span-3"
                  titulo="Instituição de ensino (IES)"
                  descricao="Instituição de ensino superior (ou instituição proponente) à qual a pesquisa está vinculada. As instituições com menos pesquisas aparecem somadas em “Outras instituições”; a visão em tabela lista todas."
                  rotuloCategoria="Instituição"
                  grafico="barras"
                  itens={indicadores.porInstituicao}
                  agrupar={{ limite: 8, rotulo: 'Outras instituições' }}
                />
                <Painel
                  className="xl:col-span-3"
                  titulo="Unidade de saúde"
                  descricao="Unidades de saúde onde as pesquisas em execução são realizadas. Uma pesquisa pode envolver mais de uma unidade; por isso, a soma das proporções pode passar de 100%."
                >
                  <TabelaDistribuicao
                    itens={indicadores.porUnidade}
                    rotuloCategoria="Unidade de saúde"
                    colunaExtra={{
                      titulo: 'Distrito sanitário',
                      valor: (unidade) => distritoPorUnidade.get(unidade) ?? '—',
                    }}
                    rotuloBusca="Buscar unidade ou distrito"
                  />
                </Painel>

                <PainelDistribuicao
                  className="xl:col-span-2"
                  titulo="Natureza da pesquisa"
                  descricao="Nível acadêmico ou tipo de vínculo da pesquisa: graduação, residência, especialização, mestrado, doutorado, pesquisa institucional ou extensão."
                  rotuloCategoria="Natureza"
                  grafico="colunas"
                  itens={indicadores.porNatureza}
                />
                <PainelDistribuicao
                  className="xl:col-span-2"
                  titulo="Linha de pesquisa"
                  descricao="Linha de pesquisa (eixo temático) informada no protocolo. As linhas menos frequentes aparecem somadas em “Outras linhas”; a visão em tabela lista todas."
                  rotuloCategoria="Linha de pesquisa"
                  grafico="barras"
                  itens={indicadores.porLinhaPesquisa}
                  agrupar={{ limite: 8, rotulo: 'Outras linhas' }}
                />
                <PainelDistribuicao
                  className="xl:col-span-2"
                  titulo="Distrito sanitário"
                  descricao="Distrito sanitário das unidades envolvidas. Uma pesquisa com unidades em mais de um distrito é contada em cada um deles; por isso, a soma pode passar de 100%."
                  rotuloCategoria="Distrito sanitário"
                  grafico="colunas"
                  itens={indicadores.porDistrito}
                />

                <PainelDistribuicao
                  className="xl:col-span-3"
                  titulo="Programa"
                  descricao="Programa ou curso ao qual a pesquisa está vinculada, com a sigla da instituição. Os programas menos frequentes aparecem somados em “Outros programas”; a visão em tabela lista todos."
                  rotuloCategoria="Programa (instituição)"
                  grafico="barras"
                  itens={indicadores.porPrograma}
                  agrupar={{ limite: 8, rotulo: 'Outros programas' }}
                />
                <PainelDistribuicao
                  className="md:col-span-2 xl:col-span-3"
                  titulo="Área da SMS (diretoria)"
                  descricao="Diretoria da SMS relacionada ao tema da pesquisa."
                  rotuloCategoria="Diretoria"
                  grafico="colunas"
                  itens={indicadores.porAreaSms}
                />
              </div>
            </section>
          </>
        )}
      </main>

      <Rodape />
    </div>
  )
}

function parcela(parte: number, total: number) {
  return total > 0 ? formatarPercentual(parte / total) : '—'
}

/** Explica a diferença entre as cadastradas e a soma de em execução + finalizadas. */
function descreverDemaisSituacoes(emAnalise: number, canceladas: number) {
  const partes = [
    emAnalise > 0 && `${pluralizar(emAnalise, 'em análise', 'em análise')}`,
    canceladas > 0 && pluralizar(canceladas, 'cancelada', 'canceladas'),
  ].filter(Boolean)
  return partes.length > 0 ? `Inclui ${partes.join(' e ')}` : undefined
}
