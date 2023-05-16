import WalletLoader from "@/components/WalletLoader";
import { useGetLiquidityPools } from "@/http/query/useGetLiquidityPools";
import { ILiquidityPool } from "@/shared/types/liquidity";
import useWalletStore from "@/store/wallet";
import { Coin, StdFee } from "@cosmjs/stargate";
import { useEffect, useState } from "react";

import WalletDetails from "@/components/WalletDetails";
import PoolDetailsList from "@/components/PoolDetailsList";
import SwapControls from "@/components/SwapControls";
import { MsgSwapRequest, SwapMsgType } from "@/codegen/ibc/applications/interchain_swap/v1/tx";
import Long from "long";

const Swap = () => {
  const { wallets, setLoading, loading, getClient } = useWalletStore();
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
    setLoading(true)
    const wallet = direction === '->' ? wallets[0] : wallets[1]
    const client = await getClient(wallet!.chainInfo)
    const timeoutTimeStamp = Long.fromNumber((Date.now() + 60  * 1000)*1000000); // 1 hour from now

    try {
      
      const swapMsg:MsgSwapRequest = {
        swapType: SwapMsgType.LEFT,
        sender: wallets[0]!.address,
        tokenIn: swapPair.first,
        tokenOut: swapPair.second,
        slippage: Long.fromInt(100),
        recipient: wallet!.address, 
        timeoutHeight: {
          revisionHeight: Long.fromInt(11),
          revisionNumber: Long.fromInt(1000000000)
        },
        timeoutTimeStamp: timeoutTimeStamp
      }
      
    
      const msg = {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSwapRequest",
        value: swapMsg
      }
      
      const fee: StdFee = {
        amount: [{denom: wallet!.chainInfo.denom, amount: '0.01'}],
        gas: "200000"
      }
      
      
      const data = await client!.signWithEthermint(
        wallet!.address,
        [msg], 
        wallet!.chainInfo,
        fee,"test"
      )
      console.log("Signed data", data)
      if(data !== undefined) {
        const txHash = await client!.broadCastTx(data) 
        console.log("TxHash:", txHash)  
      }else{
        console.log("there are problem in encoding")
      }
     // await wallet!.signingClient.signAndBroadcast(wallet!.address, [msg],'auto',"test")      
    } catch (error) {
      console.log("error", error)
    }
    setLoading(false)
  }

  return (
    <WalletLoader loading={loading}>
      <WalletDetails wallets={wallets} />
      <div className="flex flex-wrap items-start justify-around gap-4 mt-6 sm:w-full">
        <PoolDetailsList pools={pools}/>
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
