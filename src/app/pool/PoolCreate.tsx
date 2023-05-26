import React, { useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useChainStore, getChainMap, fetchChainCoinList } from '@/store/chain';
import {
  poolStore,
  usePoolStore,
  postPoolCreate,
  CounterPartyType,
} from '@/store/pool';
import { BriefChainInfo } from '@/shared/types/chain';
import useWalletStore, { Wallet } from '@/store/wallet';

import PoolChains from './PoolChains';
import PoolCoins from './PoolCoins';

export default function PoolCreate() {
  const { chainList } = useChainStore();
  const { poolFormCreate } = usePoolStore();

  const { wallets, getClient, selectedChain } = useWalletStore();

  useEffect(() => {
    const chainNative = chainList[0] as BriefChainInfo;
    poolStore.poolFormCreate.native.chain = chainNative;
    fetchChainCoinList(chainList[0]?.restUrl as string, 'Native');

    const counterparty = chainList[0]?.counterpartis?.[0];
    poolStore.poolFormCreate.counterParty = counterparty as CounterPartyType;
    const chainMap = getChainMap();
    const chainRemote = chainMap?.[
      counterparty?.chainID as string
    ] as BriefChainInfo;
    poolStore.poolFormCreate.remote.chain = chainRemote;
    fetchChainCoinList(chainRemote?.restUrl as string, 'Remote');
  }, []);

  const confirmCreatePool = () => {
    let currentWallet = {} as Wallet;
    wallets.forEach((item: Wallet) => {
      if (item?.chainInfo?.chainID === selectedChain?.chainID) {
        currentWallet = item;
      }
    });
    postPoolCreate(currentWallet, getClient);
  };

  return (
    <div>
      <input type="checkbox" id="modal-create-pool" className="modal-toggle" />
      <label htmlFor="modal-create-pool" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Create New Pool</h3>
            <label htmlFor="modal-create-pool" className="cursor-pointer">
              <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
            </label>
          </div>
          <div>
            <div className="text-sm mb-2 mt-4 flex items-center">
              <div className="font-semibold flex-1">Native Chain</div>
              <div className="bg-base-200 text-gray-700 dark:text-gray-50 px-4 ml-2 py-[2px] rounded-lg">
                weight: {poolFormCreate?.native?.weight || '--'}%
              </div>
            </div>
            <div className="flex items-center">
              <PoolChains type="native" />
              <PoolCoins type="native" />
              <input
                value={poolFormCreate?.native?.amount || ''}
                onChange={(e) => {
                  poolStore.poolFormCreate.native.amount = e.target.value;
                }}
                placeholder="Amount"
                className=" placeholder:text-sm dark:text-white flex-1 w-0 border border-gray-200  dark:border-gray-700 bg-base-200 rounded-full text-base text-right px-4 h-9 focus-within:outline-gray-300 dark:focus-within:outline-gray-800"
              />
            </div>
            <div className="text-sm mb-2 mt-4 flex items-center">
              <div className="font-semibold flex-1">Remote Chain</div>
              <div className="bg-base-200 text-gray-700 dark:text-gray-50 px-4 ml-2 py-[2px] rounded-lg">
                weight: {poolFormCreate?.remote?.weight || '--'}%
              </div>
            </div>
            <div className="flex items-center">
              <PoolChains type="remote" />
              <PoolCoins type="remote" />
              <input
                value={poolFormCreate?.remote?.amount || ''}
                onChange={(e) => {
                  poolStore.poolFormCreate.remote.amount = e.target.value;
                }}
                placeholder="Amount"
                className=" placeholder:text-sm dark:text-white flex-1  w-0 border border-gray-200 dark:border-gray-700 bg-base-200 rounded-full text-base text-right px-4 h-9 focus-within:outline-gray-300 dark:focus-within:outline-gray-800"
              />
            </div>
            <div className=" mb-2 mt-4  flex items-center justify-between">
              <div className="font-semibold text-sm">Weight</div>
              <div className="flex items-center text-xs">weight adjustment</div>
            </div>

            <div>
              <input
                type="range"
                min="20"
                max="80"
                value={poolFormCreate?.native?.weight}
                className="range range-sm range-primary"
                step="10"
                onChange={(e) => {
                  poolStore.poolFormCreate.native.weight = Number(
                    e.target.value
                  );
                  poolStore.poolFormCreate.remote.weight =
                    100 - Number(e.target.value);
                }}
              />
              <div className="w-full flex justify-between text-xs px-2">
                {[20, 30, 40, 50, 60, 70, 80].map((weight) => (
                  <span key={weight}>{weight}</span>
                ))}
              </div>
            </div>

            <div className=" mb-2 mt-4  flex items-center justify-between">
              <div className="text-sm">MEMO</div>
              <div className="flex items-center text-xs">(Option)</div>
            </div>
            <div>
              <input
                value={poolFormCreate?.memo || ''}
                onChange={(e) => {
                  poolStore.poolFormCreate.memo = e.target.value;
                }}
                className="w-full h-9 bg-base-200 focus-within:outline-gray-300 dark:focus-within:outline-gray-600 px-4 rouned"
              />
            </div>

            <div className=" mb-2 mt-4  flex items-center justify-between">
              <div className="text-sm">GAS</div>
              <div className="flex items-center text-xs"></div>
            </div>
            <div>
              <input
                value={poolFormCreate?.gas || ''}
                onChange={(e) => {
                  poolStore.poolFormCreate.gas = e.target.value;
                }}
                className="w-full h-9 bg-base-200 focus-within:outline-gray-300 dark:focus-within:outline-gray-600 px-4 rouned"
              />
            </div>

            <button
              className="w-full btn btn-primary mt-8"
              onClick={() => {
                confirmCreatePool();
              }}
              disabled={
                !poolFormCreate?.gas ||
                !poolFormCreate?.native?.amount ||
                !poolFormCreate?.remote?.amount ||
                !poolFormCreate?.native?.chain?.chainID ||
                !poolFormCreate?.remote?.chain?.chainID ||
                !poolFormCreate?.native?.coin?.denom ||
                !poolFormCreate?.remote?.coin?.denom
              }
            >
              Confirm
            </button>
          </div>
        </label>
      </label>
    </div>
  );
}
