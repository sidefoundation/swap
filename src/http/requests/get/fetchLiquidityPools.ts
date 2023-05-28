import axios from 'axios';

import { config } from '@/http/api/config';
import type ResponseMessage from '@/http/types/ResponseMessage';
import type { ILiquidityPool } from '@/shared/types/liquidity';

interface FetchLiquidityResponse extends ResponseMessage {
  interchainLiquidityPool: ILiquidityPool[];
}

const fetchLiquidityPools = async (restUrl: string) => {
  const { data } = await axios.get<FetchLiquidityResponse>(
    `${restUrl}/ibc/apps/interchainswap/v1/interchain_liquidity_pool`,
    {}
  );
  return data;
};

export default fetchLiquidityPools;
