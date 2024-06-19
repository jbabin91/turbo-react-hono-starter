import { toast } from '@repo/ui';
import { useMutation } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';
import { queryClient } from '@/libs/react-query';

import { getTodosQueryOptions } from './get-todos';

export async function deleteTodo(id: string) {
  const response = await apiClient.todos[':id'].$delete({
    param: {
      id,
    },
  });
  const json = await handleResponse(response);
  return json.success;
}

export function useDeleteTodo() {
  return useMutation({
    mutationFn: deleteTodo,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTodosQueryOptions().queryKey,
      });
      toast.success('Todo deleted successfully');
    },
  });
}
