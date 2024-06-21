import { DataTable } from '@repo/ui';

import { type User } from '@/types';

import { columns } from './columns';

export function UsersDataTable({ data }: { data: User[] }) {
  return <DataTable enableFilterBar columns={columns} data={data} />;
}
