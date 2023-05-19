import { useState } from 'react';
import Image from 'next/image';
import { MdKeyboardArrowDown } from 'react-icons/md';
import TabItem from '../components/TabItem';
import { CoinInput } from '../components/CoinInput';

export default function Stake() {
  const [tab, setTab] = useState('stake');
  return (
    <div className="p-5 bg-base-100 w-[500px] rounded-lg mx-auto mt-10 shadow mb-20">
      <div className="mb-5 flex items-center justify-center">
        <div className="tabs inline-flex items-center bg-gray-100 dark:bg-gray-700  rounded-full">
          <TabItem tab={tab} setTab={setTab} title="Stake" value="stake" />
          <TabItem tab={tab} setTab={setTab} title="Unstake" value="unstake" />
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-5">
        <div className="flex items-center mb-2">
          <div className="flex-1 capitalize">{tab}</div>
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
              Aside
            </div>

            <MdKeyboardArrowDown className="text-base" />
          </div>
          <CoinInput
            coin={{ amount: '0', denom: 'aside' }}
            placeholder="Amount"
            onChange={() => {}}
          />
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400 hidden">
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
          onClick={() => {}}
        />
      </div>
      <div className="bg-base-200 rounded-lg p-5">
        <div className="flex items-center mb-2">
          <div className="flex-1">Receive</div>
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
              Bside
            </div>

            <MdKeyboardArrowDown className="text-base" />
          </div>
          <CoinInput
            coin={{ amount: '0', denom: 'aside' }}
            placeholder="Amount"
            onChange={() => {}}
          />
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400 hidden">
          <div className="flex-1">Side Hub</div>
          <div>~$9999</div>
        </div>
      </div>

      <button
        className="btn btn-primary w-full mt-6 capitalize text-lg"
        onClick={() => {}}
      >
        {tab === 'stake' ? 'Liquid Stake' : 'Unstake'}
      </button>

      <div className="border dark:border-gray-700 rounded-lg mt-5 pb-3">
        <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
          Details
        </div>
        <div className="flex items-center justify-between pt-3 pb-1 px-4 text-sm">
          <div>Staking APY</div>
          <div>24%</div>
        </div>
        <div className="flex items-center justify-between pb-1 px-4 text-sm">
          <div>Unbonding</div>
          <div>21-24 Day</div>
        </div>
        <div className="flex items-center justify-between pb-1 px-4 text-sm">
          <div>Rate</div>
          <div>1 shATOM = 1.05 ATOM</div>
        </div>
      </div>
    </div>
  );
}
