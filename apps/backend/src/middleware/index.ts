import { config } from '@repo/configs';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

import { CustomHono } from '../libs/custom-hono';
import { logEvent, logger } from './logger';

const middlewares = new CustomHono();

// Secure headers
middlewares.use('*', secureHeaders());

console.log('config.frontendUrl', config.frontendUrl);

// CORS
middlewares.use(
  '*',
  cors({
    allowHeaders: [],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    origin: [config.frontendUrl, config.backendUrl],
  }),
);

// CSRF
middlewares.use(
  '*',
  csrf({
    origin: [config.frontendUrl, config.backendUrl],
  }),
);

// Logger
middlewares.use(
  '*',
  logger(logEvent as unknown as Parameters<typeof logger>[0]),
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

// Rate Limiter Middleware
export * from './rate-limiter';
