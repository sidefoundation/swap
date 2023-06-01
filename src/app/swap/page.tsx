'use client';

import React, { useEffect, useState } from 'react';

import { useChainStore } from '@/store/chain';
import { getPoolList } from '@/store/pool';

import SwapControls from './SwapControls';

const Swap = () => {
  const { chainCurrent } = useChainStore();

  useEffect(() => {
    // initData();
  }, []);

  useEffect(() => {
    initData();
  }, [chainCurrent]);

  const initData = async () => {
    if (chainCurrent?.restUrl) {
      await getPoolList(chainCurrent?.restUrl);
    }
  };

  return (
    <div>
      <SwapControls />
    </div>
  );
};

export default Swap;
