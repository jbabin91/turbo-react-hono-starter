import { createRoute } from '@hono/zod-openapi';
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
import { isAuthenticated, isSystemAdmin } from '../../middleware';
import { getUsersQuerySchema } from './schema';

export const getUsersRouteConfig = createRoute({
  description: 'Get a list of users on system level',
  guard: [isAuthenticated, isSystemAdmin],
  method: 'get',
  path: '/users',
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
      description: 'List of Users',
    },
    ...errorResponses,
  },
  summary: 'Get list of users',
  tags: ['users'],
});

export const deleteUsersRouteConfig = createRoute({
  description: 'Delete users from system by list of ids',
  guard: [isAuthenticated, isSystemAdmin],
  method: 'delete',
  path: '/users',
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
      description: 'Delete users',
    },
    ...errorResponses,
  },
  summary: 'Delete users by list of ids',
  tags: ['users'],
});

export const getUserRouteConfig = createRoute({
  description: 'Get a user by id',
  guard: isAuthenticated,
  method: 'get',
  path: '/users/{id}',
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
  summary: 'Get user by id',
  tags: ['users'],
});

export const updateUserRouteConfig = createRoute({
  description: 'Update a user by id',
  guard: [isAuthenticated, isSystemAdmin],
  method: 'put',
  path: '/users/{id}',
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
      description: 'Updated user',
    },
    ...errorResponses,
  },
  summary: 'Update user by id',
  tags: ['users'],
});
