import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { updateTodoSchema } from 'backend/modules/todos/schema';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import {
  getTodoQueryOptions,
  useDeleteTodo,
  useUpdateTodo,
} from '@/modules/todos';

export const Route = createFileRoute('/_app/dashboard/todos/$todoId')({
  component: TodoComponent,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(getTodoQueryOptions(params.todoId)),
});

function TodoComponent() {
  const params = Route.useParams();
  const navigate = useNavigate();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const todoQuery = useSuspenseQuery(getTodoQueryOptions(params.todoId));
  const todo = todoQuery.data;

  const form = useForm<z.infer<typeof updateTodoSchema>>({
    defaultValues: {
      done: todo.done,
      text: todo.text,
    },
    resolver: zodResolver(updateTodoSchema),
  });

  useEffect(() => {
    form.reset({
      done: todo.done,
      text: todo.text,
    });
  }, [form, todo]);

  function onSubmit(values: z.infer<typeof updateTodoSchema>) {
    updateTodo.mutate({
      id: params.todoId,
      ...values,
    });
  }

  function handleDelete() {
    deleteTodo.mutate(params.todoId, {
      onSuccess: () => {
        navigate({ to: '/dashboard/todos' });
      },
    });
  }

  return (
    <div className="flex max-w-lg flex-col gap-4">
      <h1 className="text-2xl font-semibold">Todo:</h1>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="done"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormLabel>Done</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button className="w-full" type="submit">
              Update
            </Button>
            <Button
              className="w-full"
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
