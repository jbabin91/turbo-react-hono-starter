import { env } from '@repo/configs';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
  dialect: 'postgresql',
  schema: './src/schema',
  strict: true,
  verbose: true,
});
