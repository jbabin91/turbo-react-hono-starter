import { type FileRoutesByPath } from '@tanstack/react-router';
import { type InferResponseType } from 'hono';

import { type apiClient } from '@/libs/api-client';

export type NavigationLink = {
  name: string;
  to: FileRoutesByPath[keyof FileRoutesByPath]['fullPath'];
  exact?: boolean;
};

export type Nullable<T> = T | undefined | null;

export type User = Extract<
  InferResponseType<(typeof apiClient.users)[':id']['$get']>,
  { data: unknown }
>['data'];
