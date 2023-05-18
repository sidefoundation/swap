import React, { useState } from 'react';
import { CoinInput } from '@/components/CoinInput';
import { Coin } from '@cosmjs/stargate';
import Image from 'next/image';

interface SwapControlsProps {
  swapPair: { first: Coin; second: Coin };
  setSwapPair: (value: { first: Coin; second: Coin }) => void;
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
  setSwapPair,
  updateFirstCoin,
  updateSecondCoin,
  onSwap,
}) => {
  const [tab, setTab] = useState('swap');

  const switchSwap = () => {
    const oldFirst = JSON.parse(JSON.stringify(swapPair.first));
    const oldSecond = JSON.parse(JSON.stringify(swapPair.second));
    setSwapPair({
      first: oldSecond,
      second: oldFirst,
    });
  };
  return (
    <div className="p-5 bg-base-100 w-[500px] rounded-lg mx-auto mt-10 shadow mb-20">
      <div className="mb-5 tabs inline-flex items-center bg-gray-100 dark:bg-gray-700  rounded-full">
        <TabItem tab={tab} setTab={setTab} title="Swap" value="swap" />
        <TabItem tab={tab} setTab={setTab} title="Limit" value="limit" />
        <TabItem tab={tab} setTab={setTab} title="Order" value="order" />
      </div>

      <div className="bg-base-200 rounded-lg p-5">
        <div className="flex items-center mb-2">
          <div className="flex-1">Sell</div>
          <div className="mr-2">Balance: 99999</div>
          <div className="font-semibold">Max</div>
        </div>

        <div className="flex items-center mb-2">
          <div className="bg-base-100 font-semibold capitalize mr-4 px-4 rounded-full h-8 w-[120px] flex items-center justify-center">
            {swapPair.first?.denom}
          </div>
          <CoinInput
            coin={swapPair.first}
            placeholder="Amount"
            onChange={updateFirstCoin}
          />
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <div className="flex-1">Cosmos Hub</div>
          <div>~$9999</div>
        </div>
      </div>
      <div className="flex items-center justify-center -mt-5 -mb-5">
        <Image
          alt="switch"
          src="/assets/images/switch.png"
          width="20"
          height="20"
          className="w-14 h-14 shadow bg-white rounded-full cursor-pointer "
          onClick={() => switchSwap()}
        />
      </div>
      <div className="bg-base-200 rounded-lg p-5">
        <div className="flex items-center mb-2">
          <div className="flex-1">Buy</div>
          <div className="mr-2">Balance: 99999</div>
          <div className="font-semibold">Max</div>
        </div>

        <div className="flex items-center mb-2">
          <div className="bg-base-100 font-semibold capitalize mr-4 px-4 rounded-full h-8 w-[120px] flex items-center justify-center">
            {swapPair.second?.denom}
          </div>
          <CoinInput
            coin={swapPair.second}
            placeholder="Amount"
            onChange={updateSecondCoin}
          />
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <div className="flex-1">Cosmos Hub</div>
          <div>~$9999</div>
        </div>
      </div>

      <button
        className="btn btn-primary w-full mt-6 capitalize text-lg"
        onClick={() => onSwap('->')}
      >
        Swap
      </button>

      {/* <button
        className="flex-grow mt-4 text-2xl font-semibold rounded-full md:mt-0 btn btn-primary btn-lg hover:text-base-100"
        onClick={() => onSwap('->')}
      >
        {'SWAP ->'}
      </button>

      <button
        className="flex-grow mt-4 text-2xl font-semibold rounded-full md:mt-0 btn btn-primary btn-lg hover:text-base-100"
        onClick={() => onSwap('<-')}
      >
        {'SWAP <-'}
      </button> */}
    </div>
  );
};

export default SwapControls;
