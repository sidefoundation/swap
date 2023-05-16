// WalletDetails.tsx
import React, { useEffect, useState } from 'react';
import useWalletStore, { Wallet } from "@/store/wallet";  // Please replace with your actual Wallet type
import fetchAccount from '@/http/requests/get/fetchAccount';
import { Coin } from '@cosmjs/stargate';
import { useGetBalances } from '@/http/query/useGetBalances';

interface WalletDetailsProps {
  wallets: Wallet[];
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ wallets }) => {
  const onSuccess =(data: {
    address: string;
    balances: Coin[];
}[]) => {
    console.log('data', data)
    setBalances(data)
  }
  const {refetch} = useGetBalances({wallets: wallets.map((wallet)=>{
    return {rest: wallet.chainInfo.restUrl, acc: wallet.address}
  }), onSuccess:onSuccess })
  const [balances, setBalances] = useState<{
    address: string;
    balances: Coin[];
}[]>([])

  useEffect(()=>{
    refetch()
  },[])

  return (
    <div className="grid gap-4 p-4 text-left border rounded-md lg:w-1/3 md:w-full">
      <div className='text-center'>Wallets</div>
      {balances.map((balance, index) => (
        <div className='flex justify-center gap-4'  key={index}>
           {balance.balances.map((coin)=>{
            return <div className='flex gap-1'>
              <div>{coin.amount}</div>
              <div>{coin.denom.includes("pool") ? coin.denom.slice(0,10)+"..." : coin.denom}</div>
            </div>
           })}
        </div>
      ))}
    </div>
  );
};

export default WalletDetails;
