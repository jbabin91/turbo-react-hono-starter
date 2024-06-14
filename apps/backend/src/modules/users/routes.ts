import { updateUserSchema, userModelSchema } from '@repo/db';

import {
  errorResponses,
  successResponseWithDataSchema,
  successResponseWithErrorsSchema,
  successResponseWithPaginationSchema,
} from '../../libs/common-responses';
import {
  deleteByIdsQuerySchema,
  entityParamSchema,
} from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isAuthenticated, isSystemAdmin } from '../../middleware';
import { getUsersQuerySchema } from './schema';

export const getUsersRouteConfig = createRouteConfig({
  description: 'Get a list of users on system level.',
  guard: [isAuthenticated, isSystemAdmin],
  method: 'get',
  path: '/',
  request: {
    query: getUsersQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: successResponseWithPaginationSchema(userModelSchema),
        },
      },
      description: 'Users',
    },
    ...errorResponses,
  },
  summary: 'Get list of users',
  tags: ['users'],
});

export const deleteUsersRouteConfig = createRouteConfig({
  description: 'Delete users from system by list of ids.',
  guard: [isAuthenticated, isSystemAdmin],
  method: 'delete',
  path: '/',
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
  summary: 'Delete users',
  tags: ['users'],
});

export const getUserRouteConfig = createRouteConfig({
  description: 'Get a user by id.',
  guard: isAuthenticated,
  method: 'get',
  path: '/{id}',
  request: {
    params: entityParamSchema,
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
  summary: 'Get user',
  tags: ['users'],
});

export const updateUserRouteConfig = createRouteConfig({
  description: 'Update a user by id.',
  guard: [isAuthenticated, isSystemAdmin],
  method: 'put',
  path: '/{id}',
  request: {
    body: {
      content: {
        'application/json': {
          schema: updateUserSchema,
        },
      },
    },
    params: entityParamSchema,
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
  summary: 'Update user',
  tags: ['users'],
});
