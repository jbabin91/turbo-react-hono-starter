import { apiClient, handleResponse } from '@/libs/api-client';

export async function createTodo(id: string) {
  const response = await apiClient.todos[':id'].$get({
    param: {
      id,
    },
  });
  const json = await handleResponse(response);
  return json.data;
}
