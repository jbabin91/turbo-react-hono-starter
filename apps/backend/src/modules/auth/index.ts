import { lucia } from '@repo/auth';
import { config } from '@repo/configs';
import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';
import { LegacyScrypt } from 'lucia';

import { removeSessionCookie, setSessionCookie } from '../../libs/cookies';
import { CustomHono } from '../../libs/custom-hono';
import { errorResponse } from '../../libs/errors';
import { nanoid } from '../../libs/nanoid';
import { logEvent } from '../../middleware';
import { transformDatabaseUser } from '../users/helpers/transform-database-user';
import { createUser } from './helper/user';
import {
  signInRouteConfig,
  signOutRouteConfig,
  signUpRouteConfig,
} from './routes';

export const app = new CustomHono();

// Auth endpoints
const authRoutes = app
  /**
   * Sign up with email and password
   */
  .openapi(signUpRouteConfig, async (c) => {
    const data = c.req.valid('json');

    // Hash Password
    const hashedPassword = await new LegacyScrypt().hash(data.password);
    const userId = nanoid();

    // Create user
    await createUser(c, {
      email: data.email.toLowerCase(),
      firstName: data.firstName,
      hashedPassword,
      id: userId,
      language: config.defaultLanguage,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
    });

    return c.json({ success: true }, 200);
  })
  /**
   * Sign in with email and password
   */
  .openapi(signInRouteConfig, async (c) => {
    const { email, password } = c.req.valid('json');

    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    // If the user is not found
    if (!user) {
      return errorResponse(c, 404, 'not_found', 'warn');
    }

    const validPassword = await new LegacyScrypt().verify(
      user.hashedPassword,
      password,
    );

    if (!validPassword) {
      return errorResponse(c, 400, 'invalid_password', 'warn');
    }

    await setSessionCookie(c, user.id, 'password');

    return c.json(
      {
        data: transformDatabaseUser(user),
        success: true,
      },
      200,
    );
  })
  /**
   * Sign out
   */
  .openapi(signOutRouteConfig, async (c) => {
    const cookieHeader = c.req.raw.headers.get('Cookie');
    const sessionId = lucia.readSessionCookie(cookieHeader ?? '');

    if (!sessionId) {
      removeSessionCookie(c);
      return errorResponse(c, 401, 'unauthorized', 'warn');
    }

    const { session } = await lucia.validateSession(sessionId);

    if (session) {
      await lucia.invalidateSession(session.id);
    }

    removeSessionCookie(c);
    logEvent('User signed out', { user: session?.userId ?? 'na' });

    return c.json({ success: true }, 200);
  });

export type AuthRoutes = typeof authRoutes;

export default authRoutes;
