import axios from '../axios';
import type ResponseMessage from '@/http/types/ResponseMessage';
import { Coin } from '@cosmjs/stargate';

interface FetchBalanceResponse extends ResponseMessage {
  balances: Coin[];
}

const fetchBalances = async (restUrl: string, acc: string) => {
  if (!acc) return [];
  const { data } = await axios.get<FetchBalanceResponse>(
    `/cosmos/bank/v1beta1/balances/${acc}`,
    {
      headers: {
        apiurl: restUrl,
      },
    }
  );

  return data.balances;
};
export default fetchBalances;
