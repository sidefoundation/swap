'use client';

import React, { useEffect, useState } from 'react';

import { useChainStore } from '@/store/chain';
import { swapStore } from '@/store/swap';
import { getPoolList, usePoolStore } from '@/store/pool';

import SwapControls from './SwapControls';

const Swap = () => {
  const { chainCurrent } = useChainStore();
  const { poolList } = usePoolStore();

  useEffect(() => {
    // initData();
  }, []);

  useEffect(() => {
    initData();
  }, [chainCurrent]);

  const initData = async () => {
    if (chainCurrent?.restUrl) {
      await getPoolList(chainCurrent?.restUrl);

      (swapStore.swapPair.native.denom =
        poolList[0]?.assets?.find((asset) => {
          return asset.side === 'NATIVE';
        })?.balance?.denom || ''),
        (swapStore.swapPair.remote.denom =
          poolList[0]?.assets?.find((asset) => {
            return asset.side === 'REMOTE';
          })?.balance?.denom || ''),
        console.log(poolList, 'poolList');
    }
  };

  return (
    <div>
      <SwapControls />
    </div>
  );
};

export default Swap;
