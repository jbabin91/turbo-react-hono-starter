import { lucia } from '@repo/auth';
import { db, users } from '@repo/db';
import { eq, inArray } from 'drizzle-orm';

import { removeSessionCookie } from '../../libs/cookies';
import { CustomHono } from '../../libs/custom-hono';
import { createError, errorResponse } from '../../libs/errors';
import { logEvent } from '../../middleware';
import { type ErrorType } from '../../types';
import { transformDatabaseUser } from './helpers/transform-database-user';
import usersRoutesConfig from './routes';

const app = new CustomHono();

// Users endpoints
const usersRoutes = app
  /**
   * Get a list of users
   */
  .openapi(usersRoutesConfig.getUsers, async (c) => {
    const user = c.get('user');

    if (user.role !== 'ADMIN') {
      return errorResponse(c, 403, 'forbidden', 'warn', {
        user: user.id,
      });
    }

    const users = await db.query.users.findMany();

    return c.json(
      {
        data: users,
        success: true,
      },
      200,
    );
  })
  /**
   * Delete users
   */
  .openapi(usersRoutesConfig.deleteUsers, async (c) => {
    const { ids } = c.req.valid('query');
    const user = c.get('user');

    // Covert the user ids to an array
    const userIds = Array.isArray(ids) ? ids : [ids];

    const errors: ErrorType[] = [];

    // Get the users
    const targets = await db.query.users.findMany({
      where: inArray(users.id, userIds),
    });

    // Check if the users exist
    for (const id of userIds) {
      if (!targets.some((target) => target.id === id)) {
        errors.push(
          createError(c, 404, 'not_found', 'warn', {
            user: id,
          }),
        );
      }
    }

    // Filter out users that the user doesn't have permission to delete
    const allowedTargets = targets.filter((target) => {
      const userId = target.id;

      if (user.role !== 'ADMIN' && user.id !== userId) {
        errors.push(
          createError(c, 403, 'delete_forbidden', 'warn', { user: userId }),
        );
        return false;
      }
      return true;
    });

    // If the user doesn't have permission to delete any of the users, return an error
    if (allowedTargets.length === 0) {
      return c.json({ errors, success: false }, 200);
    }

    // Delete the users
    await db.delete(users).where(
      inArray(
        users.id,
        allowedTargets.map((target) => target.id),
      ),
    );

    // Send SSE events for the users that were deleted
    for (const { id } of allowedTargets) {
      // Invalidate the user's sessions if the user is deleting themselves
      if (user.id === id) {
        await lucia.invalidateUserSessions(user.id);
        removeSessionCookie(c);
      }
      logEvent('User deleted', { user: id });
    }

    return c.json({ errors, success: true }, 200);
  })
  /**
   * Get a user by id
   */
  .openapi(usersRoutesConfig.getUser, async (c) => {
    const { id } = c.req.valid('param');
    const user = c.get('user');

    const targetUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!targetUser) {
      return errorResponse(c, 404, 'not_found', 'warn', {
        user: id,
      });
    }

    if (user.role !== 'ADMIN' && user.id !== targetUser.id) {
      return errorResponse(c, 403, 'forbidden', 'warn', {
        user: targetUser.id,
      });
    }

    return c.json(
      {
        data: transformDatabaseUser(targetUser),
        success: true,
      },
      200,
    );
  })
  /**
   * Update a user by id
   */
  .openapi(usersRoutesConfig.updateUser, async (c) => {
    const { id } = c.req.valid('param');
    const user = c.get('user');

    const targetUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!targetUser) {
      return errorResponse(c, 404, 'not_found', 'warn', {
        user: id,
      });
    }

    if (user.role !== 'ADMIN' && user.id !== targetUser.id) {
      return errorResponse(c, 403, 'forbidden', 'warn', {
        user: id,
      });
    }

    const { email, firstName, lastName, language, role } = c.req.valid('json');

    const [updatedUser] = await db
      .update(users)
      .set({
        email,
        firstName,
        language,
        lastName,
        name: [firstName, lastName].filter(Boolean).join(' '),
        role,
      })
      .where(eq(users.id, user.id))
      .returning();

    logEvent('User updated', { user: updatedUser?.id ?? 'na' });

    return c.json(
      {
        data: transformDatabaseUser(updatedUser!),
        success: true,
      },
      200,
    );
  });

export default usersRoutes;
