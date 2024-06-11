import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { apiRoutes } from '@repo/api';
import { env } from '@repo/configs';
import { logger } from 'hono/logger';

const app = new OpenAPIHono();

app.use(logger());

app.route('/', apiRoutes);

serve(
  {
    fetch: app.fetch,
    port: Number(env.PORT),
  },
  (info) => {
    console.log(`Sever is running on http://${info.address}:${info.port}`);
  },
);
