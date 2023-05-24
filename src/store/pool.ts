import { devtools } from 'valtio/utils';
import { Coin } from '@cosmjs/stargate';
import { proxy, useSnapshot } from 'valtio';
import type { ILiquidityPool } from '@/shared/types/liquidity';
import fetchLiquidityPools from '../http/requests/get/fetchLiquidityPools';

type Store = {
  poolList: ILiquidityPool[];
  poolItem: ILiquidityPool;
  poolForm: {
    single: ILiquidityPool;
    signleAmount: string;
    remoteAmount: string;
    nativeAmount: string;
  };
};

export const poolStore = proxy<Store>({
  poolList: [] as ILiquidityPool[],
  poolItem: {} as ILiquidityPool,
  poolForm: {
    single: {},
    signleAmount: '',
    remoteAmount: '',
    nativeAmount: '',
  },
});

devtools(poolStore, { name: 'pool', enabled: true });

export const usePoolStore = () => {
  return useSnapshot(poolStore);
};

export const getPoolList = async () => {
  const res = await fetchLiquidityPools('');
  poolStore.poolList = res.interchainLiquidityPool;
};

export const addPoolItem = async () => {};
export const redeemPoolItem = async () => {};
