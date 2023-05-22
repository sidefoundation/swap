// WalletDetails.tsx
import React, { useEffect, useState } from 'react';
import { Wallet } from '@/store/wallet';
import { Coin } from '@cosmjs/stargate';
import { useGetBalances } from '@/http/query/useGetBalances';
import { AppConfig } from '@/utils/AppConfig';
import useWalletStore from '@/store/wallet';
interface WalletDetailsProps {
  wallets: Wallet[];
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ wallets }) => {
  const { selectedChain, setBalance } = useWalletStore();
  const onSuccess = (
    data: {
      address: string;
      balances: Coin[];
    }[]
  ) => {
    setBalances(data);
    setBalance(data);
  };
  const { refetch } = useGetBalances({
    wallets: wallets
      .map((wallet) => {
        if (wallet.chainInfo.chainID === selectedChain.chainID) {
          return { rest: wallet.chainInfo.restUrl, acc: wallet.address };
        }
      })
      .filter((item) => item),
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
    refetch();
  }, [selectedChain]);

  return (
    <div className="px-5 pt-5 pb-10">
      <div className="mb-5 flex items-center">
        <div className="text-xl font-semibold flex-1">Wallet Assets</div>
        <div></div>
      </div>
      <div className="border dark:border-none rounded-lg">
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
                return (
                  <tr key={index}>
                    <td className="">
                      <div className="font-semibold capitalize dark:text-white ">
                        {balance.balances?.[0]?.denom}
                      </div>
                      <div className="text-sm">
                        {
                          AppConfig.chains.find((item) => {
                            return item.denom === balance.balances?.[0]?.denom;
                          })?.name
                        }
                      </div>
                    </td>
                    <td className="capitalize dark:text-white ">
                      <div className="font-semibold">
                        {balance.balances?.[0]?.amount}
                      </div>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
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
