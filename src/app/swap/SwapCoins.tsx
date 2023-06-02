import React, { useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { swapStore, useSwapStore, updateCoinDenom } from '@/store/swap';
import { useChainStore } from '@/store/chain';

import { usePoolNativeList, usePoolRemoteListByNative } from '@/store/pool';

export default function SwapCoins({
  type = 'native',
}: {
  type: 'native' | 'remote';
}) {
  const { chainCurrent } = useChainStore();
  const { swapPair } = useSwapStore();
  const { nativeList } = usePoolNativeList();
  const { remoteList } = usePoolRemoteListByNative();
  const swapCoinList = type === 'native' ? nativeList : remoteList;
  useEffect(() => {
    swapStore.swapPair.native.denom = '';
    swapStore.swapPair.remote.denom = '';
  }, [chainCurrent]);

  useEffect(() => {
    if (nativeList.length && !swapPair.native.denom) {
      swapStore.swapPair.native.denom = nativeList[0]?.balance?.denom;
    }
  }, [nativeList]);
  useEffect(() => {
    if (remoteList.length && !swapPair.remote.denom) {
      swapStore.swapPair.remote.denom = remoteList[0]?.balance?.denom;
    }
  }, [remoteList]);

  return (
    <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <a>
            <span> {swapPair[type]?.denom || '--'}</span>
            <MdKeyboardArrowDown className="fill-current" />
          </a>
          <ul className="p-2 bg-base-100 z-10">
            {swapCoinList?.map((item: any, index: number) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => {
                      updateCoinDenom(item?.balance?.denom, type);
                      // swapStore.swapPair[type].denom = item?.balance?.denom
                    }}
                  >
                    {item?.balance?.denom || '--'}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
