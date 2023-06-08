// PoolDetailsList.tsx
import React from 'react';
import { ILiquidityPool } from '@/shared/types/liquidity';
import useWalletStore from '@/store/wallet';
import PoolModal from './PoolModal';
import PoolDetails from './PoolDetails';
import PoolPagination from './PoolPagination';
import PoolSearch from './PoolSearch';
import toast from 'react-hot-toast';
import { MsgSingleAssetDepositRequest } from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';
import { StdFee } from '@cosmjs/stargate';
import { usePoolStore, getPoolList } from '@/store/pool';
import { useChainStore, chainStore } from '@/store/chain';
interface PoolDetailsListProps {}

const PoolDetailsList: React.FC<PoolDetailsListProps> = () => {
  const { chainCurrent } = useChainStore();
  const { setLoading, wallets, suggestChain, getClient } = useWalletStore();
  const { poolList } = usePoolStore();

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
