import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { apiRoutes } from '@repo/api';
import { env } from '@repo/configs';

const app = new OpenAPIHono();

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
