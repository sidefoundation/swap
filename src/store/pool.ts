import { proxy, useSnapshot } from 'valtio';
import type { ILiquidityPool } from '@/shared/types/liquidity';
import fetchLiquidityPools from '../http/requests/get/fetchLiquidityPools';

type Store = {
  poolList: ILiquidityPool[];
  poolForm: {
    poolId: string;
    denom: string;
    amount: string;
  };
};

export const poolStore = proxy<Store>({
  poolList: [] as ILiquidityPool[],
  poolForm: {},
});

export const usePoolStore = () => {
  return useSnapshot(poolStore);
};

export const getPoolList = async () => {
  const res = await fetchLiquidityPools('');
  poolStore.poolList = res.interchainLiquidityPool;
};

export const addPoolItem = async () => {};
export const redeemPoolItem = async () => {};
