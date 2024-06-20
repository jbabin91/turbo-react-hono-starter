import { config } from '@repo/configs';
import { nanoid } from '@repo/utils';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { nameSchema } from '../libs/common-schema';

const roleEnum = config.rolesByType.systemRoles;
const supportedLanguagesEnum = config.supportedLanguages;

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
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

export const userSchema = createSelectSchema(users, {
  createdAt: z.string(),
  email: z.string().email(),
}).omit({
  hashedPassword: true,
});

export const updateUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  firstName: nameSchema,
  lastName: nameSchema,
})
  .pick({
    email: true,
    firstName: true,
    language: true,
    lastName: true,
    role: true,
  })
  .partial();

export type UserModel = typeof users.$inferSelect;
export type InsertUserModel = typeof users.$inferInsert;
