import type { SqliteDatabase } from '../database.js';
import type { CreateTaskInput, Task, UpdateTaskInput } from './task.js';

interface TaskRow {
  id: number;
  title: string;
  description: string;
  status: Task['status'];
  created_at: string;
  updated_at: string;
}

function mapTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class TaskRepository {
  public constructor(private readonly database: SqliteDatabase) {}

  public create(input: CreateTaskInput): Task {
    const now = new Date().toISOString();
    const result = this.database
      .prepare(`
        INSERT INTO tasks (title, description, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(input.title, input.description ?? '', input.status ?? 'todo', now, now);

    return this.findById(Number(result.lastInsertRowid))!;
  }

  public findAll(): Task[] {
    const rows = this.database
      .prepare('SELECT * FROM tasks ORDER BY created_at DESC, id DESC')
      .all() as TaskRow[];
    return rows.map(mapTask);
  }

  public findById(id: number): Task | undefined {
    const row = this.database.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as
      | TaskRow
      | undefined;
    return row ? mapTask(row) : undefined;
  }

  public update(id: number, input: UpdateTaskInput): Task | undefined {
    const current = this.findById(id);
    if (!current) return undefined;

    this.database
      .prepare(`
        UPDATE tasks
        SET title = ?, description = ?, status = ?, updated_at = ?
        WHERE id = ?
      `)
      .run(
        input.title ?? current.title,
        input.description ?? current.description,
        input.status ?? current.status,
        new Date().toISOString(),
        id,
      );

    return this.findById(id);
  }

  public delete(id: number): boolean {
    return this.database.prepare('DELETE FROM tasks WHERE id = ?').run(id).changes > 0;
  }
}
