import { createTodoSchema, selectTodoSchema, updateTodoSchema } from '@repo/db';

import {
  errorResponses,
  successResponseWithDataSchema,
  successResponseWithoutDataSchema,
  successResponseWithPaginationSchema,
} from '../../libs/common-responses';
import { entityParamSchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isAuthenticated } from '../../middleware';
import { getTodosQuerySchema } from './schema';

export const getTodosRouteConfig = createRouteConfig({
  description: 'Get a list of todos',
  guard: isAuthenticated,
  method: 'get',
  path: '/',
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

export const createTodoRouteConfig = createRouteConfig({
  description: 'Create a new todo',
  guard: isAuthenticated,
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTodoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: successResponseWithoutDataSchema,
        },
      },
      description: 'Successfully create a new todo',
    },
    ...errorResponses,
  },
  summary: 'Create a new todo',
  tags: ['todos'],
});

export const deleteTodoRouteConfig = createRouteConfig({
  description: 'Delete todo by id',
  guard: isAuthenticated,
  method: 'delete',
  path: '/{id}',
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

export const updateTodoRouteConfig = createRouteConfig({
  description: 'Update a todo by id',
  guard: isAuthenticated,
  method: 'put',
  path: '/{id}',
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
