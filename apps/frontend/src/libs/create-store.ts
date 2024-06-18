import {
  create,
  type StateCreator,
  type StoreApi,
  type UseBoundStore,
} from 'zustand';
import {
  devtools,
  persist,
  type PersistOptions,
  type PersistStorage,
} from 'zustand/middleware';

type CreateStoreOptions<T, U> = {
  persistOptions?: PersistOptions<T, U>;
  devtoolsEnabled?: boolean;
};

export function createStore<T extends object>(
  createState: StateCreator<T>,
  options?: CreateStoreOptions<T, any>,
): UseBoundStore<StoreApi<T>> {
  let store = create(createState);

  if (options?.persistOptions) {
    store = create(persist(createState, options.persistOptions));
  }

  if (options?.devtoolsEnabled) {
    store = create(devtools(createState));
  }

  if (options?.devtoolsEnabled && options?.persistOptions) {
    store = create(devtools(persist(createState, options.persistOptions)));
  }

  return store;
}

export const localPersistStorage: PersistStorage<any> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  removeItem: (name) => localStorage.removeItem(name),
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
};
