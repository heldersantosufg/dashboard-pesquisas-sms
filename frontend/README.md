# Frontend — Dashboard de Pesquisas da SMS

Interface do painel público de pesquisas, em React + TypeScript + Tailwind CSS (Vite).

> **Protótipo:** os números vêm de uma base fictícia gerada localmente. Nenhum dado da planilha real é usado.

## Como rodar

```bash
npm install
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em dist/ (caminhos relativos, publicável em qualquer subpasta)
npm run lint
```

## O que a tela mostra

- **Cabeçalho:** filtro por ano (RF04), "Sobre os dados" e data da última atualização (RF12).
- **Indicadores gerais:** totais de pesquisas cadastradas, em execução e finalizadas (RF01–RF03).
- **Pesquisas em execução** (RN02), com proporções sobre esse total (RN04):
  - IES (barras horizontais), Unidade de saúde (tabela com busca), Natureza (colunas),
    Linha de pesquisa (barras), Distrito sanitário (colunas), Programa (barras) e Área da SMS (colunas).
  - Todo gráfico tem uma visão equivalente em tabela, útil também para decidir pendências como
    "Programa: gráfico ou tabela?".

## Estrutura

```text
src/
├── App.tsx                  # composição da página e filtro de ano
├── types/pesquisa.ts        # formato dos dados (sem dados pessoais — RN06)
├── data/
│   ├── carregarBase.ts      # ponto único de carga dos dados
│   └── baseFicticia.ts      # base de demonstração (semente fixa)
├── lib/
│   ├── indicadores.ts       # totais, filtro por ano e distribuições
│   └── formatacao.ts        # números, percentuais e datas em pt-BR
├── hooks/                   # carga da base e destaque/dica dos gráficos
└── components/              # cabeçalho, cartões, painéis, gráficos e tabela
```

## Ligando aos dados reais

Basta trocar o corpo de `carregarBaseDePesquisas()` em `src/data/carregarBase.ts` por uma leitura do
arquivo gerado a partir da planilha (por exemplo, `fetch('dados/pesquisas.json')`), no formato
`BaseDePesquisas` de `src/types/pesquisa.ts`. Com `ficticia: false`, o aviso de protótipo some.

As regras ainda em validação (`docs/pendencias-validacao.md`) estão concentradas em
`src/lib/indicadores.ts`: campo do filtro por ano, contagem de pesquisas com mais de uma unidade ou
distrito e ordem das categorias.

## Identidade visual

As cores ficam em `src/index.css` (rampa `marca-*`). As marcas do rodapé são provisórias e devem ser
substituídas pelas logomarcas oficiais do Município e da SMS (RNF06).
