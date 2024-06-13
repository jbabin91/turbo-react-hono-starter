import { CustomHono } from '../libs/custom-hono';
import authRoutes from './auth';
import usersRoutes from './users';

const modulesRoutes = new CustomHono()
  .route('/', authRoutes)
  .route('/', usersRoutes);

export type AppTypes = typeof modulesRoutes;

export { modulesRoutes };
