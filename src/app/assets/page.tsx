'use client';

import WalletDetails from '@/components/WalletDetails';
import useWalletStore from '@/store/wallet';
import React from 'react';

export default function Assets() {
  const { wallets } = useWalletStore();
  return (
    <div className='bg-base-100 container mx-auto mt-10 rounded-lg'>
      <WalletDetails wallets={wallets} />
    </div>
  );
}
