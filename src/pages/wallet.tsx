import { Meta } from '@/layouts/Meta';
import useWalletStore from '@/store/wallet';
import { Main } from '@/templates/Main';

const Wallet = () => {
  const { wallets, connectWallet, disconnect } = useWalletStore();
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
              className="p-4 mt-8 text-center text-white rounded-md bg-slate-800"
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
