'use client';

import useWalletStore from '@/store/wallet';
import { Coin, StdFee } from '@cosmjs/stargate';
import React, { useEffect, useState } from 'react';
import { Wallet } from '@/shared/types/wallet';
import toast from 'react-hot-toast';
import {
  MsgSwapRequest,
  SwapMsgType,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';
import { getPoolId, MarketMaker } from '@/utils/swap';
import { useGetLiquidityPools } from '@/http/query/useGetLiquidityPools';
import { ILiquidityPool } from '@/shared/types/liquidity';
import fetchTxs from '@/http/requests/get/fetchTxs';
import SwapControls from './SwapControls';

const Swap = () => {
  const { wallets, setLoading, loading, getClient, selectedChain, getBalance } =
    useWalletStore();

  const [pools, setPools] = useState<ILiquidityPool[]>([]);

  const getPools = (pools: ILiquidityPool[]) => {
    setPools(pools);
    setSwapPair((swapPair) => ({
      ...swapPair,
      first: {
        denom:
          pools[0]?.assets?.find((asset) => {
            return asset.side === 'NATIVE';
          })?.balance?.denom || '',
        amount: swapPair.first.amount,
      },
      second: {
        denom:
          pools[0]?.assets?.find((asset) => {
            return asset.side === 'REMOTE';
          })?.balance?.denom || '',
        amount: swapPair.second.amount,
      },
    }));
  };
  const { refetch } = useGetLiquidityPools({
    restUrl: selectedChain.restUrl,
    onSuccess: getPools,
  });
  const [swapPair, setSwapPair] = useState<{
    first: Coin;
    second: Coin;
  }>({
    first: {
      denom: '',
      amount: '0',
    },
    second: {
      denom: '',
      amount: '0',
    },
  });

  useEffect(() => {
    refetch();
  }, [loading, selectedChain]);

  const updateFirstCoin = (value: string) => {
    const poolId = getPoolId([swapPair.first.denom, swapPair.second.denom]);
    const pool = pools.find((pool) => pool.poolId == poolId);
    const tokenIn: Coin = { denom: swapPair.first.denom, amount: value };
    const market = new MarketMaker(pool!, 300);
    const estimate = market.leftSwap(tokenIn, swapPair.second.denom);

    setSwapPair((swapPair) => ({
      ...swapPair,
      first: { denom: swapPair.first.denom, amount: value },
      second: estimate,
    }));
  };

  const updateSecondCoin = (value: string) => {
    const poolId = getPoolId([swapPair.first.denom, swapPair.second.denom]);
    const pool = pools.find((pool) => pool.poolId == poolId);
    const tokenIn: Coin = { denom: swapPair.second.denom, amount: value };
    const market = new MarketMaker(pool!, 300);
    const estimate = market.leftSwap(tokenIn, swapPair.first.denom);

    setSwapPair((swapPair) => ({
      ...swapPair,
      first: estimate,
      second: { denom: swapPair.second.denom, amount: value },
    }));
  };

  const onSwap = async () => {
    setLoading(true);
    const wallet = wallets.find((item: Wallet) => {
      if (item.chainInfo?.chainID === selectedChain.chainID) {
        return item;
      }
    });
    const client = await getClient(wallet!.chainInfo);
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now
    const toastItem = toast.loading('Swap in progress');
    try {
      const swapMsg: MsgSwapRequest = {
        swapType: SwapMsgType.LEFT,
        sender: wallets[0]!.address,
        tokenIn: swapPair.first,
        tokenOut: swapPair.second,
        slippage: Long.fromInt(100),
        recipient: wallet!.address,
        timeoutHeight: {
          revisionHeight: Long.fromInt(11),
          revisionNumber: Long.fromInt(1000000000),
        },
        timeoutTimeStamp: timeoutTimeStamp,
      };
      console.log(swapMsg, 'swapMsg');
      const msg = {
        typeUrl: '/ibc.applications.interchain_swap.v1.MsgSwapRequest',
        value: swapMsg,
      };

      const fee: StdFee = {
        amount: [{ denom: wallet!.chainInfo.denom, amount: '0.01' }],
        gas: '200000',
      };

      const data = await client!.signWithEthermint(
        wallet!.address,
        [msg],
        wallet!.chainInfo,
        fee,
        'test'
      );
      if (data !== undefined) {
        const txHash = await client!.broadCastTx(data);
        const result = await fetchTxs(selectedChain.restUrl, txHash).catch(
          (e) => {
            toast.error(e.message, {
              id: toastItem,
            });
          }
        );
        console.log(result, 'result');
        const tx_result =
          result?.tx_response || result?.txs?.[0]?.tx_result || result;
        if (`${tx_result?.code}` !== '0') {
          console.log(tx_result?.log || tx_result?.raw_log, 'raw_log');
          toast.error(tx_result?.log || tx_result?.raw_log, {
            id: toastItem,
          });
        } else {
          toast.success('Swap Success', {
            id: toastItem,
          });
          // TODO: refresh
          getBalance();
        }
      } else {
        toast.error('error', {
          id: toastItem,
        });
      }
      // await wallet!.signingClient.signAndBroadcast(wallet!.address, [msg],'auto',"test")
    } catch (error) {
      toast.error(error, {
        id: toastItem,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <SwapControls
        pools={pools}
        swapPair={swapPair}
        setSwapPair={setSwapPair}
        updateFirstCoin={updateFirstCoin}
        updateSecondCoin={updateSecondCoin}
        onSwap={onSwap}
      />
    </div>
  );
};

export default Swap;
