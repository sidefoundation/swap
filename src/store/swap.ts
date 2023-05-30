import { proxy, useSnapshot } from 'valtio';
import { Coin } from '@cosmjs/stargate';
type Store = {
  swapPair: {
    native: Coin;
    remote: Coin;
  };
};

export const swapStore = proxy<Store>({
  swapPair: {
    native: { amount: '0', denom: '' } as Coin,
    remote: { amount: '0', denom: '' } as Coin,
  },
});

export const useSwapStore = () => {
  return useSnapshot(swapStore);
};
