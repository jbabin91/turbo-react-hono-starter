import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

import { CustomHono } from '../libs/custom-hono';
import { logEvent, logger } from './logger';

const middlewares = new CustomHono();

// Secure headers
middlewares.use('*', secureHeaders());

// Logger
middlewares.use(
  '*',
  logger(logEvent as unknown as Parameters<typeof logger>[0]),
);

// CORS
middlewares.use(
  '*',
  cors({
    allowHeaders: [],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    origin: ['https://starter.jacebabin.com', 'http://starter.jacebabin.com'],
  }),
);

// CSRF
middlewares.use(
  '*',
  csrf({
    origin: ['https://starter.jacebabin.com', 'http://starter.jacebabin.com'],
  }),
);

// Healthcheck
middlewares.get('/healthcheck', (c) => {
  return c.text('OK');
});

export { middlewares };

// Guard Middleware
export * from './guard';

// Logger Middleware
export * from './logger';
