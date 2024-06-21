import { ModeToggle } from '@repo/ui';
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';

import { useAuthStore, useLogout } from '@/modules/auth';
import { type NavigationLink } from '@/types';

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        search: {
          redirect: location.href,
        },
        to: '/sign-in',
      });
    }
  },
  component: AppComponent,
});

const navigationLinks = [
  { name: 'Home', to: '/' },
  { exact: true, name: 'Dashboard', to: '/dashboard' },
  { name: 'Todos', to: '/dashboard/todos' },
] satisfies NavigationLink[];

const adminNavigationLinks = [
  { name: 'Users', to: '/dashboard/users' },
] satisfies NavigationLink[];

function AppComponent() {
  const auth = useAuthStore();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate({ search: { redirect: location.href }, to: '/sign-in' });
      },
    });
  }

  return (
    <div className="relative isolate flex min-h-svh w-full flex-col">
      <header className="flex justify-between border-b p-2">
        <nav className="flex gap-2 p-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.to}
              activeOptions={{ exact: link.exact }}
              className="[&.active]:font-bold"
              to={link.to}
            >
              {link.name}
            </Link>
          ))}
          {auth.user?.role === 'ADMIN'
            ? adminNavigationLinks.map((link) => (
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
          <div className="p-2">
            <Link onClick={handleLogout}>Logout</Link>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
