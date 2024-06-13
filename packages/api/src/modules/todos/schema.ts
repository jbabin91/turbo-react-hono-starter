import { selectTodoSchema } from '@repo/db';
import { z } from 'zod';

import { paginationQuerySchema } from '../../libs/common-schemas';

export const apiTodosSchema = z.object({
  todos: z.array(selectTodoSchema),
});

export const getTodosQuerySchema = paginationQuerySchema.merge(
  z.object({
    sort: z
      .enum(['id', 'text', 'done', 'authorId', 'createdAt'])
      .default('createdAt')
      .optional(),
  }),
);
