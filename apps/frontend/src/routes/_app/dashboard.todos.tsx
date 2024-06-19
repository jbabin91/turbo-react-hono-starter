import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

import { getTodosQueryOptions } from '@/modules/todos';

export const Route = createFileRoute('/_app/dashboard/todos')({
  component: TodosComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getTodosQueryOptions()),
});

function TodosComponent() {
  const todosQuery = useSuspenseQuery(getTodosQueryOptions());
  const todos = todosQuery.data;

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex flex-1">
        <div className="w-56 divide-y">
          {todos.length > 0 ? (
            todos.map(({ id, text }) => (
              <Link
                key={id}
                className="block px-3 py-2 [&.active]:font-bold"
                preload="intent"
                to={`/dashboard/todos`}
              >
                {text}
              </Link>
            ))
          ) : (
            <div className="block px-3 py-2">No Todos</div>
          )}
        </div>
        <div className="flex-1 border-l border-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
