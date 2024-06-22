import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { EditUserCard, getUserQueryOptions, UserCard } from '@/modules/users';

export const Route = createFileRoute('/_app/dashboard/users/$userId')({
  component: UserComponent,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(getUserQueryOptions(params.userId)),
  validateSearch: z.object({
    edit: z.boolean().optional(),
  }),
});

function UserComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();
  const { data, isLoading } = useSuspenseQuery(
    getUserQueryOptions(params.userId),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return search.edit ? <EditUserCard user={data} /> : <UserCard user={data} />;
}
