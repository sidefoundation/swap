'use client';

import React from 'react';
import type { NextPage } from 'next';

import useWalletStore from '@/store/wallet';
import { ConnectWalletBtn } from '@/components/ConnectWalletBtn';
const Home: NextPage = () => {
  const { loading, isConnected, connectWallet, disconnect } = useWalletStore();
  return (
    <div className="max-w-full">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="ml-10">
            <h1 className="text-5xl font-bold">
              Welcome to{' '}
              <a
                className="link-hover link-primary link"
                href="https://side.one"
              >
                SideLabs
              </a>
            </h1>
            <p className="py-6">
              Get started by installing{' '}
              <a
                className="link-hover link-primary link pl-1"
                href="https://keplr.app/"
                target="_blank"
              >
                Keplr wallet
              </a>
            </p>
            {!isConnected ? (
              <ConnectWalletBtn
                btnClass="btn-primary btn"
                title="Connect your wallet &rarr;"
              />
            ) : (
              <button className="btn w-[160px] truncate" onClick={disconnect}>
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
