import React, { useState } from 'react';
import { CoinInput } from '@/components/CoinInput';
import { Coin } from '@cosmjs/stargate';
import {
  MdKeyboardArrowDown,
  MdOutlineSettings,
  MdOutlineClose,
} from 'react-icons/md';
import Image from 'next/image';
import TabItem from './TabItem';

interface SwapControlsProps {
  swapPair: { first: Coin; second: Coin };
  setSwapPair: (value: { first: Coin; second: Coin }) => void;
  updateFirstCoin: (value: string) => void;
  updateSecondCoin: (value: string) => void;
  onSwap: (direction: '->' | '<-') => Promise<void>;
}

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
      <div className="mb-5 flex items-center justify-between">
        <div className="tabs inline-flex items-center bg-gray-100 dark:bg-gray-700  rounded-full">
          <TabItem tab={tab} setTab={setTab} title="Swap" value="swap" />
          <TabItem tab={tab} setTab={setTab} title="Limit" value="limit" />
          <TabItem tab={tab} setTab={setTab} title="Order" value="order" />
        </div>

        <label htmlFor="modal-swap-setting">
          <MdOutlineSettings className="cursor-pointer text-xl" />
        </label>
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

      <div className="border dark:border-gray-700 rounded-lg mt-5 pb-3">
        <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
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

      <input type="checkbox" id="modal-swap-setting" className="modal-toggle" />
      <label htmlFor="modal-swap-setting" className="modal cursor-pointer">
        <label htmlFor="" className="modal-box relative p-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Transaction settings</div>
              <label htmlFor="modal-swap-setting" className="cursor-pointer">
                <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
              </label>
            </div>
            <div className="text-sm mt-3 mb-3 text-gray-500 dark:text-gray-400">
              Slippage tolerance
            </div>
            <div className="grid grid-cols-4 gap-4 mb-2">
              <div className="bg-gray-100 dark:bg-gray-600 text-center py-1 rounded">
                1%
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 text-center py-1 rounded">
                3%
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 text-center py-1 rounded">
                5%
              </div>
              <input
                className="bg-gray-100 dark:bg-gray-600 text-center py-1 rounded"
                type="number"
                placeholder="2.5%"
              />
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default SwapControls;
