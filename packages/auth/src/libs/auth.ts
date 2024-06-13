import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { config } from '@repo/configs';
import { db, sessions, type UserModel, users } from '@repo/db';
import { Lucia, type SessionCookieOptions, TimeSpan } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
const isProduction = config.mode === 'production';

const sessionCookieOptions: SessionCookieOptions = {
  attributes: {
    sameSite: isProduction ? 'strict' : 'lax',
    secure: isProduction,
  },
  expires: true,
  name: 'turbo-react-hono-starter-session',
};

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return attributes;
  },
  sessionCookie: sessionCookieOptions,
  sessionExpiresIn: new TimeSpan(4, 'w'), // Set session expiration to 4 weeks
});

declare module 'lucia' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserModel;
  }
}
