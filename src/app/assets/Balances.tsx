// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Coin } from '@cosmjs/stargate';
import { useGetCurrentBalances } from '@/http/query/useGetCurrentBalances';

import { AppConfig } from '@/utils/AppConfig';
import useWalletStore from '@/store/wallet';
import { getBalanceList, useAssetsStore } from '@/store/assets';
import { toast } from 'react-hot-toast';

export default function Balances() {
  const { wallets, selectedChain } = useWalletStore();
  const { balanceList, balanceLoading } = useAssetsStore();

  useEffect(() => {
    const currentWallet = wallets.find((item) => {
      return item.chainInfo?.chainID === selectedChain?.chainID;
    });
    if (currentWallet?.address) {
      getBalanceList(
        currentWallet?.chainInfo?.restUrl,
        currentWallet?.address,
        true
      );
    }
  }, [selectedChain]);
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
              {balanceList.length > 0
                ? balanceList?.map((balance, index) => {
                    return (
                      <tr key={index}>
                        <td width="50%">
                          <div>
                            <div className="font-semibold capitalize dark:text-white ">
                              {balance.denom?.length > 10
                                ? 'Pool Asset'
                                : balance.denom}
                            </div>
                            {balance.denom?.length > 10 ? (
                              <div className="text-xs">{balance.denom}</div>
                            ) : null}
                          </div>
                        </td>
                        <td width="50%" className="capitalize dark:text-white ">
                          <div className="font-semibold">{balance.amount}</div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        {!balanceLoading && balanceList.length === 0 && (
          <div className="text-center py-20">
            <div className="m-4">
              There is no Assets,Please click the Faucet
            </div>
          </div>
        )}
        {balanceLoading ? (
          <div className="text-center py-20">
            <progress className="progress w-56"></progress>
          </div>
        ) : null}
        
      </div>
    </div>
  );
}
