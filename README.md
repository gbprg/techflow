# TechFlow Tasks

O TechFlow Tasks é um sistema web acadêmico para organizar o fluxo de trabalho de uma equipe de logística em um quadro Kanban. A aplicação permite criar, consultar, atualizar, priorizar, movimentar e excluir tarefas.

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

Pré-requisito: Node.js 22 ou superior.

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

## API

| Método | Rota | Finalidade |
| --- | --- | --- |
| `GET` | `/api/tasks` | Listar tarefas |
| `GET` | `/api/tasks/:id` | Consultar uma tarefa |
| `POST` | `/api/tasks` | Criar uma tarefa |
| `PUT` | `/api/tasks/:id` | Atualizar ou movimentar uma tarefa |
| `DELETE` | `/api/tasks/:id` | Excluir uma tarefa |

Uma tarefa possui título, descrição, status e prioridade. Os valores aceitos para status são `todo`, `in_progress` e `done`; para prioridade, `low`, `medium` e `high`.

## Estrutura

```text
src/                 API, regras e persistência
public/              interface web
tests/               testes automatizados
docs/                relatório e diagramas UML
.github/workflows/   integração contínua
```

## Gestão de mudanças

Depois da entrega do CRUD inicial, o cliente solicitou uma forma de identificar tarefas críticas. O escopo foi ampliado com o campo **prioridade** (`Baixa`, `Média` ou `Alta`) e com destaque visual para itens de prioridade alta. A alteração foi escolhida porque operações logísticas precisam distinguir atrasos críticos das atividades rotineiras.

A mudança exigiu migração compatível do SQLite, atualização do modelo, API, validações, formulário, cartões do Kanban e testes. Ela foi registrada em card próprio no GitHub Project e no commit semântico `feat: add task priority as scope change`.

## Integração contínua

O workflow `.github/workflows/ci.yml` é executado em pushes e pull requests. Ele instala versões travadas das dependências com `npm ci`, valida o código com ESLint, executa a suíte Vitest e compila o TypeScript.
