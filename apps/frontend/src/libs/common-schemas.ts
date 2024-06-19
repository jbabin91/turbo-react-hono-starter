import { z } from 'zod';

const offsetRefine = (value: string | undefined) => Number(value) >= 0;
const limitRefine = (value: string | undefined) => Number(value) > 0;

export const paginationQuerySchema = z.object({
  limit: z
    .string()
    .default('50')
    .optional()
    .refine(limitRefine, 'Must be number greater than 0'),
  offset: z
    .string()
    .default('0')
    .optional()
    .refine(offsetRefine, 'Must be number greater or equal to 0'),
  order: z.enum(['asc', 'desc']).default('asc').optional(),
  q: z.string().optional(),
  sort: z.enum(['createdAt']).default('createdAt').optional(),
});
