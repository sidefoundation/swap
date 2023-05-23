import { proxy, useSnapshot } from 'valtio';

type Store = {};

export const walletStore = proxy<Store>({});

export const useWalletStore = () => {
  return useSnapshot(walletStore);
};
