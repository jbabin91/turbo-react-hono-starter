import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getTodosQueryOptions } from '@/modules/todos';

export const Route = createFileRoute('/_app/dashboard/')({
  component: DashboardIndexComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getTodosQueryOptions()),
});

function DashboardIndexComponent() {
  const todosQuery = useSuspenseQuery(getTodosQueryOptions());
  const todos = todosQuery.data.filter((todo) => !todo.done);

  return (
    <div className="p-2">
      <div className="p-2">
        Welcome to the dashboard! You have{' '}
        <strong>{todos.length} total todos</strong>
      </div>
    </div>
  );
}
