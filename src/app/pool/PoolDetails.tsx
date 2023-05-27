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
import { MdKeyboardArrowDown, MdOutlineClose } from 'react-icons/md';
import { poolStore } from '@/store/pool';

import Image from 'next/image';
import React from 'react';

export type PoolDetailsProps = {
  key: number;
  pool: ILiquidityPool;
  onEnablePool: (pool: ILiquidityPool) => void;
};

const TabDepositItem = ({
  tabDeposit,
  setDepositTab,
  title,
  value,
}: {
  tabDeposit: string;
  setDepositTab: Function;
  title: string;
  value: string;
}) => {
  return (
    <div
      className={`tab tab-sm px-4  ${
        tabDeposit === value
          ? 'bg-primary text-white rounded-full'
          : 'dark:text-gray-400'
      }`}
      onClick={() => {
        setDepositTab(value);
      }}
    >
      {title}
    </div>
  );
};

export default function PoolDetails({ pool, onEnablePool }: PoolDetailsProps) {
  const {
    wallets,
    getClient,
    setLoading,
    setBalance,
    getBalance,
    balanceList,
    selectedChain,
  } = useWalletStore();
  const [selectedCoin, setSelectedCoin] = useState({});
  const [depositCoin, setDepositCoin] = useState<Map<string, Coin>>();
  const [tab, setTab] = useState('deposit');
  const [tabDeposit, setDepositTab] = useState('all');
  const market = new MarketMaker(pool, 300);
  const fetchBalances = async () => {
    const balance = await getBalance();
    setBalance(balance);
  };
  useEffect(() => {
    fetchBalances();
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
  const onDeposit = async () => {
    const denom = selectedCoin?.balance?.denom;
    const wallet = wallets.find(
      (wallet) => wallet.chainInfo.chainID === selectedChain.chainID
    );
    console.log(wallet, 'wallet', selectedChain, selectedCoin);
    if (wallet.chainInfo.denom === selectedCoin?.balance.denom) {
      console.log('no wallet');
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

    console.log(selectedCoin, '887878');
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
    <tr>
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
            <div className="text-sm opacity-50 truncate w-[200px]">
              {pool.poolId}
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
            <button
              className="btn btn-primary btn-sm ml-1"
              onClick={() => {
                onEnablePool(pool);
              }}
            >
              Enable Pool
            </button>
          </div>
        )}
      </td>

      <td>
        <label
          htmlFor="modal-pool-modal"
          className="btn-ghost border-gray-400 capitalize px-4 hover:bg-gray-100 btn-sm btn mr-2"
          onClick={() => {
            poolStore.poolForm.action = 'add';
            poolStore.poolItem = pool;
          }}
        >
          Add
        </label>
        <label
          htmlFor="modal-pool-modal"
          className="btn-ghost border-gray-400 capitalize px-4 hover:bg-gray-100 btn-sm btn mr-2"
          onClick={() => {
            poolStore.poolForm.action = 'redeem';
            poolStore.poolItem = pool;
          }}
        >
          Redeem
        </label>

        <label
          htmlFor="modal-pool-manage"
          className="btn-ghost border-gray-400 capitalize px-4 hover:bg-gray-100 btn-sm btn hidden"
        >
          Add liquidity
        </label>
        <label
          htmlFor="modal-pool-manage"
          className="btn-ghost border-gray-400 ml-2 capitalize px-4 hover:bg-gray-100 btn-sm btn hidden"
        >
          Redeem
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
              {/* deposit */}
              <div className="">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold  text-lg">Add liquidity to pool</h2>
                  <label className="cursor-pointer" htmlFor="modal-pool-manage">
                    <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
                  </label>
                </div>
                <div className=""> {pool.poolId}</div>
                <div className="text-center mt-4">
                  {/* tab */}
                  <div className="mb-4 tabs inline-flex items-center bg-gray-100 dark:bg-gray-700  rounded-full">
                    <TabDepositItem
                      tabDeposit={tabDeposit}
                      setDepositTab={setDepositTab}
                      title="All assets"
                      value="all"
                    />
                    <TabDepositItem
                      tabDeposit={tabDeposit}
                      setDepositTab={setDepositTab}
                      title="Single asset"
                      value="single"
                    />
                  </div>
                </div>
                {/* multi deposit */}
                {pool.status === 'POOL_STATUS_READY' &&
                  tab === 'deposit' &&
                  tabDeposit === 'all' &&
                  pool.assets.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full flex-col gap-1 rounded-2xl border border-osmoverse-700 p-4 md:rounded-xl md:p-3 mb-4"
                      >
                        <div className="flex w-full place-content-between items-center">
                          <div className="flex gap-2 my-auto">
                            <div
                              className="radial-progress bg-primary text-primary-content border-4 border-primary"
                              style={{ '--value': item.weight }}
                            >
                              {item.weight}%
                            </div>
                            <div className="flex flex-col place-content-center text-left">
                              <h5 className="capitalize">
                                {item?.balance?.denom}
                              </h5>
                              {/* <span className="subtitle2 text-osmoverse-400">
                                name
                              </span> */}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-end gap-2 text-caption font-caption">
                              <span className="my-auto">Available</span>
                              <span className="my-auto text-wosmongton-300 opacity-70">
                                {balanceList[0]?.balances?.find(
                                  (balanceItem) =>
                                    balanceItem?.denom === item?.balance?.denom
                                )?.amount || 0}
                                &nbsp;
                                {item?.balance?.denom}
                              </span>
                            </div>
                            <div className="flex place-content-end items-center gap-1">
                              <div className="flex flex-col rounded-lg bg-gray-200 p-1">
                                <div className="flex h-fit w-full flex-nowrap justify-between rounded-lg bg-osmoverse-1000 px-2 text-white-high">
                                  <div className="pr-3 text-right text-xs font-caption leading-5 text-osmoverse-400">
                                    <CoinInput
                                      key={index}
                                      placeholder="Amount ..."
                                      coin={{
                                        denom: item.balance.denom,
                                        amount:
                                          depositCoin?.get(item.balance.denom)
                                            ?.amount ?? '0',
                                      }}
                                      onChange={(coin) => {
                                        setDepositCoin((prevDepositCoin) => {
                                          // Create a new Map object
                                          const newDepositCoin = new Map(
                                            prevDepositCoin
                                          );
                                          newDepositCoin.set(
                                            item.balance.denom,
                                            {
                                              denom: item.balance.denom,
                                              amount: coin,
                                            }
                                          );
                                          console.log(
                                            newDepositCoin,
                                            'newDepositCoin'
                                          );
                                          return newDepositCoin;
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                {/* <span className="pr-3 text-right text-xs font-caption leading-5 text-osmoverse-400"></span> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {pool.status === 'POOL_STATUS_READY' &&
                  tab === 'deposit' &&
                  tabDeposit === 'all' && (
                    <button
                      className="btn btn-primary w-full"
                      onClick={() => onDoubleDeposit('aside', 'bside')}
                    >
                      Multi-Deposit
                    </button>
                  )}
                {/* single deposit */}
                {pool.status === 'POOL_STATUS_READY' &&
                  tab === 'deposit' &&
                  tabDeposit === 'single' && (
                    <div className="flex w-full flex-col gap-1 rounded-2xl border border-osmoverse-700 p-4 md:rounded-xl md:p-3 mb-4">
                      <div className="flex w-full place-content-between items-center">
                        <ul className="menu menu-horizontal px-1 w-full">
                          <li tabIndex={0} className="w-full">
                            <a className="w-full truncate font-semibold">
                              <div
                                className="radial-progress bg-primary text-primary-content border-4 border-primary"
                                style={{ '--value': selectedCoin?.weight }}
                              >
                                {selectedCoin?.weight}%
                              </div>
                              {selectedCoin?.balance?.denom}
                              <MdKeyboardArrowDown className="fill-current" />
                            </a>
                            <ul className="p-2 bg-base-100 z-10 w-full">
                              {pool?.assets.map((item, index) => {
                                return (
                                  <li key={index} className="truncate w-full">
                                    <a onClick={() => setSelectedCoin(item)}>
                                      <span className="flex-1 font-semibold text-center capitalize">
                                        {/* {item?.denom} */}
                                      </span>
                                      <div className="flex w-full place-content-between items-center">
                                        <div className="flex gap-2 my-auto">
                                          <div
                                            className="radial-progress bg-primary text-primary-content border-4 border-primary"
                                            style={{ '--value': item.weight }}
                                          >
                                            {item.weight}%
                                          </div>
                                          <div className="flex flex-col place-content-center text-left">
                                            <h5 className="capitalize">
                                              {item?.balance?.denom}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        </ul>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-end gap-2 text-caption font-caption">
                            <span className="my-auto">Available</span>
                            <span className="my-auto text-wosmongton-300 opacity-70">
                              {balanceList[0]?.balances?.find(
                                (balanceItem) =>
                                  balanceItem?.denom ===
                                  selectedCoin?.balance?.denom
                              )?.amount || 0}
                              {selectedCoin?.balance?.denom}
                            </span>
                          </div>
                          <div className="flex place-content-end items-center gap-1">
                            <div className="flex flex-col rounded-lg bg-gray-200 p-1">
                              <div className="flex h-fit w-full flex-nowrap justify-between rounded-lg bg-osmoverse-1000 px-2 text-white-high">
                                <div className="pr-3 text-right text-xs font-caption leading-5 text-osmoverse-400">
                                  <CoinInput
                                    placeholder="Amount ..."
                                    coin={{
                                      denom: selectedCoin?.balance?.denom,
                                      amount:
                                        depositCoin?.get(
                                          selectedCoin?.balance?.denom
                                        )?.amount ?? '0',
                                    }}
                                    onChange={(coin) => {
                                      setDepositCoin((prevDepositCoin) => {
                                        // Create a new Map object
                                        const newDepositCoin = new Map(
                                          prevDepositCoin
                                        );
                                        newDepositCoin.set(
                                          selectedCoin?.balance?.denom,
                                          {
                                            denom: selectedCoin?.balance?.denom,
                                            amount: coin,
                                          }
                                        );
                                        return newDepositCoin;
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              {/* <span className="pr-3 text-right text-xs font-caption leading-5 text-osmoverse-400"></span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                {pool.status === 'POOL_STATUS_READY' &&
                  tab === 'deposit' &&
                  tabDeposit === 'single' && (
                    <button
                      className="btn btn-primary w-full"
                      onClick={() => onDeposit()}
                    >
                      Deposit
                    </button>
                  )}
              </div>

              {/* withdraw */}

              <div className="my-2">old</div>
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
