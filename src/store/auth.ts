import { proxy, useSnapshot } from 'valtio';
import { Wallet } from '@/shared/types/wallet';

type Store = {
  allWallets: Wallet[];
  currentWallet: Wallet;
  connected: boolean;
};

export const walletStore = proxy<Store>({
  allWallets: [] as Wallet[],
  currentWallet: {} as Wallet,
  connected: false,
});

export const useWalletStore = () => {
  return useSnapshot(walletStore);
};

export const connectWallet = async () => {};
