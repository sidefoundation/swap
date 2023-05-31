'use client';

import { getPoolList } from '@/store/pool';
import React, { useEffect } from 'react';
import PoolDetailsList from './PoolDetailsList';
import PoolCreate from './PoolCreate';
import { useChainStore } from '@/store/chain';
export default function Pool() {
  const { chainCurrent } = useChainStore();
  // useEffect(() => {
  //   getCurrentPoolList();
  // }, []);

  useEffect(() => {
    getCurrentPoolList();
  }, [chainCurrent]);

  const getCurrentPoolList = () => {
    if (chainCurrent?.restUrl) {
      getPoolList(chainCurrent?.restUrl);
    }
  };
  return (
    <div className="container mx-auto">
      <PoolDetailsList />
      <PoolCreate />
    </div>
  );
}
