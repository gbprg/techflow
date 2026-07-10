# Roteiro de evidências do GitHub

Repositório publicado: <https://github.com/gbprg/techflow>

As imagens devem ser capturadas depois do envio ao GitHub e colocadas em `docs/images`. Cada captura deve manter visível o nome do repositório ou do Project. O relatório final referencia diretamente `docs/images/kanban.png`, `docs/images/commits.png` e `docs/images/ci.png`.

## 1. Quadro Kanban

Capturar o Project com as três colunas e os cards distribuídos. Comentário sugerido: “O quadro centraliza o trabalho, torna visível o estado de cada atividade e registra a mudança de escopo por meio do card de prioridade.”

Cards sugeridos para o quadro:

- Definir escopo inicial do CRUD de tarefas
- Modelar casos de uso
- Modelar classes do sistema
- Implementar entidade Task
- Implementar repositório SQLite
- Implementar API REST de tarefas
- Criar interface Kanban
- Criar testes automatizados
- Configurar integração contínua
- Documentar mudança de escopo com prioridade
- Gerar relatório final em PDF

## 2. Histórico de commits

Capturar a página de commits mostrando mensagens `feat`, `test`, `ci` e `docs`. Comentário sugerido: “Os commits semânticos preservam a evolução incremental do CRUD, dos testes, da automação e da documentação.”

Link direto: <https://github.com/gbprg/techflow/commits/main/>

## 3. Workflow de CI

Capturar a execução concluída e abrir o job para mostrar lint, testes e build aprovados. Comentário sugerido: “A integração contínua valida automaticamente padronização, comportamento e compilação a cada alteração enviada ao repositório.”

Workflow aprovado: <https://github.com/gbprg/techflow/actions/runs/28907372256>

Depois das capturas, inserir no relatório usando:

```markdown
![Quadro Kanban com as tarefas](images/kanban.png)
![Histórico de commits semânticos](images/commits.png)
![Workflow de CI aprovado](images/ci.png)
```

Checklist mínimo antes da entrega:

- confirmar pelo menos 10 cards no Project;
- confirmar pelo menos 10 commits com mensagens claras;
- confirmar um workflow aprovado após o push final;
- abrir `docs/relatorio.pdf` no GitHub para validar renderização.
