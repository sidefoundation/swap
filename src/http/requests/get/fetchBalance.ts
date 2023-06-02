import axios from '../axios';
import type ResponseMessage from '@/http/types/ResponseMessage';
import { Coin } from '@cosmjs/stargate';
import { toast } from 'react-hot-toast';
interface FetchBalanceResponse extends ResponseMessage {
  balances: Coin[];
}

const fetchBalances = async (restUrl: string, acc: string) => {
  if (!acc || !restUrl) {
    toast.error('Missing the necessary interface parameters!');
    return [];
  }
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
