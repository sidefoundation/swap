import React, { useState, useEffect } from 'react';
import useWalletStore from '@/store/wallet';
import { CoinInput } from '@/components/CoinInput';
import { Coin, StdFee } from '@cosmjs/stargate';
import { AtomicSwapConfig } from '@/utils/AtomicSwapConfig';

import {
  MdKeyboardArrowDown,
  MdOutlineSettings,
  MdOutlineClose,
} from 'react-icons/md';
import Image from 'next/image';
import SwapOrder from './SwapOrder';
import TabItem from './TabItem';
import { useGetBalances } from '@/http/query/useGetBalances';
import fetchAtomicSwapList from '@/http/requests/get/fetchAtomicSwapList';
import { MsgSwapRequest } from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import { MakeSwapMsg } from '@/codegen/ibc/applications/atomic_swap/v1/tx';
import { Height } from '@/codegen/ibc/core/client/v1/client';
import Long from 'long';
import toast from 'react-hot-toast';
// import { Coin } from '@/codegen/cosmos/base/v1beta1/coin';

interface SwapControlsProps {
  swapPair: { first: Coin; second: Coin; type: string };
  setSwapPair: (value: { first: Coin; second: Coin; type: string }) => void;
  updateFirstCoin: (value: string) => void;
  updateSecondCoin: (value: string) => void;
  onSwap: (direction: '->' | '<-') => Promise<void>;
}
const selectList = [
  { option: 'Seconds', key: 0 },
  { option: 'Minutes', key: 60 },
  { option: 'Hour', key: 60 * 60 },
  { option: 'Days', key: 24 * 60 * 60 },
  { option: 'Year', key: 365 * 24 * 60 * 60 },
];
const SwapControls: React.FC<SwapControlsProps> = ({
  swapPair,
  setSwapPair,
  updateFirstCoin,
  updateSecondCoin,
  onSwap,
}) => {
  const {
    selectedChain,
    setBalance,
    balanceList,
    wallets,
    isConnected,
    connectWallet,
    loading,
    getClient,
    getBalance,
  } = useWalletStore();
  const [selectFirst, setSelectFirst] = useState({});
  const [selectSecond, setSelectSecond] = useState({});
  const [currentAtomicSwap, setAtomicSwapList] = useState({});
  const [selectedChannel, setSelectChannel] = useState({});
  const [connected, setConnected] = useState(false);
  const [tab, setTab] = useState('swap');
  const [selectedTime, setselectedTime] = useState('Hour');
  const [expirationTime, onExpirationTime] = useState(1);
  const [limitRate, setLimitRate] = useState('0');
  const [firstSwapList, setFirstSwapList] = useState([]);
  const [secondSwapList, setSecondSwapList] = useState([]);
  const [balances, setBalances] = useState<
    {
      id: string;
      balances: Coin[];
      address: string;
    }[]
  >([]);
  const fetchBalances = async () => {
    const balance = await getBalance(true);
    setBalances(balance);
  };
  const onSuccess = (
    data: {
      address: string;
      balances: Coin[];
      id: string;
    }[]
  ) => {
    setBalance(data);
  };
  const { refetch } = useGetBalances({
    wallets: wallets
      .map((wallet) => {
        if (wallet.chainInfo.chainID === selectedChain.chainID) {
          return { rest: wallet.chainInfo.restUrl, acc: wallet.address };
        }
      })
      .filter((item) => item),
    onSuccess: onSuccess,
  });
  useEffect(() => {
    refetch();
    fetchBalances();
  }, []);
  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);
  useEffect(() => {
    if (isConnected) {
      setBalance([{ address: '', balances: [], id: '' }]);
      refetch();
    }
    if (!isConnected) {
      setBalance([{ address: '', balances: [], id: '' }]);
    }
  }, [selectedChain, isConnected, loading]);
  useEffect(() => {
    setSwapPair((swapPair) => ({
      ...swapPair,
      type: tab,
    }));
    if (tab === 'swap') {
      updateFirstCoin(swapPair.first.amount);
    }
    if (tab === 'limit') {
      updataFirstCoinLimit(swapPair.first.amount);
      fetchSwapList('sell');
      setAtomicSwapList(
        AtomicSwapConfig.find((item) => {
          return (item.chainID = selectedChain.chainID);
        })
      );
      console.log(currentAtomicSwap, 'currentAtomicSwap');
    }
  }, [tab]);
  useEffect(() => {
    console.log(selectFirst, selectFirst, 'selectFirst', AtomicSwapConfig);
    updataFirstCoinLimit(swapPair.first.amount, selectFirst?.denom);
  }, [selectFirst]);
  useEffect(() => {
    console.log(selectedChannel, 'selectedChannel');
    if (selectedChannel?.endpoint) {
      fetchSwapList('buy', selectedChannel?.endpoint);
    }
    // updataFirstCoinLimit(swapPair.first.amount, selectFirst?.denom);
  }, [selectedChannel]);

  useEffect(() => {
    console.log(selectFirst, selectFirst, 'selectFirst', AtomicSwapConfig);
    updataSecondCoinLimit(swapPair.second.amount, selectSecond?.denom);
  }, [selectSecond]);
  const fetchSwapList = async (position: string, url?: string) => {
    if (position === 'sell') {
      const list = await fetchAtomicSwapList(selectedChain.restUrl);
      setFirstSwapList(list);
    }
    if (position === 'buy' && url) {
      const list = await fetchAtomicSwapList(url);
      setSecondSwapList(list);
    }
    console.log(99, 'lsi', list);
  };
  const filterBalance = (denom: string) => {
    const balances = balanceList[0]?.balances || [];
    return (
      balances.find((item) => {
        return item.denom === denom;
      })?.amount || 0
    );
  };
  // get buy chain
  // const up
  // limit input
  const updataFirstCoinLimit = (value: string, denom?: string) => {
    setSwapPair((swapPair) => ({
      ...swapPair,
      first: { denom: denom || swapPair.first.denom, amount: value },
    }));
    if (!!parseFloat(value) || !!parseFloat(swapPair.second.amount)) {
      setLimitRate('0');
    }
    if (!!parseFloat(value) && !!parseFloat(swapPair.second.amount)) {
      const rate = (
        parseFloat(value) / parseFloat(swapPair.second.amount)
      ).toFixed(8);
      setLimitRate(rate);
    }
  };
  const updataSecondCoinLimit = (value: string, denom?: string) => {
    setSwapPair((swapPair) => ({
      ...swapPair,
      second: { denom: denom || swapPair.second.denom, amount: value },
    }));
    if (!!parseFloat(value) || !!parseFloat(swapPair.first.amount)) {
      setLimitRate('0');
    }
    if (!!parseFloat(value) && !!parseFloat(swapPair.first.amount)) {
      const rate = (
        parseFloat(swapPair.first.amount) / parseFloat(value)
      ).toFixed(8);
      setLimitRate(rate);
    }
  };

  const onMakeOrder = async () => {
    console.log(expirationTime, 'expirationTime', 'selectedTime', selectedTime);
    if (
      parseFloat(swapPair.first.amount) <= 0 ||
      parseFloat(swapPair.second.amount) <= 0
    ) {
      toast.error('Please input token pair value');
      return;
    }
    const sourceWallet = wallets.find(
      (wallet) => selectedChain.chainID === wallet.chainInfo.chainID
    );
    const targetWallet = wallets.find(
      (wallet) => selectedChain.chainID !== wallet.chainInfo.chainID
    );
    if (sourceWallet === undefined || targetWallet === undefined) {
      toast.error('sourceWallet or targetWallet not found');
      return;
    }
    const client = await getClient(sourceWallet.chainInfo);

    // need to confirm balance exist
    const srcBalances = balances.find(
      (bal) => bal.id === sourceWallet.chainInfo.chainID
    );
    const tarBalances = balances.find(
      (bal) => bal.id === targetWallet.chainInfo.chainID
    );
    // || tarBalances === undefined
    console.log(srcBalances, tarBalances, 'tarBalances');
    if (srcBalances === undefined) {
      return;
    }

    const sellToken = srcBalances?.balances?.find(
      (bal) => bal.denom == swapPair.first?.denom
    );
    const buyToken = tarBalances?.balances?.find(
      (bal) => bal.denom == swapPair.second?.denom
    );
    // || buyToken === undefined
    if (sellToken === undefined) {
      return;
    }

    // Get current date
    const currentDate = new Date();

    // Get current timestamp in milliseconds
    const currentTimestamp = currentDate.getTime();

    // Calculate the timestamp for 24 hours from now
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const expirationTimestamp = currentTimestamp + oneDayInMilliseconds;

    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); //
    const makeOrderMsg: MakeSwapMsg = {
      sourcePort: 'swap',
      sourceChannel: 'channel-1',
      sellToken: sellToken,
      buyToken: buyToken,
      makerAddress: sourceWallet.address,
      makerReceivingAddress: sourceWallet.address,
      desiredTaker: '',
      createTimestamp: Long.fromNumber(currentTimestamp),
      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimestamp: timeoutTimeStamp,
      expirationTimestamp: Long.fromInt(expirationTimestamp),
    };
    const msg = {
      typeUrl: '/ibc.applications.atomic_swap.v1.MakeSwapMsg',
      value: makeOrderMsg,
    };
    console.log(client);

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
    console.log('onMakeOrder', wallets, sourceWallet, selectedChain);
  };
  // TODO:
  const switchSwap = async () => {};
  return (
    <div className="p-5 bg-base-100 w-[500px] rounded-lg mx-auto mt-10 shadow mb-20">
      <div className="flex items-center justify-between mb-5">
        <div className="inline-flex items-center bg-gray-100 rounded-full tabs dark:bg-gray-700">
          <TabItem tab={tab} setTab={setTab} title="Swap" value="swap" />
          <TabItem tab={tab} setTab={setTab} title="Limit" value="limit" />
          <TabItem tab={tab} setTab={setTab} title="Order" value="order" />
        </div>

        <label htmlFor="modal-swap-setting">
          <MdOutlineSettings className="text-xl cursor-pointer" />
        </label>
      </div>
      {/* swap */}
      {tab === 'swap' ? (
        <div>
          <div className="p-5 rounded-lg bg-base-200">
            <div className="flex items-center mb-2">
              <div className="flex-1">Sell</div>
              <div className="mr-2">
                Balance: {filterBalance(swapPair.first?.denom)}
              </div>
              <div className="font-semibold cursor-pointer" onClick={() => {}}>
                Max
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
                <Image
                  alt="logo"
                  src="/assets/images/Side.png"
                  width={20}
                  height={20}
                  className="w-7 h-7"
                />
                <div className="flex-1 font-semibold text-center capitalize">
                  {swapPair.first?.denom}
                </div>

                <MdKeyboardArrowDown className="text-base" />
              </div>

              <CoinInput
                coin={swapPair.first}
                placeholder="Amount"
                onChange={updateFirstCoin}
              />
            </div>

            <div className="flex items-center text-gray-500 dark:text-gray-400 hidden">
              <div className="flex-1">Side Hub</div>
              <div></div>
            </div>
          </div>
          <div className="flex items-center justify-center -mt-5 -mb-5">
            <Image
              alt="switch"
              src="/assets/images/switch.png"
              width="20"
              height="20"
              className="bg-white rounded-full shadow w-14 h-14 "
              onClick={() => switchSwap()}
            />
          </div>
          <div className="p-5 rounded-lg bg-base-200">
            <div className="flex items-center mb-2">
              <div className="flex-1">Buy</div>
              <div className="mr-2">
                Balance: {filterBalance(swapPair.second?.denom)}
              </div>
              <div className="font-semibold cursor-pointer" onClick={() => {}}>
                Max
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
                <Image
                  alt="logo"
                  src="/assets/images/Side.png"
                  width={20}
                  height={20}
                  className="w-7 h-7"
                />
                <div className="flex-1 font-semibold text-center capitalize">
                  {swapPair.second?.denom}
                </div>

                <MdKeyboardArrowDown className="text-base" />
              </div>
              <CoinInput
                coin={swapPair.second}
                placeholder="Amount"
                onChange={updateSecondCoin}
              />
            </div>

            <div className="flex items-center text-gray-500 dark:text-gray-400 hidden">
              <div className="flex-1">Side Hub</div>
              <div>~$9999</div>
            </div>
          </div>
          {connected ? (
            <button
              className="w-full mt-6 text-lg capitalize btn btn-primary"
              disabled={
                parseFloat(swapPair.first.amount) >
                  parseFloat(filterBalance(swapPair.first?.denom)) ||
                !parseFloat(swapPair.first?.amount) ||
                !parseFloat(swapPair.second?.amount)
              }
              onClick={() => onSwap('->')}
            >
              {parseFloat(swapPair.first.amount) >
              parseFloat(filterBalance(swapPair.first?.denom))
                ? 'Insufficient Balance'
                : 'Swap'}
            </button>
          ) : (
            <button
              className="w-full mt-6 text-lg capitalize btn btn-primary"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}

          {/*<button
            className="flex-grow mt-4 text-2xl font-semibold rounded-full md:mt-0 btn btn-primary btn-lg hover:text-base-100"
            onClick={() => onSwap('<-')}
          >
            {'SWAP <-'}
          </button> */}
          <div className="pb-3 mt-5 border rounded-lg dark:border-gray-700">
            <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
              Details
            </div>
            <div className="flex items-center justify-between px-4 pt-3 pb-1 text-sm">
              <div>You will receive</div>
              <div>
                ≈ {swapPair.second?.amount} {swapPair.second?.denom}
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pb-1 text-sm">
              <div>Minimum received after slippage (1%)</div>
              <div>
                ≈ {parseFloat((swapPair.second?.amount || 0) * 0.99).toFixed(6)}{' '}
                {swapPair.second?.denom}
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pb-1 text-sm">
              <div>Price impact</div>
              <div>{`--`}</div>
            </div>
            <div className="flex items-center justify-between px-4 pb-1 text-sm">
              <div>Swap fees</div>
              <div>≈ {`--`}</div>
            </div>
          </div>
        </div>
      ) : null}
      {/* limit */}
      {tab === 'limit' ? (
        <div>
          {/* first */}
          <div className="p-5 rounded-lg bg-base-200">
            <div className="flex items-center mb-2">
              <div className="flex-1">Sell</div>
              <div className="mr-2">
                Balance: {filterBalance(swapPair.first?.denom)}
              </div>
              <div className="font-semibold cursor-pointer" onClick={() => {}}>
                Max
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
                <ul className="menu menu-horizontal px-1 w-full">
                  <li tabIndex={0} className="w-full">
                    <a className="w-full truncate font-semibold">
                      {swapPair.first?.denom}
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="p-2 bg-base-100 z-10 w-full">
                      {firstSwapList.map((item, index) => {
                        return (
                          <li key={index} className="truncate w-full">
                            <a onClick={() => setSelectFirst(item)}>
                              {/* <Image
                                alt="logo"
                                src="/assets/images/Side.png"
                                width={20}
                                height={20}
                                className="w-7 h-7"
                              /> */}
                              <span className="flex-1 font-semibold text-center capitalize">
                                {item?.denom}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>

              {tab === 'limit' && (
                <CoinInput
                  coin={swapPair.first}
                  placeholder="Amount"
                  onChange={updataFirstCoinLimit}
                />
              )}
            </div>

            <div className="flex items-center text-gray-500 dark:text-gray-400 hidden">
              <div className="flex-1">Side Hub</div>
              <div></div>
            </div>
          </div>
          {/* switch icon */}
          <div className="flex items-center justify-center -mt-5 -mb-5">
            <Image
              alt="switch"
              src="/assets/images/switch.png"
              width="20"
              height="20"
              className="bg-white rounded-full shadow w-14 h-14 "
              onClick={() => switchSwap()}
            />
          </div>
          {/* second */}
          <div className="p-5 rounded-lg bg-base-200">
            <div className="flex items-center mb-2">
              <div className="flex-1 flex">
                <span>Buy</span>
                <div className="w-[160px]">
                  <ul className="menu menu-horizontal px-1 w-full">
                    <li tabIndex={0} className="w-full">
                      <a className="w-full truncate font-semibold">
                        {selectedChannel?.name}
                        <MdKeyboardArrowDown className="fill-current" />
                      </a>
                      <ul className="p-2 bg-base-100 z-10 w-full">
                        {currentAtomicSwap?.atomic_swap?.counterparties?.map(
                          (item, index) => {
                            return (
                              <li key={index} className="truncate w-full">
                                <a onClick={() => setSelectChannel(item)}>
                                  <span className="flex-1 font-semibold text-center capitalize">
                                    {item?.name}
                                  </span>
                                </a>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mr-2">
                Balance: {filterBalance(swapPair.second?.denom)}
              </div>
              <div className="font-semibold cursor-pointer" onClick={() => {}}>
                Max
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
                <ul className="menu menu-horizontal px-1 w-full">
                  <li tabIndex={0} className="w-full">
                    <a className="w-full truncate font-semibold">
                      {swapPair.second?.denom}
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="p-2 bg-base-100 z-10 w-full">
                      {secondSwapList?.map((item, index) => {
                        return (
                          <li key={index} className="truncate w-full">
                            <a onClick={() => setSelectSecond(item)}>
                              <span className="flex-1 font-semibold text-center capitalize">
                                {item?.denom}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>

              {tab === 'limit' && (
                <CoinInput
                  coin={swapPair.second}
                  placeholder="Amount"
                  onChange={updataSecondCoinLimit}
                />
              )}
            </div>

            <div className="flex items-center text-gray-500 dark:text-gray-400 hidden">
              <div className="flex-1">Side Hub</div>
              <div>~$9999</div>
            </div>
          </div>

          <div>
            <div className="p-5 mt-4 rounded-lg bg-base-200">
              <div className="flex items-center justify-between mb-2 text-sm">
                <div className="truncate">
                  Sell {swapPair.first.denom} at rate
                </div>
                <div className="font-semibold hidden">Set to maket</div>
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
                    {swapPair.second?.denom}
                  </div>

                  <MdKeyboardArrowDown className="text-base" />
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="px-5 pt-3 pb-2 mr-4 rounded-lg bg-base-200">
                <div className="mb-1 text-sm">Taker Address (optional)</div>
                <input
                  className="h-10 text-xl bg-transparent focus-within:outline-none placeholder:text-sm placeholder:font-normal"
                  placeholder="NONE"
                />
              </div>
              <div className="px-5 pt-3 pb-2 rounded-lg bg-base-200">
                <div className="mb-1 text-sm text-right">Expires in</div>
                <div className="flex items-center">
                  <input
                    className="w-[80px] focus-within:outline-none bg-transparent h-10 text-xl placeholder:text-sm placeholder:font-normal"
                    placeholder="12"
                    type="number"
                    step="1"
                    min="0"
                    value={expirationTime}
                    onChange={(event) => onExpirationTime(event.target.value)}
                    id="expiration-time"
                  />
                  <div className="flex-1 px-4 text-base rounded-full bg-base-100">
                    <select
                      className="select w-full max-w-xs select-sm"
                      onChange={(e) => setselectedTime(e.target.value)}
                      value={selectedTime}
                    >
                      {selectList.map((option) => {
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
            </div>
            {connected ? (
              <button
                className="w-full mt-6 text-lg capitalize btn btn-primary"
                disabled={
                  parseFloat(swapPair.first.amount) >
                    parseFloat(filterBalance(swapPair.first?.denom)) ||
                  !parseFloat(swapPair.first?.amount) ||
                  !parseFloat(swapPair.second?.amount)
                }
                onClick={onMakeOrder}
              >
                {parseFloat(swapPair.first.amount) >
                parseFloat(filterBalance(swapPair.first?.denom))
                  ? 'Insufficient Balance'
                  : 'Make Order'}
              </button>
            ) : (
              <button
                className="w-full mt-6 text-lg capitalize btn btn-primary"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}
          </div>

          <div className="pb-3 mt-5 border rounded-lg dark:border-gray-700">
            <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
              Details
            </div>
            <div className="flex items-center justify-between px-4 pt-3 pb-1 text-sm">
              <div>You will receive</div>
              <div>
                ≈ {swapPair.second?.amount} {swapPair.second?.denom}
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pb-1 text-sm">
              <div>Minimum received after slippage (1%)</div>
              <div>
                ≈ {parseFloat((swapPair.second?.amount || 0) * 0.99).toFixed(6)}{' '}
                {swapPair.second?.denom}
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pb-1 text-sm">
              <div>Price impact</div>
              <div>{`--`}</div>
            </div>
            <div className="flex items-center justify-between px-4 pb-1 text-sm">
              <div>Swap fees</div>
              <div>≈ {`--`}</div>
            </div>
          </div>
        </div>
      ) : null}

      {tab === 'order' ? <SwapOrder /> : null}

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

export default SwapControls;
