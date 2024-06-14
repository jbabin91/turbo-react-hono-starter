import { userModelSchema } from '@repo/db';
import { z } from 'zod';

import {
  errorResponses,
  successResponseWithDataSchema,
  successResponseWithoutDataSchema,
} from '../../libs/common-responses';
import { cookieSchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isPublicAccess } from '../../middleware';
import { signInSchema, signUpSchema } from './schema';

export const signUpRouteConfig = createRouteConfig({
  description: 'Sign up with email and password',
  guard: isPublicAccess,
  method: 'post',
  path: '/sign-up',
  request: {
    body: {
      content: {
        'application/json': {
          schema: signUpSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: successResponseWithoutDataSchema,
        },
      },
      description: 'User sign up',
      headers: z.object({
        'Set-Cookie': cookieSchema,
      }),
    },
    ...errorResponses,
  },
  security: [],
  summary: 'Sign up',
  tags: ['auth'],
});

export const signInRouteConfig = createRouteConfig({
  description: 'Sign in with email and password',
  guard: isPublicAccess,
  method: 'post',
  path: '/sign-in',
  request: {
    body: {
      content: {
        'application/json': {
          schema: signInSchema,
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
      description: 'User signed in',
      headers: z.object({
        'Set-Cookie': cookieSchema,
      }),
    },
    ...errorResponses,
  },
  security: [],
  summary: 'Sign in with email and password',
  tags: ['auth'],
});

export const signOutRouteConfig = createRouteConfig({
  description: 'Sign out and clear session',
  guard: isPublicAccess,
  method: 'get',
  path: '/sign-out',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: successResponseWithoutDataSchema,
        },
      },
      description: 'User signed out',
    },
    ...errorResponses,
  },
  security: [],
  summary: 'Sign out',
  tags: ['auth'],
});
