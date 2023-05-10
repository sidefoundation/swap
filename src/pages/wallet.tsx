import { PromisePool } from '@supercharge/promise-pool';
import { useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import useWalletStore from '@/store/wallet';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Wallet = () => {
  const { wallets, connectWallet, disconnect } = useWalletStore();
  const linkWallets = async () => {
    await PromisePool.withConcurrency(1)
      .for(AppConfig.chains)
      .process(async (chain) => {
        try {
          await connectWallet(chain);
        } catch (error) {
          console.log('Connect Error', error);
        }
      });
    console.log(wallets);
  };
  useEffect(() => {
    linkWallets();
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Wallet"
          description="implement interchain swap functionality"
        />
      }
    >
      <div className="gap-4">
        <div>Address:</div>
        {wallets.length === 0 && <div>Connecting....</div>}
        {wallets.length !== 0 && (
          <div>
            {wallets.map((wallet, key) => {
              return <div key={key}>{wallet.address}</div>;
            })}
            <div
              className="mt-8 rounded-md bg-slate-800 p-4 text-center text-white"
              onClick={disconnect}
            >
              Disconnect
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Wallet;
