import { proxy, useSnapshot } from 'valtio';

import { Coin } from '@cosmjs/stargate';
import fetchAtomicSwapList from '@/http/requests/get/fetchAtomicSwapList';
import { BriefChainInfo } from '../shared/types/chain';
import { AppConfig } from '../utils/AppConfig';

type Store = {
  chainList: BriefChainInfo[];
  chainCurrent: BriefChainInfo;
  chainCoinListNative: Coin[];
  chainCoinListRemote: Coin[];
};

export const chainStore = proxy<Store>({
  chainList: AppConfig.chains,
  chainCurrent: {} as BriefChainInfo,
  chainCoinListNative: [] as Coin[],
  chainCoinListRemote: [] as Coin[],
});

export const useChainStore = () => {
  return useSnapshot(chainStore);
};

export const setChainCurrent = (val: BriefChainInfo) => {
  chainStore.chainCurrent = val;
};

export const getChainMap = () => {
  const chainList = chainStore.chainList;
  const map: Record<string, BriefChainInfo> = {};
  chainList.forEach((chain) => {
    map[chain.chainID] = chain;
  });
  return map;
};

export const fetchChainCoinList = async (
  restUrl: string,
  type: 'Native' | 'Remote'
) => {
  const res = await fetchAtomicSwapList(restUrl);
  chainStore[`chainCoinList${type}`] = res;
};
