import {
  db,
  eq,
  type TodoInputs,
  type TodoModel,
  todos,
  type TodoUpdateInputs,
} from '@repo/db';

import { logEvent } from '../../../middleware';

/**
 * Handle creating a new todo
 */
export async function createTodo(data: TodoInputs) {
  try {
    await db.insert(todos).values(data);
  } catch (error) {
    logEvent(
      'Error creating todo',
      {
        errorMessage: (error as Error).message,
      },
      'error',
    );
  }
}

/**
 * Handle updating a todo
 */
export async function updateTodo(id: TodoModel['id'], data: TodoUpdateInputs) {
  try {
    await db.update(todos).set(data).where(eq(todos.id, id));
  } catch (error) {
    logEvent(
      'Error updating todo',
      {
        errorMessage: (error as Error).message,
      },
      'error',
    );
  }
}
