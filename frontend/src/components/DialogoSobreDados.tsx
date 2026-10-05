import { X } from 'lucide-react'
import type { ReactNode, Ref } from 'react'
import { formatarData } from '../lib/formatacao.ts'

interface DialogoSobreDadosProps {
  ref: Ref<HTMLDialogElement>
  atualizadoEm?: string
  ficticia?: boolean
}

/** Diálogo nativo (`showModal`): Esc e o botão fecham; clique fora também. */
export function DialogoSobreDados({ ref, atualizadoEm, ficticia }: DialogoSobreDadosProps) {
  return (
    <dialog
      ref={ref}
      aria-labelledby="sobre-dados-titulo"
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) evento.currentTarget.close()
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-xl bg-white p-0 text-left text-slate-700 shadow-2xl backdrop:bg-slate-950/50"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="sobre-dados-titulo" className="text-lg font-semibold text-slate-900">
            Sobre os dados
          </h2>
          <form method="dialog">
            <button
              aria-label="Fechar"
              className="grid size-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-marca-450"
            >
              <X className="size-5" aria-hidden />
            </button>
          </form>
        </div>

        <dl className="mt-4 space-y-4 text-sm leading-relaxed">
          <Item termo="Fonte">Planilha de registro de pesquisas mantida pela Escola, alimentada diariamente.</Item>
          <Item termo="Atualização do painel">
            Mensal.{atualizadoEm && ` Última atualização em ${formatarData(atualizadoEm)}.`}
          </Item>
          <Item termo="Situações">
            <ul className="list-disc space-y-1 pl-5">
              <li><strong className="font-semibold text-slate-900">Cadastradas:</strong> todas as pesquisas protocoladas no período.</li>
              <li><strong className="font-semibold text-slate-900">Em análise:</strong> em tramitação (pareceres, anuência, CEP), ainda sem autorização de coleta.</li>
              <li><strong className="font-semibold text-slate-900">Em execução:</strong> autorizadas, com coleta ou desenvolvimento em andamento.</li>
              <li><strong className="font-semibold text-slate-900">Finalizadas:</strong> concluídas, com relatório final entregue.</li>
            </ul>
          </Item>
          <Item termo="Filtro por ano">Considera o ano da data de protocolo da pesquisa.</Item>
          <Item termo="Proporções">
            Os gráficos consideram as pesquisas em execução no período. Pesquisas realizadas em mais de uma
            unidade de saúde ou distrito são contadas em cada um deles; por isso, nesses painéis a soma pode
            passar de 100%.
          </Item>
          <Item termo="Privacidade">
            O painel mostra apenas dados agregados, sem nomes, e-mails ou outros dados pessoais.
          </Item>
        </dl>

        <p className="mt-6 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
          Critérios em validação: regra de classificação das situações, campo usado no filtro por ano e
          contagem de pesquisas com mais de uma unidade ou distrito.
        </p>
        {ficticia && (
          <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            Esta versão é um protótipo: os números exibidos são fictícios.
          </p>
        )}
      </div>
    </dialog>
  )
}

function Item({ termo, children }: { termo: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-semibold text-slate-900">{termo}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  )
}
