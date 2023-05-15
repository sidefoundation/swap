import axios from 'axios';

import { config } from '@/http/api/config';
import type ResponseMessage from '@/http/types/ResponseMessage';
import { IAccount } from '@/shared/types/account';

interface FetchAccountResponse extends ResponseMessage {
  account: IAccount;
}

const fetchAccount = async (rpc:string,acc: string) => {
  const { data } = await axios.get<FetchAccountResponse>(
    `${rpc}/cosmos/auth/v1beta1/accounts/${acc}`
  );
  return data.account;
};
export default fetchAccount;
