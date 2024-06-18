import { type FileRoutesByPath } from '@tanstack/react-router';

export type NavigationLink = {
  name: string;
  to: FileRoutesByPath[keyof FileRoutesByPath]['fullPath'];
};

export type Nullable<T> = T | undefined | null;
