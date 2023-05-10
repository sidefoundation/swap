import { useEffect, useState } from 'react';

import { PoolDetails } from '@/components/PoolDetails';
import { useGetLiquidityPools } from '@/http/query/useGetLiquidityPools';
import { Meta } from '@/layouts/Meta';
import type { ILiquidityPool } from '@/shared/types/liquidity';
import { Main } from '@/templates/Main';

const Index = () => {
  const [liquidityPools, setLiquidityPools] = useState<ILiquidityPool[]>([]);
  const onGetLiquidityPools = (pools: ILiquidityPool[]) => {
    console.log('data=>', pools);
    setLiquidityPools(pools);
  };
  const { refetch } = useGetLiquidityPools({ onSuccess: onGetLiquidityPools });
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Main meta={<Meta title="ibcswap" description="swap ui for sidechain" />}>
      {liquidityPools.map((pool, index) => {
        return (
          <div key={index}>
            <PoolDetails pool={pool}></PoolDetails>
          </div>
        );
      })}
    </Main>
  );
};

export default Index;
