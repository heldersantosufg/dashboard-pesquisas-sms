import { FlaskConical } from 'lucide-react'

export function AvisoPrototipo() {
  return (
    <div className="border-b border-amber-200 bg-amber-50 text-amber-900">
      <p className="mx-auto flex max-w-[1600px] items-center gap-2 px-4 py-2 text-sm sm:px-6">
        <FlaskConical className="size-4 shrink-0" aria-hidden />
        <span>
          <strong className="font-semibold">Protótipo:</strong> os números exibidos são fictícios e servem
          apenas para validar o layout.
        </span>
      </p>
    </div>
  )
}
