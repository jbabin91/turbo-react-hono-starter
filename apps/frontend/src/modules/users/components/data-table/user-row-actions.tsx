import { DataTableRowActions, DropdownMenuItem } from '@repo/ui';
import { Link } from '@tanstack/react-router';
import { type Row } from '@tanstack/react-table';
import { userSchema } from 'backend/modules/users/schema';

import { useDeleteUser } from '../../api/delete-user';

type UserRowActionProps<TData> = {
  row: Row<TData>;
};

export function UserRowActions<TData>({ row }: UserRowActionProps<TData>) {
  const user = userSchema.parse(row.original);
  const deleteUser = useDeleteUser();

  function handleDelete() {
    deleteUser.mutate(user.id);
  }

  return (
    <DataTableRowActions>
      <Link
        params={{
          userId: user.id,
        }}
        to="/dashboard/users/$userId"
      >
        <DropdownMenuItem>View</DropdownMenuItem>
      </Link>
      <Link
        params={{
          userId: user.id,
        }}
        search={{
          edit: true,
        }}
        to="/dashboard/users/$userId"
      >
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </Link>
      <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
    </DataTableRowActions>
  );
}
