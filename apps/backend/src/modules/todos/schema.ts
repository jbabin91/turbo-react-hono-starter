import { z } from 'zod';

export const createTodoSchema = z.object({
  text: z.string(),
  done: z.boolean(),
});

export const updateTodoSchema = z.object({
  text: z.string(),
  done: z.boolean(),
});
