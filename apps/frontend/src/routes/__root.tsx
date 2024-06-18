import { ModeToggle } from '@repo/ui';
import { type QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';

import {
  TanstackQueryDevtools,
  TanstackRouterDevtools,
} from '@/components/utils';
import { type AuthStoreType, useAuthStore, useLogout } from '@/modules/auth';
import { type NavigationLink } from '@/types';

type RouterContext = {
  auth: AuthStoreType;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

const navigationLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
] satisfies NavigationLink[];

const authenticatedNavigationLinks = [
  { name: 'Todos', to: '/todos' },
] satisfies NavigationLink[];

function RootComponent() {
  const auth = useAuthStore();
  const logout = useLogout();
  const navigate = useNavigate();

  function handleLogout() {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate({ to: '/sign-in' });
      },
    });
  }

  return (
    <>
      <header className="flex justify-between border-b p-2">
        <nav className="flex gap-2 p-2">
          {navigationLinks.map((link) => (
            <Link key={link.to} className="[&.active]:font-bold" to={link.to}>
              {link.name}
            </Link>
          ))}
          {auth.isAuthenticated
            ? authenticatedNavigationLinks.map((link) => (
                <Link
                  key={link.to}
                  className="[&.active]:font-bold"
                  to={link.to}
                >
                  {link.name}
                </Link>
              ))
            : null}
        </nav>
        <div className="flex gap-4">
          {auth.isAuthenticated ? (
            <div className="p-2">
              <Link onClick={handleLogout}>Logout</Link>
            </div>
          ) : (
            <div className="flex gap-2 p-2">
              <Link to="/sign-in">Sign in</Link>
              <Link to="/sign-up">Sign up</Link>
            </div>
          )}
          <ModeToggle />
        </div>
      </header>
      <Outlet />
      <TanstackRouterDevtools />
      <TanstackQueryDevtools />
    </>
  );
}
