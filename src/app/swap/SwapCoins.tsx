import React, { useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  swapStore,
  useSwapStore,
  updateCoinDenom,
} from '@/store/swap';
import { usePoolNativeList, usePoolRemoteListByNative } from '@/store/pool';

export default function SwapCoins({
  type = 'native',
}: {
  type: 'native' | 'remote';
}) {
  const { swapPair } = useSwapStore();
  const { nativeList } = usePoolNativeList();
  const { remoteList } = usePoolRemoteListByNative();
  const swapCoinList = type === 'native' ? nativeList : remoteList;

  useEffect(() => {
    if (nativeList.length) {
      swapStore.swapPair.native.denom = nativeList[0]?.balance?.denom;
    }
  }, [nativeList]);

  useEffect(() => {
    if (remoteList.length) {
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
                    onClick={() => updateCoinDenom(item?.balance?.denom, type)}
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
