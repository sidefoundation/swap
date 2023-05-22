import { create } from 'zustand';
import { chargeCoins } from '@/http/requests/post/chargeCoins';

type Store = {};

export const useAssetsStore = create<Store>()((set) => ({
  // based on the chain, fetch the assets list
  postFaucet: async () => {},
}));
