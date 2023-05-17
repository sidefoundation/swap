import Link from 'next/link';
import { useEffect, useState } from 'react';

import ThemeToggle from '@/components/ThemeToggle';
import type { Wallet } from '@/store/wallet';
import useWalletStore from '@/store/wallet';

function Nav() {
  const { isConnected, wallets, connectWallet, disconnect, charge } =
    useWalletStore();
  const [connected, setConnected] = useState(false);
  const [signers, setSigners] = useState<Wallet[]>([]);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    setSigners(wallets);
  }, [wallets]);

  return (
    <div className="bg-base-100 shadow">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link href="/swap">Swap</Link>
              </li>
              <li>
                <Link href="/pool">Pool</Link>
              </li>
              <li>
                <Link href="/assets">Assets</Link>
              </li>
            </ul>
          </div>
          <Link className="text-2xl font-bold" href="/">
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/swap" className="btn btn-ghost">
                Swap
              </Link>
            </li>
            <li>
              <Link href="/pool" className="btn btn-ghost">
                Pool
              </Link>
            </li>
            <li>
              <Link href="/assets" className="btn btn-ghost">
                Assets
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center">
            <ThemeToggle />
            {connected && (
              <button
                className="mr-2 truncate btn-primary btn"
                onClick={charge}
              >
                Faucet
              </button>
            )}

            {!connected ? (
              <button className="btn btn-primary" onClick={connectWallet}>
                Connect Wallet
              </button>
            ) : (
              <button className="btn btn-primary truncate" onClick={disconnect}>
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
