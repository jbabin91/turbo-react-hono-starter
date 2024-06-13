import { db, type UserInputs, users } from '@repo/db';
import { type Context } from 'hono';

import { setSessionCookie } from '../../../libs/cookies';
import { errorResponse } from '../../../libs/errors';
import { logEvent } from '../../../middleware';

/**
 * Handle creating a new user
 */
export async function createUser(c: Context, data: UserInputs) {
  // If sign up is disabled, return an error
  // if (!config.has.signUp) {
  //   return errorResponse(ctx, 403, 'sign_up_disabled', 'warn');
  // }

  try {
    const [user] = await db.insert(users).values(data).returning();

    if (user) await setSessionCookie(c, user.id, 'password');

    // return c.json({ success: true }, 201);
  } catch (error) {
    // If the email already exists, return on error
    if (error instanceof Error && error.message.startsWith('duplicate key')) {
      return errorResponse(c, 409, 'email_exists', 'warn');
    }

    logEvent(
      'Error creating user',
      {
        errorMessage: (error as Error).message,
        strategy: 'Email',
      },
      'error',
    );
  }
}
