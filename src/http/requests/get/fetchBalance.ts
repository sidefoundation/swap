import axios from 'axios';
import type ResponseMessage from '@/http/types/ResponseMessage';
import { Coin } from '@cosmjs/stargate';

interface FetchBalanceResponse extends ResponseMessage {
  balances: Coin[];
}

const fetchBalances = async (rpc:string,acc: string) => {
  const { data } = await axios.get<FetchBalanceResponse>(
    `${rpc}/cosmos/bank/v1beta1/balances/${acc}`
  );
  
  return data.balances;
};
export default fetchBalances;
