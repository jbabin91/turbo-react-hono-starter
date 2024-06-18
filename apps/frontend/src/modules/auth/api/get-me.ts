import { queryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { apiClient, handleResponse } from '@/libs/api-client';
import { type Nullable, type User } from '@/types';

import { useAuthStore } from '../store/auth';

export async function getMe(): Promise<Nullable<User>> {
  const response = await apiClient.me.$get();
  const json = await handleResponse(response);
  return json.data;
}

export function getMeQueryOptions() {
  return queryOptions({
    queryFn: getMe,
    queryKey: ['me'],
  });
}

export function useMe() {
  const auth = useAuthStore();

  const { data, ...rest } = useQuery({
    ...getMeQueryOptions(),
    gcTime: Infinity,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data && rest.isSuccess) {
      auth.setAuth({ isAuthenticated: true, user: data });
    }
  }, []);

  return {
    data,
    ...rest,
  };
}
