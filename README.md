# TechFlow Tasks

O TechFlow Tasks é um sistema web acadêmico para organizar o fluxo de trabalho de uma equipe de logística em um quadro Kanban. A aplicação permite criar, consultar, atualizar, movimentar e excluir tarefas.

## Escopo inicial

O primeiro escopo contempla um CRUD de tarefas com título, descrição e estado (`A Fazer`, `Em Progresso` ou `Concluído`), persistência local em SQLite e uma interface web responsiva.

## Metodologia

O projeto adota **Kanban** por permitir visualizar o fluxo, limitar trabalho em andamento e adaptar prioridades continuamente. No GitHub Projects, as atividades são organizadas nas colunas `To Do`, `In Progress` e `Done`.

## Tecnologias

- Node.js e TypeScript
- Express e SQLite
- HTML, CSS e JavaScript
- Vitest e Supertest
- ESLint e GitHub Actions

## Execução

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Qualidade

```bash
npm test
npm run lint
npm run build
```

## Documentação acadêmica

O relatório, os diagramas UML e as evidências do GitHub ficam em [`docs`](docs). O PDF final pode ser gerado com `npm run docs:pdf`.

## Gestão de mudanças

A mudança de escopo será registrada nesta seção após a conclusão e validação do escopo inicial, preservando no histórico do Git a evolução do projeto.
