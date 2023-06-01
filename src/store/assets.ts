import { proxy, useSnapshot } from 'valtio';

import { Coin } from '@cosmjs/stargate';
import { toast } from 'react-hot-toast';
import fetchBalances from '../http/requests/get/fetchBalance';
import chargeCoins from '../http/requests/post/chargeCoins';

type Store = {
  balanceList: Coin[];
  remoteBalanceList: Coin[];
  balanceLoading: boolean;
};

export const assetsStore = proxy<Store>({
  balanceList: [] as Coin[],
  remoteBalanceList: [] as Coin[],
  balanceLoading: false,
});

export const useAssetsStore = () => {
  return useSnapshot(assetsStore);
};

export const getBalanceList = async (
  restUrl: string,
  acc: string,
  isLoading?: boolean
) => {
  if (isLoading) toast.loading('Loading...');
  assetsStore.balanceLoading = true;
  const res = await fetchBalances(restUrl, acc);
  if (isLoading) toast.dismiss();
  if (res) {
    assetsStore.balanceList = res;
    
  }
  assetsStore.balanceLoading = false;
};

export const setRemoteBalanceList = async (restUrl: string, acc: string) => {
  const res = await fetchBalances(restUrl, acc);
  if (res) {
    assetsStore.remoteBalanceList = res;
  }
};
export const postFaucet = async () => {
  const res = await chargeCoins('', '', '');
};
