# Roteiro de evidências do GitHub

As imagens devem ser capturadas depois do envio ao GitHub e colocadas em `docs/images`. Cada captura deve manter visível o nome do repositório ou do Project.

## 1. Quadro Kanban

Capturar o Project com as três colunas e os cards distribuídos. Comentário sugerido: “O quadro centraliza o trabalho e torna visível o estado de cada atividade. O card de prioridade registra a mudança de escopo.”

## 2. Histórico de commits

Capturar a página de commits mostrando mensagens `feat`, `test`, `ci` e `docs`. Comentário sugerido: “Os commits semânticos preservam a evolução incremental do CRUD, da qualidade e da mudança solicitada.”

## 3. Workflow de CI

Capturar a execução concluída e abrir o job para mostrar lint, testes e build aprovados. Comentário sugerido: “A integração contínua valida automaticamente qualidade, comportamento e compilação a cada alteração.”

Depois das capturas, inserir no relatório usando:

```markdown
![Quadro Kanban com as tarefas](images/kanban.png)
![Histórico de commits semânticos](images/commits.png)
![Workflow de CI aprovado](images/ci.png)
```
