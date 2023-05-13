// WalletDetails.tsx
import React from 'react';
import { Wallet } from "@/store/wallet";  // Please replace with your actual Wallet type

interface WalletDetailsProps {
  wallets: Wallet[];
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ wallets }) => {
  return (
    <div className="grid gap-4 p-4 text-left border rounded-md lg:w-1/3 md:w-full">
      <div className='text-center'>Wallets</div>
      {wallets.map((wallet, index) => (
        <div className='flex justify-around' key={index}>
          <div>{wallet.balance.amount}</div>
          <div>{wallet.balance.denom}</div>
        </div>
      ))}
    </div>
  );
};

export default WalletDetails;
