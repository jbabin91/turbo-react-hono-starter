import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard/users/$userId')({
  component: UserComponent,
});

function UserComponent() {
  const params = Route.useParams();

  return (
    <div>
      <h1>User</h1>
      <p>ID: {params.userId}</p>
    </div>
  );
}
