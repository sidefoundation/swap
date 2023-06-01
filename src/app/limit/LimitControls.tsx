import React, { useState, useEffect } from 'react';
import useWalletStore, { Wallet } from '@/store/wallet';
import { Coin, StdFee } from '@cosmjs/stargate';
import { selectTimeList } from '@/shared/types/limit';
import { getBalanceList, useAssetsStore } from '@/store/assets';
import { useChainStore, useRemoteChainList } from '@/store/chain';
import {
  useLimitStore,
  useLimitRate,
  limitStore,
  getSupplyList,
  onMakeOrder,
} from '@/store/limit';
import {
  MdKeyboardArrowDown,
  MdOutlineSettings,
  MdOutlineClose,
  MdArrowDownward,
} from 'react-icons/md';
import Image from 'next/image';
import TabItem from '@/components/TabItem';
import { MakeSwapMsg } from '@/codegen/ibc/applications/atomic_swap/v1/tx';
import Long from 'long';
import toast from 'react-hot-toast';
import LimitOrder from './LimitOrder';
import { ConnectWalletBtn } from '@/components/ConnectWalletBtn';
interface SwapControlsProps {}

const LimitControls: React.FC<SwapControlsProps> = ({}) => {
  const { chainCurrent, chainList } = useChainStore();
  const { limitRemoteChainList } = useRemoteChainList();
  const { wallets, isConnected, getClient } =
    useWalletStore();
  const {
    makerReceivingAddress,
    desiredTaker,
    nativeSupplyList,
    remoteSupplyList,
    limitNative,
    limitRemote,
    selectedRemoteChain,
    selectedTime,
    expirationTime,
  } = useLimitStore();
  const { limitRate } = useLimitRate();
  const { balanceList } = useAssetsStore();
  const [tab, setTab] = useState('limit');

  useEffect(() => {
    if (chainCurrent?.chainID) {
      getCurrentBalance();
      getSupplyList(chainCurrent.restUrl, 'native');
    }
  }, []);

  const getCurrentBalance = () => {
    if (wallets.length > 0) {
      const walletItem = wallets?.find((wallet) => {
        if (wallet.chainInfo.chainID === chainCurrent.chainID) {
          return { restUrl: wallet.chainInfo.restUrl, address: wallet.address };
        }
      });
      getBalanceList(chainCurrent?.restUrl, walletItem?.address);
    }
  };

  useEffect(() => {
    if (isConnected && tab === 'limit' && chainCurrent?.chainID) {
      getCurrentBalance();
      getSupplyList(chainCurrent.restUrl, 'native');
    }
  }, [chainCurrent, wallets, isConnected, tab]);

  useEffect(() => {
    if (nativeSupplyList.length > 0) {
      limitStore.limitNative.supply = nativeSupplyList[0] as Coin;
    }
  }, [nativeSupplyList]);

  useEffect(() => {
    if (limitRemoteChainList.length > 0) {
      limitStore.selectedRemoteChain = limitRemoteChainList[0];
    }
  }, [limitRemoteChainList]);

  useEffect(() => {
    if (selectedRemoteChain?.chainID) {
      const url =
        chainList.find((item) => {
          if (item.chainID === selectedRemoteChain?.chainID) {
            return item;
          }
        })?.restUrl || '';
      getSupplyList(url, 'remote');
    }
  }, [selectedRemoteChain]);

  useEffect(() => {
    if (remoteSupplyList.length > 0) {
      limitStore.limitRemote.supply = remoteSupplyList[0] as Coin;
    }
  }, [remoteSupplyList]);

  const filterBalance = (denom: string) => {
    const balances = balanceList;
    return (
      balances.find((item) => {
        return item.denom === denom;
      })?.amount || '0'
    );
  };

  const btnDisabled = () => {
    const nativePart =
      parseFloat(limitNative.amount) >
        parseFloat(filterBalance(limitNative.supply.denom)) ||
      limitNative.supply.denom === '' ||
      !parseFloat(limitNative.amount);
    const remotePart =
      limitRemote.supply.denom === '' || !parseFloat(limitRemote.amount);

    const otherPart = !makerReceivingAddress || !expirationTime;

    // console.log(nativePart, 'nativePart');
    // console.log(remotePart, 'remotePart');
    // console.log(otherPart, 'otherPart');
    return nativePart || remotePart || otherPart;
  };
  const onMakeOrder2 = async () => {
    if (
      parseFloat(limitNative.amount) <= 0 ||
      parseFloat(limitRemote.amount) <= 0
    ) {
      toast.error('Please input token pair value');
      return;
    }
    const sourceWallet = wallets.find(
      (wallet) => chainCurrent.chainID === wallet.chainInfo.chainID
    );
    const targetWallet = wallets.find(
      (wallet) => chainCurrent.chainID !== wallet.chainInfo.chainID
    );
    if (sourceWallet === undefined || targetWallet === undefined) {
      toast.error('sourceWallet or targetWallet not found');
      return;
    }
    const client = await getClient(sourceWallet.chainInfo);

    // need to confirm balance exist

    const sellToken = {
      denom: limitNative.supply.denom,
      amount: limitNative.amount,
    };
    const buyToken = {
      denom: limitRemote.supply.denom,
      amount: limitRemote.amount,
    };
    // || buyToken === undefined
    if (sellToken === undefined) {
      return;
    }

    // Get current date
    const currentDate = new Date();

    // Get current timestamp in milliseconds
    const currentTimestamp = currentDate.getTime();

    // Calculate the timestamp for 24 hours from now  24 * 60 * 60 * 1000;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    // 1 'expirationTime' 'selectedTime' 'Hour'

    const inputExpirationTime =
      expirationTime *
      selectList?.find((item) => item.option === selectedTime)?.key *
      1000;
    const expirationTimestamp = inputExpirationTime || oneDayInMilliseconds;
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); //
    const makeOrderMsg: MakeSwapMsg = {
      sourcePort: 'swap',
      sourceChannel: 'channel-1',
      sellToken: sellToken,
      buyToken: buyToken,
      makerAddress: sourceWallet.address,
      makerReceivingAddress: makerReceivingAddress,
      desiredTaker: desiredTaker,
      createTimestamp: Long.fromNumber(currentTimestamp),
      expirationTimestamp: Long.fromInt(expirationTimestamp),
      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimestamp: timeoutTimeStamp,
    };

    const msg = {
      typeUrl: '/ibc.applications.atomic_swap.v1.MakeSwapMsg',
      value: makeOrderMsg,
    };

    const fee: StdFee = {
      amount: [{ denom: sourceWallet.chainInfo.denom, amount: '0.01' }],
      gas: '200000',
    };
    const data = await client!.signWithEthermint(
      sourceWallet.address,
      [msg],
      sourceWallet.chainInfo,
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
    console.log('onMakeOrder', wallets, sourceWallet, chainCurrent);
  };
  return (
    <div className="p-5 bg-base-100 w-[500px] rounded-lg mx-auto mt-10 shadow mb-20 min-h-[300px]">
      <div className="flex items-center justify-between mb-5">
        <div className="inline-flex items-center bg-gray-100 rounded-full tabs dark:bg-gray-700">
          <TabItem tab={tab} setTab={setTab} title="Limit" value="limit" />
          <TabItem tab={tab} setTab={setTab} title="Order" value="order" />
        </div>

        {tab === 'limit' ? (
          <label htmlFor="modal-swap-setting">
            <MdOutlineSettings className="text-xl cursor-pointer" />
          </label>
        ) : null}
      </div>
      {/* limit */}
      {tab === 'limit' ? (
        <div>
          {/* first */}
          <div className="p-5 rounded-lg bg-base-200">
            <div className="flex items-center mb-2">
              <div className="flex-1">
                Sell
                <span className="ml-1 text-sm">({chainCurrent?.name})</span>
              </div>
              <div className="mr-2">
                Balance: {filterBalance(limitStore.limitNative.supply.denom)}
              </div>
              <div
                className="font-semibold cursor-pointer"
                onClick={() => {
                  limitStore.limitNative.amount = filterBalance(
                    limitStore.limitNative.supply.denom
                  );
                }}
              >
                Max
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
                <ul className="w-full px-1 menu menu-horizontal">
                  <li tabIndex={0} className="w-full">
                    <a className="w-full text-sm truncate capitalize">
                      {limitNative.supply.denom || '--'}
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 w-full p-2 bg-base-100">
                      {nativeSupplyList.map((item: Coin, index: number) => {
                        if (!item?.denom?.includes('pool')) {
                          return (
                            <li key={index} className="w-full truncate">
                              <a
                                onClick={() => {
                                  limitStore.limitNative.supply = item;
                                }}
                              >
                                <span className="flex-1 font-semibold text-center capitalize">
                                  {item?.denom}
                                </span>
                              </a>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>
                  </li>
                </ul>
              </div>

              <input
                type="number"
                className="flex-1 w-0 h-10 text-2xl font-semibold text-right bg-transparent focus-within:outline-none placeholder:font-normal placeholder:text-sm"
                placeholder="Amount"
                onChange={(event) => {
                  limitStore.limitNative.amount = event.target.value;
                }}
                value={limitNative.amount}
                min="0"
              />
            </div>
          </div>
          {/* switch icon */}
          <div className="flex items-center justify-center -mt-5 -mb-5">
            <div className="flex items-center justify-center bg-white rounded-full shadow dark:bg-gray-700 w-14 h-14">
              <MdArrowDownward className="w-8 h-8 text-gray-700 dark:text-gray-300" />
            </div>
          </div>
          {/* second */}
          <div className="p-5 rounded-lg bg-base-200">
            <div className="flex items-center mb-2">
              <div className="flex flex-1">
                <span>Buy</span>
                {/* <span>({currentAtomicSwap?.chain})</span> */}
              </div>
              <div className="mr-2">
                Balance: {filterBalance(limitStore.limitRemote.supply.denom)}
              </div>
              <div
                className="font-semibold cursor-pointer"
                onClick={() => {
                  limitStore.limitRemote.amount = filterBalance(
                    limitStore.limitRemote.supply.denom
                  );
                }}
              >
                Max
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className=" mr-4  w-[100px]">
                <ul className="menu menu-horizontal bg-base-100 rounded-full px-1 w-[110px]">
                  <li tabIndex={0} className="w-full">
                    <a className="w-full text-sm truncate">
                      {selectedRemoteChain?.name || '--'}
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 w-full p-2 bg-base-100">
                      {limitRemoteChainList.map((item, index) => {
                        return (
                          <li key={index} className="w-full truncate">
                            <a
                              onClick={() => {
                                limitStore.selectedRemoteChain = item;
                              }}
                            >
                              <span className="flex-1 text-sm text-center capitalize">
                                {item?.name}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="bg-base-100  mr-4 rounded-full h-10 flex items-center justify-center  w-[100px]">
                <ul className="menu menu-horizontal px-1 w-[100px] ">
                  <li tabIndex={0} className="w-full rounded-full">
                    <a className="w-full ">
                      <span className="text-sm capitalize truncate">
                        {limitRemote.supply.denom || '--'}
                      </span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 w-full p-2 bg-base-100">
                      {remoteSupplyList?.map((item: Coin, index: number) => {
                        if (!item?.denom?.includes('pool')) {
                          return (
                            <li key={index} className="w-full truncate">
                              <a
                                onClick={() => {
                                  limitStore.limitRemote.supply = item;
                                }}
                              >
                                <span className="flex-1 font-semibold text-center capitalize">
                                  {item?.denom}
                                </span>
                              </a>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <input
                type="number"
                className="w-full h-10 text-2xl font-semibold text-right bg-transparent focus-within:outline-none placeholder:font-normal placeholder:text-sm"
                placeholder="Amount"
                onChange={(event) => {
                  limitStore.limitRemote.amount = event.target.value;
                }}
                value={limitRemote.amount}
                min="0"
              />
            </div>
          </div>

          <div>
            <div className="p-5 mt-4 rounded-lg bg-base-200">
              <div className="flex items-center justify-between mb-2 text-sm">
                <div className="truncate">
                  Sell {limitNative.supply.denom} at rate
                </div>
                <div className="hidden font-semibold">Set to maket</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">{limitRate}</div>
                <div className="bg-base-100 px-2 rounded-full h-10 w-[160px] flex items-center justify-center hidden">
                  <Image
                    alt="logo"
                    src="/assets/images/Side.png"
                    width={20}
                    height={20}
                    className="w-7 h-7"
                  />
                  <div className="flex-1 font-semibold text-center capitalize">
                    {limitRemote.supply.denom}
                  </div>

                  <MdKeyboardArrowDown className="text-base" />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex-1 px-5 pt-3 pb-2 rounded-lg bg-base-200">
                <div className="mb-1 text-sm">makerReceivingAddress</div>
                <input
                  className="w-full h-10 text-xl bg-transparent focus-within:outline-none placeholder:text-sm placeholder:font-normal"
                  placeholder="NONE"
                  value={makerReceivingAddress}
                  onChange={(event) =>
                    (limitStore.makerReceivingAddress = event?.target?.value)
                  }
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="px-5 pt-3 pb-2 mr-4 rounded-lg bg-base-200">
                <div className="mb-1 text-sm">Taker Address (optional)</div>
                <input
                  className="h-10 text-xl bg-transparent focus-within:outline-none placeholder:text-sm placeholder:font-normal"
                  placeholder="NONE"
                  value={desiredTaker}
                  onChange={(event) =>
                    (limitStore.desiredTaker = event?.target?.value)
                  }
                />
              </div>
              <div className="px-5 pt-3 pb-2 rounded-lg bg-base-200">
                <div className="mb-1 text-sm text-right">Expires in</div>

                <div className="flex items-center">
                  <input
                    className="w-full h-10 text-xl text-right bg-transparent focus-within:outline-none placeholder:text-sm placeholder:font-normal"
                    placeholder="12"
                    type="number"
                    step="1"
                    min="0"
                    value={expirationTime}
                    onChange={(event) => {
                      limitStore.expirationTime = event.target.value;
                    }}
                    id="expiration-time"
                  />
                </div>
                <div className="flex-1 px-4 text-base rounded-full bg-base-100">
                  <select
                    className="w-full max-w-xs select select-sm"
                    onChange={(e) => {
                      limitStore.selectedTime = e.target.value;
                    }}
                    value={selectedTime}
                  >
                    {selectTimeList.map((option) => {
                      return (
                        <option key={option.key} value={option.option}>
                          {option.option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            {isConnected ? (
              <button
                className="w-full mt-6 text-lg capitalize btn btn-primary"
                disabled={btnDisabled()}
                onClick={() => onMakeOrder(wallets, chainCurrent, getClient)}
              >
                {parseFloat(limitNative.amount) >
                parseFloat(filterBalance(limitNative.supply.denom))
                  ? 'Insufficient Balance'
                  : 'Make Order'}
              </button>
            ) : (
              <ConnectWalletBtn btnClass="w-full mt-6 text-lg capitalize btn btn-primary" />
            )}
          </div>

          <div className="pb-3 mt-5 border rounded-lg dark:border-gray-700">
            <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
              Details
            </div>
            <div className="flex items-center justify-between px-4 pt-3 pb-1 text-sm">
              <div>You will receive</div>
              <div>≈ {limitRemote.amount}</div>
            </div>
            <div className="flex items-center justify-between px-4 pb-1 text-sm">
              <div>Minimum received after slippage (1%)</div>
              <div>
                ≈ {parseFloat((limitRemote.amount || 0) * 0.99).toFixed(6)}{' '}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {tab === 'order' ? <LimitOrder /> : null}

      {/* Transaction settings */}

      <input type="checkbox" id="modal-swap-setting" className="modal-toggle" />
      <label htmlFor="modal-swap-setting" className="cursor-pointer modal">
        <label htmlFor="" className="relative p-4 rounded-lg modal-box">
          <div>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Transaction settings</div>
              <label htmlFor="modal-swap-setting" className="cursor-pointer">
                <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
              </label>
            </div>
            <div className="mt-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
              Slippage tolerance
            </div>
            <div className="grid grid-cols-4 gap-4 mb-2">
              <div className="py-1 text-center bg-gray-100 rounded dark:bg-gray-600">
                1%
              </div>
              <div className="py-1 text-center bg-gray-100 rounded dark:bg-gray-600">
                3%
              </div>
              <div className="py-1 text-center bg-gray-100 rounded dark:bg-gray-600">
                5%
              </div>
              <input
                className="py-1 text-center bg-gray-100 rounded dark:bg-gray-600"
                type="number"
                min="0"
                placeholder="2.5%"
              />
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default LimitControls;
