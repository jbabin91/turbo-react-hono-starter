import { updateUserSchema, userModelSchema } from '@repo/db';

import {
  errorResponses,
  successResponseWithDataSchema,
  successResponseWithErrorsSchema,
  successResponseWithoutDataSchema,
} from '../../libs/common-responses';
import { deleteByIdsQuerySchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isAuthenticated } from '../../middleware';

class MeRoutesConfig {
  public me = createRouteConfig({
    description:
      'Get the current user (self). It includes a `counts` object and a list of `sessions`.',
    guard: isAuthenticated,
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successResponseWithDataSchema(userModelSchema),
          },
        },
        description: 'Current User',
      },
      ...errorResponses,
    },
    summary: 'Get self',
    tags: ['me'],
  });

  public updateSelf = createRouteConfig({
    description: 'Update the current user (self).',
    guard: isAuthenticated,
    method: 'put',
    path: '/',
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateUserSchema.omit({
              role: true,
            }),
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successResponseWithDataSchema(userModelSchema),
          },
        },
        description: 'User',
      },
      ...errorResponses,
    },
    summary: 'Update self',
    tags: ['me'],
  });

  public deleteSelf = createRouteConfig({
    description: 'Delete the current user (self).',
    guard: isAuthenticated,
    method: 'delete',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successResponseWithoutDataSchema,
          },
        },
        description: 'User deleted',
      },
      ...errorResponses,
    },
    summary: 'Delete self',
    tags: ['me'],
  });

  public terminateSessions = createRouteConfig({
    description:
      'Terminate all sessions of the current user, except for current session.',
    guard: isAuthenticated,
    method: 'delete',
    path: '/sessions',
    request: {
      query: deleteByIdsQuerySchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successResponseWithErrorsSchema(),
          },
        },
        description: 'Success',
      },
      ...errorResponses,
    },
    summary: 'Terminate sessions',
    tags: ['me'],
  });
}

export default new MeRoutesConfig();
