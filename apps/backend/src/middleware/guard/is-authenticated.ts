import { lucia } from '@repo/auth';
import { type MiddlewareHandler } from 'hono';

import { removeSessionCookie } from '../../libs/cookies';
import { errorResponse } from '../../libs/errors';

export const isAuthenticated: MiddlewareHandler = async (c, next) => {
  const cookieHeader = c.req.raw.headers.get('Cookie');
  const sessionId = lucia.readSessionCookie(cookieHeader ?? '');

  if (!sessionId) {
    removeSessionCookie(c);
    return errorResponse(c, 401, 'no_session', 'warn');
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (!session) {
    removeSessionCookie(c);
    return errorResponse(c, 401, 'no_session', 'warn');
  }

  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    c.header('Set-Cookie', sessionCookie.serialize());
  }

  c.set('user', user);

  return await next();
};
