import { type UserModel } from '@repo/db';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function transformDatabaseUser({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hashedPassword,
  ...user
}: PartialBy<UserModel, 'hashedPassword'>) {
  return {
    ...user,
  };
}
