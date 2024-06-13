import { config } from '@repo/configs';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { nameSchema } from '../libs/common-schemas';

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

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const userModelSchema = createSelectSchema(users).omit({
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
    lastName: true,
    language: true,
    role: true,
  })
  .partial();

export type UserInputs = z.infer<typeof insertUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;
export type UserModel = z.infer<typeof userModelSchema>;
