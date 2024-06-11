import { ModeToggle } from '@repo/ui';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

import {
  TanstackQueryDevtools,
  TanstackRouterDevtools,
} from '@/components/utils';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <header className="flex justify-between border-b p-2">
        <nav className="flex gap-2 p-2">
          <Link className="[&.active]:font-bold" to="/">
            Home
          </Link>
          <Link className="[&.active]:font-bold" to="/about">
            About
          </Link>
        </nav>
        <ModeToggle />
      </header>
      <Outlet />
      <TanstackRouterDevtools />
      <TanstackQueryDevtools />
    </>
  );
}
