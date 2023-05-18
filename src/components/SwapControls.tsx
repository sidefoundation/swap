import React, { useState } from 'react';
import { CoinInput } from '@/components/CoinInput';
import { Coin } from '@cosmjs/stargate';
import Image from 'next/image';

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
    <div className="p-5 bg-base-100 w-[500px] rounded-lg mx-auto mt-10 shadow mb-10">
      <div className="mb-5 tabs inline-flex items-center bg-gray-100 dark:bg-gray-700  rounded-full">
        <TabItem tab={tab} setTab={setTab} title="Swap" value="swap" />
        <TabItem tab={tab} setTab={setTab} title="Limit" value="limit" />
        <TabItem tab={tab} setTab={setTab} title="Order" value="order" />
      </div>

      <div className="bg-base-200 rounded-lg p-5">
        <div className="flex items-center mb-2">
          <div className="flex-1">Sell</div>
          <div>Balance: 99999</div>
          <div>Max</div>
        </div>

        <div className="flex items-center mb-2">
          <div className="bg-base-100 mr-4 px-4 rounded-full h-8 w-[120px] flex items-center justify-center">
            ASIDE
          </div>
          <input className="input flex-1 text-right bg-transparent" />
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
          className="w-14 h-14 shadow bg-white rounded-full"
        />
      </div>
      <div className="bg-base-200 rounded-lg p-5">
        <div className="flex items-center mb-2">
          <div className="flex-1">Sell</div>
          <div>Balance: 99999</div>
          <div>Max</div>
        </div>

        <div className="flex items-center mb-2">
          <div className="bg-base-100 mr-4 px-4 rounded-full h-8 w-[120px] flex items-center justify-center">
            ASIDE
          </div>
          <input className="input flex-1 text-right bg-transparent" />
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <div className="flex-1">Cosmos Hub</div>
          <div>~$9999</div>
        </div>
      </div>

      <button className="btn btn-primary w-full mt-6 capitalize text-lg">
        Swap
      </button>

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
