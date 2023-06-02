import axios from '../axios';
import type ResponseMessage from '@/http/types/ResponseMessage';
import { toast } from 'react-hot-toast';
interface FetchSwapResponse extends ResponseMessage {
  supply: [];
}

const fetchAtomicSwapList = async (restUrl: string) => {
  if (!restUrl){
    toast.error('Missing the necessary interface parameters!')
    return []
  }
  const res = await axios.get<FetchSwapResponse>(
    `/cosmos/bank/v1beta1/supply?page=1`,
    {
      headers: {
        apiurl: restUrl,
      },
    }
  );
  return res?.data?.supply || [];
};
export default fetchAtomicSwapList;
