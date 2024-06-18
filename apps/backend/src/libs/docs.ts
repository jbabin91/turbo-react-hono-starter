import { config } from '@repo/configs';
import { apiReference } from '@scalar/hono-api-reference';

import { type CustomHono } from './custom-hono';

const isProduction = config.mode === 'production';

const openAPITags = [
  {
    description:
      'Current user endpoints. They are split from `users` due to a different authorization flow.',
    name: 'me',
  },
  {
    description: '`USER` is also an entity, but NOT a contextual entity.',
    name: 'users',
  },
  {
    description:
      'Multiple authentication methods are included: email/password combination, OAuth with Github. Other Oauth providers and passkey support are work in progress.',
    name: 'auth',
  },
  {
    description: '`TODO` related endpoints',
    name: 'todos',
  },
];

export const docs = (app: CustomHono) => {
  const registry = app.openAPIRegistry;

  registry.registerComponent('securitySchemes', 'cookieAuth', {
    description:
      "Authentication cookie. If you don't have it, you need to sign in or sign up first.",
    in: 'cookie',
    name: 'turbo-react-hono-starter-session-v1',
    type: 'apiKey',
  });

  app.doc31('/openapi.json', {
    info: {
      description: `
      (ATTENTION: PRERELEASE!) This API documentation is split in modules. Each module relates to a module in the backend codebase. Each module should be at least loosely-coupled, but ideally entirely decoupled. The documentation is based upon zod schemas that are converted to openapi specs using hono middleware: zod-openapi.

      API design differentiates between three types of resources:

      1) page-related resources are called an 'entity' (ie ORGANIZATION or USER)
      2) a subclass are 'contextual entities' (ie ORGANIZATION, not USER)
      3) remaining data objects are simply content-related 'resources'.

      - Content-related resources - called simply 'resources' - don't have an API
        they run through the Electric SQL sync engine
      - SSE stream is not included in this API documentation
      - API design is flat, not nested
      - Production API is versioned
      `,
      title: `${config.name} API`,
      version: 'v1',
    },
    openapi: '3.1.0',
    security: [{ cookieAuth: [] }],
    servers: isProduction ? [{ url: 'api' }] : undefined,
    tags: openAPITags,
  });

  app.get(
    '/docs',
    apiReference({
      spec: {
        url: 'openapi.json',
      },
    }),
  );
};
