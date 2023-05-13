// PoolDetailsList.tsx
import React from 'react';
import { ILiquidityPool } from "@/shared/types/liquidity";
import { PoolDetails } from "@/components/PoolDetails";

interface PoolDetailsListProps {
  pools: ILiquidityPool[];
}

const PoolDetailsList: React.FC<PoolDetailsListProps> = ({ pools }) => {
  return (
    <div className='p-4 border rounded lg:w-1/3 md:w-1/2'>
      <div className="mb-4 text-white">Pools</div>
      {pools.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <button className="mx-4 mb-2 truncate btn-outline btn-secondary btn">
            Create Pool
          </button>
        </div>
      ) : (
        <div className="grid gap-4 text-left border lg:w-1/3">
          {pools.map((pool) => <PoolDetails key={pool.poolId} pool={pool} />)}
        </div>
      )}
    </div>
  );
};

export default PoolDetailsList;
