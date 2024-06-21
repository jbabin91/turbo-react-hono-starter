import { Checkbox, DataTableColumnHeader } from '@repo/ui';
import { type ColumnDef } from '@tanstack/react-table';

import { dateShort } from '@/libs/utils';
import { type User } from '@/types';

import { UserRowActions } from './user-row-actions';

export const columns: ColumnDef<User>[] = [
  {
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    id: 'select',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'firstName',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: 'lastName',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'language',
    cell: ({ row }) => {
      const value = row.getValue('language');
      const formatted = new Intl.DisplayNames(['en'], { type: 'language' }).of(
        value as string,
      );
      return <div>{formatted}</div>;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Language" />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const value = row.getValue('createdAt');
      const formatted = dateShort(value as string);
      return <div>{formatted}</div>;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => <UserRowActions row={row} />,
  },
];
