import { db, todos, todos as todosTable } from '@repo/db';
import { asc, eq } from 'drizzle-orm';

import { CustomHono } from '../../libs/custom-hono';
import { errorResponse } from '../../libs/errors';
import { nanoid } from '../../libs/nanoid';
import { logEvent } from '../../middleware';
import todosRoutesConfig from './routes';

const app = new CustomHono();

// Todos endpoints
const todosRoutes = app
  /**
   * Get a list of todos
   */
  .openapi(todosRoutesConfig.getTodos, async (c) => {
    const user = c.get('user');

    const todos = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.authorId, user.id))
      .orderBy(asc(todosTable.createdAt));

    return c.json(
      {
        data: todos,
        success: true,
      },
      200,
    );
  })
  /**
   * Create a new todo
   */
  .openapi(todosRoutesConfig.createTodo, async (c) => {
    const data = c.req.valid('json');
    const user = c.get('user');

    const todoId = nanoid();

    await db.insert(todos).values({
      ...data,
      authorId: user.id,
      id: todoId,
    });

    return c.json({ success: true }, 200);
  })
  /**
   * Delete todo by id
   */
  .openapi(todosRoutesConfig.deleteTodo, async (c) => {
    const { id } = c.req.valid('param');
    const user = c.get('user');

    // Get the todo
    const targetTodo = await db.query.todos.findFirst({
      where: eq(todosTable.id, id),
    });

    // Check if todo exists
    if (!targetTodo) {
      return errorResponse(c, 404, 'not_found', 'warn', {
        todo: id,
      });
    }

    // If the user doesn't have permission to delete any of the todos, return an error
    if (user.role !== 'ADMIN' && user.id !== targetTodo.authorId) {
      return errorResponse(c, 403, 'forbidden', 'warn', {
        todo: id,
      });
    }

    // Delete todo
    await db.delete(todosTable).where(eq(todosTable.id, id));

    // Send SSE events for the deleted todos
    logEvent('Todo deleted', { todo: targetTodo?.id ?? 'na' });

    return c.json({ success: true }, 200);
  })
  /**
   * Get a todo by id
   */
  .openapi(todosRoutesConfig.getTodo, async (c) => {
    const { id } = c.req.valid('param');
    const user = c.get('user');

    const targetTodo = await db.query.todos.findFirst({
      where: eq(todosTable.id, id),
    });

    // Check if todo exists
    if (!targetTodo) {
      return errorResponse(c, 404, 'not_found', 'warn', {
        todo: id,
      });
    }

    // If the user doesn't have permission to delete any of the todos, return an error
    if (user.role !== 'ADMIN' && user.id !== targetTodo.authorId) {
      return errorResponse(c, 403, 'forbidden', 'warn', {
        todo: id,
      });
    }

    return c.json({ data: targetTodo, success: true }, 200);
  })
  /**
   * Update a todo by id
   */
  .openapi(todosRoutesConfig.updateTodo, async (c) => {
    const { id } = c.req.valid('param');
    const user = c.get('user');

    const targetTodo = await db.query.todos.findFirst({
      where: eq(todosTable.id, id),
    });

    // Check if todo exists
    if (!targetTodo) {
      return errorResponse(c, 404, 'not_found', 'warn', {
        todo: id,
      });
    }

    // If the user doesn't have permission to update any of the todos, return an error
    if (user.role !== 'ADMIN' && user.id !== targetTodo.authorId) {
      return errorResponse(c, 403, 'forbidden', 'warn', {
        todo: id,
      });
    }

    const { text, done } = c.req.valid('json');

    const [updatedTodo] = await db
      .update(todosTable)
      .set({
        done,
        text,
      })
      .where(eq(todosTable.id, id))
      .returning();

    logEvent('Todo updated', { todo: updatedTodo?.id ?? 'na' });

    return c.json(
      {
        data: updatedTodo!,
        success: true,
      },
      200,
    );
  });

export default todosRoutes;
