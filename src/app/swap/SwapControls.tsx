import React, { useState, useEffect } from 'react';
import { Wallet } from '@/shared/types/wallet';
import useWalletStore from '@/store/wallet';
import { CoinInput } from '@/components/CoinInput';
import {
  MdOutlineSettings,
  MdOutlineClose,
  MdArrowDownward,
} from 'react-icons/md';
import { getBalanceList, useAssetsStore } from '@/store/assets';
import { usePoolStore } from '@/store/pool';
import { useSwapStore, updateCoinAmount, onSwap } from '@/store/swap';
import { useChainStore } from '@/store/chain';
import SwapCoins from './SwapCoins';
import { ConnectWalletBtn } from '@/components/ConnectWalletBtn';
interface SwapControlsProps {}

const SwapControls: React.FC<SwapControlsProps> = () => {
  const { swapPair, swapLoading } = useSwapStore();
  const { wallets, isConnected, getClient } = useWalletStore();
  const { chainCurrent, chainList } = useChainStore();
  const { balanceList } = useAssetsStore();
  const { poolList } = usePoolStore();
  const [connected, setConnected] = useState(false);
  // getPoolList(chainCurrent?.restUrl)

  useEffect(() => {
    getBalanceList(
      chainCurrent?.restUrl,
      wallets.find((wallet: Wallet) => {
        if (wallet.chainInfo.chainID === chainCurrent?.chainID) {
          return wallet;
        }
      })?.address || ''
    );
  }, [chainCurrent, wallets]);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  const filterBalance = (denom: string) => {
    const balances = balanceList || [];
    return (
      balances.find((item) => {
        return item.denom === denom;
      })?.amount || '0'
    );
  };

  return (
    <div className="p-5 bg-base-100 w-[500px] rounded-lg mx-auto mt-10 shadow mb-20">
      <div className="flex items-center justify-between mb-5">
        <div className="inline-flex items-center bg-gray-100 rounded-full tabs dark:bg-gray-700">
          <div className="tab tab-sm px-4 bg-primary text-white rounded-full">
            Swap
          </div>
        </div>

        <label htmlFor="modal-swap-setting" className="!hidden">
          <MdOutlineSettings className="text-xl cursor-pointer" />
        </label>
      </div>
      {/* swap */}
      <div>
        <div className="p-5 rounded-lg bg-base-200">
          <div className="flex items-center mb-2">
            <div className="flex-1">
              Sell
              <span className="text-sm ml-1">({chainCurrent.name})</span>
            </div>
            <div className="mr-2">
              Balance: {filterBalance(swapPair.native?.denom)}
            </div>
            <div
              className="font-semibold cursor-pointer"
              onClick={() =>
                updateCoinAmount(
                  filterBalance(swapPair.native?.denom),
                  'native',
                  poolList
                )
              }
            >
              Max
            </div>
          </div>

          <div className="flex items-center mb-2">
            <SwapCoins type="native" />
            <CoinInput
              coin={swapPair.native}
              placeholder="Amount"
              onChange={(value) => {
                updateCoinAmount(value, 'native', poolList);
              }}
            />
          </div>

          <div className="flex items-center text-gray-500 dark:text-gray-400 !hidden">
            <div className="flex-1">Side Hub</div>
            <div></div>
          </div>
        </div>
        <div className="flex items-center justify-center -mt-5 -mb-5">
          <div className="bg-white dark:bg-gray-700 rounded-full shadow w-14 h-14 flex items-center justify-center">
            <MdArrowDownward className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
        <div className="p-5 rounded-lg bg-base-200">
          <div className="flex items-center mb-2">
            <div className="flex-1">
              Buy
              <span className="text-sm ml-1">
                (
                {
                  chainList.find((item) => {
                    if (item.denom === swapPair?.remote?.denom) {
                      return item;
                    }
                  })?.name
                }
                )
              </span>
            </div>
            <div className="mr-2">
              Balance: {filterBalance(swapPair.remote?.denom)}
            </div>
            <div
              className="font-semibold cursor-pointer"
              onClick={() =>
                updateCoinAmount(
                  filterBalance(swapPair.remote?.denom),
                  'remote',
                  poolList
                )
              }
            >
              Max
            </div>
          </div>

          <div className="flex items-center mb-2">
            <SwapCoins type="remote" />
            <CoinInput
              coin={swapPair.remote}
              placeholder="Amount"
              onChange={(value) => {
                updateCoinAmount(value, 'remote', poolList);
              }}
            />
          </div>

          <div className="flex items-center text-gray-500 dark:text-gray-400 !hidden">
            <div className="flex-1">Side Hub</div>
            <div>~$9999</div>
          </div>
        </div>
        {connected ? (
          <button
            className="w-full mt-6 text-lg capitalize btn btn-primary"
            disabled={
              parseFloat(swapPair.native.amount) >
                parseFloat(filterBalance(swapPair.native?.denom)) ||
              !parseFloat(swapPair.native?.amount) ||
              !parseFloat(swapPair.remote?.amount) ||
              swapLoading
            }
            onClick={() => onSwap(wallets, getClient)}
          >
            {parseFloat(swapPair.native.amount) >
            parseFloat(filterBalance(swapPair.native?.denom))
              ? 'Insufficient Balance'
              : 'Swap'}
          </button>
        ) : (
          <ConnectWalletBtn
            btnClass={'w-full mt-6 text-lg capitalize btn btn-primary'}
          />
        )}
        <div className="pb-3 mt-5 border rounded-lg dark:border-gray-700">
          <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
            Details
          </div>
          <div className="flex items-center justify-between px-4 pt-3 pb-1 text-sm">
            <div>You will receive</div>
            <div>
              ≈ {swapPair.remote?.amount} {swapPair.remote?.denom}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 pb-1 text-sm">
            <div>Minimum received after slippage (1%)</div>
            <div>
              ≈ {parseFloat((swapPair.remote?.amount || 0) * 0.99).toFixed(6)}{' '}
              {swapPair.remote?.denom}
            </div>
          </div>
        </div>
      </div>

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

export default function SwapControlsDash() {
  const { poolList, poolLoading } = usePoolStore();
  if (poolList.length === 0 && !poolLoading) {
    return (
      <div className="p-5 bg-base-100 w-[500px] rounded-lg mx-auto mt-10 shadow mb-20">
        <div>
          There is no pool currently, please switch to the pool page to add a
          new pool
        </div>
      </div>
    );
  }
  return <SwapControls />;
}
