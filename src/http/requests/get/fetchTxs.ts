import axios from 'axios';
import type ResponseMessage from '@/http/types/ResponseMessage';
interface FetchAccountResponse extends ResponseMessage {
  tx: any;
  tx_response: any;
}

const fetchTxs = async (restUrl: string, hash: string) => {
  const { data } = await axios.get<FetchAccountResponse>(
    `${restUrl}/cosmos/tx/v1beta1/txs/${hash}`
  );
  return data.tx_response;
};
export default fetchTxs;
