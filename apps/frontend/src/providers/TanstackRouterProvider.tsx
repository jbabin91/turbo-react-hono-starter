import { createRouter, RouterProvider } from '@tanstack/react-router';

import { DefaultCatchBoundary, NotFound } from '@/components/errors';
import { queryClient } from '@/libs/react-query';
import { useAuthStore } from '@/modules/auth';
import { routeTree } from '@/routeTree.gen';

// Create a new router instance
const router = createRouter({
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultErrorComponent: DefaultCatchBoundary,
  defaultNotFoundComponent: () => <NotFound />,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  routeTree,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}

export function TanstackRouterProvider() {
  const auth = useAuthStore();
  return <RouterProvider context={{ auth }} router={router} />;
}
