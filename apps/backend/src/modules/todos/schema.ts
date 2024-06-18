import { todos } from '@repo/db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { paginationQuerySchema } from '../../libs/common-schemas';

export const todoSchema = createSelectSchema(todos);

export const apiTodosSchema = z.object({
  todos: z.array(todoSchema),
});

export const todosQuerySchema = paginationQuerySchema.merge(
  z.object({
    sort: z
      .enum(['id', 'text', 'done', 'authorId', 'createdAt'])
      .default('createdAt')
      .optional(),
  }),
);

export const createTodoSchema = createInsertSchema(todos);

export const updateTodoSchema = createInsertSchema(todos).partial();
