import { createStore, localPersistStorage } from '@/libs/create-store';
import { type User } from '@/types';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
};

type AuthActionsType = {
  setAuth: ({
    user,
    isAuthenticated,
  }: {
    user: User | null;
    isAuthenticated: boolean;
  }) => void;
};

export type AuthStoreType = AuthStore & AuthActionsType;

export const useAuthStore = createStore<AuthStoreType>(
  (set) => ({
    isAuthenticated: false,
    setAuth: ({ user, isAuthenticated }) => {
      set({ isAuthenticated, user });
    },
    user: null,
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: 'auth-store',
      storage: localPersistStorage,
    },
  },
);
