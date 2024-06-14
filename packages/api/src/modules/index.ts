import { CustomHono } from '../libs/custom-hono';
import authRoutes from './auth';
import todosRoutes from './todos';
import usersRoutes from './users';

const modulesRoutes = new CustomHono()
  .route('/auth', authRoutes)
  .route('/users', usersRoutes)
  .route('/todos', todosRoutes);

export type AppTypes = typeof modulesRoutes;

export { modulesRoutes };
