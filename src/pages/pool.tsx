import PoolDetailsList from '@/components/PoolDetailsList';
import { ILiquidityPool } from '@/shared/types/liquidity';
import { useGetLiquidityPools } from '@/http/query/useGetLiquidityPools';
import { useEffect, useState } from 'react';

export default function Pool() {
  const [pools, setPools] = useState<ILiquidityPool[]>([]);
  const getPools = (pools: ILiquidityPool[]) => setPools(pools);
  const { refetch } = useGetLiquidityPools({ onSuccess: getPools });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="container mx-auto">
      <PoolDetailsList pools={pools} />
    </div>
  );
}
