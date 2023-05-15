import { useState, type ReactNode, useEffect } from 'react';



import Loader from './Loader';
import error from 'next/error';
import useWalletStore from '@/store/wallet';

function WalletLoader({
  children
}: {
  children: ReactNode;
  loading?: boolean;
}) {
  const {loading,isConnected, connectWallet} = useWalletStore();
  const [load, setLoad] = useState(false)
  const [connected, setConnected] = useState(false)

  useEffect(()=>{
    setLoad(loading)
  },[loading])

  useEffect(()=>{
    setConnected(isConnected)
  },[isConnected])

  

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
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="link-hover link-primary link" href="https://nextjs.org">
            SideLabs
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by installing{' '}
          <a
            className="pl-1 link-hover link-primary link"
            href="https://keplr.app/"
          >
            Keplr wallet
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-around mt-6 sm:w-full md:max-w-4xl">
          <button
            className="p-6 mt-6 text-left border border-secondary hover:border-primary hover:text-primary focus:text-primary-focus w-96 rounded-xl"
           //onClick={connectWallet}
          >
            <h3 className="text-2xl font-bold">Connect your wallet &rarr;</h3>
            <p className="mt-4 text-xl">Connect Wallets</p>
          </button>
        </div>
      </div>
    );
  }else {
    return (<>{children}</>)
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>;
  }

  return <>{children}</>;
}

export default WalletLoader;
