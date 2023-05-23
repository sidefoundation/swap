import { proxy, useSnapshot } from 'valtio';

type Store = {};

export const swapStore = proxy<Store>({});

export const useSwapStore = () => {
  return useSnapshot(swapStore);
};
