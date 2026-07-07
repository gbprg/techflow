import type { Express } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { createDatabase, type SqliteDatabase } from '../src/database.js';

describe('API de tarefas', () => {
  let app: Express;
  let database: SqliteDatabase;

  beforeEach(() => {
    database = createDatabase(':memory:');
    app = createApp(database);
  });

  afterEach(() => database.close());

  async function createTask(title = 'Separar encomendas') {
    return request(app).post('/api/tasks').send({
      title,
      description: 'Organizar os pedidos por rota',
    });
  }

  it('cria uma tarefa válida', async () => {
    const response = await createTask();

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 1,
      title: 'Separar encomendas',
      description: 'Organizar os pedidos por rota',
      status: 'todo',
      priority: 'medium',
    });
    expect(response.body.createdAt).toBeTypeOf('string');
  });

  it('rejeita título vazio', async () => {
    const response = await request(app).post('/api/tasks').send({ title: '  ' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('título');
  });

  it('lista as tarefas cadastradas', async () => {
    await createTask('Primeira tarefa');
    await createTask('Segunda tarefa');

    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('consulta uma tarefa por ID', async () => {
    await createTask();

    const response = await request(app).get('/api/tasks/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('atualiza conteúdo e status', async () => {
    await createTask();

    const response = await request(app).put('/api/tasks/1').send({
      title: 'Despachar encomendas',
      status: 'in_progress',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      title: 'Despachar encomendas',
      status: 'in_progress',
    });
  });

  it('rejeita um status inválido', async () => {
    await createTask();

    const response = await request(app)
      .put('/api/tasks/1')
      .send({ status: 'bloqueada' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('status');
  });

  it('persiste e recupera a prioridade de uma tarefa', async () => {
    const created = await request(app).post('/api/tasks').send({
      title: 'Resolver atraso crítico',
      priority: 'high',
    });

    expect(created.status).toBe(201);
    expect(created.body.priority).toBe('high');

    const updated = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ priority: 'low' });
    expect(updated.status).toBe(200);
    expect(updated.body.priority).toBe('low');
  });

  it('rejeita uma prioridade inválida', async () => {
    const response = await request(app).post('/api/tasks').send({
      title: 'Tarefa inválida',
      priority: 'urgente',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('prioridade');
  });

  it('exclui uma tarefa', async () => {
    await createTask();

    expect((await request(app).delete('/api/tasks/1')).status).toBe(204);
    expect((await request(app).get('/api/tasks/1')).status).toBe(404);
  });

  it('retorna 404 para uma tarefa inexistente', async () => {
    const response = await request(app).get('/api/tasks/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Tarefa não encontrada.');
  });

  it('rejeita um identificador inválido', async () => {
    const response = await request(app).get('/api/tasks/abc');

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('identificador');
  });
});
