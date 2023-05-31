'use client';

import { Coin } from '@cosmjs/stargate';
import React, { useState } from 'react';

import LimitControls from './LimitControls';

const Limit = () => {
  const [swapPair, setSwapPair] = useState<{
    first: Coin;
    second: Coin;
    type: string;
  }>({
    first: {
      denom: '',
      amount: '0',
    },
    second: {
      denom: '',
      amount: '0',
    },
    type: 'swap',
  });

  return (
    <div>
      <LimitControls swapPair={swapPair} setSwapPair={setSwapPair} />
    </div>
  );
};

export default Limit;
