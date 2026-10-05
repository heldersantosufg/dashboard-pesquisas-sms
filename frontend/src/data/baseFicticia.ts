import type {
  BaseDePesquisas,
  Natureza,
  Pesquisa,
  Situacao,
  UnidadeSaude,
} from '../types/pesquisa.ts'

// Base fictícia do protótipo. As categorias seguem a planilha de registro
// (dados/), já normalizadas; quantidades, unidades e combinações são inventadas.
// O sorteio usa semente fixa, então os números são os mesmos a cada carga.

const ATUALIZADO_EM = '2026-09-30'

/** Protocolos por ano; 2026 vai só até a data de atualização. */
const PROTOCOLOS_POR_ANO: Record<number, number> = {
  2020: 38,
  2021: 45,
  2022: 52,
  2023: 58,
  2024: 63,
  2025: 68,
  2026: 49,
}

/** Duração típica, em meses, da execução de cada natureza de pesquisa. */
const DURACAO_MESES: Record<Natureza, number> = {
  Graduação: 10,
  Residência: 20,
  Especialização: 12,
  Mestrado: 20,
  Doutorado: 36,
  Institucional: 18,
  Extensão: 12,
}

interface Ponderado {
  peso: number
}

interface ProgramaFicticio extends Ponderado {
  nome: string
  natureza: Natureza
}

interface InstituicaoFicticia extends Ponderado {
  sigla: string
  nome: string
  programas: ProgramaFicticio[]
}

interface LinhaFicticia extends Ponderado {
  nome: string
  /** Diretorias mais associadas à linha; a primeira é a mais frequente. */
  areas: string[]
}

const INSTITUICOES: InstituicaoFicticia[] = [
  {
    sigla: 'UFG',
    nome: 'Universidade Federal de Goiás',
    peso: 34,
    programas: [
      { nome: 'Graduação em Medicina', natureza: 'Graduação', peso: 4 },
      { nome: 'Graduação em Enfermagem', natureza: 'Graduação', peso: 4 },
      { nome: 'Graduação em Nutrição', natureza: 'Graduação', peso: 2 },
      { nome: 'Graduação em Odontologia', natureza: 'Graduação', peso: 2 },
      { nome: 'Especialização em Saúde Coletiva', natureza: 'Especialização', peso: 2 },
      { nome: 'Mestrado em Saúde Coletiva', natureza: 'Mestrado', peso: 4 },
      { nome: 'Mestrado em Enfermagem', natureza: 'Mestrado', peso: 3 },
      { nome: 'Doutorado em Medicina Tropical e Saúde Pública', natureza: 'Doutorado', peso: 3 },
      { nome: 'Doutorado em Ciências da Saúde', natureza: 'Doutorado', peso: 2 },
      { nome: 'Residência Multiprofissional em Saúde', natureza: 'Residência', peso: 3 },
      { nome: 'Extensão em Saúde da Família', natureza: 'Extensão', peso: 1 },
    ],
  },
  {
    sigla: 'PUC Goiás',
    nome: 'Pontifícia Universidade Católica de Goiás',
    peso: 14,
    programas: [
      { nome: 'Graduação em Medicina', natureza: 'Graduação', peso: 3 },
      { nome: 'Graduação em Psicologia', natureza: 'Graduação', peso: 2 },
      { nome: 'Graduação em Enfermagem', natureza: 'Graduação', peso: 2 },
      { nome: 'Graduação em Fisioterapia', natureza: 'Graduação', peso: 1 },
      { nome: 'Mestrado em Ciências Ambientais e Saúde', natureza: 'Mestrado', peso: 2 },
    ],
  },
  {
    sigla: 'SMS',
    nome: 'Secretaria Municipal de Saúde',
    peso: 9,
    programas: [
      { nome: 'Residência em Ginecologia e Obstetrícia', natureza: 'Residência', peso: 3 },
      { nome: 'Residência em Medicina de Família e Comunidade', natureza: 'Residência', peso: 2 },
      { nome: 'Pesquisa institucional', natureza: 'Institucional', peso: 3 },
      { nome: 'PET-Saúde', natureza: 'Extensão', peso: 1 },
    ],
  },
  {
    sigla: 'UnB',
    nome: 'Universidade de Brasília',
    peso: 5,
    programas: [
      { nome: 'Mestrado em Saúde Coletiva', natureza: 'Mestrado', peso: 1 },
      { nome: 'Doutorado em Saúde Coletiva', natureza: 'Doutorado', peso: 1 },
    ],
  },
  {
    sigla: 'Fiocruz',
    nome: 'Fundação Oswaldo Cruz',
    peso: 4,
    programas: [
      { nome: 'Especialização em Educação Popular em Saúde', natureza: 'Especialização', peso: 2 },
      { nome: 'Mestrado Profissional em Saúde Pública', natureza: 'Mestrado', peso: 1 },
    ],
  },
  {
    sigla: 'UniRV',
    nome: 'Universidade de Rio Verde',
    peso: 3,
    programas: [{ nome: 'Graduação em Medicina', natureza: 'Graduação', peso: 1 }],
  },
  {
    sigla: 'UFCAT',
    nome: 'Universidade Federal de Catalão',
    peso: 3,
    programas: [
      { nome: 'Graduação em Enfermagem', natureza: 'Graduação', peso: 1 },
      { nome: 'Especialização em Saúde da Família', natureza: 'Especialização', peso: 1 },
    ],
  },
  {
    sigla: 'Unicamps',
    nome: 'Centro Universitário FacUnicamps',
    peso: 3,
    programas: [
      { nome: 'Graduação em Psicologia', natureza: 'Graduação', peso: 1 },
      { nome: 'Especialização em Saúde Pública', natureza: 'Especialização', peso: 1 },
    ],
  },
  {
    sigla: 'UFBA',
    nome: 'Universidade Federal da Bahia',
    peso: 1,
    programas: [{ nome: 'Doutorado em Saúde Pública', natureza: 'Doutorado', peso: 1 }],
  },
  {
    sigla: 'UFPB',
    nome: 'Universidade Federal da Paraíba',
    peso: 1,
    programas: [{ nome: 'Mestrado em Enfermagem', natureza: 'Mestrado', peso: 1 }],
  },
  {
    sigla: 'UNEATLANTICO',
    nome: 'Universidad Europea del Atlántico',
    peso: 1,
    programas: [{ nome: 'Mestrado em Saúde Pública', natureza: 'Mestrado', peso: 1 }],
  },
]

const LINHAS: LinhaFicticia[] = [
  { nome: 'Saúde materno-infantil', peso: 14, areas: ['Atenção Hospitalar', 'Atenção Primária'] },
  { nome: 'Atenção primária à saúde', peso: 12, areas: ['Atenção Primária'] },
  { nome: 'Saúde mental', peso: 10, areas: ['Atenção Especializada', 'Atenção Primária'] },
  { nome: 'Doenças crônicas não transmissíveis', peso: 10, areas: ['Atenção Primária', 'Atenção Especializada'] },
  { nome: 'Doenças infecciosas e parasitárias', peso: 9, areas: ['Vigilância em Saúde', 'Atenção Especializada'] },
  { nome: 'Vigilância em saúde', peso: 7, areas: ['Vigilância em Saúde'] },
  { nome: 'Urgência e emergência', peso: 6, areas: ['Urgência e Emergência'] },
  { nome: 'Gestão e planejamento em saúde', peso: 6, areas: ['Gestão e Educação', 'Regulação'] },
  { nome: 'Saúde bucal', peso: 5, areas: ['Atenção Primária', 'Atenção Especializada'] },
  { nome: 'Educação e formação em saúde', peso: 5, areas: ['Gestão e Educação', 'Atenção Primária'] },
  { nome: 'Assistência farmacêutica', peso: 4, areas: ['Atenção Especializada', 'Atenção Primária'] },
  { nome: 'Saúde do trabalhador', peso: 3, areas: ['Vigilância em Saúde'] },
  { nome: 'Saúde da pessoa idosa', peso: 3, areas: ['Atenção Primária'] },
]

const UNIDADES_POR_AREA: Record<string, UnidadeSaude[]> = {
  'Atenção Primária': [
    { nome: 'UBS Jardim das Flores', distrito: 'Norte' },
    { nome: 'USF Vila Esperança', distrito: 'Norte' },
    { nome: 'USF Parque dos Ipês', distrito: 'Noroeste' },
    { nome: 'UBS Jardim Primavera', distrito: 'Noroeste' },
    { nome: 'USF Recanto Verde', distrito: 'Noroeste' },
    { nome: 'UBS Vila Operária', distrito: 'Leste' },
    { nome: 'USF Jardim Aurora', distrito: 'Leste' },
    { nome: 'UBS Jardim Liberdade', distrito: 'Leste' },
    { nome: 'Centro de Saúde Central', distrito: 'Centro' },
    { nome: 'UBS Bela Vista', distrito: 'Centro' },
    { nome: 'USF Parque das Águas', distrito: 'Oeste' },
    { nome: 'UBS Jardim Imperial', distrito: 'Oeste' },
    { nome: 'USF Morada do Sol', distrito: 'Oeste' },
    { nome: 'UBS Vila Rica', distrito: 'Sudoeste' },
    { nome: 'USF Jardim Planalto', distrito: 'Sudoeste' },
    { nome: 'USF Parque Cerrado', distrito: 'Sudoeste' },
    { nome: 'UBS Vila Formosa', distrito: 'Sul' },
    { nome: 'USF Jardim Atlântico', distrito: 'Sul' },
    { nome: 'UBS Santa Luzia', distrito: 'Sul' },
  ],
  'Atenção Especializada': [
    { nome: 'CAPS Viver Bem', distrito: 'Centro' },
    { nome: 'CAPS AD Renascer', distrito: 'Leste' },
    { nome: 'CAPSi Crescer', distrito: 'Sul' },
    { nome: 'Policlínica Norte', distrito: 'Norte' },
    { nome: 'CEO Oeste', distrito: 'Oeste' },
    { nome: 'Centro de Reabilitação Municipal', distrito: 'Sudoeste' },
    { nome: 'Ambulatório Municipal de Infectologia', distrito: 'Centro' },
  ],
  'Atenção Hospitalar': [
    { nome: 'Maternidade Municipal Nascer Bem', distrito: 'Sudoeste' },
    { nome: 'Maternidade Municipal Mãe Esperança', distrito: 'Noroeste' },
    { nome: 'Hospital Municipal de Referência', distrito: 'Centro' },
  ],
  'Urgência e Emergência': [
    { nome: 'UPA Norte', distrito: 'Norte' },
    { nome: 'UPA Sul', distrito: 'Sul' },
    { nome: 'UPA Noroeste', distrito: 'Noroeste' },
    { nome: 'CAIS Leste', distrito: 'Leste' },
    { nome: 'CAIS Oeste', distrito: 'Oeste' },
    { nome: 'SAMU 192 – Base Central', distrito: 'Centro' },
  ],
  'Vigilância em Saúde': [
    { nome: 'Centro de Controle de Zoonoses', distrito: 'Oeste' },
    { nome: 'Cerest – Saúde do Trabalhador', distrito: 'Centro' },
    { nome: 'Laboratório Municipal de Saúde Pública', distrito: 'Centro' },
  ],
  Regulação: [{ nome: 'Complexo Regulador Municipal', distrito: 'Centro' }],
  'Gestão e Educação': [{ nome: 'Sede da SMS (nível central)', distrito: 'Centro' }],
}

const DIA_MS = 86_400_000

export function gerarBaseFicticia(): BaseDePesquisas {
  return { atualizadoEm: ATUALIZADO_EM, ficticia: true, pesquisas: gerarPesquisas() }
}

function gerarPesquisas(): Pesquisa[] {
  const sortear = criarSorteio(20260930)
  const referencia = Date.parse(ATUALIZADO_EM)
  const pesquisas: Pesquisa[] = []

  for (const [anoTexto, quantidade] of Object.entries(PROTOCOLOS_POR_ANO)) {
    const ano = Number(anoTexto)
    const inicio = Date.UTC(ano, 0, 1)
    const dias = (Math.min(Date.UTC(ano, 11, 31), referencia) - inicio) / DIA_MS + 1
    const datas = Array.from({ length: quantidade }, () => inicio + Math.floor(sortear() * dias) * DIA_MS)
    datas.sort((a, b) => a - b)

    datas.forEach((data, indice) => {
      const instituicao = escolher(INSTITUICOES, sortear)
      const programa = escolher(instituicao.programas, sortear)
      const linha = escolher(LINHAS, sortear)
      const areaSms = linha.areas.length > 1 && sortear() < 0.3 ? linha.areas[1] : linha.areas[0]

      pesquisas.push({
        protocolo: `${String(indice + 1).padStart(3, '0')}/${ano}`,
        dataProtocolo: new Date(data).toISOString().slice(0, 10),
        situacao: definirSituacao((referencia - data) / DIA_MS, programa.natureza, sortear),
        instituicao: { sigla: instituicao.sigla, nome: instituicao.nome },
        programa: programa.nome,
        natureza: programa.natureza,
        linhaPesquisa: linha.nome,
        areaSms,
        unidades: sortearUnidades(areaSms, sortear),
      })
    })
  }

  return pesquisas
}

/** Tramitação (pareceres, anuência, CEP) seguida da execução, com prorrogações eventuais. */
function definirSituacao(diasDecorridos: number, natureza: Natureza, sortear: () => number): Situacao {
  const tramitacao = 30 + sortear() * 90
  const prorrogacao = sortear() < 0.15 ? 1.6 : 1
  const execucao = DURACAO_MESES[natureza] * 30 * (0.7 + sortear() * 0.6) * prorrogacao
  if (sortear() < 0.03) return 'cancelada'
  if (diasDecorridos < tramitacao) return 'em_analise'
  if (diasDecorridos < tramitacao + execucao) return 'em_execucao'
  return 'finalizada'
}

/** Uma a três unidades: a primeira da diretoria da pesquisa, as demais também da atenção primária. */
function sortearUnidades(area: string, sortear: () => number): UnidadeSaude[] {
  const quantidade = 1 + (sortear() < 0.35 ? 1 : 0) + (sortear() < 0.12 ? 1 : 0)
  const daArea = UNIDADES_POR_AREA[area]
  const candidatas = [...daArea, ...UNIDADES_POR_AREA['Atenção Primária']]
  const escolhidas = [daArea[Math.floor(sortear() * daArea.length)]]
  while (escolhidas.length < quantidade) {
    const unidade = candidatas[Math.floor(sortear() * candidatas.length)]
    if (!escolhidas.includes(unidade)) escolhidas.push(unidade)
  }
  return escolhidas
}

function escolher<T extends Ponderado>(itens: T[], sortear: () => number): T {
  let restante = sortear() * itens.reduce((soma, item) => soma + item.peso, 0)
  for (const item of itens) {
    restante -= item.peso
    if (restante < 0) return item
  }
  return itens[itens.length - 1]
}

/** Gerador pseudoaleatório mulberry32: rápido e reproduzível a partir da semente. */
function criarSorteio(semente: number) {
  let estado = semente
  return () => {
    estado = (estado + 0x6d2b79f5) | 0
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
