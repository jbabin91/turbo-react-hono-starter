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
import { createFileRoute } from '@tanstack/react-router';
import { createTodoSchema } from 'backend/modules/todos/schema';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { useCreateTodo } from '@/modules/todos';

export const Route = createFileRoute('/_app/dashboard/todos/')({
  component: TodosIndexComponent,
});

function TodosIndexComponent() {
  const createTodo = useCreateTodo();

  const form = useForm<z.infer<typeof createTodoSchema>>({
    defaultValues: {
      done: false,
      text: '',
    },
    resolver: zodResolver(createTodoSchema),
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form, form.formState.isSubmitSuccessful]);

  function onSubmit(values: z.infer<typeof createTodoSchema>) {
    createTodo.mutate(values);
  }

  return (
    <div className="flex max-w-lg flex-col gap-4">
      <h1 className="text-2xl font-semibold">Create a new Todo:</h1>
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
          <Button className="w-full" type="submit">
            Create Todo
          </Button>
        </form>
      </Form>
    </div>
  );
}
