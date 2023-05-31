import React, { useState, useEffect } from 'react';
import useWalletStore from '@/store/wallet';
import { Coin, StdFee } from '@cosmjs/stargate';
import { AtomicSwapConfig } from '@/utils/AtomicSwapConfig';
import { getBalanceList, useAssetsStore } from '@/store/assets';
import { useChainStore } from '@/store/chain';
import {
  MdKeyboardArrowDown,
  MdOutlineSettings,
  MdOutlineClose,
  MdArrowDownward,
} from 'react-icons/md';
import Image from 'next/image';
import TabItem from '@/components/TabItem';
import { useGetBalances } from '@/http/query/useGetBalances';
import fetchAtomicSwapList from '@/http/requests/get/fetchAtomicSwapList';
import { MakeSwapMsg } from '@/codegen/ibc/applications/atomic_swap/v1/tx';
import Long from 'long';
import toast from 'react-hot-toast';
import LimitOrder from './LimitOrder';
import { ConnectWalletBtn } from '@/components/ConnectWalletBtn';
interface SwapControlsProps {
  swapPair: { first: Coin; second: Coin; type: string };
  setSwapPair: (value: { first: Coin; second: Coin; type: string }) => void;
}

const LimitControls: React.FC<SwapControlsProps> = ({
  swapPair,
  setSwapPair,
}) => {
  const { chainCurrent } = useChainStore();
  const selectList = [
    { option: 'Seconds', key: 0 },
    { option: 'Minutes', key: 60 },
    { option: 'Hour', key: 60 * 60 },
    { option: 'Days', key: 24 * 60 * 60 },
    { option: 'Year', key: 365 * 24 * 60 * 60 },
  ];
  const {
    setBalance,
    wallets,
    isConnected,
    loading,
    getClient,
  } = useWalletStore();

  const { balanceList } = useAssetsStore();
  useEffect(() => {
    getBalanceList(chainCurrent?.restUrl, wallets?.[0]?.address);
  }, [chainCurrent, wallets]);

  const [makerReceivingAddress, setMakerReceivingAddress] = useState('');
  const [desiredTaker, setDesiredTaker] = useState('');
  const [selectFirst, setSelectFirst] = useState({});
  const [selectSecond, setSelectSecond] = useState({});
  const [currentAtomicSwap, setAtomicSwapList] = useState({});
  const [selectedChannel, setSelectChannel] = useState({});
  const [connected, setConnected] = useState(false);
  const [tab, setTab] = useState('limit');
  const [selectedTime, setselectedTime] = useState('Hour');
  const [expirationTime, setExpirationTime] = useState(1);
  const [limitRate, setLimitRate] = useState('0');
  const [firstSwapList, setFirstSwapList] = useState([]);
  const [secondSwapList, setSecondSwapList] = useState([]);

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
        if (wallet.chainInfo.chainID === chainCurrent.chainID) {
          return { rest: wallet.chainInfo.restUrl, acc: wallet.address };
        }
      })
      .filter((item) => item),
    onSuccess: onSuccess,
  });
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);
  useEffect(() => {
    if (isConnected) {
      setFirstSwapList([]);
      setSecondSwapList([]);
      setBalance([{ address: '', balances: [], id: '' }]);
      refetch();
    }
    if (!isConnected) {
      setBalance([{ address: '', balances: [], id: '' }]);
    }
  }, [chainCurrent, isConnected, loading]);

  useEffect(() => {
    setSwapPair((swapPair) => ({
      ...swapPair,
      type: tab,
    }));
    if (tab === 'limit') {
      // updataFirstCoinLimit(swapPair.first.amount);
      setSelectFirst({});
      setSelectSecond({});
      setSelectChannel({});
      fetchSwapList('sell');
      const findItem = AtomicSwapConfig.find((item) => {
        if (item.chain === chainCurrent.name) {
          return item;
        }
      });
      if (findItem?.counterparties) {
        setAtomicSwapList(findItem);
      }
    }
  }, [tab, chainCurrent]);

  useEffect(() => {
    if (selectFirst?.denom) {
      updataFirstCoinLimit(swapPair.first.amount, selectFirst?.denom);
    } else {
      updataFirstCoinLimit('0', '');
    }
  }, [selectFirst]);

  useEffect(() => {
    if (selectedChannel?.endpoint) {
      fetchSwapList('buy', selectedChannel?.endpoint);
    }
  }, [selectedChannel]);

  useEffect(() => {
    if (selectSecond?.denom) {
      updataSecondCoinLimit(swapPair.second.amount, selectSecond?.denom);
    } else {
      updataSecondCoinLimit('0', '');
    }
  }, [selectSecond]);

  useEffect(() => {
    if (firstSwapList?.length > 0) {
      setSelectFirst(firstSwapList?.[0]);
    }
  }, [firstSwapList]);

  useEffect(() => {
    if (secondSwapList?.length > 0) {
      setSelectSecond(secondSwapList?.[0]);
    }
  }, [secondSwapList]);

  useEffect(() => {
    if (currentAtomicSwap?.counterparties?.length > 0) {
      setSelectChannel(currentAtomicSwap?.counterparties?.[0]);
    }
  }, [currentAtomicSwap]);
  const fetchSwapList = async (position: string, url?: string) => {
    let list = [];
    if (position === 'sell') {
      setFirstSwapList([]);
      const list = await fetchAtomicSwapList(chainCurrent.restUrl);
      setFirstSwapList(list);
    }
    if (position === 'buy' && url) {
      setSecondSwapList([]);
      const list = await fetchAtomicSwapList(url);
      setSecondSwapList(list);
    }
  };
  const filterBalance = (denom: string) => {
    const balances = balanceList;
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
    if (
      parseFloat(swapPair.first.amount) <= 0 ||
      parseFloat(swapPair.second.amount) <= 0
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

    const sellToken = swapPair.first;
    const buyToken = swapPair.second;
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
  // TODO:
  const switchSwap = async () => {};
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
                Balance: {filterBalance(swapPair.first?.denom)}
              </div>
              <div
                className="font-semibold cursor-pointer"
                onClick={() =>
                  updataFirstCoinLimit(filterBalance(swapPair.first?.denom))
                }
              >
                Max
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="bg-base-100  mr-4 px-2 rounded-full h-10 w-[160px] flex items-center justify-center">
                <ul className="w-full px-1 menu menu-horizontal">
                  <li tabIndex={0} className="w-full">
                    <a className="w-full text-sm truncate">
                      {firstSwapList?.length === 0
                        ? 'loading...'
                        : swapPair.first?.denom}
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 w-full p-2 bg-base-100">
                      {firstSwapList.map((item, index) => {
                        if (!item?.denom?.includes('pool')) {
                          return (
                            <li key={index} className="w-full truncate">
                              <a onClick={() => setSelectFirst(item)}>
                                <span className="flex-1 font-semibold text-center capitalize">
                                  {item?.denom}
                                </span>
                              </a>
                            </li>
                          );
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
                onChange={(event) => updataFirstCoinLimit(event.target.value)}
                value={swapPair.first.amount}
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
                Balance: {filterBalance(swapPair.second?.denom)}
              </div>
              <div
                className="font-semibold cursor-pointer"
                onClick={() =>
                  updataSecondCoinLimit(filterBalance(swapPair.second?.denom))
                }
              >
                Max
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className=" mr-4  w-[100px]">
                <ul className="menu menu-horizontal bg-base-100 rounded-full px-1 w-[110px]">
                  <li tabIndex={0} className="w-full">
                    <a className="w-full text-sm truncate">
                      {currentAtomicSwap?.counterparties?.length === 0
                        ? 'loading...'
                        : selectedChannel?.name}
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 w-full p-2 bg-base-100">
                      {currentAtomicSwap?.counterparties?.map((item, index) => {
                        return (
                          <li key={index} className="w-full truncate">
                            <a onClick={() => setSelectChannel(item)}>
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
                        {secondSwapList?.length === 0
                          ? 'loading...'
                          : swapPair.second?.denom}
                      </span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 w-full p-2 bg-base-100">
                      {secondSwapList?.map((item, index) => {
                        if (!item?.denom?.includes('pool')) {
                          return (
                            <li key={index} className="w-full truncate">
                              <a onClick={() => setSelectSecond(item)}>
                                <span className="flex-1 font-semibold text-center capitalize">
                                  {item?.denom}
                                </span>
                              </a>
                            </li>
                          );
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
                onChange={(event) => updataSecondCoinLimit(event.target.value)}
                value={swapPair.second.amount}
                min="0"
              />
            </div>
          </div>

          <div>
            <div className="p-5 mt-4 rounded-lg bg-base-200">
              <div className="flex items-center justify-between mb-2 text-sm">
                <div className="truncate">
                  Sell {swapPair.first.denom} at rate
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
                    {swapPair.second?.denom}
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
                    setMakerReceivingAddress(event?.target?.value)
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
                  onChange={(event) => setDesiredTaker(event?.target?.value)}
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
                    onChange={(event) => setExpirationTime(event.target.value)}
                    id="expiration-time"
                  />
                  {/* <div className="flex-1 px-4 text-base rounded-full bg-base-100">
                    <select
                      className="w-full max-w-xs select select-sm"
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
                  </div> */}
                </div>
                <div className="flex-1 px-4 text-base rounded-full bg-base-100">
                  <select
                    className="w-full max-w-xs select select-sm"
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
              <ConnectWalletBtn btnClass="w-full mt-6 text-lg capitalize btn btn-primary" />
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
