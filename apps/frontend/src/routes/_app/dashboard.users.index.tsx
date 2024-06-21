import { DataTable } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';

import { columns, useUsers } from '@/modules/users';

export const Route = createFileRoute('/_app/dashboard/users/')({
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  // Query users
  const { data, isLoading } = useUsers();

  // Total count
  const totalCount = data?.length;

  return (
    <div className="container mx-auto space-y-10 p-5">
      <h1 className="text-3xl font-semibold">Users</h1>
      <DataTable
        enableFilterBar
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        totalCount={totalCount}
      />
    </div>
  );
}
