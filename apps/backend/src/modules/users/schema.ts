import { config } from '@repo/configs';
import { users } from '@repo/db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { nameSchema, paginationQuerySchema } from '../../libs/common-schemas';

export const userSchema = createSelectSchema(users, {
  createdAt: z.string(),
  email: z.string().email(),
}).omit({
  hashedPassword: true,
});

export const usersQuerySchema = paginationQuerySchema.merge(
  z.object({
    role: z.enum(config.rolesByType.systemRoles).default('USER').optional(),
    sort: z
      .enum(['id', 'name', 'email', 'role', 'createdAt'])
      .default('createdAt')
      .optional(),
  }),
);

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
