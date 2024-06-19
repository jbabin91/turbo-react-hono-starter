import { toast } from '@repo/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type createTodoSchema } from 'backend/modules/todos/schema';
import { type z } from 'zod';

import { apiClient, handleResponse } from '@/libs/api-client';

import { getTodosQueryOptions } from './get-todos';

export type TodoInputs = z.infer<typeof createTodoSchema>;

export async function createTodo({ text, done }: TodoInputs) {
  const response = await apiClient.todos.$post({
    json: { done, text },
  });
  const json = await handleResponse(response);
  return json.success;
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
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
      toast.success('Todo created successfully');
    },
  });
}
