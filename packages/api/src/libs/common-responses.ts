import { type createRoute } from '@hono/zod-openapi';
import { z } from 'zod';

import { errorResponseSchema, errorSchema } from './common-schemas';

type Responses = Parameters<typeof createRoute>[0]['responses'];

export const successResponseWithoutDataSchema = z.object({
  success: z.boolean(),
});

export const successResponseWithDataSchema = <T extends z.ZodTypeAny>(
  schema: T,
) => z.object({ data: schema, success: z.boolean() });

export const successResponseWithPaginationSchema = <T extends z.ZodTypeAny>(
  schema: T,
) =>
  z.object({
    data: z.object({
      items: schema.array(),
      total: z.number(),
    }),
    success: z.boolean(),
  });

export const successResponseWithErrorsSchema = () =>
  z.object({
    errors: z.array(errorSchema),
    success: z.boolean(),
  });

export const errorResponses = {
  400: {
    content: {
      'application/json': {
        schema: errorResponseSchema,
      },
    },
    description: 'Bad request: problem processing request.',
  },
  401: {
    content: {
      'application/json': {
        schema: errorResponseSchema,
      },
    },
    description: 'Unauthorized: authentication required.',
  },
  403: {
    content: {
      'application/json': {
        schema: errorResponseSchema,
      },
    },
    description: 'Forbidden: insufficient permissions.',
  },
  404: {
    content: {
      'application/json': {
        schema: errorResponseSchema,
      },
    },
    description: 'Not found: resource does not exist.',
  },
  500: {
    content: {
      'application/json': {
        schema: errorResponseSchema,
      },
    },
    description: 'Server error: something went wrong.',
  },
} satisfies Responses;
