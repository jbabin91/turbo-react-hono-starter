import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  client: {
    VITE_API_URL: z.string().url().default('http://localhost:3000'),
  },
  clientPrefix: 'VITE_',
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  server: {
    APP_URL: z.string().url().default('http://localhost:5173'),
    DATABASE_URL: z.string().url().optional(),
    PORT: z.string().default('3000'),
  },
});
