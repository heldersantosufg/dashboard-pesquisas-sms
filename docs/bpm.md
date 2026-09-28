# Mapeamento de Processos de Negócio (BPM)

## Processo atual — AS-IS

O acompanhamento das pesquisas é realizado a partir de uma planilha Excel. A escola alimenta e atualiza os registros diariamente, conforme o andamento das pesquisas.

Fluxo resumido:

1. Receber informações da pesquisa.
2. Registrar a pesquisa na planilha Excel.
3. Atualizar diariamente os dados e a situação da pesquisa.
4. Consultar a planilha para acompanhar o andamento e consolidar informações.

A análise consolidada depende atualmente da consulta direta à planilha.

## Processo futuro — TO-BE

O processo proposto mantém a planilha como fonte operacional e acrescenta uma camada de validação, processamento e publicação mensal no dashboard.

### Raias BPMN

1. Escola / Responsável pela Base
2. Responsável pelo Dashboard
3. Sistema / Dashboard
4. Usuário (Servidor / Público)

### Fluxo proposto

**Escola / Responsável pela Base**
- Receber informações das pesquisas.
- Registrar pesquisa na planilha Excel.
- Atualizar diariamente os dados da pesquisa.

**Responsável pelo Dashboard**
- Mensalmente obter a planilha atualizada.
- Verificar consistência e completude.
- Se houver inconsistência, solicitar correção.
- Se os dados estiverem consistentes, liberar processamento.

**Sistema / Dashboard**
- Importar os dados.
- Classificar pesquisas por situação.
- Calcular os indicadores gerais.
- Gerar visualizações das pesquisas em execução.
- Atualizar o dashboard.
- Publicar no site da SMS.

**Usuário**
- Acessar o site da SMS.
- Acessar o dashboard.
- Selecionar o ano.
- Visualizar indicadores, gráficos e tabelas.

## Decisão de consistência

O gateway exclusivo "Dados consistentes?" possui duas saídas:

- **Não:** retorna para correção da planilha pela Escola / Responsável pela Base.
- **Sim:** segue para importação e processamento pelo Sistema / Dashboard.
