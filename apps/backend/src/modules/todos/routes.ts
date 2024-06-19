import {
  errorResponses,
  successWithDataSchema,
  successWithoutDataSchema,
} from '../../libs/common-responses';
import { entityParamSchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isAuthenticated } from '../../middleware';
import {
  createTodoSchema,
  todoSchema,
  todosSchema,
  updateTodoSchema,
} from './schema';

class TodosRoutesConfig {
  public getTodos = createRouteConfig({
    description: 'Get a list of todos',
    guard: isAuthenticated,
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successWithDataSchema(todosSchema),
          },
        },
        description: 'Successfully retrive a list of todos',
      },
      ...errorResponses,
    },
    summary: 'List of todos',
    tags: ['todos'],
  });

  public createTodo = createRouteConfig({
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
            schema: successWithoutDataSchema,
          },
        },
        description: 'Successfully create a new todo',
      },
      ...errorResponses,
    },
    summary: 'Create a new todo',
    tags: ['todos'],
  });

  public deleteTodo = createRouteConfig({
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
            schema: successWithoutDataSchema,
          },
        },
        description: 'Successfully delete todo',
      },
      ...errorResponses,
    },
    summary: 'Delete todo by id',
    tags: ['todos'],
  });

  public getTodo = createRouteConfig({
    description: 'Get a todo by id',
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
            schema: successWithDataSchema(todoSchema),
          },
        },
        description: 'Todo',
      },
      ...errorResponses,
    },
    summary: 'Get todo',
    tags: ['todos'],
  });

  public updateTodo = createRouteConfig({
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
            schema: successWithDataSchema(todoSchema),
          },
        },
        description: 'Successfully update a todo',
      },
      ...errorResponses,
    },
    summary: 'Update a todo',
    tags: ['todos'],
  });
}

export default new TodosRoutesConfig();
