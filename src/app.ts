import express from 'express';
import type { SqliteDatabase } from './database.js';
import { TaskRepository } from './tasks/task-repository.js';
import {
  parseTaskId,
  validateCreateTask,
  validateUpdateTask,
  ValidationError,
} from './tasks/task-validation.js';

export function createApp(database: SqliteDatabase) {
  const app = express();
  const tasks = new TaskRepository(database);

  app.use(express.json());

  app.get('/api/tasks', (_request, response) => {
    response.json(tasks.findAll());
  });

  app.get('/api/tasks/:id', (request, response) => {
    const task = tasks.findById(parseTaskId(request.params.id));
    if (!task) {
      response.status(404).json({ message: 'Tarefa não encontrada.' });
      return;
    }
    response.json(task);
  });

  app.post('/api/tasks', (request, response) => {
    const task = tasks.create(validateCreateTask(request.body));
    response.status(201).json(task);
  });

  app.put('/api/tasks/:id', (request, response) => {
    const task = tasks.update(parseTaskId(request.params.id), validateUpdateTask(request.body));
    if (!task) {
      response.status(404).json({ message: 'Tarefa não encontrada.' });
      return;
    }
    response.json(task);
  });

  app.delete('/api/tasks/:id', (request, response) => {
    const deleted = tasks.delete(parseTaskId(request.params.id));
    if (!deleted) {
      response.status(404).json({ message: 'Tarefa não encontrada.' });
      return;
    }
    response.status(204).send();
  });

  app.use(
    (
      error: unknown,
      _request: express.Request,
      response: express.Response,
      _next: express.NextFunction,
    ) => {
      if (error instanceof ValidationError) {
        response.status(400).json({ message: error.message });
        return;
      }
      console.error(error);
      response.status(500).json({ message: 'Erro interno do servidor.' });
    },
  );

  return app;
}
