import type { ILiquidityPool } from '@/shared/types/liquidity';
import useWalletStore from '@/store/wallet';
import { useEffect, useState } from 'react';
import { CoinInput } from '@/components/CoinInput';
import { Coin, StdFee } from '@cosmjs/stargate';
import Long from 'long';
import {
  LocalDeposit,
  MsgMultiAssetDepositRequest,
  MsgMultiAssetWithdrawRequest,
  MsgSingleAssetDepositRequest,
  MsgSingleAssetWithdrawRequest,
  RemoteDeposit,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import fetchAccount from '@/http/requests/get/fetchAccount';
import { TextEncoder } from 'text-encoding';
import { MarketMaker } from '@/utils/swap';
import { poolStore } from '@/store/pool';

import React from 'react';

export type PoolDetailsProps = {
  keyIndex: number;
  pool: ILiquidityPool;
  onEnablePool: (pool: ILiquidityPool) => void;
};

export default function PoolDetails({
  keyIndex,
  pool,
  onEnablePool,
}: PoolDetailsProps) {
  const {
    wallets,
    getClient,
    setLoading,
    setBalance,
    getBalance,
    isConnected,
  } = useWalletStore();
  const [depositCoin, setDepositCoin] = useState<Map<string, Coin>>();
  const market = new MarketMaker(pool, 300);
  const fetchBalances = async () => {
    const balance = await getBalance();
    setBalance(balance);
  };
  useEffect(() => {
    // fetchBalances();
  }, []);

  const onSingleDeposit = async (denom: string) => {
    const wallet = wallets.find((wallet) => wallet.chainInfo.denom === denom);
    if (wallet === undefined) {
      return;
    }

    const deposit = depositCoin?.get(denom);
    console.log(deposit, 'deposit');
    if (deposit === undefined || +deposit.amount === 0) {
      console.log('deposit amount', deposit);
      console.log('denom=>', denom);
      return;
    }
    setLoading(true);
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now
    try {
      const client = await getClient(wallet!.chainInfo);
      const singleDepositMsg: MsgSingleAssetDepositRequest = {
        poolId: pool.poolId,
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
    setLoading(false);
  };

  const onDoubleDeposit = async (localDenom: string, remoteDenom: string) => {
    const wallet = wallets.find(
      (wallet) => wallet.chainInfo.denom === localDenom
    );
    const remoteWallet = wallets.find(
      (item) => item.chainInfo.denom === remoteDenom
    );

    if (wallet === undefined || remoteWallet === undefined) {
      return;
    }

    const localDepositCoin = depositCoin?.get(localDenom);
    console.log(localDepositCoin, 'localDepositCoin');
    const remoteDepositCoin = depositCoin?.get(remoteDenom);
    console.log(remoteDepositCoin, 'remoteDepositCoin');

    if (localDepositCoin === undefined || remoteDepositCoin === undefined) {
      return;
    }

    const ratio = market.getRatio(remoteDenom, localDenom);
    console.log(ratio, 'ratio');
    const slippage =
      Math.abs(
        (ratio - +remoteDepositCoin.amount / +localDepositCoin.amount) / ratio
      ) * 100;
    console.log(slippage, ' slippage');
    if (slippage > 5) {
      setDepositCoin((prev) => {
        const newPrev = new Map(prev);
        const newAmount = Math.floor(
          (newPrev?.get(localDenom)?.amount.parseToFloat() ?? 0) * ratio
        );
        const newValue: Coin = { denom: remoteDenom, amount: `${newAmount}` };
        newPrev?.set(remoteDenom, newValue);
        return newPrev;
      });
      alert(
        'Your original input incorrect in ratio. Pleas try with current pair!'
      );
      return;
    }

    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now
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
        poolId: pool.poolId,
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
    setLoading(false);
  };

  const onSingleWithdraw = async (denom: string) => {
    const wallet = wallets.find((wallet) => wallet.chainInfo.denom === denom);
    if (wallet === undefined) {
      return;
    }

    const deposit = depositCoin?.get(denom);

    if (deposit === undefined || +deposit.amount === 0) {
      console.log('deposit amount', deposit);
      console.log('denom=>', denom);
      return;
    }

    setLoading(true);
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now
    try {
      const client = await getClient(wallet!.chainInfo);
      const singleWithdrawMsg: MsgSingleAssetWithdrawRequest = {
        sender: wallet!.address,
        poolCoin: { denom: pool.poolId, amount: deposit.amount },
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
    setLoading(false);
  };

  const onDoubleWithdraw = async (localDenom: string, remoteDenom: string) => {
    const wallet = wallets.find(
      (wallet) => wallet.chainInfo.denom === localDenom
    );
    const remoteWallet = wallets.find(
      (item) => item.chainInfo.denom === remoteDenom
    );
    const localDepositCoin = depositCoin?.get(localDenom);
    const remoteDepositCoin = depositCoin?.get(remoteDenom);

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
      setDepositCoin((prev) => {
        const newPrev = new Map(prev);
        const newAmount = Math.floor(
          (newPrev?.get(localDenom)?.amount.parseToFloat() ?? 0) * ratio
        );
        const newValue: Coin = { denom: remoteDenom, amount: `${newAmount}` };
        newPrev?.set(remoteDenom, newValue);
        return newPrev;
      });
      alert(
        'Your original input incorrect in ratio. Pleas try with current pair!'
      );
      return;
    }

    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now
    try {
      const client = await getClient(wallet!.chainInfo);

      const localWithdrawMsg: MsgSingleAssetWithdrawRequest = {
        sender: wallet.address,
        denomOut: localDenom,
        poolCoin: { denom: pool.poolId, amount: localDepositCoin.amount },
      };

      const remoteWithdrawMsg: MsgSingleAssetWithdrawRequest = {
        sender: remoteWallet.address,
        denomOut: remoteDenom,
        poolCoin: { denom: pool.poolId, amount: remoteDepositCoin.amount },
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
    setLoading(false);
  };

  return (
    <tr key={keyIndex}>
      <td>
        <div className="flex items-center">
          <div className="">
            <div className="font-semibold flex items-center">
              <div className="capitalize">
                {pool?.assets?.[0]?.balance.denom}
              </div>
              <div className="mx-1">/</div>
              <div className="capitalize">
                {pool?.assets?.[1]?.balance.denom}
              </div>
              <div className="ml-4 text-xs">
                {pool?.assets?.[0]?.weight}:{pool?.assets?.[1]?.weight}
              </div>
            </div>
            {/* <div className="tooltip" data-tip={pool?.poolId}> */}
            <div className="text-sm opacity-50 truncate w-[200px]">
              {pool.poolId}
              {/* </div> */}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="">
          {pool.assets.map((asset, key) => {
            return (
              <div key={key}>
                <span>{asset.balance.amount}</span>
                <span className="capitalize ml-1">{asset.balance.denom}</span>
              </div>
            );
          })}
        </div>
      </td>
      <td>{pool?.pool_price}</td>
      <td>{pool?.supply.amount}</td>
      <td>{pool?.encounterPartyChannel}</td>
      <td>
        {pool.status === 'POOL_STATUS_READY' && (
          <div className="text-green-500">POOL_STATUS_READY</div>
        )}
        {pool.status === 'POOL_STATUS_INITIAL' && (
          <div className="flex items-center justify-between w-full">
            <div className="text-red-500">POOL_STATUS_INITIAL</div>
          </div>
        )}
      </td>

      <td>
        {pool.status === 'POOL_STATUS_INITIAL' && (
          <button
            className="btn btn-primary btn-sm mr-2 capitalize"
            disabled={!isConnected}
            onClick={() => {
              onEnablePool(pool);
            }}
          >
            Enable Pool
          </button>
        )}
        <button
          className="btn-ghost border-gray-400 capitalize px-4 hover:bg-gray-100 btn-sm btn mr-2"
          disabled={!isConnected}
          onClick={() => {
            poolStore.poolForm.modalShow = true;
            poolStore.poolForm.action = 'add';
            poolStore.poolItem = pool;
          }}
        >
          Add
        </button>
        <button
          className="btn-ghost border-gray-400 capitalize px-4 hover:bg-gray-100 btn-sm btn mr-2"
          disabled={!isConnected}
          onClick={() => {
            poolStore.poolForm.modalShow = true;
            poolStore.poolForm.action = 'redeem';
            poolStore.poolItem = pool;
          }}
        >
          Redeem
        </button>

        <label
          htmlFor="modal-pool-manage"
          className="btn-ghost border-gray-400 capitalize px-4 hover:bg-gray-100 btn-sm btn !hidden"
        >
          Add liquidity
        </label>
        {/* dialog */}
        <input
          type="checkbox"
          id="modal-pool-manage"
          className="modal-toggle"
        />
        <label className="modal cursor-pointer" htmlFor="modal-pool-manage">
          <label className="modal-box relative max-w-modal w-full" htmlFor="">
            <div className="w-full max-w-modal overflow-auto">
              <div className="grid justify-between w-full gap-4 mt-6">
                {pool.status === 'POOL_STATUS_READY' && (
                  <div className="flex justify-between gap-4">
                    {pool.assets.map((asset, index) => {
                      return (
                        <div className="ml-4" key={index}>
                          <button
                            className="btn btn-primary"
                            onClick={() => onSingleDeposit(asset.balance.denom)}
                          >
                            Deposit "{asset.balance.denom}"
                          </button>
                        </div>
                      );
                    })}
                    <button
                      className="btn btn-primary"
                      onClick={() => onDoubleDeposit('aside', 'bside')}
                    >
                      Multi-Deposit
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 mt-4">
                  {pool.assets.map((item, index) => {
                    return (
                      <CoinInput
                        key={index}
                        placeholder="Amount ..."
                        coin={{
                          denom: item.balance.denom,
                          amount:
                            depositCoin?.get(item.balance.denom)?.amount ?? '0',
                        }}
                        onChange={(coin) => {
                          setDepositCoin((prevDepositCoin) => {
                            // Create a new Map object
                            const newDepositCoin = new Map(prevDepositCoin);
                            newDepositCoin.set(item.balance.denom, {
                              denom: item.balance.denom,
                              amount: coin,
                            });
                            return newDepositCoin;
                          });
                        }}
                      />
                    );
                  })}
                </div>

                {pool.status === 'POOL_STATUS_READY' && (
                  <div className="flex justify-between gap-4">
                    {pool.assets.map((asset) => {
                      return (
                        <div className="ml-4">
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              onSingleWithdraw(asset.balance.denom)
                            }
                          >
                            Withdraw "{asset.balance.denom}"
                          </button>
                        </div>
                      );
                    })}
                    <button
                      className="btn btn-primary"
                      onClick={() => onDoubleWithdraw('aside', 'bside')}
                    >
                      Multi-Withdraw
                    </button>
                  </div>
                )}
              </div>
            </div>
          </label>
        </label>
      </td>
    </tr>
  );
}
