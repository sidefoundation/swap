// PoolDetailsList.tsx
import React from 'react';
import { ILiquidityPool } from '@/shared/types/liquidity';
import useWalletStore from '@/store/wallet';
import PoolModal from './PoolModal';
import PoolDetails from './PoolDetails';
import PoolPagination from './PoolPagination';
import PoolSearch from './PoolSearch';
import toast from 'react-hot-toast';
import {
  MsgSingleAssetDepositRequest,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';
import { StdFee } from '@cosmjs/stargate';
import { usePoolStore,getPoolList } from '@/store/pool';
import { useChainStore, chainStore } from '@/store/chain';
interface PoolDetailsListProps {}

const PoolDetailsList: React.FC<PoolDetailsListProps> = () => {
  const {chainCurrent}=useChainStore()
  const { setLoading, wallets, suggestChain, getClient } =
    useWalletStore();
  const { poolList } = usePoolStore();

  const onEnablePool = async (pool: ILiquidityPool) => {
    if (chainCurrent.chainID === pool.creatorChainId) {
      toast.error('Please select counter party chain');
      return;
    }
    //setLoading(true)
    await suggestChain(chainStore.chainCurrent);

    const wallet = wallets.find(
      (wallet) => wallet.chainInfo.chainID === chainCurrent.chainID
    );

    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now
    try {
      const client = await getClient(wallet!.chainInfo);
      console.log(
        'here',
        pool.assets.find((item) => item.side == 'NATIVE')!.balance
      );

      const singleDepositMsg: MsgSingleAssetDepositRequest = {
        poolId: pool.poolId,
        sender: wallet!.address,
        token: pool.assets.find((item) => item.side == 'NATIVE')!.balance,
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
      if (data !== undefined) {
        const txHash = await client!.broadCastTx(data);
        console.log('TxHash:', txHash);
        getPoolList(chainStore.chainCurrent.restUrl)
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
        <PoolSearch />
        {/* list */}
        <div className="mb-5 overflow-x-auto border rounded-lg dark:border-none">
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
              {poolList.map((pool: any, index) => (
                <PoolDetails
                  keyIndex={index}
                  key={index}
                  pool={pool}
                  onEnablePool={onEnablePool}
                />
              ))}
            </tbody>
          </table>
          {poolList?.length === 0 ? (
            <div className="text-center py-20">
              <div className="m-4">No Data</div>
            </div>
          ) : null}
        </div>
        {/* pagination */}
        <PoolPagination />
      </div>
      <PoolModal />
    </div>
  );
};

export default PoolDetailsList;
