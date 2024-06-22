import { toast } from '@repo/ui';
import { useMutation } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';
import { queryClient } from '@/libs/react-query';
import { type User } from '@/types';

import { getUsersQueryOptions } from './get-users';

export async function updateUser({
  id,
  email,
  firstName,
  lastName,
  language,
  role,
}: User) {
  const response = await apiClient.users[':id'].$put({
    json: {
      email,
      firstName,
      language,
      lastName,
      role,
    },
    param: { id },
  });
  const json = await handleResponse(response);
  return json.data;
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });
      toast.success('User deleted successfully');
    },
  });
}
