import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});
