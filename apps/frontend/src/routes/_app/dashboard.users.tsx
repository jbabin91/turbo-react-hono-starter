import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard/users')({
  component: UsersComponent,
});

function UsersComponent() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-semibold">Hello Users</h1>
    </div>
  );
}
