'use client';

import React from 'react';
import useWalletStore from '@/store/wallet';
import WalletDetails from './WalletDetails';

export default function Assets() {
  const { wallets } = useWalletStore();
  return (
    <div className="bg-base-100 container mx-auto mt-10 rounded-lg">
      <WalletDetails wallets={wallets} />
    </div>
  );
}
