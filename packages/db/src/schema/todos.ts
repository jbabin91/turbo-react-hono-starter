import { nanoid } from '@repo/utils';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { users } from './users';

export const todos = pgTable('todos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
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

export const todoSchema = createSelectSchema(todos);
export const insertTodoSchema = createInsertSchema(todos);

export type TodoModel = typeof todos.$inferSelect;
export type InsertTodoModel = typeof todos.$inferInsert;
