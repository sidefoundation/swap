// PoolDetailsList.tsx
import React, { useEffect, useState } from 'react';
import { ILiquidityPool } from "@/shared/types/liquidity";
import { PoolDetails } from "@/components/PoolDetails";
import { CoinInput } from './CoinInput';
import { Coin } from '@cosmjs/stargate';
import useWalletStore, { Wallet } from '@/store/wallet';

import { MsgCreatePoolRequest, MsgSingleAssetDepositRequest } from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';
import wallet from '@/store/wallet';
import {StdFee} from "@cosmjs/stargate"
import { AppConfig } from '@/utils/AppConfig';

interface PoolDetailsListProps {
  pools: ILiquidityPool[];
}

const PoolDetailsList: React.FC<PoolDetailsListProps> = ({ pools }) => {

  const {setLoading, wallets,suggestChain, getClient} = useWalletStore()
  
  const [signers, setSigners] = useState<Wallet[]>([])

  useEffect(()=>{
    setSigners(wallets)
  },[wallets])
  
  const [swapPair, setSwapPair] = useState<{first:Coin, second:Coin}>({
    first:{denom: 'aside', amount: '0'},
    second: {denom: 'bside', amount: '0'},
  });

  const handleCoinUpdate = (type: 'first' | 'second', value: string) => {
    setSwapPair(prevSwapPair => ({
      ...prevSwapPair,
      [type]: {denom: type === 'first' ? 'aside' : 'bside', amount: value},
    }));
  };
  
 

  const onCreatePool = async() => {
    setLoading(true)
    const wallet = signers[0]
    const timeoutTimeStamp = Long.fromNumber((Date.now() + 60  * 1000)*1000000); // 1 hour from now

    try {
  
      const client = await getClient(wallet!.chainInfo)
      
      const createPoolMsg:MsgCreatePoolRequest = {
        sourcePort: 'interchainswap',
        sourceChannel: 'channel-0',
        sender: wallet!.address,
        tokens: [swapPair.first, swapPair.second],
        decimals: [18,18],
        weight: "50:50",
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000)
        },
        timeoutTimeStamp: timeoutTimeStamp
      }
      
      
    
      const msg = {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest",
        value: createPoolMsg
      }
      console.log(client)

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
     
    } catch (error) {
      console.log("error", error)
    }
    setLoading(false)
  }

  const onEnablePool = async(pool: ILiquidityPool)=> {
    //setLoading(true)
    await suggestChain(AppConfig.chains[1]!)
    
    const wallet = signers[1]
    const timeoutTimeStamp = Long.fromNumber((Date.now() + 60  * 1000)*1000000); // 1 hour from now
    try {
      
      const client = await getClient(wallet!.chainInfo)
      const singleDepositMsg:MsgSingleAssetDepositRequest = {
        poolId: pool.poolId,
        sender: wallet!.address,
        token: {
          denom: wallet!.chainInfo.denom, 
          amount: pool.assets.find((item)=>item.balance.denom == wallet!.chainInfo.denom)!.balance.amount
        },
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000)
        },
        timeoutTimeStamp: timeoutTimeStamp
      }
      
      const msg = {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest",
        value: singleDepositMsg
      }
      console.log(client)

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
      client?.signToMsg
      console.log("Signed data", data)
      if(data !== undefined) {
        const txHash = await client!.broadCastTx(data) 
        console.log("TxHash:", txHash)  
      }else{
        console.log("there are problem in encoding")
      }
    } catch (error) {
      console.log("error", error)
    }
    setLoading(false)
  }
  return (
    <div className='flex flex-col justify-center p-4 border rounded'>
      <div className="mb-4 text-white">Pools</div>
      {pools.length === 0 ? (
        <div className="grid items-center justify-center h-full gap-4">
          <CoinInput coin={swapPair.first} placeholder="Amount ..."  onChange={(value) => handleCoinUpdate('first', value)} />
          <CoinInput coin={swapPair.second} placeholder="Amount ..." onChange={(value) => handleCoinUpdate('second', value)} />

          <button
            className="flex-grow mt-4 text-2xl font-semibold rounded-full md:mt-0 btn btn-primary btn-lg hover:text-base-100"
            onClick={onCreatePool}
          >
            Create Pool
          </button>
        </div>
      ) : (
        <div className="grid gap-4 text-left">
          {pools.map((pool) => <PoolDetails key={pool.poolId} pool={pool} onEnablePool={onEnablePool} />)}
        </div>
      )}
    </div>
  );
};

export default PoolDetailsList;
