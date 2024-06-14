import { z } from 'zod';

export const cookieSchema = z.string();

export const idSchema = z.string();

export const errorSchema = z.object({
  logId: z.string().optional(),
  message: z.string().optional(),
  method: z.string().optional(),
  path: z.string().optional(),
  severity: z.string(),
  status: z.number(),
  timestamp: z.string().optional(),
  type: z.string(),
  usr: z.string().optional(),
});

export const errorResponseSchema = z.object({
  error: errorSchema,
  success: z.boolean().default(false),
});

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

export const deleteByIdsQuerySchema = z.object({
  ids: z.union([z.string(), z.array(z.string())]),
});

export const entityParamSchema = z.object({
  id: idSchema,
});
