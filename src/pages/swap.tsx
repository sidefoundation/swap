import useWalletStore from '@/store/wallet';
import { Coin, StdFee } from '@cosmjs/stargate';
import { useState } from 'react';

import SwapControls from '@/components/SwapControls';
import {
  MsgSwapRequest,
  SwapMsgType,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';

const Swap = () => {
  const { wallets, setLoading, loading, getClient } = useWalletStore();

  const [swapPair, setSwapPair] = useState<{ first: Coin; second: Coin }>({
    first: { denom: 'aside', amount: '0' },
    second: { denom: 'bside', amount: '0' },
  });

  const updateFirstCoin = (value: string) =>
    setSwapPair((swapPair) => ({
      ...swapPair,
      first: { denom: 'aside', amount: value },
    }));

  const updateSecondCoin = (value: string) =>
    setSwapPair((swapPair) => ({
      ...swapPair,
      second: { denom: 'bside', amount: value },
    }));

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

      const data = await client!.signWithEthermint(
        wallet!.address,
        [msg],
        wallet!.chainInfo,
        fee,
        'test'
      );
      console.log('Signed data', data);
      if (data !== undefined) {
        const txHash = await client!.broadCastTx(data);
        console.log('TxHash:', txHash);
      } else {
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
      <SwapControls
        swapPair={swapPair}
        updateFirstCoin={updateFirstCoin}
        updateSecondCoin={updateSecondCoin}
        onSwap={onSwap}
      />
    </div>
  );
};

export default Swap;
