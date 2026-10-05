import { useEffect, useState } from 'react'
import { carregarBaseDePesquisas } from '../data/carregarBase.ts'
import type { BaseDePesquisas } from '../types/pesquisa.ts'

export type CargaDaBase =
  | { status: 'carregando' }
  | { status: 'erro' }
  | { status: 'pronta'; base: BaseDePesquisas }

export function useBaseDePesquisas(): CargaDaBase {
  const [carga, setCarga] = useState<CargaDaBase>({ status: 'carregando' })

  useEffect(() => {
    let ativo = true
    carregarBaseDePesquisas()
      .then((base) => {
        if (ativo) setCarga({ status: 'pronta', base })
      })
      .catch(() => {
        if (ativo) setCarga({ status: 'erro' })
      })
    return () => {
      ativo = false
    }
  }, [])

  return carga
}
