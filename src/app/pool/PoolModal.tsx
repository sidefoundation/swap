import React, { useEffect, useState } from 'react';
import { MdOutlineClose, MdKeyboardArrowDown } from 'react-icons/md';
import { MarketMaker } from '@/utils/swap';
import useWalletStore from '@/store/wallet';
import { AppConfig } from '@/utils/AppConfig';
import {
  useAssetsStore,
  getBalanceList,
  setRemoteBalanceList,
} from '@/store/assets';
import {
  poolStore,
  usePoolStore,
  addPoolItemMulti,
  addPoolItemSingle,
  redeemPoolItemSingle,
  redeemPoolItemMulti,
} from '@/store/pool';
import TabItem from '@/components/TabItem';

function PoolModal() {
  const [tab, setTab] = React.useState('all');
  const { poolItem, poolForm } = usePoolStore();
  const poolAsset1 = poolItem?.assets?.[0];
  const poolAsset2 = poolItem?.assets?.[1];

  const { balanceList, remoteBalanceList } = useAssetsStore();

  const balanceMap = {};
  for (const item of balanceList) {
    balanceMap[item.denom] = item?.amount;
  }
  const balanceRemoteMap = {};
  for (const item of remoteBalanceList) {
    balanceRemoteMap[item.denom] = item?.amount;
  }
  const { wallets, getClient, selectedChain } = useWalletStore();
  useEffect(() => {});
  useEffect(() => {
    getBalanceList(selectedChain?.restUrl, wallets?.[0]?.address);
    const otherChain = AppConfig?.chains?.find((item) => {
      if (item.restUrl !== selectedChain?.restUrl) {
        return item;
      }
    });
    console.log(otherChain?.restUrl, wallets?.[1]?.address, 999);
    setRemoteBalanceList(otherChain?.restUrl, wallets?.[1]?.address);
  }, [selectedChain, wallets]);

  const confirmAdd = () => {
    if (poolForm?.action === 'add' && tab === 'all') {
      const market = new MarketMaker(poolItem, 300);
      addPoolItemMulti(wallets, selectedChain, market, getClient);
    }
    if (poolForm?.action === 'add' && tab === 'single') {
      addPoolItemSingle(wallets, selectedChain, getClient);
    }
    if (poolForm?.action === 'redeem' && tab === 'all') {
      const market = new MarketMaker(poolItem, 300);
      redeemPoolItemMulti(wallets, getClient, market);
    }
    if (poolForm?.action === 'redeem' && tab === 'single') {
      redeemPoolItemSingle(wallets, getClient, selectedChain);
    }
  };

  return (
    <div>
      <div
        className="cursor-pointer modal pointer-events-auto opacity-100 visible"
        onClick={() => {
          poolStore.poolForm.modalShow = false;
        }}
      >
        <div
          className="relative modal-box cursor-default"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">
              <span className="capitalize ">{poolForm?.action}</span> liquidity
              to pool #
              {poolItem?.poolId?.slice(0, 8) +
                '...' +
                poolItem?.poolId?.slice(
                  poolItem?.poolId?.length - 4,
                  poolItem?.poolId?.length
                )}
            </div>
            <label
              htmlFor="modal-pool-modal"
              className="cursor-pointer"
              onClick={() => {
                poolStore.poolForm.modalShow = false;
              }}
            >
              <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
            </label>
          </div>
          <div className="inline-flex items-center mt-4 mb-4 bg-gray-100 rounded-full tabs dark:bg-gray-700">
            <TabItem tab={tab} setTab={setTab} title="All assets" value="all" />
            <TabItem
              tab={tab}
              setTab={(val) => {
                setTab(val);
                poolStore.poolForm.single = poolAsset2;
              }}
              title="Single asset"
              value="single"
            />
          </div>

          <div className="flex items-center mb-4 text-sm">
            Use autosawp to {poolForm?.action} liquidity with
            {tab === 'all' ? ' all assets' : ' a single asset'}
          </div>

          {/* all assets */}
          {tab === 'all' ? (
            <div>
              <div className="flex items-center py-3 pl-4 pr-4 mb-4 border rounded-lg dark:border-gray-600">
                <div className="flex items-center mr-5 text-xl font-semibold">
                  {poolAsset1?.weight}%
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold capitalize">
                      {poolAsset1?.balance?.denom}
                    </div>
                    <input
                      value={
                        poolForm?.[
                          `${poolAsset1?.side?.toLowerCase()}Amount`
                        ] || ''
                      }
                      onChange={(e) => {
                        poolStore.poolForm[
                          `${poolAsset1?.side?.toLowerCase()}Amount`
                        ] = e.target.value;
                      }}
                      className="h-8 px-4 mb-2 text-lg text-right bg-gray-100 rounded dark:bg-gray-700 dark:text-white focus-within:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {poolAsset1?.side}
                    </div>
                    <div className="text-xs">
                      Available:{' '}
                      {poolForm?.action !== 'redeem'
                        ? balanceMap?.[poolAsset1?.balance?.denom] ?? ''
                        : ''}
                      {poolForm?.action === 'redeem'
                        ? balanceRemoteMap?.[poolItem?.poolId] ?? '0'
                        : balanceRemoteMap?.[poolAsset1?.balance?.denom] ??
                          '0'}{' '}
                      <span className="capitalize">
                        {poolAsset1?.balance?.denom}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center py-3 pl-4 pr-4 border rounded-lg dark:border-gray-600">
                <div className="flex items-center mr-5 text-xl font-semibold">
                  {poolAsset2?.weight}%
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold capitalize">
                      {poolAsset2?.balance?.denom}
                    </div>
                    <input
                      value={
                        poolForm?.[
                          `${poolAsset2?.side?.toLowerCase()}Amount`
                        ] || ''
                      }
                      onChange={(e) => {
                        poolStore.poolForm[
                          `${poolAsset2?.side?.toLowerCase()}Amount`
                        ] = e.target.value;
                      }}
                      className="h-8 px-4 mb-2 text-lg text-right bg-gray-100 rounded dark:bg-gray-700 dark:text-white focus-within:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {poolAsset2?.side}
                    </div>
                    <div className="text-xs">
                      Available:{' '}
                      {poolForm?.action !== 'redeem'
                        ? balanceMap?.[poolAsset2?.balance?.denom] || ''
                        : ''}
                      {poolForm?.action === 'redeem'
                        ? balanceRemoteMap?.[poolItem?.poolId] ?? '0'
                        : balanceRemoteMap?.[poolAsset2?.balance?.denom] ??
                          '0'}{' '}
                      <span className="capitalize">
                        {poolAsset2?.balance?.denom}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* single asset */}
          {tab === 'single' ? (
            <div className="flex items-center py-3 pl-4 pr-4 mb-4 border rounded-lg dark:border-gray-600">
              <div className="flex items-center mr-5 text-xl font-semibold">
                {poolForm?.single?.weight}%
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="dropdown">
                    <label
                      tabIndex={0}
                      className="flex items-center cursor-pointer"
                    >
                      <span className="text-lg font-semibold capitalize">
                        {poolForm?.single?.balance?.denom}
                      </span>
                      <MdKeyboardArrowDown className="ml-1 text-lg text-gray-500" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
                    >
                      {poolItem?.assets?.map((item, index) => {
                        return (
                          <li key={index}>
                            <a
                              className="flex items-center justify-between capitalize "
                              onClick={() => {
                                poolStore.poolForm.single = item;
                              }}
                            >
                              <span className="text-base font-semibold">
                                {item?.balance?.denom}
                              </span>
                              <span className="text-xs">{item?.side}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <input
                    value={poolForm?.signleAmount || ''}
                    onChange={(e) => {
                      poolStore.poolForm.signleAmount = e.target.value;
                    }}
                    className="h-8 px-4 mb-2 text-lg text-right bg-gray-100 rounded dark:bg-gray-700 dark:text-white focus-within:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {poolForm?.single?.side}
                  </div>
                  <div className="text-xs">
                    Available:{' '}
                    {poolForm?.action === 'add'
                      ? poolStore?.poolForm?.single?.side === 'NATIVE'
                        ? balanceMap?.[poolForm?.single?.balance?.denom] ?? '0'
                        : balanceRemoteMap?.[
                            poolForm?.single?.balance?.denom
                          ] ?? '0'
                      : '0'}
                    {poolForm?.action === 'redeem'
                      ? poolStore?.poolForm?.single?.side === 'NATIVE'
                        ? balanceMap?.[poolItem?.poolId] ?? '0'
                        : balanceRemoteMap?.[poolItem?.poolId] ?? '0'
                      : '0'}
                    <span className="capitalize">
                      {poolForm?.single?.balance?.denom}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-6">
            <button
              className="w-full btn btn-primary"
              onClick={() => confirmAdd()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PoolEditModal() {
  const { poolForm } = usePoolStore();
  if (!poolForm.modalShow) {
    return null;
  }
  return <PoolModal />;
}
