import { lucia } from '@repo/auth';
import { config } from '@repo/configs';
import { type Context } from 'hono';
import { setCookie as baseSetCookie } from 'hono/cookie';
import { type User } from 'lucia';

import { logEvent } from '../middleware';

const isProduction = config.mode === 'production';

export const setCookie = (c: Context, name: string, value: string) =>
  baseSetCookie(c, name, value, {
    domain: isProduction ? config.domain : undefined,
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
    path: '/',
    sameSite: isProduction ? 'lax' : 'lax',
    secure: isProduction, // set `Secure` flag in HTTPS
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
