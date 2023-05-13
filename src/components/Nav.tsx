
import Image from 'next/image';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';
import useWalletStore from '@/store/wallet';

function Nav() {

  const { isConnected, wallets, connectWallet, disconnect, charge } = useWalletStore();
  const PUBLIC_SITE_ICON_URL = process.env.NEXT_PUBLIC_SITE_ICON_URL || '';

  return (
    <div className="w-screen px-2 border-b md:px-16">
      <nav className="flex flex-row flex-wrap items-center justify-between w-full py-4 text-center md:flex md:text-left ">
        <div className="flex items-center">
          <Link href="/">
            {PUBLIC_SITE_ICON_URL.length > 0 ? (
              <Image
                src={PUBLIC_SITE_ICON_URL}
                height={32}
                width={32}
                alt="Logo"
              />
            ) : (
              <span className="text-2xl text-white">⚛️ Side Protocol Labs </span>
            )}
          </Link>
          <Link
            href="/"
            className="ml-1 text-xl font-semibold align-top link-hover link md:ml-2 md:text-2xl"
          >
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </Link>
        </div>
        <ThemeToggle />
        { isConnected && (<button
             className="block mx-4 mb-2 truncate btn-outline btn-secondary btn lg:mb-0"
             onClick={charge}
           >
             Faucet
          </button>)
        }
          
        <div className="flex max-w-full grow lg:grow-0">
         
          {!isConnected ? (
            <button
             className="block w-full max-w-full truncate btn-outline btn-primary btn"
             onClick={connectWallet}
           >
             Connect Wallet
           </button>
          ) : (
            <button
              className="block w-full max-w-full truncate btn-outline btn-primary btn"
              onClick={disconnect}
            >
              {wallets.map((wallet) => {
                return<p>{wallet.address}</p>
              })}
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
