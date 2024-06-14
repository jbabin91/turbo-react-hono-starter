// Set i18n instance before starting server
import './libs/i18n';

import { CustomHono } from './libs/custom-hono';
import { defaultHook } from './libs/default-hook';
import { docs } from './libs/docs';
import { errorResponse } from './libs/errors';
import { middlewares } from './middleware';
import { modulesRoutes } from './modules';

const app = new CustomHono({
  defaultHook,
});

// Add global middlewares
app.route('', middlewares);

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

const apiRoutes = app;

// API routes
apiRoutes.route('/', modulesRoutes);

export { apiRoutes };
