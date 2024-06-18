import { config } from '@repo/configs';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';

import { CustomHono } from './libs/custom-hono';
import { defaultHook } from './libs/default-hook';
import { docs } from './libs/docs';
import { errorResponse } from './libs/errors';
import { middlewares } from './middleware';
import authRoutes from './modules/auth';
import meRoutes from './modules/me';
import todosRoutes from './modules/todos';
import usersRoutes from './modules/users';

const app = new CustomHono({
  defaultHook,
});

// Add global middlewares
app.route('', middlewares);

console.log('config.frontendUrl', config.frontendUrl);

// CORS
app.use(
  cors({
    allowHeaders: ['Content-Type', 'Authorization', 'Origin'],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    exposeHeaders: ['Content-Length', 'Set-Cookie'],
    origin: (origin) => {
      console.log('CORS origin', origin);
      console.log('CORS endsWith', origin.endsWith('.jacebabin.com'));
      return origin.endsWith('.jacebabin.com') ? origin : config.frontendUrl;
    },
  }),
);

// CSRF
app.use(
  '*',
  csrf({
    origin: (origin) => {
      console.log('CSRF origin', origin);
      console.log('CSRF endsWith', origin.endsWith('.jacebabin.com'));
      return origin.endsWith('.jacebabin.com') || origin === config.frontendUrl;
    },
  }),
);

// Init OpenAPI docs
docs(app);

// Generic route
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

// Not found handler
app.notFound((c) => {
  return errorResponse(c, 404, 'route_not_found', 'warn', { path: c.req.path });
});

// Error handler
app.onError((err, c) => {
  return errorResponse(c, 500, 'server_error', 'error', {}, err);
});

// API routes
const routes = app
  .route('/auth', authRoutes)
  .route('/me', meRoutes)
  .route('/users', usersRoutes)
  .route('/todos', todosRoutes);

export type AppTypes = typeof routes;

export default app;
