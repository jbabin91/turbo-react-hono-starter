import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
