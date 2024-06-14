import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { users } from './users';

export const todos = pgTable('todos', {
  id: text('id').primaryKey(),
  text: text('text').notNull(),
  done: boolean('done').default(false).notNull(),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const insertTodoSchema = createInsertSchema(todos);
export const createTodoSchema = createInsertSchema(todos).omit({
  id: true,
  authorId: true,
  createdAt: true,
});
export const selectTodoSchema = createSelectSchema(todos);
export const updateTodoSchema = createInsertSchema(todos)
  .pick({
    text: true,
    done: true,
  })
  .partial();

export type TodoInputs = z.infer<typeof insertTodoSchema>;
export type TodoUpdateInputs = z.infer<typeof updateTodoSchema>;
export type TodoModel = z.infer<typeof selectTodoSchema>;
