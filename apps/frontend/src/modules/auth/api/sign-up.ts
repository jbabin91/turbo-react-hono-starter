import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type signUpSchema } from 'backend/modules/auth/schema';
import { type z } from 'zod';

import { apiClient, handleResponse } from '@/libs/api-client';

import { getMeQueryOptions } from './get-me';

type SignUpInputs = z.infer<typeof signUpSchema>;

export async function signUp({
  firstName,
  lastName,
  email,
  password,
}: SignUpInputs) {
  const response = await apiClient.auth['sign-up'].$post({
    json: { email, firstName, lastName, password },
  });
  const responseData = await handleResponse(response);
  return responseData.data;
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(getMeQueryOptions().queryKey, data);
      toast.success('Account created successfully');
    },
  });
}
