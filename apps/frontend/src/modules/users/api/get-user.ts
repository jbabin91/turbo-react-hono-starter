import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';

export async function getUser(id: string) {
  const response = await apiClient.users[':id'].$get({
    param: { id },
  });
  const json = await handleResponse(response);
  return json.data;
}

export function getUserQueryOptions(id: string) {
  return queryOptions({
    queryFn: () => getUser(id),
    queryKey: ['user', id],
  });
}

export function useUser(id: string) {
  return useQuery({
    ...getUserQueryOptions(id),
  });
}
