import { lucia } from '@repo/auth';
import { db, eq, users } from '@repo/db';

import { removeSessionCookie } from '../../libs/cookies';
import { CustomHono } from '../../libs/custom-hono';
import { createError, errorResponse } from '../../libs/errors';
import { logEvent } from '../../middleware';
import { type ErrorType } from '../../types';
import { transformDatabaseUser } from '../users/helpers/transform-database-user';
import meRoutesConfig from './routes';

const app = new CustomHono();

// Me (self) endpoints
const meRoutes = app
  /**
   * Get current user
   */
  .openapi(meRoutesConfig.me, (c) => {
    const user = c.get('user');
    return c.json({ data: user, success: true }, 200);
  })
  /**
   * Terminate a session
   */
  .openapi(meRoutesConfig.terminateSessions, async (c) => {
    const { ids } = c.req.valid('query');

    const sessionIds = Array.isArray(ids) ? ids : [ids];

    const cookieHeader = c.req.raw.headers.get('Cookie');
    const currentSessionId = lucia.readSessionCookie(cookieHeader ?? '');

    const errors: ErrorType[] = [];

    await Promise.all(
      sessionIds.map(async (id) => {
        try {
          if (id === currentSessionId) {
            removeSessionCookie(c);
          }
          await lucia.invalidateSession(id);
        } catch {
          errors.push(
            createError(c, 404, 'not_found', 'warn', { session: id }),
          );
        }
      }),
    );

    return c.json({ errors, success: true }, 200);
  })
  /**
   * Update current user (self)
   */
  .openapi(meRoutesConfig.updateSelf, async (c) => {
    const user = c.get('user');

    if (!user) {
      return errorResponse(c, 404, 'not_found', 'warn', { user: 'self' });
    }

    const { email, firstName, lastName, language } = c.req.valid('json');

    const [updatedUser] = await db
      .update(users)
      .set({
        email,
        firstName,
        language,
        lastName,
        name: [firstName, lastName].filter(Boolean).join(' '),
      })
      .where(eq(users.id, user.id))
      .returning();

    if (!updatedUser) {
      return errorResponse(c, 400, 'bad_request_action', 'warn', {
        user: user.id,
      });
    }

    logEvent('User updated', { user: updatedUser.id });

    const sessions = await lucia.getUserSessions(user.id);
    const currentSessionId = lucia.readSessionCookie(
      c.req.raw.headers.get('Cookie') ?? '',
    );
    const preparedSessions = sessions.map((session) => ({
      ...session,
      current: session.id === currentSessionId,
      type: 'DESKTOP' as const,
    }));

    return c.json(
      {
        data: {
          ...transformDatabaseUser(updatedUser),
          sessions: preparedSessions,
        },
        success: true,
      },
      200,
    );
  })
  /**
   * Delete current user (self)
   */
  .openapi(meRoutesConfig.deleteSelf, async (c) => {
    const user = c.get('user');

    // Check if user exists
    if (!user) {
      return errorResponse(c, 404, 'not_found', 'warn', { user: 'self' });
    }

    // Delete user
    await db.delete(users).where(eq(users.id, user.id));

    // Invalidate all sessions
    await lucia.invalidateUserSessions(user.id);
    removeSessionCookie(c);

    logEvent('User deleted', { user: user.id });

    return c.json({ success: true }, 200);
  });

export default meRoutes;
