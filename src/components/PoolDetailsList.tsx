// PoolDetailsList.tsx
import React, { useEffect, useState } from 'react';
import { ILiquidityPool } from '@/shared/types/liquidity';
import { PoolDetails } from '@/components/PoolDetails';
import { CoinInput } from './CoinInput';
import { Coin } from '@cosmjs/stargate';
import useWalletStore, { Wallet } from '@/store/wallet';

import {
  MsgCreatePoolRequest,
  MsgSingleAssetDepositRequest,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';
import { StdFee } from '@cosmjs/stargate';
import { AppConfig } from '@/utils/AppConfig';

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
  const { setLoading, wallets, suggestChain, getClient } = useWalletStore();

  const [signers, setSigners] = useState<Wallet[]>([]);

  useEffect(() => {
    setSigners(wallets);
  }, [wallets]);

  const [swapPair, setSwapPair] = useState<{ first: Coin; second: Coin }>({
    first: { denom: 'aside', amount: '0' },
    second: { denom: 'bside', amount: '0' },
  });

  const handleCoinUpdate = (type: 'first' | 'second', value: string) => {
    setSwapPair((prevSwapPair) => ({
      ...prevSwapPair,
      [type]: { denom: type === 'first' ? 'aside' : 'bside', amount: value },
    }));
  };

  const onCreatePool = async () => {
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
      console.log('error', error);
    }
    setLoading(false);
  };

  const onEnablePool = async (pool: ILiquidityPool) => {
    //setLoading(true)
    await suggestChain(AppConfig.chains[1]!);

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
      <div className="relative mt-10 h-[138px] flex items-center justify-center rounded-lg overflow-hidden bg-[url(/assets/images/maskbg.png)] bg-cover">
        <div className="text-5xl font-bold text-white">
          Scalable, Bridgeless
        </div>
      </div>
      <div className=" mt-5 overflow-x-auto bg-base-100 p-8 rounded-lg min-h-[400px] mb-10">
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

            <label htmlFor="modal-pool-create" className="btn text-2xl">
              <MdAddToQueue />
            </label>
          </div>
        </div>
        <div className="overflow-x-auto border dark:border-none rounded-lg mb-5">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Pair / Chain</th>
                <th>Liquidity</th>
                <th>Pool Price</th>
                <th>Amount</th>
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

        <div className="flex items-center justify-end">
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
            <div className="bg-base-200 flex items-center px-4 rounded mb-3 py-1">
              <div className="capitalize font-semibold text-base">
                {swapPair.first?.denom}
              </div>
              <CoinInput
                coin={swapPair.first}
                placeholder="Amount ..."
                onChange={(value) => handleCoinUpdate('first', value)}
              />
            </div>
            <div className="bg-base-200 flex items-center px-4 rounded py-1">
              <div className="capitalize font-semibold text-base">
                {swapPair.second?.denom}
              </div>
              <CoinInput
                coin={swapPair.second}
                placeholder="Amount ..."
                onChange={(value) => handleCoinUpdate('second', value)}
              />
            </div>

            <div className="mt-6">
              <button
                disabled={
                  !Number(swapPair.second?.amount || 0) ||
                  !Number(swapPair.first?.amount || 0)
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
    </div>
  );
};

export default PoolDetailsList;
