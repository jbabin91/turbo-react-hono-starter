import { userSchema } from '@repo/db';
import { z } from 'zod';

import {
  errorResponses,
  successWithDataSchema,
  successWithoutDataSchema,
} from '../../libs/common-responses';
import { cookieSchema } from '../../libs/common-schemas';
import { createRouteConfig } from '../../libs/route-config';
import { isPublicAccess, limiter } from '../../middleware';
import { signInSchema, signUpSchema } from './schema';

class AuthRoutesConfig {
  public signUp = createRouteConfig({
    description: 'Sign up with email and password',
    guard: isPublicAccess,
    method: 'post',
    middleware: [limiter],
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
      200: {
        content: {
          'application/json': {
            schema: successWithDataSchema(userSchema),
          },
        },
        description: 'User signed up',
        headers: z.object({
          'Set-Cookie': cookieSchema,
        }),
      },
      ...errorResponses,
    },
    security: [],
    summary: 'Sign up with password',
    tags: ['auth'],
  });

  public signIn = createRouteConfig({
    description: 'Sign in with email and password.',
    guard: isPublicAccess,
    method: 'post',
    middleware: [limiter],
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
            schema: successWithDataSchema(userSchema),
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

  public signOut = createRouteConfig({
    description: 'Sign out yourself and clear session.',
    guard: isPublicAccess,
    method: 'post',
    path: '/sign-out',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: successWithoutDataSchema,
          },
        },
        description: 'User signed out',
      },
      ...errorResponses,
    },
    summary: 'Sign out',
    tags: ['auth'],
  });
}

export default new AuthRoutesConfig();
