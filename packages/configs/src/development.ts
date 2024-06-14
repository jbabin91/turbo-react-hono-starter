import { type Config } from './default';

export default {
  mode: 'development',
  name: 'Turbo React Hono Starter Development',
  debug: true,

  frontendUrl: 'http://localhost:5173',
  backendUrl: 'http://localhost:3000',
  backendAuthUrl: 'http://localhost:3000/auth',
} satisfies Config;
