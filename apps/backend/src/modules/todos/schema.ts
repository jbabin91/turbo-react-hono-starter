import { todos } from '@repo/db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const todoSchema = createSelectSchema(todos);

export const todosSchema = z.array(todoSchema);

export const createTodoSchema = createInsertSchema(todos);

export const updateTodoSchema = createInsertSchema(todos).partial();
