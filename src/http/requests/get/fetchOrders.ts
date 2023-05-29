import axios from '../axios';

import type ResponseMessage from '@/http/types/ResponseMessage';
import { IAtomicSwapOrder } from '@/shared/types/order';

interface FetchAccountResponse extends ResponseMessage {
  orders: IAtomicSwapOrder[];
}

const fetchAtomicSwapOrders = async (restUrl: string) => {
  const { data } = await axios.get<FetchAccountResponse>(
    `/ibc/apps/atomicswap/v1/orders`,
    {
      headers: {
        apiurl: restUrl,
      },
    }
  );
  return data.orders;
};
export default fetchAtomicSwapOrders;
