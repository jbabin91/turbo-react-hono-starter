import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';

export async function getTodo(id: string) {
  const response = await apiClient.todos[':id'].$get({
    param: {
      id,
    },
  });
  const json = await handleResponse(response);
  return json.data;
}

export function getTodoQueryOptions(id: string) {
  return queryOptions({
    queryFn: () => getTodo(id),
    queryKey: ['todo', id],
  });
}

export function useTodo(id: string) {
  return useQuery({
    ...getTodoQueryOptions(id),
  });
}
