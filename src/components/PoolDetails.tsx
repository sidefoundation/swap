import type { ILiquidityPool } from '@/shared/types/liquidity';

export type PoolDetailsProps = {
  pool: ILiquidityPool;
  onEnablePool:(pool:ILiquidityPool)=>void
};
export function PoolDetails({ pool, onEnablePool }: PoolDetailsProps) {

  return (
    <div>
      <div className="flex gap-4">
        <div>ID:</div>
        <div>{pool.poolId}</div>
      </div>
      <div>
        <div>Assets:</div>
        <div className="flex gap-4">
          {pool.assets.map((asset, key) => {
            return (
              <div key={key}>
                <div>
                  {asset.balance.amount}
                  {asset.balance.denom}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2">
      <div>PoolStatus:</div>
        {pool.status === 'POOL_STATUS_READY' && (
          <div className="text-green-500">Active</div>
        )}
        {pool.status === 'POOL_STATUS_INITIAL' && (
          <div className='flex items-center justify-between w-full'>
            <div className="text-red-500">Inactive</div>
            <button className='btn btn-primary' onClick={()=>{onEnablePool(pool)}}>Enable Pool</button>
          </div>
        )}
      </div>

    </div>
  );
}
