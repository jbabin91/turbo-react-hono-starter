import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

import { UsersDataTable, useUsers } from '@/modules/users';

export const Route = createFileRoute('/_app/dashboard/users/')({
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  // Query users
  const { data } = useUsers();

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.items),
    [data],
  );

  // Total count
  const totalDbRowCount = data?.pages?.[0]?.total;
  console.log(totalDbRowCount);

  const totalFetched = flatData?.length;
  console.log(totalFetched);

  return (
    <div className="container mx-auto space-y-10 p-5">
      <h1 className="text-3xl font-semibold">Users</h1>
      <UsersDataTable data={flatData ?? []} />
    </div>
  );
}
