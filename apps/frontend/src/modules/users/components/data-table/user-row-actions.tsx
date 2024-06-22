import { DataTableRowActions, DropdownMenuItem } from '@repo/ui';
import { useNavigate } from '@tanstack/react-router';
import { type Row } from '@tanstack/react-table';
import { userSchema } from 'backend/modules/users/schema';

import { useDeleteUser } from '../../api/delete-user';

type UserRowActionProps<TData> = {
  row: Row<TData>;
};

export function UserRowActions<TData>({ row }: UserRowActionProps<TData>) {
  const user = userSchema.parse(row.original);
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();

  function handleDelete() {
    deleteUser.mutate(user.id);
  }

  return (
    <DataTableRowActions>
      <DropdownMenuItem
        onClick={() =>
          navigate({
            params: {
              userId: user.id,
            },
            to: '/dashboard/users/$userId',
          })
        }
      >
        View
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() =>
          navigate({
            params: {
              userId: user.id,
            },
            search: {
              edit: true,
            },
            to: '/dashboard/users/$userId',
          })
        }
      >
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
    </DataTableRowActions>
  );
}
