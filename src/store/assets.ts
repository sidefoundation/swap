import { devtools } from 'valtio/utils';
import { proxy, useSnapshot } from 'valtio';

import fetchBalances from '../http/requests/get/fetchBalance';
import chargeCoins from '../http/requests/post/chargeCoins';
import { Coin } from '@cosmjs/stargate';

type Store = {
  balanceList: Coin[];
};

export const assetsStore = proxy<Store>({
  balanceList: [] as Coin[],
});

devtools(assetsStore, { name: 'assets', enabled: true });

export const useAssetsStore = () => {
  return useSnapshot(assetsStore);
};

export const getBalanceList = async (restUrl, acc) => {
  const res = await fetchBalances(restUrl, acc);
  if (res) {
    assetsStore.balanceList = res;
  }
};

export const postFaucet = async () => {
  const res = await chargeCoins('', '', '');
};
