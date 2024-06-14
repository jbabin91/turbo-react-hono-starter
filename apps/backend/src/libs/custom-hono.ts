import { OpenAPIHono } from '@hono/zod-openapi';
import { type Schema } from 'hono';

import { type Env } from '../types';

export class CustomHono<
  E extends Env = Env,
  S extends Schema = NonNullable<unknown>,
  BasePath extends string = '/',
> extends OpenAPIHono<E, S, BasePath> {}
