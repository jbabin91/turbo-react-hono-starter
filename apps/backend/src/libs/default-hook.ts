import { type Hook } from '@hono/zod-openapi';
import { ZodError } from 'zod';

import { logEvent } from '../middleware';
import { type Env } from '../types';

export const defaultHook: Hook<unknown, Env, '', unknown> = (result, c) => {
  if (!result.success && result.error instanceof ZodError) {
    logEvent(
      'Validation error',
      {
        error: result.error.issues[0]!.message,
        path: result.error.issues[0]!.path[0] ?? null,
      },
      'info',
    );

    return c.json(
      { error: result.error.issues[0]?.message, success: false },
      400,
    );
  }
  return;
};
