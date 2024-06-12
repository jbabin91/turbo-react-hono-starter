import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  hashedPassword: text('hashed_password').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users).omit({
  hashedPassword: true,
});

export type UserInputs = z.infer<typeof insertUserSchema>;
export type UserModel = z.infer<typeof selectUserSchema>;
