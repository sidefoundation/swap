import axios from 'axios';
import type ResponseMessage from '@/http/types/ResponseMessage';
interface FetchSwapResponse extends ResponseMessage {
  supply: [];
}

const fetchAtomicSwapList = async (restUrl: string) => {
  const res = await axios.get<FetchSwapResponse>(
    `${restUrl}/cosmos/bank/v1beta1/supply`
  );
  return res?.data?.supply || [];
};
export default fetchAtomicSwapList;
