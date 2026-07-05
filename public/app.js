const statuses = ['todo', 'in_progress', 'done'];
const statusLabels = { todo: 'A Fazer', in_progress: 'Em Progresso', done: 'Concluído' };
const dialog = document.querySelector('#task-dialog');
const form = document.querySelector('#task-form');
const feedback = document.querySelector('#feedback');
let tasks = [];

async function api(path = '', options = {}) {
  const response = await fetch(`/api/tasks${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Falha na comunicação.' }));
    throw new Error(error.message);
  }
  return response.status === 204 ? undefined : response.json();
}

function showFeedback(message = '') {
  feedback.textContent = message;
}

function buildCard(task) {
  const card = document.createElement('article');
  card.className = 'task-card';

  const title = document.createElement('h3');
  title.textContent = task.title;
  const description = document.createElement('p');
  description.textContent = task.description || 'Sem descrição.';

  const select = document.createElement('select');
  select.setAttribute('aria-label', `Status de ${task.title}`);
  statuses.forEach((status) => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = statusLabels[status];
    option.selected = status === task.status;
    select.append(option);
  });
  select.addEventListener('change', async () => {
    await updateTask(task.id, { status: select.value });
  });

  const actions = document.createElement('div');
  actions.className = 'card-actions';
  const edit = document.createElement('button');
  edit.type = 'button';
  edit.textContent = 'Editar';
  edit.addEventListener('click', () => openDialog(task));
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'delete-button';
  remove.textContent = 'Excluir';
  remove.addEventListener('click', () => deleteTask(task));
  actions.append(edit, remove);
  card.append(title, description, select, actions);
  return card;
}

function render() {
  statuses.forEach((status) => {
    const list = document.querySelector(`#${status}-list`);
    const columnTasks = tasks.filter((task) => task.status === status);
    list.replaceChildren(...columnTasks.map(buildCard));
    list.closest('.column').querySelector('.count').textContent = String(columnTasks.length);
  });
}

async function loadTasks() {
  try {
    tasks = await api();
    render();
    showFeedback();
  } catch (error) {
    showFeedback(error.message);
  }
}

async function updateTask(id, input) {
  try {
    await api(`/${id}`, { method: 'PUT', body: JSON.stringify(input) });
    await loadTasks();
  } catch (error) {
    showFeedback(error.message);
  }
}

async function deleteTask(task) {
  if (!window.confirm(`Excluir a tarefa “${task.title}”?`)) return;
  try {
    await api(`/${task.id}`, { method: 'DELETE' });
    await loadTasks();
  } catch (error) {
    showFeedback(error.message);
  }
}

function openDialog(task) {
  form.reset();
  document.querySelector('#dialog-title').textContent = task ? 'Editar tarefa' : 'Nova tarefa';
  document.querySelector('#task-id').value = task?.id ?? '';
  document.querySelector('#title').value = task?.title ?? '';
  document.querySelector('#description').value = task?.description ?? '';
  document.querySelector('#status').value = task?.status ?? 'todo';
  dialog.showModal();
  document.querySelector('#title').focus();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.querySelector('#task-id').value;
  const input = Object.fromEntries(new FormData(form));
  try {
    await api(id ? `/${id}` : '', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(input),
    });
    dialog.close();
    await loadTasks();
  } catch (error) {
    showFeedback(error.message);
  }
});

document.querySelector('#new-task').addEventListener('click', () => openDialog());
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#cancel-dialog').addEventListener('click', () => dialog.close());
loadTasks();
