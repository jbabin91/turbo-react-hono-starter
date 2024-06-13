import { type MiddlewareHandler } from 'hono';

import { errorResponse } from '../../libs/errors';

export const isSystemAdmin: MiddlewareHandler = async (c, next) => {
  // Extract user
  const user = c.get('user');

  // TODO: Add more checks for system admin, such as IP address, 2FA, etc.
  if (!user?.role.includes('ADMIN')) {
    console.error('User is not a system admin');
    return errorResponse(c, 403, 'forbidden', 'warn', {
      user: user.id,
    });
  }

  return await next();
};

export const isPublicAccess: MiddlewareHandler = async (_, next) => {
  return await next();
};

export * from './is-authenticated';
