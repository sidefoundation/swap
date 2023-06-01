import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  useChainStore,
  getChainMap,
  fetchChainCoinList,
  chainStore,
} from '@/store/chain';
import { usePoolStore, poolStore, CounterPartyType } from '@/store/pool';
import { BriefChainInfo } from '@/shared/types/chain';
import { Coin } from '@cosmjs/stargate';

export default function PoolChains({
  type = 'native',
}: {
  type: 'native' | 'remote';
}) {
  const { chainList } = useChainStore();
  const { poolFormCreate } = usePoolStore();

  return (
    <div className="dropdown mr-2">
      <label
        tabIndex={0}
        className="bg-base-200 px-4 py-2 rounded-full flex items-center cursor-pointer"
      >
        <div className="text-sm whitespace-nowrap">
          {poolFormCreate?.[type]?.chain?.name}
        </div>
        <MdKeyboardArrowDown className="ml-2" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 mt-1"
      >
        {chainList?.map((item, index) => (
          <li key={index}>
            <a
              onClick={() => {
                poolStore.poolFormCreate[type].chain = item as BriefChainInfo;
                const chainMap = getChainMap();
                if (type === 'native') {
                  const counterparty = item?.counterparties?.[0];
                  poolStore.poolFormCreate.counterParty =
                    counterparty as CounterPartyType;
                  const remoteChainId = counterparty?.chainID;
                  const remoteChain = chainMap?.[
                    remoteChainId as string
                  ] as BriefChainInfo;
                  poolStore.poolFormCreate.remote.chain = remoteChain;

                  poolStore.poolFormCreate.remote.coin = {} as Coin;
                  poolStore.poolFormCreate.native.coin = {} as Coin;

                  chainStore.chainCoinListRemote = [];
                  chainStore.chainCoinListNative = [];

                  fetchChainCoinList(item?.restUrl, 'Native');
                  fetchChainCoinList(remoteChain?.restUrl, 'Remote');
                }
                if (type === 'remote') {
                  const counterparty = item?.counterparties?.[0];
                  poolStore.poolFormCreate.counterParty =
                    counterparty as CounterPartyType;
                  const nativeChainId = counterparty?.chainID;
                  const nativeChain = chainMap?.[
                    nativeChainId as string
                  ] as BriefChainInfo;
                  poolStore.poolFormCreate.native.chain = nativeChain;

                  poolStore.poolFormCreate.remote.coin = {} as Coin;
                  poolStore.poolFormCreate.native.coin = {} as Coin;

                  chainStore.chainCoinListRemote = [];
                  chainStore.chainCoinListNative = [];

                  fetchChainCoinList(item?.restUrl, 'Remote');
                  fetchChainCoinList(nativeChain?.restUrl, 'Native');
                }
              }}
            >
              {item?.name || '--'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
