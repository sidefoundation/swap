import { proxy, useSnapshot } from 'valtio';
import { Coin } from '@cosmjs/stargate';
import { getPoolId, MarketMaker } from '@/utils/swap';
import { ILiquidityPool } from '@/shared/types/liquidity';
type Store = {
  swapPair: {
    native: Coin;
    remote: Coin;
  };
  swapLoading: boolean;
};

export const swapStore = proxy<Store>({
  swapPair: {
    native: { amount: '0', denom: '' } as Coin,
    remote: { amount: '0', denom: '' } as Coin,
  },
  swapLoading: false,
});

export const useSwapStore = () => {
  return useSnapshot(swapStore);
};

export const updateCoinAmount = (
  value: string,
  side: 'native' | 'remote',
  pools?: ILiquidityPool[]
) => {
  const poolId = getPoolId([
    swapStore.swapPair.native.denom,
    swapStore.swapPair.remote.denom,
  ]);
  const pool = pools?.find((pool: ILiquidityPool) => pool.poolId == poolId);
  const tokenIn: Coin = {
    denom: swapStore.swapPair[side].denom,
    amount: value,
  };
  const market = new MarketMaker(pool!, 300);
  const estimate = market.leftSwap(
    tokenIn,
    swapStore.swapPair[side === 'native' ? 'remote' : 'native'].denom
  );
  swapStore.swapPair[side] = {
    amount: value,
    denom: swapStore.swapPair[side].denom,
  };
  swapStore.swapPair[side === 'native' ? 'remote' : 'native'] = estimate;
};

export const updateCoinDenom = (value: string, side: 'native' | 'remote') => {
  swapStore.swapPair[side] = {
    amount: swapStore.swapPair[side].amount,
    denom: value,
  };
};
