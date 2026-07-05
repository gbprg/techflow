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

  app.post('/api/tasks', (request, response) => {
    const task = tasks.create(request.body);
    response.status(201).json(task);
  });

  return app;
}
