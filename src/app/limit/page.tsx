'use client';

import useWalletStore from '@/store/wallet';
import toast from 'react-hot-toast';
import { Coin, StdFee } from '@cosmjs/stargate';
import React, { useEffect, useState } from 'react';

import LimitControls from './LimitControls';
import {
  MsgSwapRequest,
  SwapMsgType,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';
import { useGetLiquidityPools } from '@/http/query/useGetLiquidityPools';
import { ILiquidityPool } from '@/shared/types/liquidity';
import fetchTxs from '@/http/requests/get/fetchTxs';

const Swap = () => {
  const { wallets, setLoading, loading, getClient, selectedChain, getBalance } =
    useWalletStore();

  const [pools, setPools] = useState<ILiquidityPool[]>([]);

  const getPools = (pools: ILiquidityPool[]) => {
    // setPools(pools);
    setSwapPair((swapPair) => ({
      ...swapPair,
      first: {
        denom: '',
        amount: '0',
      },
      second: {
        denom: '',
        amount: '0',
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
    type: string;
  }>({
    first: {
      denom: '',
      amount: '0',
    },
    second: {
      denom: '',
      amount: '0',
    },
    type: 'swap',
  });

  useEffect(() => {
    // refetch();
  }, [loading, selectedChain]);

  const onSwap = async (direction: '->' | '<-') => {
    setLoading(true);
    const wallet = direction === '->' ? wallets[0] : wallets[1];
    const client = await getClient(wallet!.chainInfo);
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now

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

      const msg = {
        typeUrl: '/ibc.applications.interchain_swap.v1.MsgSwapRequest',
        value: swapMsg,
      };

      const fee: StdFee = {
        amount: [{ denom: wallet!.chainInfo.denom, amount: '0.01' }],
        gas: '200000',
      };
      const toastItem = toast.loading('Swap in progress');
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
        if (`${result?.code}` !== '0') {
          console.log(result.raw_log, 'raw_log');
          toast.error(result.raw_log, {
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
        toast.error('there are problem in encoding');
        console.log('there are problem in encoding');
      }
      // await wallet!.signingClient.signAndBroadcast(wallet!.address, [msg],'auto',"test")
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <LimitControls swapPair={swapPair} setSwapPair={setSwapPair} />
    </div>
  );
};

export default Swap;
