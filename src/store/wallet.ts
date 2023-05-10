import { GasPrice } from '@cosmjs/stargate';
import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { BriefChainInfo } from '@/shared/types/chain';
import { getSideChainInfo } from '@/shared/types/chain';
import { SideSigningStargateClient } from '@/utils/side_stargateclient';

interface Wallet {
  address: string;
  chainInfo: BriefChainInfo;
  offlineSigner: any;
  signingClient: SideSigningStargateClient;
}
interface WalletState {
  wallets: Wallet[];
  connectWallet: (chain: BriefChainInfo) => Promise<void>;
  disconnect: () => void;
}

type WalletPersist = (
  config: StateCreator<WalletState>,
  options: PersistOptions<WalletState>
) => StateCreator<WalletState>;

const useWalletStore = create<WalletState>(
  (persist as WalletPersist)(
    (set, get) => ({
      wallets: [],
      connectWallet: async (chain: BriefChainInfo) => {
        try {
          const { wallets } = get();
          if (
            wallets.find(
              (wallet) => wallet.chainInfo.chainID === chain.chainID
            ) ||
            wallets.length > 2
          ) {
            return;
          }
          const { keplr } = window;
          if (!keplr) {
            alert('You need to install Keplr');
            throw new Error('You need to install Keplr');
          }
          const chainInfo = getSideChainInfo(chain);
          await keplr.experimentalSuggestChain(chainInfo);
          const offlineSigner = keplr.getOfflineSigner(chainInfo.chainId);
          // const newCreator = (await offlineSigner.getAccounts())[0].address;
          const newClient = await SideSigningStargateClient.connectWithSigner(
            chain.rpcUrl,
            offlineSigner,
            {
              gasPrice: GasPrice.fromString(chain.denom),
            }
          );
          const newCreator = (await offlineSigner.getAccounts())[0].address;
          console.log('connect is succeed!!!');

          const newWallet = {
            address: newCreator,
            chainInfo: chain,

            offlineSigner,
            signingClient: newClient,
          };
          set((state) => ({
            ...state,
            wallets: [...wallets, newWallet],
          }));
        } catch (error) {
          console.log('Connection Error', error);
        }
      },
      disconnect: () => {
        set((state) => ({ ...state, wallets: [] }));
      },
    }),
    { name: 'wallet-store', storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useWalletStore;
