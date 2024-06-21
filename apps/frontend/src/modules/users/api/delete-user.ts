import { toast } from '@repo/ui';
import { useMutation } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';
import { queryClient } from '@/libs/react-query';

export async function deleteUser(ids: string | string[]) {
  const response = await apiClient.users.$delete({
    query: {
      ids,
    },
  });
  const json = await handleResponse(response);
  return json.success;
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('User deleted successfully');
    },
  });
}
