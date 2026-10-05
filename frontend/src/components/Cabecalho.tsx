import { Info, Microscope } from 'lucide-react'
import { useRef } from 'react'
import { formatarData } from '../lib/formatacao.ts'
import type { FiltroAno } from '../lib/indicadores.ts'
import { DialogoSobreDados } from './DialogoSobreDados.tsx'
import { SeletorAno } from './SeletorAno.tsx'

interface CabecalhoProps {
  anos: number[]
  ano: FiltroAno
  aoMudarAno: (ano: FiltroAno) => void
  atualizadoEm?: string
  ficticia?: boolean
}

export function Cabecalho({ anos, ano, aoMudarAno, atualizadoEm, ficticia }: CabecalhoProps) {
  const dialogo = useRef<HTMLDialogElement>(null)

  return (
    <header className="z-30 bg-marca-600 text-white shadow-md md:sticky md:top-0">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-8 gap-y-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/15">
            <Microscope className="size-5" aria-hidden />
          </span>
          <div>
            <h1 className="text-lg leading-tight font-semibold">Pesquisas da SMS</h1>
            <p className="text-xs text-marca-100">Secretaria Municipal de Saúde</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <SeletorAno anos={anos} valor={ano} aoMudar={aoMudarAno} />
          <button
            type="button"
            onClick={() => dialogo.current?.showModal()}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Info className="size-4" aria-hidden />
            Sobre os dados
          </button>
        </div>

        {atualizadoEm && (
          <p className="text-xs text-marca-100 sm:ml-auto">
            Dados atualizados em{' '}
            <time dateTime={atualizadoEm} className="font-semibold text-white">
              {formatarData(atualizadoEm)}
            </time>
          </p>
        )}
      </div>
      <DialogoSobreDados ref={dialogo} atualizadoEm={atualizadoEm} ficticia={ficticia} />
    </header>
  )
}
