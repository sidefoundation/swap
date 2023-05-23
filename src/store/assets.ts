import { proxy, useSnapshot } from 'valtio';
import fetchBalances from '../http/requests/get/fetchBalance';
import chargeCoins from '../http/requests/post/chargeCoins';
import { Coin } from '@cosmjs/stargate';

type Store = {
  balanceList: Coin[];
};

export const assetStore = proxy<Store>({
  balanceList: [] as Coin[],
});

export const useAssetsStore = () => {
  return useSnapshot(assetStore);
};

export const getBalanceList = async () => {
  const res = await fetchBalances('', '');
};

export const postFaucet = async () => {
  const res = await chargeCoins('', '', '');
};
