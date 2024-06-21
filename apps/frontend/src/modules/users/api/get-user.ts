import { apiClient, handleResponse } from '@/libs/api-client';

export async function getUser(id: string) {
  const response = await apiClient.users[':id'].$get({
    param: { id },
  });
  const json = await handleResponse(response);
  return json.data;
}
