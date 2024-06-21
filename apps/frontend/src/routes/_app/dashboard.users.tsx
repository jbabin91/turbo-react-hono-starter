import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard/users')({
  beforeLoad: ({ context }) => {
    if (context.auth?.user?.role !== 'ADMIN') {
      throw new Error('Unauthorized');
    }
  },
  component: UsersComponent,
});

function UsersComponent() {
  return (
    <div className="p-5">
      <Outlet />
    </div>
  );
}
