import type { ILiquidityPool } from '@/shared/types/liquidity';
import useWalletStore from '@/store/wallet';
import { useState } from 'react';
import { CoinInput } from './CoinInput';
import { Coin, StdFee } from '@cosmjs/stargate';
import Long from 'long';
import { LocalDeposit, MsgMultiAssetDepositRequest, MsgMultiAssetWithdrawRequest, MsgSingleAssetDepositRequest, MsgSingleAssetWithdrawRequest, RemoteDeposit } from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import fetchAccount from '@/http/requests/get/fetchAccount';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { MarketMaker } from '@/utils/swap';


export type PoolDetailsProps = {
  pool: ILiquidityPool;
  onEnablePool:(pool:ILiquidityPool)=>void
};
export function PoolDetails({ pool, onEnablePool }: PoolDetailsProps) {
  const {wallets,getClient,setLoading} = useWalletStore()

  const [depositCoin, setDepositCoin] = useState<Map<string,Coin>>();
  const market = new MarketMaker(pool,300)  
  const onSingleDeposit = async(denom: string) => {
    
    const wallet = wallets.find((wallet)=>wallet.chainInfo.denom === denom)
    if(wallet === undefined) {
      return
    }
 
    const deposit = depositCoin?.get(denom) 
  
    if(deposit === undefined || +deposit.amount === 0) {
      console.log("deposit amount", deposit)
      console.log("denom=>", denom)
      return 
    }
    setLoading(true)
    const timeoutTimeStamp = Long.fromNumber((Date.now() + 60  * 1000)*1000000); // 1 hour from now
    try {
      
      const client = await getClient(wallet!.chainInfo)
      const singleDepositMsg:MsgSingleAssetDepositRequest = {
        poolId: pool.poolId,
        sender: wallet!.address,
        token: deposit,
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

  const onDoubleDeposit = async(localDenom: string, remoteDenom:string) => {
    
    const wallet = wallets.find((wallet)=>wallet.chainInfo.denom === localDenom)
    const remoteWallet = wallets.find((item)=>item.chainInfo.denom ===remoteDenom)
 
   
    if(wallet === undefined || remoteWallet === undefined) {
      return
    }

    const localDepositCoin = depositCoin?.get(localDenom) 
    const remoteDepositCoin = depositCoin?.get(remoteDenom)       
    if(localDepositCoin === undefined || remoteDepositCoin === undefined) {
      return
    } 

    const ratio = market.getRatio(remoteDenom, localDenom)
    const slippage = Math.abs((ratio - (+remoteDepositCoin.amount)/(+localDepositCoin.amount))/ratio) * 100
    console.log(slippage)
    if (slippage > 5) { 
      setDepositCoin(prev =>{
        const newPrev =  new Map(prev)
        const newAmount = Math.floor((newPrev?.get(localDenom)?.amount.parseToFloat() ?? 0)*ratio)
        const newValue:Coin = {denom: remoteDenom, amount: `${newAmount}`}
        newPrev?.set(remoteDenom,newValue)
        return newPrev
      })
      alert("Your original input incorrect in ratio. Pleas try with current pair!")
      return 
    }

    const timeoutTimeStamp = Long.fromNumber((Date.now() + 60  * 1000)*1000000); // 1 hour from now
    try {
      
      const client = await getClient(wallet!.chainInfo)

      const localDepositMsg:LocalDeposit =  {
        sender: wallet.address,
        token: localDepositCoin
      }

    
      const acc = await fetchAccount(remoteWallet.chainInfo.restUrl, wallet.address)
      
      const remoteDepositSignMsg = {
        sender: remoteWallet.address,
        token: remoteDepositCoin,
        sequence: Long.fromInt(+acc.base_account.sequence)
        
      }
      const encoder = new TextEncoder(); 
      const remoteClient = await getClient(remoteWallet.chainInfo)
      const rawRemoteDepositMsg = encoder.encode(JSON.stringify(remoteDepositSignMsg))
      const sig = await remoteClient!.signToMsg(remoteWallet.address,rawRemoteDepositMsg,remoteWallet.chainInfo)
      
  
      const signUint8Array = encoder.encode(sig); // encode the string
      const remoteDepositMsg:RemoteDeposit = {... remoteDepositSignMsg, signature: signUint8Array};

      console.log("Remote deposit sign",remoteDepositMsg)
      

      
      const multiDepositMsg: MsgMultiAssetDepositRequest = {
        poolId: pool.poolId,
        localDeposit: localDepositMsg,
        remoteDeposit: remoteDepositMsg,
        
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000)
        },
        timeoutTimeStamp: timeoutTimeStamp
      }
      
      const msg = {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgMultiAssetDepositRequest",
        value: multiDepositMsg
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


  const onSingleWithdraw = async(denom: string) => {
    
    const wallet = wallets.find((wallet)=>wallet.chainInfo.denom === denom)
    if(wallet === undefined) {
      return
    }

    const deposit = depositCoin?.get(denom) 
  
    if(deposit === undefined || +deposit.amount === 0) {
      console.log("deposit amount", deposit)
      console.log("denom=>", denom)
      return 
    }

    setLoading(true)
    const timeoutTimeStamp = Long.fromNumber((Date.now() + 60  * 1000)*1000000); // 1 hour from now
    try {
      
      const client = await getClient(wallet!.chainInfo)
      const singleWithdrawMsg:MsgSingleAssetWithdrawRequest = {
        sender: wallet!.address,
        poolCoin: { denom: pool.poolId, amount: deposit.amount },
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000)
        },
        timeoutTimeStamp: timeoutTimeStamp,
        denomOut: ''
      }
      
      const msg = {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSingleAssetWithdrawRequest",
        value: singleWithdrawMsg
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

  const onDoubleWithdraw = async(localDenom: string, remoteDenom:string) => {
    
    const wallet = wallets.find((wallet)=>wallet.chainInfo.denom === localDenom)
    const remoteWallet = wallets.find((item)=>item.chainInfo.denom ===remoteDenom)
    const localDepositCoin = depositCoin?.get(localDenom) 
    const remoteDepositCoin = depositCoin?.get(remoteDenom)
      
    console.log(wallet,remoteWallet,localDepositCoin,remoteDepositCoin)
    if(wallet === undefined || remoteWallet === undefined) {
      return
    }

    if(localDepositCoin === undefined || remoteDepositCoin === undefined) {
      return
    } 

    const ratio = market.getRatio(remoteDenom, localDenom)
    const slippage = Math.abs((ratio - (+remoteDepositCoin.amount)/(+localDepositCoin.amount))/ratio) * 100
    console.log(slippage)
    
    if (slippage > 5) { 
      setDepositCoin(prev =>{
        const newPrev =  new Map(prev)
        const newAmount = Math.floor((newPrev?.get(localDenom)?.amount.parseToFloat() ?? 0)*ratio)
        const newValue:Coin = {denom: remoteDenom, amount: `${newAmount}`}
        newPrev?.set(remoteDenom,newValue)
        return newPrev
      })
      alert("Your original input incorrect in ratio. Pleas try with current pair!")
      return 
    }

    const timeoutTimeStamp = Long.fromNumber((Date.now() + 60  * 1000)*1000000); // 1 hour from now
    try {
      
      const client = await getClient(wallet!.chainInfo)

      const localWithdrawMsg:MsgSingleAssetWithdrawRequest =  {
        sender: wallet.address,
        denomOut: localDenom,
        poolCoin: {denom: pool.poolId, amount: localDepositCoin.amount}
      }

      const remoteWithdrawMsg:MsgSingleAssetWithdrawRequest =  {
        sender: remoteWallet.address,
        denomOut: remoteDenom,
        poolCoin: {denom: pool.poolId, amount: remoteDepositCoin.amount}
      }

      
      const multiWithdrawtMsg: MsgMultiAssetWithdrawRequest = {

        localWithdraw: localWithdrawMsg,
        remoteWithdraw: remoteWithdrawMsg,
        
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000)
        },
        timeoutTimeStamp: timeoutTimeStamp
      }
      
      const msg = {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgMultiAssetWithdrawRequest",
        value: multiWithdrawtMsg
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


  return (
    <div className='flex flex-col justify-center'>
      <div className="flex justify-center w-full gap-4">
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

      <div className='grid justify-between w-full gap-4 mt-6'>
      {pool.status === 'POOL_STATUS_READY' && (
          <div className='flex justify-between gap-4'>{pool.assets.map((asset)=>{
            return<div className='ml-4'>
                  <button className='btn btn-primary' onClick={()=>onSingleDeposit(asset.balance.denom)}>Deposit "{asset.balance.denom}"</button>
                </div>
            })
          }<button className='btn btn-primary' onClick={()=>onDoubleDeposit("aside","bside")}>Multi-Deposit</button></div>
        )}

<div className='flex items-center justify-center gap-4 mt-4'>
      {pool.assets.map((item, index) => {
        return (
          <CoinInput 
          key={index}
          placeholder='Amount ...' 
          coin={{
            denom: item.balance.denom, 
            amount: depositCoin?.get(item.balance.denom)?.amount ?? "0"
          }} 
          onChange={(coin) => {
            setDepositCoin(prevDepositCoin => {
              // Create a new Map object
              const newDepositCoin = new Map(prevDepositCoin);
              newDepositCoin.set(item.balance.denom, {denom: item.balance.denom, amount: coin});
              return newDepositCoin; 
            });
          }}
        />
        
      )
      })}
    </div>
    {pool.status === 'POOL_STATUS_READY' && (
          <div className='flex justify-between gap-4'>{pool.assets.map((asset)=>{
            return<div className='ml-4'>
                  <button className='btn btn-primary' onClick={()=>onSingleWithdraw(asset.balance.denom)}>Withdraw "{asset.balance.denom}"</button>
                </div>
            })
          }<button className='btn btn-primary' onClick={()=>onDoubleWithdraw("aside","bside")}>Multi-Withdraw</button></div>
        )}
      </div>
    </div>
  );
}
