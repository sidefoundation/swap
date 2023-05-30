import React, { useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import useWalletStore from '@/store/wallet';
import {
  chainStore,
  fetchChainCoinList,
  useChainStore,
  rechargeCoins,
} from '@/store/chain';
import { Coin } from '@cosmjs/stargate';
function FaucetModal() {
  const {
    chainCoinListNative,
    chainFaucetCoin,
    chainFaucetAmount,
    chainFaucetLoading,
  } = useChainStore();
  const { selectedChain, wallets } = useWalletStore();

  useEffect(() => {
    if (selectedChain?.restUrl) {
      fetchChainCoinList(selectedChain.restUrl, 'Native');
    }
  }, [selectedChain]);

  useEffect(() => {
    if (!chainFaucetCoin?.denom && chainCoinListNative?.length > 0) {
      chainStore.chainFaucetCoin = chainCoinListNative[0] as Coin;
    }
  }, [chainCoinListNative, chainFaucetCoin]);
  return (
    <div>
      <div
        className="modal cursor-pointer pointer-events-auto opacity-100 visible"
        onClick={() => {
          chainStore.showFaucetModal = false;
        }}
      >
        <div
          className="modal-box cursor-default "
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-medium">
                Faucet
                <span className="text-sm ml-4 px-3 py-[2px] bg-base-200 rounded-full">
                  {selectedChain.name}
                </span>
              </h3>
              <label
                htmlFor="modal-faucet-modal"
                className="cursor-pointer"
                onClick={() => {
                  chainStore.showFaucetModal = false;
                }}
              >
                <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
              </label>
            </div>

            <div className="mb-2 text-sm">Select One Coin</div>

            <div className="mb-4">
              {chainCoinListNative.map((item, index) => {
                if (item?.denom?.length > 10) {
                  return null;
                }
                return (
                  <div
                    key={index}
                    onClick={() => {
                      chainStore.chainFaucetCoin = item;
                    }}
                    className={`cursor-pointer text-sm inline-block my-1 mr-4 px-4 py-1 bg-base-200 rounded ${
                      chainFaucetCoin?.denom === item?.denom
                        ? 'bg-primary text-white'
                        : ''
                    }`}
                  >
                    <span className=" capitalize">{item?.denom || '--'}</span>
                  </div>
                );
              })}
            </div>

            <div className="mb-2 text-sm">Enter Faucet Amount</div>

            <input
              value={chainFaucetAmount || ''}
              onChange={(e) => {
                chainStore.chainFaucetAmount = e.target.value;
              }}
              placeholder="Amount"
              className="w-full placeholder:text-sm dark:text-white border border-gray-200  dark:border-gray-700 bg-base-200 rounded-lg text-base px-4 h-10 focus-within:outline-gray-300 dark:focus-within:outline-gray-800"
            />
            <div className="mt-2">
              <span className="text-sm">Max: </span>
              <span className="text-sm">{chainFaucetCoin.amount}</span>
            </div>
            <div className="text-right mt-6 ">
              <button
                className="mr-2 truncate btn-primary btn w-full"
                onClick={() => rechargeCoins(wallets, selectedChain)}
                disabled={chainFaucetLoading || !chainFaucetAmount}
              >
                Faucet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChainFaucetModal() {
  const { showFaucetModal } = useChainStore();
  if (!showFaucetModal) {
    return null;
  }
  return <FaucetModal />;
}
