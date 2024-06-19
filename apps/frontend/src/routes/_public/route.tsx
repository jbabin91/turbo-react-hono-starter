import { ModeToggle } from '@repo/ui';
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';

import { useAuthStore, useLogout } from '@/modules/auth';
import { type NavigationLink } from '@/types';

export const Route = createFileRoute('/_public')({
  component: PublicLayoutComponent,
});

const navigationLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
] satisfies NavigationLink[];

const authenticatedNavigationLinks = [
  { name: 'Dashboard', to: '/dashboard' },
] satisfies NavigationLink[];

function PublicLayoutComponent() {
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
    <div className="relative isolate flex min-h-svh w-full flex-col">
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
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
