import axios from 'axios';

import { config } from '@/http/api/config';
import type ResponseMessage from '@/http/types/ResponseMessage';
import type { ILiquidityPool } from '@/shared/types/liquidity';

interface FetchLiquidityResponse extends ResponseMessage {
  interchainLiquidityPool: ILiquidityPool[];
}

const fetchLiquidityPools = async () => {
  const { data } = await axios.get<FetchLiquidityResponse>(
    `${config.serverURL}/ibc/apps/interchainswap/v1/interchain_liquidity_pool`,
    {}
  );
  return data;
};

export default fetchLiquidityPools;
