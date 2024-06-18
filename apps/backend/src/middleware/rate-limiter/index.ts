import { rateLimiter } from 'hono-rate-limiter';

import { type Env } from '../../types';

const getUsernameIPkey = (username?: string, ip?: string | null) =>
  `${username}_${ip}`;

export const limiter = rateLimiter<Env>({
  keyGenerator: async (c) => {
    const ipAddr = c.req.raw.headers.get('CF-Connecting-IP');
    console.log('ipAddr', ipAddr);
    const body =
      c.req.header('content-type') === 'application/json'
        ? ((await c.req.raw.clone().json()) as any)
        : undefined;
    const user = c.get('user');
    const username = body?.email ?? user?.id;
    const usernameIPkey = getUsernameIPkey(username, ipAddr);
    console.log('usernameIPkey', usernameIPkey);
    return usernameIPkey;
  },
  limit: 100,
  standardHeaders: 'draft-6',
  windowMs: 15 * 60 * 1000,
});
