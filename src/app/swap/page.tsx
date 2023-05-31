'use client';

import toast from 'react-hot-toast';

import React, { useEffect, useState } from 'react';

import {
  MsgSwapRequest,
  SwapMsgType,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';

import { useChainStore } from '@/store/chain';
import { getBalanceList } from '@/store/assets';
import useWalletStore from '@/store/wallet';
import { useSwapStore, swapStore } from '@/store/swap';
import { getPoolList, usePoolStore,usePoolNativeList,usePoolRemoteListByNative } from '@/store/pool';

import Long from 'long';
import fetchTxs from '@/http/requests/get/fetchTxs';
import { StdFee } from '@cosmjs/stargate';
import { Wallet } from '@/shared/types/wallet';

import SwapControls from './SwapControls';

const Swap = () => {
  const { chainCurrent } = useChainStore();
  const { poolList } = usePoolStore();
  const { swapPair } = useSwapStore();
  const { wallets, setLoading, loading, getClient } = useWalletStore();
  const {nativeList} = usePoolNativeList()
  const {remoteList} = usePoolRemoteListByNative()

  useEffect(() => {
    // initData();
  }, []);

  useEffect(() => {
    initData();
    console.log(poolList, 'poolList');
  }, [loading, chainCurrent]);

  const initData = async () => {
    if (chainCurrent?.restUrl) {
      await getPoolList(chainCurrent?.restUrl);

      (swapStore.swapPair.native.denom =
        poolList[0]?.assets?.find((asset) => {
          return asset.side === 'NATIVE';
        })?.balance?.denom || ''),
        (swapStore.swapPair.remote.denom =
          poolList[0]?.assets?.find((asset) => {
            return asset.side === 'REMOTE';
          })?.balance?.denom || ''),
        console.log(poolList, 'poolList');
    }
  };

  const onSwap = async () => {
    setLoading(true);
    const wallet = wallets.find((item: Wallet) => {
      if (item.chainInfo?.chainID === chainCurrent.chainID) {
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
        tokenIn: swapPair.native,
        tokenOut: swapPair.remote,
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
        const result = await fetchTxs(chainCurrent.restUrl, txHash).catch(
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
          getBalanceList(chainCurrent?.restUrl, wallet!.address);
          // getBalance();
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
      <SwapControls onSwap={onSwap} />
    </div>
  );
};

export default Swap;
