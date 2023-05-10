import type { ILiquidityPool } from '@/shared/types/liquidity';

export type PoolDetailsProps = {
  pool: ILiquidityPool;
};
export function PoolDetails({ pool }: PoolDetailsProps) {
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
      <div className="flex gap-4">
        <div>PoolStatus:</div>
        {pool.status === 'POOL_STATUS_READY' && (
          <div className="text-green-500">Active</div>
        )}
        {pool.status === 'POOL_STATUS_INIT' && (
          <div className="text-red-500">Inactive</div>
        )}
      </div>
    </div>
  );
}
