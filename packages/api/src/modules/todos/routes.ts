import { createRoute } from '@hono/zod-openapi';
import { selectTodoSchema, updateTodoSchema } from '@repo/db';

import {
  errorResponses,
  successResponseWithDataSchema,
  successResponseWithoutDataSchema,
  successResponseWithPaginationSchema,
} from '../../libs/common-responses';
import { entityParamSchema } from '../../libs/common-schemas';
import { isAuthenticated } from '../../middleware';
import { getTodosQuerySchema } from './schema';

export const getTodosRouteConfig = createRoute({
  description: 'Get a list of todos',
  guard: isAuthenticated,
  method: 'get',
  path: '/todos',
  request: {
    query: getTodosQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: successResponseWithPaginationSchema(selectTodoSchema),
        },
      },
      description: 'Successfully retrive a list of todos',
    },
    ...errorResponses,
  },
  summary: 'List of todos',
  tags: ['todos'],
});

export const deleteTodoRouteConfig = createRoute({
  description: 'Delete todo by id',
  guard: isAuthenticated,
  method: 'delete',
  path: '/todos/{id}',
  request: {
    params: entityParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: successResponseWithoutDataSchema,
        },
      },
      description: 'Successfully delete todo',
    },
    ...errorResponses,
  },
  summary: 'Delete todo by id',
  tags: ['todos'],
});

export const updateTodoRouteConfig = createRoute({
  description: 'Update a todo by id',
  guard: isAuthenticated,
  method: 'put',
  path: '/todos/{id}',
  request: {
    body: {
      content: {
        'application/json': {
          schema: updateTodoSchema,
        },
      },
    },
    params: entityParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: successResponseWithDataSchema(selectTodoSchema),
        },
      },
      description: 'Successfully update a todo',
    },
    ...errorResponses,
  },
  summary: 'Update a todo',
  tags: ['todos'],
});
