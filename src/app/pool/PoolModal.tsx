import React, { useEffect } from 'react';
import { MdOutlineClose, MdKeyboardArrowDown } from 'react-icons/md';
import { MarketMaker } from '@/utils/swap';
import useWalletStore from '@/store/wallet';
import { AppConfig } from '@/utils/AppConfig';
import {
  useAssetsStore,
  getBalanceList,
  setRemoteBalanceList,
} from '@/store/assets';
import { useChainStore, chainStore } from '@/store/chain';
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
  const { chainCurrent } = useChainStore();
  const { balanceList, remoteBalanceList } = useAssetsStore();

  const balanceMap = {};
  for (const item of balanceList) {
    balanceMap[item.denom] = item?.amount;
  }
  const balanceRemoteMap = {};
  for (const item of remoteBalanceList) {
    balanceRemoteMap[item.denom] = item?.amount;
  }
  const { wallets, getClient } = useWalletStore();

  useEffect(() => {
    getBalanceList(chainCurrent?.restUrl, wallets?.[0]?.address || '');
    const otherChain = AppConfig?.chains?.find((item: any) => {
      if (item.restUrl !== chainCurrent?.restUrl) {
        return item;
      }
    });
    setRemoteBalanceList(
      otherChain?.restUrl || '',
      wallets?.[1]?.address || ''
    );
  }, [chainCurrent, wallets]);

  const confirmAdd = () => {
    if (poolForm?.action === 'add' && tab === 'all') {
      const market = new MarketMaker(poolItem, 300);
      addPoolItemMulti(wallets, chainStore.chainCurrent, market, getClient);
    }
    if (poolForm?.action === 'add' && tab === 'single') {
      addPoolItemSingle(wallets, chainStore.chainCurrent, getClient);
    }
    if (poolForm?.action === 'redeem' && tab === 'all') {
      const market = new MarketMaker(poolItem, 300);
      redeemPoolItemMulti(wallets, getClient, market, chainStore.chainCurrent);
    }
    if (poolForm?.action === 'redeem' && tab === 'single') {
      redeemPoolItemSingle(wallets, getClient, chainStore.chainCurrent);
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
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">
              <span className="capitalize ">{poolForm?.action}</span> liquidity
              to pool #
              {poolItem?.id?.slice(0, 8) +
                '...' +
                poolItem?.id?.slice(
                  poolItem?.id?.length - 4,
                  poolItem?.id?.length
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
          {/* tabs */}
          <div className="inline-flex items-center mt-4 mb-4 bg-gray-100 rounded-full tabs dark:bg-gray-700">
            <TabItem tab={tab} setTab={setTab} title="All assets" value="all" />
            <TabItem
              tab={tab}
              setTab={(val: string) => {
                setTab(val);
                poolStore.poolForm.single = poolAsset2;
              }}
              title="Single asset"
              value="single"
            />
          </div>
          {/* subtitle */}
          <div className="flex items-center mb-4 text-sm">
            Use autoswap to {poolForm?.action} liquidity with
            {tab === 'all' ? ' all assets' : ' a single asset'}
          </div>

          {/* all assets */}
          {tab === 'all' ? (
            <div>
              {/* asset0 */}
              <div className="py-3 pl-4 pr-4 mb-4 border rounded-lg dark:border-gray-600">
                <div className="flex items-center">
                  <div className="flex items-center mr-5 text-xl font-semibold">
                    {poolAsset1?.weight}%
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold capitalize">
                        {poolAsset1?.balance?.denom}
                      </div>
                      <input
                        className="h-8 px-4 mb-2 text-lg text-right bg-gray-100 rounded dark:bg-gray-700 dark:text-white focus-within:outline-none"
                        type="number"
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
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {poolAsset1?.side}
                      </div>
                      <div className="text-xs">
                        Available:{' '}
                        {poolForm?.action !== 'redeem'
                          ? poolAsset1?.side === 'SOURCE'
                            ? balanceMap?.[poolAsset1?.balance?.denom] ?? '0'
                            : balanceRemoteMap?.[poolAsset1?.balance?.denom] ??
                              '0'
                          : poolAsset1?.side === 'SOURCE'
                          ? balanceMap?.[poolItem?.id] ?? '0'
                          : balanceRemoteMap?.[poolItem?.id] ?? '0'}
                        <span className="capitalize ml-1">
                          {poolAsset1?.balance?.denom}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {poolForm?.action === 'redeem' ? (
                  <div className="flex flex-col items-center mt-2">
                    <div className="w-full flex justify-between ">
                      <span className="text-sm">Receiver Address</span>
                      <span className="text-right text-xs">(Option)</span>
                    </div>
                    <input
                      className="w-full h-8 px-4 mb-2 text-lg text-right bg-gray-100 rounded dark:bg-gray-700 dark:text-white focus-within:outline-none"
                      value={
                        poolForm?.[
                          `${poolAsset1?.side?.toLowerCase()}Address`
                        ] || ''
                      }
                      onChange={(e) => {
                        poolStore.poolForm[
                          `${poolAsset1?.side?.toLowerCase()}Address`
                        ] = e.target.value;
                      }}
                    />
                  </div>
                ) : null}
              </div>

              {/* asset1 */}
              <div className="py-3 pl-4 pr-4 border rounded-lg dark:border-gray-600">
                <div className="flex items-center ">
                  <div className="flex items-center mr-5 text-xl font-semibold">
                    {poolAsset2?.weight}%
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold capitalize">
                        {poolAsset2?.balance?.denom}
                      </div>
                      <input
                        type="number"
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
                          ? poolAsset2?.side === 'SOURCE'
                            ? balanceMap?.[poolAsset2?.balance?.denom] ?? '0'
                            : balanceRemoteMap?.[poolAsset2?.balance?.denom] ??
                              '0'
                          : poolAsset2?.side === 'SOURCE'
                          ? balanceMap?.[poolItem?.id] ?? '0'
                          : balanceRemoteMap?.[poolItem?.id] ?? '0'}
                        <span className="capitalize ml-1">
                          {poolAsset2?.balance?.denom}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {poolForm?.action === 'redeem' ? (
                  <div className="flex flex-col items-center mt-2">
                    <div className="w-full flex justify-between ">
                      <span className="text-sm">Receiver Address</span>
                      <span className="text-right text-xs">(Option)</span>
                    </div>
                    <input
                      className="w-full h-8 px-4 mb-2 text-lg text-right bg-gray-100 rounded dark:bg-gray-700 dark:text-white focus-within:outline-none"
                      type="number"
                      placeholder=""
                      value={
                        poolForm?.[
                          `${poolAsset2?.side?.toLowerCase()}Address`
                        ] || ''
                      }
                      onChange={(e) => {
                        poolStore.poolForm[
                          `${poolAsset2?.side?.toLowerCase()}Address`
                        ] = e.target.value;
                      }}
                    />
                  </div>
                ) : null}
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
                    type="number"
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
                      ? poolStore?.poolForm?.single?.side === 'SOURCE'
                        ? balanceMap?.[poolForm?.single?.balance?.denom] ?? '0'
                        : balanceRemoteMap?.[
                            poolForm?.single?.balance?.denom
                          ] ?? '0'
                      : poolStore?.poolForm?.single?.side === 'SOURCE'
                      ? balanceMap?.[poolItem?.id] ?? '0'
                      : balanceRemoteMap?.[poolItem?.id] ?? '0'}
                    <span className="capitalize ml-1">
                      {poolForm?.single?.balance?.denom}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* footer btn */}
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
