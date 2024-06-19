import { updateUserSchema, userSchema } from '@repo/db';

import {
  errorResponses,
  successWithDataSchema,
  successWithErrorsSchema,
  successWithPaginationSchema,
} from '../../libs/common-responses';
import { entityParamSchema, idsQuerySchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isAuthenticated, isSystemAdmin } from '../../middleware';
import { usersQuerySchema } from './schema';

class UsersRoutesConfig {
  public getUsers = createRouteConfig({
    description: 'Get a list of users on system level.',
    guard: [isAuthenticated, isSystemAdmin],
    method: 'get',
    path: '/',
    request: {
      query: usersQuerySchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successWithPaginationSchema(userSchema),
          },
        },
        description: 'Users',
      },
      ...errorResponses,
    },
    summary: 'Get list of users',
    tags: ['users'],
  });

  public deleteUsers = createRouteConfig({
    description: 'Delete users from system by list of ids.',
    guard: [isAuthenticated, isSystemAdmin],
    method: 'delete',
    path: '/',
    request: {
      query: idsQuerySchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successWithErrorsSchema(),
          },
        },
        description: 'Success',
      },
      ...errorResponses,
    },
    summary: 'Delete users',
    tags: ['users'],
  });

  public getUser = createRouteConfig({
    description: 'Get a user by id or slug.',
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
            schema: successWithDataSchema(userSchema),
          },
        },
        description: 'User',
      },
      ...errorResponses,
    },
    summary: 'Get user',
    tags: ['users'],
  });

  public updateUser = createRouteConfig({
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
            schema: successWithDataSchema(userSchema),
          },
        },
        description: 'User',
      },
      ...errorResponses,
    },
    summary: 'Update user',
    tags: ['users'],
  });
}

export default new UsersRoutesConfig();
