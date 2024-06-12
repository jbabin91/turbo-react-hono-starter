import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

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
