import { type ReactNode, useEffect, useState } from 'react';

import useWalletStore from '@/store/wallet';

import Loader from './Loader';

function WalletLoader({
  children,
}: {
  children: ReactNode;
  loading?: boolean;
}) {
  const { loading, isConnected, connectWallet } = useWalletStore();
  const [load, setLoad] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  if (load) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!connected) {
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
              <button className="btn-primary btn" onClick={connectWallet}>
                Connect your wallet &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default WalletLoader;
