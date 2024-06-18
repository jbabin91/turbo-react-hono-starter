import { type UserModel } from '@repo/db';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';
import { type Nullable } from '@/types';

export async function getMe(): Promise<Nullable<UserModel>> {
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
  return useQuery({
    ...getMeQueryOptions(),
    gcTime: Infinity,
    staleTime: Infinity,
  });
}
