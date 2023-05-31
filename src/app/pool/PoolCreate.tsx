import React, { useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useChainStore, getChainMap, fetchChainCoinList } from '@/store/chain';
import {
  poolStore,
  usePoolStore,
  postPoolCreate,
  CounterPartyType,
} from '@/store/pool';
import {
  useAssetsStore,
  getBalanceList,
  setRemoteBalanceList,
} from '@/store/assets';
import { BriefChainInfo } from '@/shared/types/chain';
import { Wallet } from '@/shared/types/wallet';
import useWalletStore from '@/store/wallet';
import PoolChains from './PoolChains';
import PoolCoins from './PoolCoins';
import { AppConfig } from '@/utils/AppConfig';

function PoolCreate() {
  const { chainList,chainCurrent } = useChainStore();
  const { poolFormCreate } = usePoolStore();
  const { balanceList, remoteBalanceList } = useAssetsStore();
  const { wallets, getClient, isConnected } = useWalletStore();
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
  useEffect(() => {
    getBalanceList(chainCurrent?.restUrl, wallets?.[0]?.address);
    const otherChain = AppConfig?.chains?.find((item) => {
      if (item.restUrl !== chainCurrent?.restUrl) {
        return item;
      }
    });
    console.log(otherChain?.restUrl, wallets?.[1]?.address, 999);
    setRemoteBalanceList(otherChain?.restUrl, wallets?.[1]?.address);
  }, [chainCurrent, wallets]);

  const confirmCreatePool = () => {
    let currentWallet = {} as Wallet;
    wallets.forEach((item: Wallet) => {
      if (item?.chainInfo?.chainID === chainCurrent?.chainID) {
        currentWallet = item;
      }
    });
    postPoolCreate(currentWallet, getClient);
  };

  return (
    <div
      className="modal cursor-pointer pointer-events-auto opacity-100 visible"
      onClick={() => {
        poolStore.poolFormCreate.modalShow = false;
      }}
    >
      <div
        className="modal-box relative cursor-default"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Create New Pool</h3>
          <label
            htmlFor="modal-create-pool"
            className="cursor-pointer"
            onClick={() => {
              poolStore.poolFormCreate.modalShow = false;
            }}
          >
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
              type="number"
              value={poolFormCreate?.native?.amount || ''}
              onChange={(e) => {
                poolStore.poolFormCreate.native.amount = e.target.value;
              }}
              placeholder="Amount"
              className=" placeholder:text-sm dark:text-white flex-1 w-0 border border-gray-200  dark:border-gray-700 bg-base-200 rounded-full text-base text-right px-4 h-9 focus-within:outline-gray-300 dark:focus-within:outline-gray-800"
            />
          </div>
          <div className="text-xs mt-1 bg-base-100 text-gray-400 dark:text-gray-50 px-4 py-[2px] rounded-full text-right">
            maxAmount:{' '}
            {balanceList.find((item) => {
              if (item.denom === poolFormCreate?.native?.coin?.denom) {
                return item;
              }
            })?.amount || '0'}
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
              type="number"
              value={poolFormCreate?.remote?.amount || ''}
              onChange={(e) => {
                poolStore.poolFormCreate.remote.amount = e.target.value;
              }}
              placeholder="Amount"
              className=" placeholder:text-sm dark:text-white flex-1  w-0 border border-gray-200 dark:border-gray-700 bg-base-200 rounded-full text-base text-right px-4 h-9 focus-within:outline-gray-300 dark:focus-within:outline-gray-800"
            />
          </div>
          <div className="text-xs mt-1 bg-base-100 text-gray-400 dark:text-gray-50 px-4 py-[2px] rounded-full text-right">
            maxAmount:{' '}
            {remoteBalanceList.find((item) => {
              if (item.denom === poolFormCreate?.remote?.coin?.denom) {
                return item;
              }
            })?.amount || '0'}
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
                poolStore.poolFormCreate.native.weight = Number(e.target.value);
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
              !isConnected &&
              (!poolFormCreate?.gas ||
                !poolFormCreate?.native?.amount ||
                !poolFormCreate?.remote?.amount ||
                !poolFormCreate?.native?.chain?.chainID ||
                !poolFormCreate?.remote?.chain?.chainID ||
                !poolFormCreate?.native?.coin?.denom ||
                !poolFormCreate?.remote?.coin?.denom)
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PoolCreateModal() {
  const { poolFormCreate } = usePoolStore();
  if (!poolFormCreate.modalShow) {
    return null;
  }
  return <PoolCreate />;
}
