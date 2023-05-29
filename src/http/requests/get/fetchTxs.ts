import axios from '../axios';
import type ResponseMessage from '@/http/types/ResponseMessage';
interface FetchResultTxResponse extends ResponseMessage {
  tx: any;
  tx_response: any;
}

const fetchTxs = async (restUrl: string, hash: string) => {
  const { data } = await axios.get<FetchResultTxResponse>(
    `/cosmos/tx/v1beta1/txs/${hash}`,
    {
      headers: {
        apiurl: restUrl,
      },
    }
  );
  return data.tx_response;
};
export default fetchTxs;
