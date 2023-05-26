// PoolDetailsList.tsx
import React, { useEffect, useState } from 'react';
import { ILiquidityPool } from '@/shared/types/liquidity';
import { CoinInput } from '@/components/CoinInput';
import { Coin } from '@cosmjs/stargate';
import useWalletStore, { Wallet } from '@/store/wallet';
import { AppConfig } from '@/utils/AppConfig';
import PoolModal from './PoolModal';
import PoolDetails from './PoolDetails';
import toast from 'react-hot-toast';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  MsgCreatePoolRequest,
  MsgSingleAssetDepositRequest,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';
import { StdFee } from '@cosmjs/stargate';

import {
  MdList,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAddToQueue,
  MdOutlineClose,
} from 'react-icons/md';

interface PoolDetailsListProps {
  pools: ILiquidityPool[];
}

const PoolDetailsList: React.FC<PoolDetailsListProps> = ({ pools }) => {
  const { setLoading, wallets, suggestChain, getClient, selectedChain } =
    useWalletStore();

  const [signers, setSigners] = useState<Wallet[]>([]);

  useEffect(() => {
    setSigners(wallets);
  }, [wallets]);

  const [swapPair, setSwapPair] = useState<{ first: Coin; second: Coin }>({
    first: { denom: 'aside', amount: '0' },
    second: { denom: 'bside', amount: '0' },
  });

  const [poolPair, setPoolPair] = useState({
    first: { denom: 'aside', amount: '0', weight: '0', chain: '' },
    second: { denom: 'bside', amount: '0', weight: '0', chain: '' },
  });
  const onChangeFirstWeight = (value) => {
    setPoolPair({
      ...poolPair,
      first: {
        denom: poolPair.first.denom,
        amount: poolPair.first.amount,
        weight: value,
        chain: poolPair.first.chain,
      },
      second: {
        denom: poolPair.second.denom,
        amount: poolPair.second.amount,
        weight: (100 - parseInt(value)).toString(),
        chain: poolPair.second.chain,
      },
    });
  };
  const onChangeSecondWeight = (value) => {
    setPoolPair({
      ...poolPair,
      second: {
        denom: poolPair.second.denom,
        amount: poolPair.second.amount,
        weight: value,
        chain: poolPair.second.chain,
      },
    });
  };
  const handleCoinUpdate = (type: 'first' | 'second', value: string) => {
    // setSwapPair((prevSwapPair) => ({
    //   ...prevSwapPair,
    //   [type]: { denom: type === 'first' ? 'aside' : 'bside', amount: value },
    // }));
    setPoolPair((prevPoolPair) => ({
      ...prevPoolPair,
      [type]: {
        denom: type === 'first' ? 'aside' : 'bside',
        amount: value,
        chain: poolPair[type].chain,
        weight: poolPair[type].weight,
      },
    }));
    console.log(poolPair, 'prevPoolPair')
  };

  const onCreatePool = async () => {
    console.log(poolPair, 'poolPairpoolPair')
    setLoading(true);
    const wallet = signers[0];
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now

    try {
      const client = await getClient(wallet!.chainInfo);

      const createPoolMsg: MsgCreatePoolRequest = {
        sourcePort: 'interchainswap',
        sourceChannel: 'channel-0',
        sender: wallet!.address,
        tokens: [swapPair.first, swapPair.second],
        decimals: [18, 18],
        weight: '50:50',
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000),
        },
        timeoutTimeStamp: timeoutTimeStamp,
      };

      const msg = {
        typeUrl: '/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest',
        value: createPoolMsg,
      };
      console.log(client);

      const fee: StdFee = {
        amount: [{ denom: wallet!.chainInfo.denom, amount: '0.01' }],
        gas: '200000',
      };
      console.log(createPoolMsg, 'createPoolMsg');
      console.log(fee, 'fee');
      console.log(wallet, 'wallet');
      const data = await client!.signWithEthermint(
        wallet!.address,
        [msg],
        wallet!.chainInfo,
        fee,
        'test'
      );
      console.log('Signed data', data);
      if (data !== undefined) {
        const txHash = await client!.broadCastTx(data);
        console.log('TxHash:', txHash);
      } else {
        console.log('there are problem in encoding');
      }
    } catch (error) {
      toast.error(error);

      console.log('error', error);
    }
    setLoading(false);
  };

  const onEnablePool = async (pool: ILiquidityPool) => {
    //setLoading(true)
    await suggestChain(selectedChain);

    const wallet = signers[1];
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now
    try {
      const client = await getClient(wallet!.chainInfo);
      const singleDepositMsg: MsgSingleAssetDepositRequest = {
        poolId: pool.poolId,
        sender: wallet!.address,
        token: {
          denom: wallet!.chainInfo.denom,
          amount: pool.assets.find(
            (item) => item.balance.denom == wallet!.chainInfo.denom
          )!.balance.amount,
        },
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000),
        },
        timeoutTimeStamp: timeoutTimeStamp,
      };

      const msg = {
        typeUrl:
          '/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest',
        value: singleDepositMsg,
      };
      console.log(client);

      const fee: StdFee = {
        amount: [{ denom: wallet!.chainInfo.denom, amount: '0.01' }],
        gas: '200000',
      };

      const data = await client!.signWithEthermint(
        wallet!.address,
        [msg],
        wallet!.chainInfo,
        fee,
        'test'
      );
      client?.signToMsg;
      console.log('Signed data', data);
      if (data !== undefined) {
        const txHash = await client!.broadCastTx(data);
        console.log('TxHash:', txHash);
      } else {
        console.log('there are problem in encoding');
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };
  return (
    <div>
      {/* image-header */}
      <div className="relative mt-10 h-[138px] flex items-center justify-center rounded-lg overflow-hidden bg-[url(/assets/images/maskbg.png)] bg-cover">
        <div className="text-5xl font-bold text-white">
          Scalable, Bridgeless
        </div>
      </div>

      <div className=" mt-5 overflow-x-auto bg-base-100 p-8 rounded-lg min-h-[400px] mb-10">
        {/* search filter */}
        <div className="w-full flex mb-5">
          <div className="w-full flex-1 relative">
            <MdSearch className="absolute top-1/2 -translate-y-[50%] left-2 text-2xl text-gray-300 dark:text-gray-400" />
            <input
              className="w-full flex-1 input input-bordered pl-10"
              placeholder="Search token name"
              onChange={() => {}}
            />
          </div>

          <div className="ml-4">
            <button className="btn text-2xl mr-2">
              <MdList />
            </button>

            <label htmlFor="modal-pool-create" className="btn text-2xl mr-2">
              <MdAddToQueue />
            </label>
            <label
              htmlFor="modal-create-pool"
              className="btn btn-primary text-2xl"
            >
              <MdAddToQueue />
            </label>
          </div>
        </div>
        {/* list */}
        <div className="overflow-x-auto border dark:border-none rounded-lg mb-5">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Pair / Chain</th>
                <th>Liquidity</th>
                <th>Pool Price</th>
                <th>Amount</th>
                <th>Channel</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pools.map((pool, index) => (
                <PoolDetails
                  key={index}
                  pool={pool}
                  onEnablePool={onEnablePool}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end !hidden">
          <div>
            <span className="mr-2">Rows per page: </span>
            <select
              value="10"
              className="select select-bordered select-sm max-w-xs"
              onChange={() => {}}
            >
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="mx-4">
            {'1-10'} of {'299'}
          </div>
          <div className="hover:bg-gray-100 dark:hover:bg-gray-600 px-1 py-1 rounded cursor-pointer">
            <MdKeyboardArrowLeft className="text-2xl" />
          </div>
          <div className="hover:bg-gray-100 dark:hover:bg-gray-600 px-1 py-1 rounded cursor-pointer">
            <MdKeyboardArrowRight className="text-2xl" />
          </div>
        </div>
      </div>

      {/* TODO: dialog should not in loop */}
      <input type="checkbox" id="modal-pool-create" className="modal-toggle" />
      <label className="modal cursor-pointer" htmlFor="modal-pool-create">
        <label className="modal-box relative" htmlFor="">
          <div className="">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold">Create New Pool</div>
              <label htmlFor="modal-pool-create" className="cursor-pointer">
                <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
              </label>
            </div>
            <div className="  px-4 rounded mb-3 py-1">
              {/*  ChainSelect*/}
              <div className="border mb-2 p-2">
                <span className="mr-2">selectChain:</span>
                <ul className="menu menu-horizontal px-1  ">
                  <li tabIndex={0}>
                    <a>
                      <span>{selectedChain.name}</span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="p-2 bg-base-100 z-10">
                      {AppConfig?.chains?.map((item, index) => {
                        return (
                          <li key={index}>
                            <a onClick={() => suggestChain(item)}>
                              {item?.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              {/* CoinSelect */}
              <div className="border mb-2">
                <span>selectCoin:</span>
                <ul className="menu menu-horizontal px-1  ">
                  <li tabIndex={0}>
                    <a>
                      <span>{swapPair.first?.denom}</span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="p-2 bg-base-100 z-10">
                      {AppConfig?.chains?.map((item, index) => {
                        return (
                          <li key={index}>
                            <a onClick={() => suggestChain(item)}>
                              {item?.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              {/*amount  */}
              <div className="border mb-2 flex">
                <span>amount:</span>
                <div>
                  <CoinInput
                    coin={{
                      amount: poolPair.first.amount,
                      denom: poolPair.first.denom,
                    }}
                    placeholder="Amount ..."
                    onChange={(value) => handleCoinUpdate('first', value)}
                  />
                </div>
              </div>
              {/* weight */}
              <div className="border flex">
                <span>weight:</span>
                <div>{poolPair.first.weight}</div>
              </div>
              <div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={poolPair.first.weight}
                  className="range"
                  step="10"
                  onChange={(event) => onChangeFirstWeight(event.target.value)}
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                  <span>60</span>
                  <span>70</span>
                  <span>80</span>
                </div>
              </div>
            </div>
            <div className="border items-center px-4 rounded py-1">
              {/*  ChainSelect*/}
              <div className="border mb-2 p-2">
                <span className="mr-2">selectChain:</span>
                <ul className="menu menu-horizontal px-1  ">
                  <li tabIndex={0}>
                    <a>
                      <span>{selectedChain.name}</span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="p-2 bg-base-100 z-10">
                      {AppConfig?.chains?.map((item, index) => {
                        return (
                          <li key={index}>
                            <a onClick={() => suggestChain(item)}>
                              {item?.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              {/* CoinSelect */}
              <div className="border mb-2">
                <span>selectCoin:</span>
                <ul className="menu menu-horizontal px-1  ">
                  <li tabIndex={0}>
                    <a>
                      <span>{swapPair.second?.denom}</span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="p-2 bg-base-100 z-10">
                      {AppConfig?.chains?.map((item, index) => {
                        return (
                          <li key={index}>
                            <a onClick={() => suggestChain(item)}>
                              {item?.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              {/*amount  */}
              <div className="border mb-2 flex">
                <span>amount:</span>
                <div>
                  <CoinInput
                    coin={{
                      amount: poolPair.second.amount,
                      denom: poolPair.second.denom,
                    }}
                    placeholder="Amount ..."
                    onChange={(value) => handleCoinUpdate('second', value)}
                  />
                </div>
              </div>
              {/* weight */}
              <div className="border flex">
                <span>weight:</span>
                <div>{poolPair.second.weight}</div>
              </div>
            </div>

            <div className="mt-6">
              <button
                disabled={
                  !Number(poolPair.second?.amount || 0) ||
                  !Number(poolPair.first?.amount || 0)
                }
                className="btn btn-primary w-full"
                onClick={onCreatePool}
              >
                Confirm
              </button>
            </div>
          </div>
        </label>
      </label>

      <PoolModal />
    </div>
  );
};

export default PoolDetailsList;
