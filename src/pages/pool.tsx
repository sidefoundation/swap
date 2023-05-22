import useWalletStore from '@/store/wallet';
import PoolDetailsList from '@/components/PoolDetailsList';
import { ILiquidityPool } from '@/shared/types/liquidity';
import { useGetLiquidityPools } from '@/http/query/useGetLiquidityPools';
import React, { useEffect, useState } from 'react';

export default function Pool() {
  const { selectedChain } = useWalletStore();
  const [pools, setPools] = useState<ILiquidityPool[]>([]);
  const getPools = (pools: ILiquidityPool[]) => setPools(pools);
  const { refetch } = useGetLiquidityPools({
    restUrl: selectedChain.restUrl,
    onSuccess: getPools,
  });

  useEffect(() => {
    refetch();
  }, []);
  
  useEffect(() => {
    refetch();
  }, [selectedChain]);

  return (
    <div className="container mx-auto">
      <PoolDetailsList pools={pools} />
    </div>
  );
}
