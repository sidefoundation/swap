import type { ILiquidityPool } from '@/shared/types/liquidity';
import useWalletStore from '@/store/wallet';
import { useState } from 'react';
import { CoinInput } from './CoinInput';
import { Coin, StdFee } from '@cosmjs/stargate';
import Long from 'long';
import {
  LocalDeposit,
  MsgMultiAssetDepositRequest,
  MsgSingleAssetDepositRequest,
  RemoteDeposit,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import fetchAccount from '@/http/requests/get/fetchAccount';
import { TextEncoder } from 'text-encoding';

export type PoolDetailsProps = {
  pool: ILiquidityPool;
  onEnablePool: (pool: ILiquidityPool) => void;
};
export function PoolDetails({ pool, onEnablePool }: PoolDetailsProps) {
  const { wallets, getClient, setLoading } = useWalletStore();

  const [depositCoin, setDepositCoin] = useState<Coin[]>([]);

  const onSingleDeposit = async (denom: string) => {
    const wallet = wallets.find((wallet) => wallet.chainInfo.denom === denom);
    if (wallet === undefined) {
      return;
    }

    const deposit = depositCoin.find((coin) => coin?.denom === denom);

    if (deposit === undefined || +deposit.amount === 0) {
      console.log('deposit amount', deposit);
      console.log('denom=>', denom);
      return;
    }
    console.log('here>?');
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
    const localDepositCoin = depositCoin.find(
      (item) => item.denom === localDenom
    );
    const remoteDepositCoin = depositCoin.find(
      (item) => item.denom === remoteDenom
    );

    console.log(wallet, remoteWallet, localDepositCoin, remoteDepositCoin);
    if (wallet === undefined || remoteWallet === undefined) {
      return;
    }

    if (localDepositCoin === undefined || remoteDepositCoin === undefined) {
      return;
    }

    const remoteAsset = pool.assets.find(
      (item) => item.balance.denom === remoteWallet.chainInfo.denom
    );

    const localAsset = pool.assets.find(
      (item) => item.balance.denom === wallet.chainInfo.denom
    );

    const ratio = +remoteAsset!.balance.amount / +localAsset!.balance.amount;
    if (ratio !== +remoteDepositCoin.amount / +localDepositCoin.amount) {
      console.log(
        'invalid pair:',
        ratio,
        'please input:',
        +localDepositCoin.amount * ratio
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

  return (
    <div className="flex flex-col justify-center">
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
          <div className="flex items-center justify-between w-full">
            <div className="text-red-500">Inactive</div>
            <button
              className="btn btn-primary"
              onClick={() => {
                onEnablePool(pool);
              }}
            >
              Enable Pool
            </button>
          </div>
        )}
      </div>

      <div className="grid justify-between w-full gap-4 mt-6">
        {pool.status === 'POOL_STATUS_READY' && (
          <div className="flex justify-between gap-4">
            {pool.assets.map((asset) => {
              return (
                <div className="ml-4">
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
                  amount: depositCoin[index]?.amount ?? '0',
                }}
                onChange={(coin) => {
                  setDepositCoin((prevDepositCoin) => {
                    const newDepositCoin = [...prevDepositCoin]; // Copying the old datapoints array
                    newDepositCoin[index] = {
                      denom: item.balance.denom,
                      amount: coin,
                    }; // Updating our copied array
                    return newDepositCoin; // Setting our new state
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
                    onClick={() => onSingleDeposit(asset.balance.denom)}
                  >
                    Withdraw "{asset.balance.denom}"
                  </button>
                </div>
              );
            })}
            <button
              className="btn btn-primary"
              onClick={() => onDoubleDeposit('aside', 'bside')}
            >
              Multi-Withdraw
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
