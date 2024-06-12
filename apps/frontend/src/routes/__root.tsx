import { ModeToggle } from '@repo/ui';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

import {
  TanstackQueryDevtools,
  TanstackRouterDevtools,
} from '@/components/utils';
import { type NavigationLink } from '@/types';

export const Route = createRootRoute({
  component: RootComponent,
});

const navigationLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
] satisfies NavigationLink[];

function RootComponent() {
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
        <ModeToggle />
      </header>
      <Outlet />
      <TanstackRouterDevtools />
      <TanstackQueryDevtools />
    </>
  );
}
