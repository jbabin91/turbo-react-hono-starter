import { config } from '@repo/configs';
import { z } from 'zod';

import { paginationQuerySchema } from '../../libs/common-schemas';

export const getUsersQuerySchema = paginationQuerySchema.merge(
  z.object({
    role: z.enum(config.rolesByType.systemRoles).default('USER').optional(),
    sort: z
      .enum(['id', 'name', 'email', 'role', 'createdAt'])
      .default('createdAt')
      .optional(),
  }),
);
