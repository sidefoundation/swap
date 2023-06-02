import { proxy, useSnapshot } from 'valtio';
import { Coin } from '@cosmjs/stargate';
import { getPoolId, MarketMaker } from '@/utils/swap';
import { ILiquidityPool } from '@/shared/types/liquidity';
import { Wallet } from './wallet';
import Long from 'long';
import { chainStore } from '@/store/chain';
import { toast } from 'react-hot-toast';
import { StdFee } from '@cosmjs/stargate';
import fetchTxs from '@/http/requests/get/fetchTxs';
import { getBalanceList } from '@/store/assets';
import {
  MsgSwapRequest,
  SwapMsgType,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
type Store = {
  swapPair: {
    native: Coin;
    remote: Coin;
  };
  swapLoading: boolean;
};

export const swapStore = proxy<Store>({
  swapPair: {
    native: { amount: '0', denom: '' } as Coin,
    remote: { amount: '0', denom: '' } as Coin,
  },
  swapLoading: false,
});

export const useSwapStore = () => {
  return useSnapshot(swapStore);
};

export const updateCoinAmount = (
  value: string,
  side: 'native' | 'remote',
  pools?: ILiquidityPool[]
) => {
  const poolId = getPoolId([
    swapStore.swapPair.native.denom,
    swapStore.swapPair.remote.denom,
  ]);
  const pool = pools?.find((pool: ILiquidityPool) => pool.poolId == poolId);
  const tokenIn: Coin = {
    denom: swapStore.swapPair[side].denom,
    amount: value,
  };
  const market = new MarketMaker(pool!, 300);
  const estimate = market.leftSwap(
    tokenIn,
    swapStore.swapPair[side === 'native' ? 'remote' : 'native'].denom
  );
  swapStore.swapPair[side] = {
    amount: value,
    denom: swapStore.swapPair[side].denom,
  };
  swapStore.swapPair[side === 'native' ? 'remote' : 'native'] = estimate;
};

export const updateCoinDenom = (value: string, side: 'native' | 'remote') => {
  swapStore.swapPair[side] = {
    amount: swapStore.swapPair[side].amount,
    denom: value,
  };
};

export const onSwap = async (wallets: Wallet[], getClient) => {
  swapStore.swapLoading = true;
  const wallet = wallets.find((item: Wallet) => {
    if (item.chainInfo?.chainID === chainStore.chainCurrent.chainID) {
      return item;
    }
  });
  const client = await getClient(wallet!.chainInfo);
  const timeoutTimeStamp = Long.fromNumber((Date.now() + 60 * 1000) * 1000000); // 1 hour from now
  const toastItem = toast.loading('Swap in progress');
  try {
    const swapMsg: MsgSwapRequest = {
      swapType: SwapMsgType.LEFT,
      sender: wallets[0]!.address,
      tokenIn: swapStore.swapPair.native,
      tokenOut: swapStore.swapPair.remote,
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
      const { txHash, status, rawLog } = await client!.broadCastTx(data,toastItem);
      if (status !== 'error') {
        const result = await fetchTxs(chainStore.chainCurrent.restUrl, txHash);
        console.log(result, 'result');
        if (`${result?.code}` !== '0') {
          console.log(result?.raw_log, 'raw_log');
          toast.error(result?.raw_log, {
            id: toastItem,
            duration: 5000,
          });
        } else {
          toast.success('Swap Success', {
            id: toastItem,
          });
          getBalanceList(chainStore.chainCurrent?.restUrl, wallet!.address);
        }
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
  swapStore.swapLoading = false;
};
