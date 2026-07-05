import {
  taskStatuses,
  taskPriorities,
  type CreateTaskInput,
  type TaskStatus,
  type TaskPriority,
  type UpdateTaskInput,
} from './task.js';

export class ValidationError extends Error {}

function isStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && taskStatuses.includes(value as TaskStatus);
}

function readPriority(value: unknown): TaskPriority | undefined {
  if (value === undefined) return undefined;
  if (
    typeof value !== 'string' ||
    !taskPriorities.includes(value as TaskPriority)
  ) {
    throw new ValidationError('A prioridade informada é inválida.');
  }
  return value as TaskPriority;
}

function readTitle(value: unknown, required: boolean): string | undefined {
  if (value === undefined && !required) return undefined;
  if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 100) {
    throw new ValidationError('O título deve ter entre 3 e 100 caracteres.');
  }
  return value.trim();
}

function readDescription(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string' || value.trim().length > 500) {
    throw new ValidationError('A descrição deve ter no máximo 500 caracteres.');
  }
  return value.trim();
}

function readStatus(value: unknown): TaskStatus | undefined {
  if (value === undefined) return undefined;
  if (!isStatus(value)) {
    throw new ValidationError('O status informado é inválido.');
  }
  return value;
}

function ensureObject(body: unknown): asserts body is Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new ValidationError('O corpo da requisição deve ser um objeto JSON.');
  }
}

export function validateCreateTask(body: unknown): CreateTaskInput {
  ensureObject(body);
  return {
    title: readTitle(body.title, true)!,
    description: readDescription(body.description),
    status: readStatus(body.status),
    priority: readPriority(body.priority),
  };
}

export function validateUpdateTask(body: unknown): UpdateTaskInput {
  ensureObject(body);
  const input = {
    title: readTitle(body.title, false),
    description: readDescription(body.description),
    status: readStatus(body.status),
    priority: readPriority(body.priority),
  };
  if (Object.values(input).every((value) => value === undefined)) {
    throw new ValidationError('Informe ao menos um campo para atualizar.');
  }
  return input;
}

export function parseTaskId(value: string): number {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError('O identificador da tarefa é inválido.');
  }
  return id;
}
