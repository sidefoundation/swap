import React, { useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useChainStore } from '@/store/chain';
import { usePoolStore, poolStore } from '@/store/pool';
import { Coin } from '@cosmjs/stargate';

export default function PoolCoins({
  type = 'native',
}: {
  type: 'native' | 'remote';
}) {
  const { chainCoinListNative, chainCoinListRemote } = useChainStore();

  const chainCoinList =
    type === 'native' ? chainCoinListNative : chainCoinListRemote;

  const { poolFormCreate } = usePoolStore();

  useEffect(() => {
    if (!poolFormCreate?.[type]?.coin?.denom && chainCoinList?.length > 0) {
      poolStore.poolFormCreate[type].coin = chainCoinList?.[0] as Coin;
    }
  }, [chainCoinList, poolFormCreate?.[type]?.coin?.denom]);

  return (
    <div className="dropdown mr-2">
      <label
        tabIndex={0}
        className="bg-base-200 px-4 py-2 rounded-full flex items-center cursor-pointer"
      >
        <div className="text-sm whitespace-nowrap capitalize">
          {poolFormCreate?.[type]?.coin?.denom || '--'}
        </div>
        <MdKeyboardArrowDown className="ml-2" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 mt-1"
      >
        {chainCoinList?.map((item, index) => {
          if (item?.denom?.length > 10) {
            return null;
          }
          return (
            <li key={index}>
              <a
                onClick={() => {
                  poolStore.poolFormCreate[type].coin = item;
                }}
                className=" capitalize"
              >
                {item?.denom || '--'}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
