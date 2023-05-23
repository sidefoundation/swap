import axios from 'axios';
import type ResponseMessage from '@/http/types/ResponseMessage';
interface FetchSwapResponse extends ResponseMessage {
  supply:[]
}

const fetchAtomicSwapList = async (restUrl: string) => {
  console.log(restUrl ,'restUrl')
  const { data } = await axios.get<FetchSwapResponse>(
    `${restUrl}/cosmos/bank/v1beta1/supply`
  );
  return data.supply;
};
export default fetchAtomicSwapList;