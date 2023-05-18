import React, { useState } from 'react';
import { CoinInput } from '@/components/CoinInput';
import { Coin } from '@cosmjs/stargate';
import { MdKeyboardArrowDown } from 'react-icons/md';
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
          <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
            <Image
              alt="logo"
              src="/assets/images/Side.png"
              width={20}
              height={20}
              className="w-7 h-7"
            />
            <div className="font-semibold capitalize flex-1 text-center">
              {swapPair.first?.denom}
            </div>

            <MdKeyboardArrowDown className="text-base" />
          </div>
          <CoinInput
            coin={swapPair.first}
            placeholder="Amount"
            onChange={updateFirstCoin}
          />
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <div className="flex-1">Side Hub</div>
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
          <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
            <Image
              alt="logo"
              src="/assets/images/Side.png"
              width={20}
              height={20}
              className="w-7 h-7"
            />
            <div className="font-semibold capitalize flex-1 text-center">
              {swapPair.second?.denom}
            </div>

            <MdKeyboardArrowDown className="text-base" />
          </div>
          <CoinInput
            coin={swapPair.second}
            placeholder="Amount"
            onChange={updateSecondCoin}
          />
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <div className="flex-1">Side Hub</div>
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

      <div className="border dark:border-gray-600 rounded-lg mt-5 pb-3">
        <div className="px-4 py-2 font-semibold border-b dark:border-gray-600">
          Details
        </div>
        <div className="flex items-center justify-between pt-3 pb-1 px-4 text-sm">
          <div>You will receive</div>
          <div>≈ 99.99 SIDE</div>
        </div>
        <div className="flex items-center justify-between pb-1 px-4 text-sm">
          <div>Minimum received after slippage (1%)</div>
          <div>≈ 99.89 SIDE</div>
        </div>
        <div className="flex items-center justify-between pb-1 px-4 text-sm">
          <div>Price impact</div>
          <div>{`< 0.0002%`}</div>
        </div>
        <div className="flex items-center justify-between pb-1 px-4 text-sm">
          <div>Swap fees</div>
          <div>≈ $ 0.1739</div>
        </div>
      </div>
    </div>
  );
};

export default SwapControls;
