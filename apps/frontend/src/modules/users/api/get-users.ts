import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';

export type GetUsersParams = Partial<
  Omit<
    Parameters<(typeof apiClient.users)['$get']>['0']['query'],
    'limit' | 'offset'
  > & {
    limit: number;
    page: number;
  }
>;

export async function getUsers(
  {
    q,
    sort = 'id',
    order = 'asc',
    page = 0,
    limit = 2,
    role,
  }: GetUsersParams = {},
  signal?: AbortSignal,
) {
  const response = await apiClient.users.$get(
    {
      query: {
        limit: String(limit),
        offset: String(page * limit),
        order,
        q,
        role,
        sort,
      },
    },
    {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        return fetch(input, {
          ...init,
          credentials: 'include',
          signal,
        });
      },
    },
  );
  const json = await handleResponse(response);
  return json.data;
}

type UserResponse = Awaited<ReturnType<typeof getUsers>>;

export function getUsersQueryOptions({
  q,
  sort: initialSort,
  order: initialOrder,
  role,
  limit,
}: GetUsersParams = {}) {
  const sort = initialSort ?? 'createdAt';
  const order = initialOrder ?? 'desc';

  return infiniteQueryOptions({
    getNextPageParam: (_lastPage, allPages) => allPages.length,
    initialPageParam: 0,
    queryFn: async ({ pageParam: page, signal }) =>
      await getUsers({ limit, order, page, q, role, sort }, signal),
    queryKey: ['users', q, sort, order, role],
  });
}

export function useUsers({
  q,
  sort: initialSort,
  order: initialOrder,
  role,
  limit = 10,
}: GetUsersParams = {}) {
  const sort = initialSort ?? 'createdAt';
  const order = initialOrder ?? 'desc';

  return useInfiniteQuery<UserResponse>({
    getNextPageParam: (_lastPage, allPages) => allPages.length,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0, signal }) => {
      const page = (pageParam as number) * limit;
      return await getUsers({ limit, order, page, q, role, sort }, signal);
    },
    queryKey: ['users', q, sort, order, role],
    refetchOnWindowFocus: false,
  });
}
