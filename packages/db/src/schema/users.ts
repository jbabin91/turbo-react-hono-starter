import { config } from '@repo/configs';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const roleEnum = config.rolesByType.systemRoles;
const supportedLanguagesEnum = config.supportedLanguages;

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  hashedPassword: text('hashed_password').notNull(),
  language: text('language', { enum: supportedLanguagesEnum })
    .notNull()
    .default('en'),
  role: text('role', { enum: roleEnum }).notNull().default('USER'),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export type UserModel = typeof users.$inferSelect;
export type InsertUserModel = typeof users.$inferInsert;
