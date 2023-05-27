import React, { useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import useWalletStore from '@/store/wallet';
import { chainStore, fetchChainCoinList, useChainStore,rechargeCoins,chainFaucetLoading } from '@/store/chain';
import { Coin } from '@cosmjs/stargate';
export default function FaucetModal() {
  const { chainCoinListNative, chainFaucetCoin, chainFaucetAmount } =
    useChainStore();
  const { selectedChain,wallets } = useWalletStore();
  useEffect(() => {
    if (selectedChain?.restUrl) {
      fetchChainCoinList(selectedChain.restUrl, 'Native');
    }
  }, [selectedChain]);

  useEffect(() => {
    console.log(chainCoinListNative, chainCoinListNative[0]);
    if (!chainFaucetCoin?.denom && chainCoinListNative?.length > 0) {
      chainStore.chainFaucetCoin = chainCoinListNative[0] as Coin;
    }
  }, [chainCoinListNative]);
  return (
    <div>
      <input type="checkbox" id="modal-faucet-modal" className="modal-toggle" />
      <label htmlFor="modal-faucet-modal" className="modal cursor-pointer">
        <label className="modal-box " htmlFor="">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                Faucet
                <span className="text-sm ml-1">({selectedChain.name})</span>
              </h3>
              <label htmlFor="modal-faucet-modal" className="cursor-pointer">
                <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
              </label>
            </div>
            <div className="py-4">
              <div className="flex flex-col">
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
                        className={`cursor-pointer text-sm inline-block my-1 mx-2 px-4 py-1 bg-base-200 rounded-full ${chainFaucetCoin?.denom===item?.denom? 'border bg-primary text-white':''}`}
                      >
                        <span className=" capitalize">
                          {item?.denom || '--'}
                        </span>
                      </div>
                    );
                  })}
                </div>
         
                <input
                  value={chainFaucetAmount || ''}
                  onChange={(e) => {
                    chainStore.chainFaucetAmount = e.target.value;
                  }}
                  placeholder="Amount..."
                  className="w-full placeholder:text-sm dark:text-white border border-gray-200  dark:border-gray-700 bg-base-200 rounded-full text-base text-right px-4 h-9 focus-within:outline-gray-300 dark:focus-within:outline-gray-800"
                />
                <div className="text-right">
                 <span className="text-sm">Max: </span> 
                 <span className="text-xs">{chainFaucetCoin.amount}</span>
                </div>
              </div>
              <div className="text-right mt-6 ">
                <button
                  className="mr-2 truncate btn-primary btn"
                  onClick={() =>rechargeCoins(wallets,selectedChain)}
                  disabled={chainFaucetLoading}
                >
                  Faucet
                </button>
              </div>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}
