'use client';

import useWalletStore from '@/store/wallet';
import { getPoolList } from '@/store/pool';
import React, { useEffect } from 'react';
import PoolDetailsList from './PoolDetailsList';
import PoolCreate from './PoolCreate';

export default function Pool() {
  const { selectedChain } = useWalletStore();

  // useEffect(() => {
  //   getCurrentPoolList();
  // }, []);

  useEffect(() => {
    getCurrentPoolList();
  }, [selectedChain]);

  const getCurrentPoolList = () => {
    if (selectedChain?.restUrl) {
      getPoolList(selectedChain?.restUrl);
    }
  };
  return (
    <div className="container mx-auto">
      <PoolDetailsList />
      <PoolCreate />
    </div>
  );
}
