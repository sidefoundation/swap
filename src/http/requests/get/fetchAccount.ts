import axios from '../axios';

import type ResponseMessage from '@/http/types/ResponseMessage';
import { IAccount } from '@/shared/types/account';

interface FetchAccountResponse extends ResponseMessage {
  account: IAccount;
}

const fetchAccount = async (rpc: string, acc: string) => {
  const { data } = await axios.get<FetchAccountResponse>(
    `/cosmos/auth/v1beta1/accounts/${acc}`,
    {
      headers: {
        apiurl: rpc,
      },
    }
  );
  return data.account;
};
export default fetchAccount;
