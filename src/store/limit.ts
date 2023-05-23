import { proxy, useSnapshot } from 'valtio';

type Store = {};

export const limitStore = proxy<Store>({});

export const useLimitStore = () => {
  return useSnapshot(limitStore);
};
