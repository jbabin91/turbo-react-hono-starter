import { and, count, db, eq, ilike, todos as todosTable } from '@repo/db';

import { CustomHono } from '../../libs/custom-hono';
import { errorResponse } from '../../libs/errors';
import { nanoid } from '../../libs/nanoid';
import { getOrderColumn } from '../../libs/order-column';
import { logEvent } from '../../middleware';
import { createTodo } from './helper/todo';
import {
  createTodoRouteConfig,
  deleteTodoRouteConfig,
  getTodosRouteConfig,
  updateTodoRouteConfig,
} from './routes';

const app = new CustomHono();

// Todos endpoints
const todosRoutes = app
  /**
   * Get a list of todos
   */
  .openapi(getTodosRouteConfig, async (c) => {
    const { q, sort, order, offset, limit } = c.req.valid('query');

    const orderColumn = getOrderColumn(
      {
        authorId: todosTable.authorId,
        createdAt: todosTable.createdAt,
        done: todosTable.done,
        id: todosTable.id,
        text: todosTable.text,
      },
      sort,
      todosTable.id,
      order,
    );

    const filters = [];

    if (q) {
      filters.push(ilike(todosTable.text, `%${q}%`));
    }

    const todosQuery = db
      .select()
      .from(todosTable)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(orderColumn);

    const [totalQuery] = await db
      .select({ total: count() })
      .from(todosQuery.as('todos'));

    const result = await todosQuery.limit(Number(limit)).offset(Number(offset));

    return c.json(
      {
        data: {
          items: result,
          total: totalQuery?.total ?? 0,
        },
        success: true,
      },
      200,
    );
  })
  /**
   * Create a new todo
   */
  .openapi(createTodoRouteConfig, async (c) => {
    const data = c.req.valid('json');
    const user = c.get('user');

    const todoId = nanoid();

    await createTodo({
      ...data,
      authorId: user.id,
      id: todoId,
    });

    return c.json({ success: true }, 201);
  })
  /**
   * Delete todo by id
   */
  .openapi(deleteTodoRouteConfig, async (c) => {
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
    if (user.role !== 'ADMIN' || user.id !== targetTodo.authorId) {
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
   * Update a todo by id
   */
  .openapi(updateTodoRouteConfig, async (c) => {
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
    if (user.role !== 'ADMIN' || user.id !== targetTodo.authorId) {
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
        data: {
          ...updatedTodo!,
        },
        success: true,
      },
      200,
    );
  });

export type TodosRoutes = typeof todosRoutes;

export default todosRoutes;
