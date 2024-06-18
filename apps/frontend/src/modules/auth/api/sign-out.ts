import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';

import { getMeQueryOptions } from './get-me';

export async function signOut() {
  const response = await apiClient.api.auth['sign-out'].$post();
  const responseData = await handleResponse(response);
  return responseData.success;
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(getMeQueryOptions().queryKey, null);
      queryClient.invalidateQueries({ queryKey: getMeQueryOptions().queryKey });
      toast.success('Logged out successfully');
    },
  });
}
