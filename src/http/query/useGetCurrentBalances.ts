import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import fetchBalances from '../requests/get/fetchBalance';
import { Coin } from '@cosmjs/stargate';

export interface IBalanceRequest {
  wallet:{address:string, chainInfo:{restUrl:''}}
  onSuccess: (data: {
    address: string;
    balances: Coin[];
}[]) => void;
}

function useGetCurrentBalances({
  wallet,
  onSuccess,
}: IBalanceRequest): UseQueryResult<any> {
  return useQuery(
    'getAccountBalances',
    async () => {
      console.log(wallet ,'walletwalletwallet')
      try {
        const balances = await fetchBalances(wallet?.chainInfo?.restUrl, wallet?.address);
        return [{address: wallet.address, balances: balances }]
      } catch (error) {
        return [];
      }
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess,
    }
  );
}

export { useGetCurrentBalances };
