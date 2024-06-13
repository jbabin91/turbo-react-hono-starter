import { lucia, type User } from '@repo/auth';
import { type Context } from 'hono';
import { setCookie as baseSetCookie } from 'hono/cookie';

import { logEvent } from '../middleware';

export const setCookie = (c: Context, name: string, value: string) =>
  baseSetCookie(c, name, value, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    secure: false,
  });

export const setSessionCookie = async (
  c: Context,
  userId: User['id'],
  strategy: string,
) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  logEvent('User signed in', { strategy, user: userId });

  c.header('Set-Cookie', sessionCookie.serialize());
};

export const removeSessionCookie = (c: Context) => {
  const sessionCookie = lucia.createBlankSessionCookie();
  c.header('Set-Cookie', sessionCookie.serialize());
};
