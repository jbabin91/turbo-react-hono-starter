import { z } from 'zod';

export const createTodoSchema = z.object({
  done: z.boolean(),
  text: z.string(),
});

export const updateTodoSchema = z.object({
  done: z.boolean(),
  text: z.string(),
});
