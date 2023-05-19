import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import useWalletStore from '@/store/wallet';
import { AppConfig } from '@/utils/AppConfig';
import { useEffect,useState } from 'react';
import { BriefChainInfo } from '@/shared/types/chain';
import { useGetBalances } from '@/http/query/useGetBalances';
import { Coin } from '@cosmjs/stargate';
export function ToggleChain() {
  const { wallets, suggestChain, selectedChain } = useWalletStore();
  const onSuccess = (
    data: {
      address: string;
      balances: Coin[];
    }[]
  ) => {
    console.log('data', data);
    setBalances(data);
  };
  const { refetch } = useGetBalances({
    wallets: wallets.map((wallet) => {
      // if(wallet.chainInfo.chainID === selectedChain.chainID ) {
        return { rest: wallet.chainInfo.restUrl, acc: wallet.address };
      // }
    }),
    onSuccess: onSuccess,
  });
  const [balances, setBalances] = useState<
    {
      address: string;
      balances: Coin[];
    }[]
  >([]);

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (AppConfig?.chains?.length > 0) {
      suggestChain(AppConfig?.chains?.[0] as BriefChainInfo);
    }
  }, [AppConfig?.chains]);

  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <a>
            {selectedChain?.name}
            <MdKeyboardArrowDown className="fill-current" />
          </a>
          <ul className="p-2 bg-base-100">
            {AppConfig?.chains?.map((item, index) => {
              return (
                <li key={index}>
                  <a onClick={() => suggestChain(item)}>{item?.name}</a>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
