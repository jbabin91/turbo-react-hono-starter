import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';

export async function getTodos() {
  const response = await apiClient.todos.$get();
  const json = await handleResponse(response);
  return json.data;
}

export function getTodosQueryOptions() {
  return queryOptions({
    queryFn: getTodos,
    queryKey: ['todos'],
  });
}

export function useTodos() {
  return useQuery({
    ...getTodosQueryOptions(),
  });
}
