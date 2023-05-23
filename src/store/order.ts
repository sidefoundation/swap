import { proxy, useSnapshot } from 'valtio';

type Store = {};

export const orderStore = proxy<Store>({});

export const useOrderStore = () => {
  return useSnapshot(orderStore);
};
