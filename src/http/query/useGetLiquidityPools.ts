import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import type { ILiquidityPool } from '@/shared/types/liquidity';

import fetchLiquidityPools from '../requests/get/fetchLiquidityPools';

export interface ILiquidityPools {
  restUrl: string;
  onSuccess: (data: ILiquidityPool[]) => void;
}

function useGetLiquidityPools({
  restUrl,
  onSuccess,
}: ILiquidityPools): UseQueryResult<any> {
  return useQuery(
    'getLiquidityPools',
    async () => {
      try {
        const poolData = await fetchLiquidityPools(restUrl);
        return poolData.interchainLiquidityPool;
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

export { useGetLiquidityPools };
