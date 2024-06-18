import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type signInSchema } from 'backend/modules/auth/schema';
import { type z } from 'zod';

import { apiClient, handleResponse } from '@/libs/api-client';

import { useAuthStore } from '../store/auth';
import { getMeQueryOptions } from './get-me';

export async function signIn(json: z.infer<typeof signInSchema>) {
  const response = await apiClient.auth['sign-in'].$post({
    json,
  });
  const responseData = await handleResponse(response);
  return responseData.data;
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const auth = useAuthStore();

  return useMutation({
    mutationFn: signIn,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(getMeQueryOptions().queryKey, data);
      auth.setAuth({ isAuthenticated: true, user: data });
      toast.success('Logged in successfully');
    },
  });
}
