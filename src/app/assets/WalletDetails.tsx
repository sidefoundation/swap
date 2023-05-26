// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Coin } from '@cosmjs/stargate';
import { useGetCurrentBalances } from '@/http/query/useGetCurrentBalances';

import { AppConfig } from '@/utils/AppConfig';
import useWalletStore from '@/store/wallet';

const WalletDetails = () => {
  const { selectedChain, setBalance, selectedWallet, connectSelectedWallet } =
    useWalletStore();
  const [balances, setBalances] = useState<
    {
      address: string;
      balances: Coin[];
      id?: string;
    }[]
  >([]);
  const onSuccess = (
    data: {
      address: string;
      balances: Coin[];
    }[]
  ) => {
    setBalances(data);
    setBalance(data);
  };
  const { refetch } = useGetCurrentBalances({
    wallet: selectedWallet,
    onSuccess: onSuccess,
  });

  // useEffect(() => {
  //   console.log(selectedChain, 'selectedChain', selectedWallet)
  //   refetch();
  // }, []);

  useEffect(() => {
    connectSelectedWallet();
  }, [selectedChain]);

  useEffect(() => {
    setBalances([]);
    refetch();
  }, [selectedWallet]);
  return (
    <div className="px-5 pt-5 pb-10">
      <div className="mb-5 flex items-center">
        <div className="text-xl font-semibold flex-1">Wallet Assets</div>
        <div></div>
      </div>
      <div className="border dark:border-none rounded-lg">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Asset / Chain</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {balances?.map((balance, index) => {
                const currentAssetChain = AppConfig.chains.find((item) => {
                  return item.denom === balance.balances?.[0]?.denom;
                })?.chainID;
                if (currentAssetChain === selectedChain.chainID) {
                  return balance?.balances.map((balanceItem, itemIndex) => {
                    return (
                      <tr key={itemIndex}>
                        <td className="">
                          <div className="font-semibold capitalize dark:text-white ">
                            {balanceItem.denom}
                          </div>
                          <div className="text-sm">
                            {
                              AppConfig.chains.find((item) => {
                                return item.denom === balanceItem.denom;
                              })?.name
                            }
                          </div>
                        </td>
                        <td className="capitalize dark:text-white ">
                          <div className="font-semibold">
                            {balanceItem.amount}
                          </div>
                        </td>
                      </tr>
                    );
                  });
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>

        {balances.length === 0 ? (
          <div className="text-center py-20">
            <progress className="progress w-56"></progress>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WalletDetails;
