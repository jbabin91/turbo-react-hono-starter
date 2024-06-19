import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/users')({
  component: UsersComponent,
});

function UsersComponent() {
  return <div>Hello Users</div>;
}
