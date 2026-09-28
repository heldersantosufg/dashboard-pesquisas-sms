# Levantamento de Requisitos

## Contexto

O projeto tem como objetivo desenvolver um dashboard público para acompanhamento das pesquisas vinculadas à Secretaria Municipal de Saúde (SMS).

## Público e acesso

- Público em geral, com uso esperado principalmente por servidores.
- Acesso público.
- Não haverá login.
- Todos os usuários visualizarão as mesmas informações.
- Não haverá dados pessoais, sensíveis ou confidenciais.

## Fonte de dados

- Formato: Excel.
- Responsável pela alimentação: Escola.
- Frequência de alimentação: diária.
- Frequência de atualização do dashboard: mensal.

## Requisitos funcionais

- RF01: Exibir o total de pesquisas cadastradas.
- RF02: Exibir o total de pesquisas em execução.
- RF03: Exibir o total de pesquisas finalizadas.
- RF04: Permitir filtro por ano.
- RF05: Exibir pesquisas em execução por Instituição de Ensino Superior.
- RF06: Exibir pesquisas em execução por Programa.
- RF07: Exibir pesquisas por Linha de Pesquisa.
- RF08: Exibir pesquisas em execução por área da SMS.
- RF09: Exibir pesquisas por Natureza da Pesquisa.
- RF10: Exibir pesquisas por Distrito Sanitário.
- RF11: Exibir pesquisas por Unidade de Saúde.
- RF12: Atualizar os dados do dashboard mensalmente.
- RF13: Disponibilizar o dashboard no site da SMS.

## Requisitos não funcionais

- RNF01: O dashboard deverá ser público e não exigir autenticação.
- RNF02: Todos os usuários terão o mesmo nível de visualização.
- RNF03: A fonte principal será uma planilha Excel.
- RNF04: A atualização pública poderá ocorrer mensalmente.
- RNF05: O dashboard não deverá expor dados pessoais, sensíveis ou confidenciais.
- RNF06: A interface deverá seguir a identidade visual do Município e da SMS.
- RNF07: Recomenda-se responsividade para computador, tablet e celular.
- RNF08: Prazo previsto de entrega: 15/11/2026.

## Visualizações previstas

- Indicadores gerais em números absolutos:
  - cadastradas;
  - em execução;
  - finalizadas.
- Barras horizontais: proporção das pesquisas em execução por IES.
- Programa/IES: gráfico ou tabela, a confirmar.
- Área da SMS: tendência de agrupamento por Diretoria.
- Natureza da pesquisa: colunas verticais.
- Distrito Sanitário: colunas verticais.
- Unidade de Saúde: tabela.
- Linha de Pesquisa: visualização a definir conforme quantidade de categorias.

## Fora do escopo atual

- Login.
- Diferentes perfis de usuário.
- Exportação de dados.
- Geração de relatórios.
- Edição de dados diretamente no dashboard.
