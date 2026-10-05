import { LoaderCircle, TriangleAlert } from 'lucide-react'

export function EstadoCarga({ erro }: { erro: boolean }) {
  return (
    <div
      role={erro ? 'alert' : 'status'}
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center text-slate-600"
    >
      {erro ? (
        <TriangleAlert className="size-8 text-amber-600" aria-hidden />
      ) : (
        <LoaderCircle className="size-8 animate-spin text-marca-500 motion-reduce:animate-none" aria-hidden />
      )}
      <p>
        {erro
          ? 'Não foi possível carregar os dados do painel. Tente novamente mais tarde.'
          : 'Carregando dados…'}
      </p>
    </div>
  )
}
