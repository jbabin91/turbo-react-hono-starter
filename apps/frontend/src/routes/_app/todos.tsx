import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getTodosQueryOptions } from '@/modules/todos';

export const Route = createFileRoute('/_app/todos')({
  component: TodosComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getTodosQueryOptions()),
});

function TodosComponent() {
  const todosQuery = useSuspenseQuery(getTodosQueryOptions());
  const todos = todosQuery.data;

  console.log('todos', todos);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-semibold">Todos</h1>
      <div className="pt-2">
        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </div>
    </div>
  );
}
