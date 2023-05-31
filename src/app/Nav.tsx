import Link from 'next/link';
import Image from 'next/image';
import { MdPerson } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import useWalletStore from '@/store/wallet';
import ThemeToggle from './NavTheme';
import ToggleChain from './NavChain';
import FaucetModal from './FaucetModal';
import { chainStore } from '@/store/chain';
import { ConnectWalletBtn } from '@/components/ConnectWalletBtn';
function Nav() {
  const { isConnected, disconnect, selectedWallet } =
    useWalletStore();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  // TODO: add icon to show success or error
  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
    } catch (err) {
      //
    }
  };
  return (
    <div className="bg-base-100 shadow">
      <div className="navbar container mx-auto">
        {/* navbar-start */}
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
                <Link href="/limit">limit</Link>
              </li>
              <li>
                <Link href="/pool">Pool</Link>
              </li>
              <li>
                <Link href="/escrowed">Escrowed</Link>
              </li>
              <li>
                <Link href="/assets">Assets</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="flex items-center">
            <Image
              alt="logo"
              src="/assets/images/Side.png"
              width="24"
              height="24"
              className="w-8 mr-2"
            />
            <h1 className="text-2xl font-bold dark:text-white">
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </h1>
          </Link>
        </div>
        {/* center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/swap" className="btn btn-ghost">
                Swap
              </Link>
            </li>
            <li>
              <Link href="/limit" className="btn btn-ghost">
                limit
              </Link>
            </li>
            <li>
              <Link href="/pool" className="btn btn-ghost">
                Pool
              </Link>
            </li>
            <li>
              <Link href="/escrowed" className="btn btn-ghost">
                Escrowed
              </Link>
            </li>
            {connected ? (
              <li>
                <Link href="/assets" className="btn btn-ghost">
                  Assets
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center">
            <ThemeToggle />
            <ToggleChain />

            {connected && (
              <div
                className="truncate btn-primary btn btn-sm normal-case mr-2"
                onClick={() => {
                  chainStore.showFaucetModal = true;
                }}
              >
                Faucet
              </div>
            )}

            {!connected ? (
              <ConnectWalletBtn btnClass="btn btn-primary btn-sm normal-case" />
            ) : (
              <div className="dropdown dropdown-end ml-2">
                <label tabIndex={0} className="text-3xl cursor-pointer">
                  <MdPerson />
                </label>
                <div
                  tabIndex={0}
                  className="dropdown-content menu shadow p-2 bg-base-100 z-10 rounded w-64 overflow-auto"
                >
                  <div
                    className="truncate w-full px-2 mb-1 text-gray-500 dark:text-gray-400 font-semibold block py-2 hover:bg-gray-100 dark:hover:bg-[#353f5a] rounded cursor-pointer"
                    onClick={() => copyAddress(selectedWallet.address)}
                  >
                    {selectedWallet.address}
                  </div>

                  <div className="divider my-1"></div>
                  <button
                    className="btn btn-primary truncate btn-sm normal-case"
                    onClick={disconnect}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FaucetModal />
    </div>
  );
}

export default Nav;
