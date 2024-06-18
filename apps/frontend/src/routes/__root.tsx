import { Button, ModeToggle } from '@repo/ui';
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';

import {
  TanstackQueryDevtools,
  TanstackRouterDevtools,
} from '@/components/utils';
import { useLogout, useMe } from '@/modules/auth';
import { type NavigationLink } from '@/types';

export const Route = createRootRoute({
  component: RootComponent,
});

const navigationLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
] satisfies NavigationLink[];

function RootComponent() {
  const { data: me } = useMe();
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
        </nav>
        <div className="flex gap-4">
          {me ? (
            <Button variant="link" onClick={handleLogout}>
              Logout
            </Button>
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
