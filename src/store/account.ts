import { proxy, useSnapshot } from 'valtio';
import fetchAccount from '../http/requests/get/fetchAccount';
import { IAccount } from '@/shared/types/account';

type Store = {
  account: IAccount;
};

export const accountStore = proxy<Store>({
  account: {} as IAccount,
});

export const useAccountStore = () => {
  return useSnapshot(accountStore);
};

export const getAccount = async () => {
  const res = await fetchAccount('', '');
};
