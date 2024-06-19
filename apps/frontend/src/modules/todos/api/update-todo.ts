import { toast } from '@repo/ui';
import { useMutation } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';
import { queryClient } from '@/libs/react-query';

import { getTodoQueryOptions } from './get-todo';
import { getTodosQueryOptions } from './get-todos';

type UpdateTodoInputs = {
  id: string;
  text: string;
  done: boolean;
};

export async function updateTodo({ id, text, done }: UpdateTodoInputs) {
  const response = await apiClient.todos[':id'].$put({
    json: { done, text },
    param: {
      id,
    },
  });
  const json = await handleResponse(response);
  return json.data;
}

export function useUpdateTodo() {
  return useMutation({
    mutationFn: updateTodo,
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred', {
        description: 'Please try again later',
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: getTodosQueryOptions().queryKey,
      });
      queryClient.setQueryData(getTodoQueryOptions(data.id).queryKey, data);
      toast.success('Todo updated successfully');
    },
  });
}
