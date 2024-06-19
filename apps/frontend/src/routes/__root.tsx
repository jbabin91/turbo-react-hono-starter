import { type QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import {
  TanstackQueryDevtools,
  TanstackRouterDevtools,
} from '@/components/utils';
import { type AuthStoreType } from '@/modules/auth';

type RouterContext = {
  auth: AuthStoreType;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanstackRouterDevtools />
      <TanstackQueryDevtools />
    </>
  );
}
