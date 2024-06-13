import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(2)
  .max(100)
  .refine(
    (s) => /^[ ',.a-z-]+$/i.test(s),
    "Name may only contain letters, spaces and these characters: ,.'-",
  );
