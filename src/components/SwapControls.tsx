import React, { useState } from 'react';
import { CoinInput } from '@/components/CoinInput';
import { Coin } from '@cosmjs/stargate';

interface SwapControlsProps {
  swapPair: { first: Coin; second: Coin };
  updateFirstCoin: (value: string) => void;
  updateSecondCoin: (value: string) => void;
  onSwap: (direction: '->' | '<-') => Promise<void>;
}

const TabItem = ({
  tab,
  setTab,
  title,
  value,
}: {
  tab: string;
  setTab: Function;
  title: string;
  value: string;
}) => {
  return (
    <div
      className={`tab tab-sm px-4  ${
        tab === value
          ? 'bg-primary text-white rounded-full'
          : 'dark:text-gray-400'
      }`}
      onClick={() => {
        setTab(value);
      }}
    >
      {title}
    </div>
  );
};

const SwapControls: React.FC<SwapControlsProps> = ({
  swapPair,
  updateFirstCoin,
  updateSecondCoin,
  onSwap,
}) => {
  const [tab, setTab] = useState('swap');
  return (
    <div className="p-5 bg-base-100 w-[500px] rounded-lg mx-auto mt-10 shadow">
      <div className="tabs inline-flex items-center bg-gray-100 dark:bg-gray-700  rounded-full">
        <TabItem tab={tab} setTab={setTab} title="Swap" value="swap" />
        <TabItem tab={tab} setTab={setTab} title="Limit" value="limit" />
        <TabItem tab={tab} setTab={setTab} title="Order" value="order" />
      </div>
      <div className="flex flex-col justify-between w-full max-w-xl mt-4 text-2xl md:flex-row">
        <div className="grid grid-rows-2 gap-4">
          <CoinInput
            coin={swapPair.first}
            placeholder="Amount ..."
            onChange={updateFirstCoin}
          />
          <CoinInput
            coin={swapPair.second}
            placeholder="Amount ..."
            onChange={updateSecondCoin}
          />

          <div className="flex gap-4">
            <button
              className="flex-grow mt-4 text-2xl font-semibold rounded-full md:mt-0 btn btn-primary btn-lg hover:text-base-100"
              onClick={() => onSwap('->')}
            >
              {'SWAP>>'}
            </button>

            <button
              className="flex-grow mt-4 text-2xl font-semibold rounded-full md:mt-0 btn btn-primary btn-lg hover:text-base-100"
              onClick={() => onSwap('<-')}
            >
              {'<<SWAP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapControls;
