import { type User } from '@repo/auth';
import {
  type ClientErrorStatusCode,
  type ServerErrorStatusCode,
} from 'hono/utils/http-status';
import { type z } from 'zod';

import {
  type errorResponseSchema,
  type errorSchema,
} from '../libs/common-schemas';

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export type HttpErrorStatus = ClientErrorStatusCode | ServerErrorStatusCode;

export type Severity = 'debug' | 'info' | 'log' | 'warn' | 'error';

export type ErrorType = z.infer<typeof errorSchema> & {
  eventData?: EventData;
  name?: Error['name'];
};

export type EventData = Readonly<
  Record<string, number | string | boolean | null>
>;

export type Env = {
  Variables: {
    user: User;
    APP_URL: string;
  };
};
