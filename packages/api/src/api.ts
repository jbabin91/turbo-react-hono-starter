import { config } from '@repo/configs';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

import { CustomHono } from './libs/custom-hono';
import { logEvent, logger } from './middleware';
import { modulesRoutes } from './modules';

const apiRoutes = new CustomHono();

// Secure headers
apiRoutes.use('*', secureHeaders());

// Logger
apiRoutes.use('*', logger(logEvent as unknown as Parameters<typeof logger>[0]));

// CORS
apiRoutes.use(
  '*',
  cors({
    allowHeaders: [],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    origin: config.frontendUrl,
  }),
);

// CSRF
apiRoutes.use(
  '*',
  csrf({
    origin: config.frontendUrl,
  }),
);

// Generic route
apiRoutes.get('/', (c) => {
  return c.text('Hello Hono!');
});

// Healthcheck
apiRoutes.get('/healthcheck', (c) => {
  return c.text('OK');
});

// API routes
apiRoutes.route('/', modulesRoutes);

export { apiRoutes };
