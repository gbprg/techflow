import express from 'express';
import type { SqliteDatabase } from './database.js';
import { TaskRepository } from './tasks/task-repository.js';

export function createApp(database: SqliteDatabase) {
  const app = express();
  const tasks = new TaskRepository(database);

  app.use(express.json());

  app.get('/api/tasks', (_request, response) => {
    response.json(tasks.findAll());
  });

  app.get('/api/tasks/:id', (request, response) => {
    const task = tasks.findById(Number(request.params.id));
    if (!task) {
      response.status(404).json({ message: 'Tarefa não encontrada.' });
      return;
    }
    response.json(task);
  });

  app.post('/api/tasks', (request, response) => {
    const task = tasks.create(request.body);
    response.status(201).json(task);
  });

  app.put('/api/tasks/:id', (request, response) => {
    const task = tasks.update(Number(request.params.id), request.body);
    if (!task) {
      response.status(404).json({ message: 'Tarefa não encontrada.' });
      return;
    }
    response.json(task);
  });

  app.delete('/api/tasks/:id', (request, response) => {
    const deleted = tasks.delete(Number(request.params.id));
    if (!deleted) {
      response.status(404).json({ message: 'Tarefa não encontrada.' });
      return;
    }
    response.status(204).send();
  });

  return app;
}
