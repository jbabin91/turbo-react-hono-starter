import { CustomHono } from '../libs/custom-hono';
import authRoutes from './auth';
import todosRoutes from './todos';
import usersRoutes from './users';

const modulesRoutes = new CustomHono()
  .route('/', authRoutes)
  .route('/', usersRoutes)
  .route('/', todosRoutes);

export type AppTypes = typeof modulesRoutes;

export { modulesRoutes };
