import { ChevronDown } from 'lucide-react'
import type { FiltroAno } from '../lib/indicadores.ts'

interface SeletorAnoProps {
  anos: number[]
  valor: FiltroAno
  aoMudar: (ano: FiltroAno) => void
}

export function SeletorAno({ anos, valor, aoMudar }: SeletorAnoProps) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      Ano
      <span className="relative">
        <select
          value={valor}
          disabled={anos.length === 0}
          onChange={(evento) => aoMudar(evento.target.value === 'todos' ? 'todos' : Number(evento.target.value))}
          className="appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-sm font-medium text-slate-900 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60"
        >
          <option value="todos">Todos</option>
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
      </span>
    </label>
  )
}
