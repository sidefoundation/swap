import { Coin, StdFee } from '@cosmjs/stargate';
import { proxy, useSnapshot } from 'valtio';
import { toast } from 'react-hot-toast';
import Long from 'long';
import type { ILiquidityPool } from '@/shared/types/liquidity';
import { BriefChainInfo } from '../shared/types/chain';
import {
  LocalDeposit,
  MsgMultiAssetDepositRequest,
  RemoteDeposit,
  MsgSingleAssetDepositRequest,
  MsgSingleAssetWithdrawRequest,
  MsgMultiAssetWithdrawRequest,
  MsgCreatePoolRequest,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';

import fetchAccount from '@/http/requests/get/fetchAccount';
import fetchLiquidityPools from '../http/requests/get/fetchLiquidityPools';

export type CounterPartyType = {
  chainID: string;
  name: string;
  channelId: string;
  portId: string;
  type: string;
};

type Store = {
  poolList: ILiquidityPool[];
  poolItem: ILiquidityPool;
  poolForm: {
    action: 'add' | 'redeem';
    single: ILiquidityPool;
    signleAmount: string;
    remoteAmount: string;
    nativeAmount: string;
  };
  poolFormCreate: {
    native: {
      chain: BriefChainInfo;
      coin: Coin;
      amount: string;
      weight: number;
    };
    remote: {
      chain: BriefChainInfo;
      coin: Coin;
      amount: string;
      weight: number;
    };
    counterParty: CounterPartyType;
    memo: string;
    gas: string;
  };
};

export const poolStore = proxy<Store>({
  poolList: [] as ILiquidityPool[],
  poolItem: {} as ILiquidityPool,
  poolForm: {
    action: 'add',
    single: {} as ILiquidityPool,
    signleAmount: '',
    remoteAmount: '',
    nativeAmount: '',
  },
  poolFormCreate: {
    native: {
      chain: {} as BriefChainInfo,
      coin: {} as Coin,
      amount: '',
      weight: 50,
    },
    remote: {
      chain: {} as BriefChainInfo,
      coin: {} as Coin,
      amount: '',
      weight: 50,
    },
    counterParty: {
      chainID: '',
      name: '',
      channelId: '',
      portId: '',
      type: '',
    },
    memo: '',
    gas: '200000',
  },
});


export const usePoolStore = () => {
  return useSnapshot(poolStore);
};

export const getPoolList = async () => {
  const res = await fetchLiquidityPools('');
  poolStore.poolList = res.interchainLiquidityPool;
};

// all assets add
export const addPoolItemMulti = async (wallets, market, getClient) => {
  const poolAssets = poolStore.poolItem.assets;
  console.log(poolAssets, 'poolAssets');
  const form = poolStore.poolForm;

  let localDenom = '';
  let localDepositCoin = {} as Coin;
  let remoteDenom = '';
  let remoteDepositCoin = {} as Coin;
  for (const asset of poolAssets) {
    if (asset?.side?.toLowerCase() === 'remote') {
      remoteDenom = asset.balance.denom;
      remoteDepositCoin = {
        denom: asset.balance.denom,
        amount: form.remoteAmount,
      };
    }
    if (asset?.side?.toLowerCase() === 'native') {
      localDenom = asset.balance.denom;
      localDepositCoin = {
        denom: asset.balance.denom,
        amount: form.nativeAmount,
      };
    }
  }
  //
  const wallet = wallets.find(
    (wallet) => wallet.chainInfo.denom === localDenom
  );
  const remoteWallet = wallets.find(
    (item) => item.chainInfo.denom === remoteDenom
  );

  if (wallet === undefined || remoteWallet === undefined) {
    return;
  }

  if (localDepositCoin === undefined || remoteDepositCoin === undefined) {
    return;
  }

  const ratio = market.getRatio(remoteDenom, localDenom);
  const slippage =
    Math.abs(
      (ratio - +remoteDepositCoin.amount / +localDepositCoin.amount) / ratio
    ) * 100;
  if (slippage > 5) {
    poolStore.poolForm.nativeAmount = '';
    poolStore.poolForm.remoteAmount = '';
    toast.error(
      'Your original input incorrect in ratio. Pleas try with current pair!'
    );
    return;
  }

  const timeoutTimeStamp = Long.fromNumber((Date.now() + 60 * 1000) * 1000000); // 1 hour from now
  try {
    const client = await getClient(wallet!.chainInfo);

    const localDepositMsg: LocalDeposit = {
      sender: wallet.address,
      token: localDepositCoin,
    };

    const acc = await fetchAccount(
      remoteWallet.chainInfo.restUrl,
      wallet.address
    );

    const remoteDepositSignMsg = {
      sender: remoteWallet.address,
      token: remoteDepositCoin,
      sequence: Long.fromInt(+acc.base_account.sequence),
    };
    const encoder = new TextEncoder();
    const remoteClient = await getClient(remoteWallet.chainInfo);
    const rawRemoteDepositMsg = encoder.encode(
      JSON.stringify(remoteDepositSignMsg)
    );
    const sig = await remoteClient!.signToMsg(
      remoteWallet.address,
      rawRemoteDepositMsg,
      remoteWallet.chainInfo
    );

    const signUint8Array = encoder.encode(sig); // encode the string
    const remoteDepositMsg: RemoteDeposit = {
      ...remoteDepositSignMsg,
      signature: signUint8Array,
    };

    console.log('Remote deposit sign', remoteDepositMsg);

    const multiDepositMsg: MsgMultiAssetDepositRequest = {
      poolId: poolStore.poolItem.poolId,
      localDeposit: localDepositMsg,
      remoteDeposit: remoteDepositMsg,

      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimeStamp: timeoutTimeStamp,
    };

    const msg = {
      typeUrl:
        '/ibc.applications.interchain_swap.v1.MsgMultiAssetDepositRequest',
      value: multiDepositMsg,
    };
    console.log(client);

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
  } catch (error) {
    console.log('error', error);
  }
};

// single asset add
export const addPoolItemSingle = async (wallets, selectedChain, getClient) => {
  const selectedCoin = poolStore?.poolForm?.single;
  const denom = selectedCoin?.balance?.denom;
  const wallet = wallets.find(
    (wallet) => wallet.chainInfo.chainID === selectedChain.chainID
  );
  console.log(wallet, 'wallet', selectedChain);
  if (wallet.chainInfo.denom !== selectedCoin?.balance.denom) {
    console.log('no wallet');
    return;
  }

  const deposit = {
    denom,
    amount: poolStore.poolForm.signleAmount,
  };
  if (deposit === undefined || +deposit.amount === 0) {
    console.log('deposit amount', deposit);
    console.log('denom=>', denom);
    return;
  }
  const timeoutTimeStamp = Long.fromNumber((Date.now() + 60 * 1000) * 1000000); // 1 hour from now
  try {
    const client = await getClient(wallet!.chainInfo);
    const singleDepositMsg: MsgSingleAssetDepositRequest = {
      poolId: poolStore?.poolItem?.poolId,
      sender: wallet!.address,
      token: deposit,
      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimeStamp: timeoutTimeStamp,
    };

    const msg = {
      typeUrl:
        '/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest',
      value: singleDepositMsg,
    };
    console.log(client);

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
  } catch (error) {
    console.log('error', error);
  }
};

// all assets redeem
export const redeemPoolItemMulti = async (wallets, getClient, market) => {
  const poolAssets = poolStore.poolItem.assets;
  const form = poolStore.poolForm;

  let localDenom = '';
  let localDepositCoin = {} as Coin;
  let remoteDenom = '';
  let remoteDepositCoin = {} as Coin;
  for (const asset of poolAssets) {
    if (asset?.side?.toLowerCase() === 'remote') {
      remoteDenom = asset.balance.denom;
      remoteDepositCoin = {
        denom: asset.balance.denom,
        amount: form.remoteAmount,
      };
    }
    if (asset?.side?.toLowerCase() === 'native') {
      localDenom = asset.balance.denom;
      localDepositCoin = {
        denom: asset.balance.denom,
        amount: form.nativeAmount,
      };
    }
  }
  const wallet = wallets.find(
    (wallet) => wallet.chainInfo.denom === localDenom
  );
  const remoteWallet = wallets.find(
    (item) => item.chainInfo.denom === remoteDenom
  );

  console.log(wallet, remoteWallet, localDepositCoin, remoteDepositCoin);
  if (wallet === undefined || remoteWallet === undefined) {
    return;
  }

  if (localDepositCoin === undefined || remoteDepositCoin === undefined) {
    return;
  }

  const ratio = market.getRatio(remoteDenom, localDenom);
  const slippage =
    Math.abs(
      (ratio - +remoteDepositCoin.amount / +localDepositCoin.amount) / ratio
    ) * 100;
  console.log(slippage);

  if (slippage > 5) {
    poolStore.poolForm.nativeAmount = '';
    poolStore.poolForm.remoteAmount = '';
    toast.error(
      'Your original input incorrect in ratio. Pleas try with current pair!'
    );
    return;
  }

  const timeoutTimeStamp = Long.fromNumber((Date.now() + 60 * 1000) * 1000000); // 1 hour from now
  try {
    const client = await getClient(wallet!.chainInfo);

    const localWithdrawMsg: MsgSingleAssetWithdrawRequest = {
      sender: wallet.address,
      denomOut: localDenom,
      poolCoin: {
        denom: poolStore.poolItem.poolId,
        amount: localDepositCoin.amount,
      },
    };

    const remoteWithdrawMsg: MsgSingleAssetWithdrawRequest = {
      sender: remoteWallet.address,
      denomOut: remoteDenom,
      poolCoin: {
        denom: poolStore.poolItem.poolId,
        amount: remoteDepositCoin.amount,
      },
    };

    const multiWithdrawtMsg: MsgMultiAssetWithdrawRequest = {
      localWithdraw: localWithdrawMsg,
      remoteWithdraw: remoteWithdrawMsg,

      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimeStamp: timeoutTimeStamp,
    };

    const msg = {
      typeUrl:
        '/ibc.applications.interchain_swap.v1.MsgMultiAssetWithdrawRequest',
      value: multiWithdrawtMsg,
    };
    console.log(client);

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
  } catch (error) {
    console.log('error', error);
  }
};

// signle asset redeem
export const redeemPoolItemSingle = async (
  wallets,
  getClient,
  selectedChain
) => {
  const wallet = wallets.find(
    (wallet) => wallet.chainInfo.chainID === selectedChain.chainID
  );
  console.log(wallet, 'wallet', selectedChain);
  if (wallet.chainInfo.denom !== poolStore.poolForm?.single?.balance.denom) {
    console.log('no wallet');
    return;
  }

  const deposit = {
    denom: poolStore.poolItem.supply?.denom,
    amount: poolStore.poolForm.signleAmount,
  };

  if (!deposit?.amount) {
    toast.error('Please input amount');
    return;
  }

  const timeoutTimeStamp = Long.fromNumber((Date.now() + 60 * 1000) * 1000000); // 1 hour from now
  try {
    const client = await getClient(wallet!.chainInfo);
    const singleWithdrawMsg: MsgSingleAssetWithdrawRequest = {
      sender: wallet!.address,
      poolCoin: {
        denom: poolStore.poolItem.supply?.denom,
        amount: deposit.amount,
      },
      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimeStamp: timeoutTimeStamp,
      denomOut: '',
    };

    const msg = {
      typeUrl:
        '/ibc.applications.interchain_swap.v1.MsgSingleAssetWithdrawRequest',
      value: singleWithdrawMsg,
    };
    console.log(client);

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
  } catch (error) {
    console.log('error', error);
  }
};

export const postPoolCreate = async (selectedChain, getClient) => {
  const wallet = selectedChain;
  const timeoutTimeStamp = Long.fromNumber((Date.now() + 60 * 1000) * 1000000); // 1 hour from now

  try {
    const client = await getClient(wallet!.chainInfo);

    const createPoolMsg: MsgCreatePoolRequest = {
      sourcePort: 'interchainswap',
      sourceChannel: poolStore.poolFormCreate.counterParty?.channelId,
      sender: wallet!.address,
      tokens: [
        {
          denom: poolStore?.poolFormCreate?.native?.coin?.denom,
          amount: poolStore?.poolFormCreate?.native?.amount,
        },
        {
          denom: poolStore?.poolFormCreate?.remote?.coin?.denom,
          amount: poolStore?.poolFormCreate?.remote?.amount,
        },
      ],
      decimals: [18, 18],
      weight: `${poolStore?.poolFormCreate?.native?.weight}:${poolStore?.poolFormCreate?.remote?.weight}`,
      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimeStamp: timeoutTimeStamp,
    };

    const msg = {
      typeUrl: '/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest',
      value: createPoolMsg,
    };

    const fee: StdFee = {
      amount: [{ denom: wallet!.chainInfo.denom, amount: '0.01' }],
      gas: poolStore?.poolFormCreate?.gas || '200000',
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
  } catch (error) {
    toast.error(error);
    console.log('error', error);
  }
};
