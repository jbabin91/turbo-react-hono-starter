import { DataTable } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

import { columns, useUsers } from '@/modules/users';

export const Route = createFileRoute('/_app/dashboard/users/')({
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  // Query users
  const { data, isLoading } = useUsers();

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.items),
    [data],
  );

  // Total count
  const totalCount = data?.pages?.[0]?.total;

  const totalFetched = flatData?.length;
  console.log(totalFetched);

  return (
    <div className="container mx-auto space-y-10 p-5">
      <h1 className="text-3xl font-semibold">Users</h1>
      <DataTable
        enableFilterBar
        columns={columns}
        data={flatData ?? []}
        isLoading={isLoading}
        totalCount={totalCount}
      />
    </div>
  );
}
