import { PoolDetails } from "@/components/PoolDetails";
import WalletLoader from "@/components/WalletLoader";
import { useGetLiquidityPools } from "@/http/query/useGetLiquidityPools";
import { ILiquidityPool } from "@/shared/types/liquidity";
import useWalletStore from "@/store/wallet";
import { Coin } from "@cosmjs/stargate";
import { useEffect, useState } from "react";
import {CoinInput} from "@/components/CoinInput"
import { MsgSwapRequest, SwapMsgType } from "@/codegen/ibc/applications/interchain_swap/v1/tx";
import Long from "long";

import WalletDetails from "@/components/WalletDetails";
import PoolDetailsList from "@/components/PoolDetailsList";
import SwapControls from "@/components/SwapControls";

const Swap = () => {
  const { wallets, setLoading, loading } = useWalletStore();
  const [pools, setPools] = useState<ILiquidityPool[]>([]);

  const getPools = (pools: ILiquidityPool[]) => setPools(pools);
  const { refetch } = useGetLiquidityPools({ onSuccess: getPools });

  useEffect(() => {
    refetch()
  }, []);

  const [swapPair, setSwapPair] = useState<{first:Coin, second:Coin}>({
    first:{denom: 'aside', amount: '0'},
    second: {denom: 'bside', amount: '0'},
  });

  const updateFirstCoin = (value:string) => setSwapPair((swapPair) => ({
    ...swapPair,
    first: {denom: "aside", amount: value},
  }));

  const updateSecondCoin = (value:string) => setSwapPair((swapPair) => ({
    ...swapPair,
    second: {denom: "bside", amount: value},
  }));

  const onSwap = async(direction:'->'| '<-') => {
    setLoading(true);
    //... rest of the code
  }

  return (
    <WalletLoader loading={loading}>
      <div className="flex flex-wrap items-center justify-around mt-6 sm:w-full">
        <WalletDetails wallets={wallets} />
        <PoolDetailsList pools={pools} />
        <SwapControls 
          swapPair={swapPair} 
          updateFirstCoin={updateFirstCoin} 
          updateSecondCoin={updateSecondCoin} 
          onSwap={onSwap} 
        />
      </div>
    </WalletLoader>
  );
};

export default Swap;
