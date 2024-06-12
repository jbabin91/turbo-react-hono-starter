import { OpenAPIHono } from '@hono/zod-openapi';
import { env } from '@repo/configs';

import { type Env } from './types';

const apiRoutes = new OpenAPIHono<Env>();

apiRoutes.use(async (c, next) => {
  c.set('APP_URL', env.APP_URL);
  return await next();
});

apiRoutes
  .get('/', (c) => {
    return c.text('Hello Hono!');
  })
  .get('/healthcheck', (c) => {
    return c.text('OK');
  })
  .get('/app-url', (c) => {
    return c.json({
      appUrl: `APP_URL: ${c.get('APP_URL')}`,
    });
  });

export { apiRoutes };
