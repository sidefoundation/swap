import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import type { ILiquidityPool } from '@/shared/types/liquidity';
import fetchBalances from '../requests/get/fetchBalance';
import PromisePool from '@supercharge/promise-pool';
import { Coin } from '@cosmjs/stargate';

export interface IBalanceRequest {
  wallets:{rest:string, acc:string}[]
  onSuccess: (data: {
    address: string;
    balances: Coin[];
}[]) => void;
}

function useGetBalances({
  wallets,
  onSuccess,
}: IBalanceRequest): UseQueryResult<any> {
  return useQuery(
    'getAccountBalances',
    async () => {
      try {
        const res = await PromisePool.withConcurrency(2)
        .for(wallets)
        .process(async (chain) => {
          //const url = new URL(chain.rpc);
          const coins = await fetchBalances(chain.rest, chain.acc);
          return {address: chain.acc, balances: coins };
        })
        const balances = res.results.flat()
     
        return balances
      } catch (error) {
        return [];
      }
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess,
    }
  );
}

export { useGetBalances };
