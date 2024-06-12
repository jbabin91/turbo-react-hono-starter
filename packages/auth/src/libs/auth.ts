import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db, sessions, type UserModel, users } from '@repo/db';
import { Lucia } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
    };
  },
  sessionCookie: {
    attributes: {},
  },
});

declare module 'lucia' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserModel;
  }
}
