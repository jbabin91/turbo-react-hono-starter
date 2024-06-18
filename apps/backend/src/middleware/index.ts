import { CustomHono } from '../libs/custom-hono';
import { logEvent, logger } from './logger';

const middlewares = new CustomHono();

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
