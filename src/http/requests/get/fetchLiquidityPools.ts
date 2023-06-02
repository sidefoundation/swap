import axios from '../axios';

import type ResponseMessage from '@/http/types/ResponseMessage';
import type { ILiquidityPool } from '@/shared/types/liquidity';
import { toast } from 'react-hot-toast';
interface FetchLiquidityResponse extends ResponseMessage {
  interchainLiquidityPool: ILiquidityPool[];
  pagination: { total: string };
}

const fetchLiquidityPools = async (restUrl: string) => {
  if (!restUrl) {
    toast.error('Missing the necessary interface parameters!');
    return {};
  }
  const { data } = await axios.get<FetchLiquidityResponse>(
    `/ibc/apps/interchainswap/v1/interchain_liquidity_pool`,
    {
      headers: {
        apiurl: restUrl,
      },
    }
  );
  return data;
};

export default fetchLiquidityPools;
