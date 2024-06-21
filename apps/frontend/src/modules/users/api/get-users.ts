import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';

export async function getUsers() {
  const response = await apiClient.users.$get();
  const json = await handleResponse(response);
  return json.data;
}

export function getUsersQueryOptions() {
  return queryOptions({
    queryFn: getUsers,
    queryKey: ['users'],
  });
}

export function useUsers() {
  return useQuery({
    ...getUsersQueryOptions(),
  });
}
