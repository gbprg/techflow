# TechFlow Tasks

Sistema web de gerenciamento ágil de tarefas desenvolvido para a disciplina, com API REST em Node.js/TypeScript, persistência SQLite, interface Kanban e automação no GitHub Actions.

## Requisitos

- Node.js 22 ou superior
- npm 10 ou superior

## Como executar

Instalação:

```bash
npm install
```

Ambiente de desenvolvimento:

```bash
npm run dev
```

Aplicação compilada:

```bash
npm run build
npm start
```

## Qualidade

```bash
npm run lint
npm test
npm run build
npm run docs:pdf
```

## Estrutura do repositório

```text
.
├── .github/
├── docs/
├── public/
├── src/
├── tests/
├── package.json
└── tsconfig.json
```

## Documentação

- Relatório principal: `docs/relatorio.md`
- PDF para entrega: `docs/relatorio.pdf`
- Roteiro de evidências: `docs/evidencias.md`
- Diagramas UML: `docs/diagrams/`

## Funcionalidades

- cadastro, listagem, consulta, edição e remoção de tarefas;
- movimentação entre `todo`, `in_progress` e `done`;
- prioridade `low`, `medium` e `high`;
- interface web simples para operação em formato Kanban;
- testes automatizados com Vitest e Supertest;
- integração contínua com lint, testes e build.
