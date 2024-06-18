import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/todos')({
  component: TodosComponent,
});

function TodosComponent() {
  return <div>Todos</div>;
}
