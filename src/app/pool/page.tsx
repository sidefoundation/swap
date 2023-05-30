'use client';

import useWalletStore from '@/store/wallet';
import { ILiquidityPool } from '@/shared/types/liquidity';
import { useGetLiquidityPools } from '@/http/query/useGetLiquidityPools';
import { usePoolStore, poolStore, getPoolList } from '@/store/pool';
import React, { useEffect, useState } from 'react';
import PoolDetailsList from './PoolDetailsList';
import PoolCreate from './PoolCreate';

export default function Pool() {
  const { poolList } = usePoolStore();
  const { selectedChain } = useWalletStore();

  useEffect(() => {
    getPoolList(selectedChain.restUrl)
    console.log(poolList,999)
  }, []);

  useEffect(() => {    
    getPoolList(selectedChain.restUrl)
  }, [selectedChain]);

  return (
    <div className="container mx-auto">
      {/* <PoolDetailsList pools={pools} /> */}
      <PoolDetailsList />
      <PoolCreate />
    </div>
  );
}
