import { config } from '@repo/configs';
import { z } from 'zod';

import { paginationQuerySchema } from '../../libs/common-schemas';

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  name: z.string(),
  email: z.string().email(),
  language: z.enum(config.supportedLanguages),
  role: z.enum(config.rolesByType.systemRoles),
  createdAt: z.string(),
});

export const updateUserSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .partial();

export const usersQuerySchema = paginationQuerySchema.merge(
  z.object({
    role: z.enum(config.rolesByType.systemRoles).default('USER').optional(),
    sort: z
      .enum(['id', 'name', 'email', 'role', 'createdAt'])
      .default('createdAt')
      .optional(),
  }),
);
