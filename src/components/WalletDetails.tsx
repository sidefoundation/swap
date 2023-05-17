// WalletDetails.tsx
import React, { useEffect, useState } from 'react';
import { Wallet } from '@/store/wallet';
import { Coin } from '@cosmjs/stargate';
import { useGetBalances } from '@/http/query/useGetBalances';

interface WalletDetailsProps {
  wallets: Wallet[];
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ wallets }) => {
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
      return { rest: wallet.chainInfo.restUrl, acc: wallet.address };
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((balance, index) => (
              <tr className="" key={index}>
                {balance.balances.map((coin) => {
                  return (
                    <td className="capitalize dark:text-white font-semibold">
                      {coin.denom.includes('pool')
                        ? coin.denom.slice(0, 10) + '...'
                        : coin.denom}
                    </td>
                  );
                })}
                {balance.balances.map((coin) => {
                  return (
                    <td className="text-base font-semibold dark:text-white">
                      {coin.amount}
                    </td>
                  );
                })}

                <td>
                  <label className="link link-primary no-underline mr-4">
                    Deposit
                  </label>
                  <label className="link link-primary no-underline">
                    Withdraw
                  </label>
                </td>
              </tr>
            ))}
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
