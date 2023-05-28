import { Coin, GasPrice, SigningStargateClient } from '@cosmjs/stargate';
import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

import type { BriefChainInfo } from '@/shared/types/chain';
import { getSideChainInfo } from '@/shared/types/chain';
import { defaultRegistryTypes, AminoTypes } from '@cosmjs/stargate';
import SigningKeplerEthermintClient from '@/utils/SigningKeplrEthermintClient';

import PromisePool from '@supercharge/promise-pool';
import { AppConfig } from '@/utils/AppConfig';
import { Registry } from '@cosmjs/proto-signing';
import {
  ethermintProtoRegistry,
  ethermintAminoConverters,
} from '@/codegen/ethermint/client';
import { ibcProtoRegistry, ibcAminoConverters } from '@/codegen/ibc/client';

import chargeCoins from '@/http/requests/post/chargeCoins';
import fetchBalances from '@/http/requests/get/fetchBalance';

export const getSigningClientOptions = () => {
  const registry = new Registry([
    ...defaultRegistryTypes,
    ...ethermintProtoRegistry,
    ...ibcProtoRegistry,
  ]);
  const aminoTypes = new AminoTypes({
    ...ethermintAminoConverters,
    ...ibcAminoConverters,
  });

  return {
    registry,
    aminoTypes,
  };
};
export interface Wallet {
  address: string;
  chainInfo: BriefChainInfo;
}
export interface Balance {
  id: string;
  balances: Coin[];
}
interface WalletState {
  loading: boolean;
  isConnected: boolean;
  wallets: Wallet[];
  selectedWallet: Wallet;
  balanceList: Balance[];
  selectedChain: BriefChainInfo;
  setLoading: (isLoad: boolean) => void;
  connectSelectedWallet: () => Promise<void>;
  connectWallet: () => Promise<void>;
  setChain: (chain: BriefChainInfo) => Promise<void>;
  suggestChain: (chain: BriefChainInfo) => Promise<void>;
  getClient: (
    chain: BriefChainInfo
  ) => Promise<SigningKeplerEthermintClient | undefined>;
  disconnect: () => void;
  charge: () => Promise<void>;
  getBalance: (isAll?: boolean) => Promise<
    {
      id: string;
      balances: Coin[];
    }[]
  >;
  setBalance: (balance: Balance[]) => void;
}

type WalletPersist = (
  config: StateCreator<WalletState>,
  options: PersistOptions<WalletState>
) => StateCreator<WalletState>;

const useWalletStore = create<WalletState>(
  (persist as WalletPersist)(
    (set, get) => ({
      loading: false,
      isConnected: false,
      wallets: [],
      selectedWallet: {
        address: '',
        chainInfo: {},
      },
      selectedChain: AppConfig.chains[0],
      balanceList: [],
      setLoading: (isLoad: boolean) => {
        set((state) => ({
          ...state,
          loading: isLoad,
        }));
      },
      setChain: async (chain: BriefChainInfo) => {
        const { keplr } = window;
        if (!keplr) {
          toast.error('You need to install Keplr');
          return;
        }
        const chainInfo = getSideChainInfo(chain);
        await keplr.experimentalSuggestChain(chainInfo);

        set((state) => ({
          ...state,
          selectedChain: chain,
        }));
      },
      suggestChain: async (chain: BriefChainInfo) => {
        const { keplr } = window;
        if (!keplr) {
          toast.error('You need to install Keplr');
          return;
        }
        const chainInfo = getSideChainInfo(chain);
        await keplr.experimentalSuggestChain(chainInfo);

        set((state) => ({
          ...state,
          selectedChain: chain,
        }));
      },
      connectSelectedWallet: async () => {
        const { setLoading, suggestChain, selectedChain } = get();
        setLoading(true);

        const { keplr } = window;
        if (!keplr) {
          toast.error('You need to install Keplr');
          return;
        }

        let newWallet: Wallet = { address: '', chainInfo: {} };
        try {
          const chainInfo = getSideChainInfo(selectedChain);
          await keplr.experimentalSuggestChain(chainInfo);
          // Poll until the chain is approved and the signer is available
          const offlineSigner = await keplr.getOfflineSigner(
            selectedChain.chainID
          );
          const newCreator = (await offlineSigner.getAccounts())[0].address;
          newWallet = {
            address: newCreator,
            chainInfo: selectedChain,
          };
        } catch (error) {
          console.log('Connection Error', error);
        }

        if (newWallet.address !== '') {
          set((state) => ({
            ...state,
            isConnected: true,
            selectedWallet: newWallet,
          }));
        } else {
          console.log('Not all chains could be registered.');
        }
        setLoading(false);
      },
      connectWallet: async () => {
        const { setLoading, suggestChain, selectedChain } = get();
        setLoading(true);

        const { keplr } = window;
        if (!keplr) {
          toast.error('You need to install Keplr');
          return;
        }

        const newWallets: Wallet[] = [];
        // const chain = selectedChain;
        for (const chain of AppConfig.chains) {
          try {
            // await suggestChain(chain);
            const chainInfo = getSideChainInfo(chain);
            await keplr.experimentalSuggestChain(chainInfo);
            // Poll until the chain is approved and the signer is available
            const offlineSigner = await keplr.getOfflineSigner(chain.chainID);
            //console.log("OfflineSigner", offlineSigner)
            //const {aminoTypes, registry} = getSigningClientOptions();
            // const newSigningClient = await SigningStargateClient.connectWithSigner(
            //   chain.rpcUrl,
            //   offlineSigner,
            //   {
            //     gasPrice: GasPrice.fromString(`0.01${chain.denom}`),
            //     registry,
            //     aminoTypes,
            //   }
            // );
            const newCreator = (await offlineSigner.getAccounts())[0].address;
            const newWallet: Wallet = {
              address: newCreator,
              chainInfo: chain,
            };
            newWallets.push(newWallet);
          } catch (error) {
            console.log('Connection Error', error);
          }
        }

        if (newWallets.length === AppConfig.chains.length) {
          set((state) => ({
            ...state,
            isConnected: true,
            wallets: newWallets,
            selectedWallet: newWallets.find((item) => {
              if (item.chainInfo.chainID === selectedChain.chainID) {
                return item;
              }
            }),
          }));
        } else {
          console.log('Not all chains could be registered.');
        }

        setLoading(false);
      },

      getClient: async (chain: BriefChainInfo) => {
        try {
          const { setLoading } = get();

          setLoading(true);
          const { keplr } = window;
          if (!keplr) {
            toast.error('You need to install Keplr');
            return;
          }
          const chainInfo = getSideChainInfo(chain);
          await keplr.experimentalSuggestChain(chainInfo);
          const offlineSigner = await keplr.getOfflineSigner(chainInfo.chainId);

          const { aminoTypes, registry } = getSigningClientOptions();
          const newSigningClient =
            await SigningStargateClient.connectWithSigner(
              chain.rpcUrl,
              offlineSigner,
              {
                gasPrice: GasPrice.fromString(`0.01${chain.denom}`),
                registry,
                aminoTypes,
              }
            );
          const newClient = new SigningKeplerEthermintClient(
            newSigningClient,
            offlineSigner
          );
          console.log('New client', newClient);
          setLoading(false);
          return newClient;
        } catch (error) {
          return undefined;
        }
      },
      disconnect: () => {
        set((state) => ({
          ...state,
          isConnected: false,
          wallets: [],
          selectedWallet: { address: '', chainInfo: {} },
        }));
      },

      charge: async () => {
        const { wallets, setLoading, connectWallet, selectedChain } = get();
        await connectWallet();
        setLoading(true);
        const currentWallets = wallets.filter((item) => {
          return item.chainInfo?.chainID === selectedChain?.chainID;
        });
        const toastItem = toast.loading('Charging');
        const res = await PromisePool.withConcurrency(2)
          .for(currentWallets)
          .process(async (chain) => {
            const url = new URL(chain.chainInfo.rpcUrl);
            await chargeCoins(
              url.hostname,
              chain.chainInfo.denom,
              chain.address
            );
            toast.success('Charge Success', {
              id: toastItem,
            });
          });
        setLoading(false);
        if (res?.errors?.[0]?.message) {
          toast.error(res?.errors?.[0]?.message, {
            id: toastItem,
          });
        }
      },
      getBalance: async (isAll?: boolean) => {
        const { wallets, setLoading, connectWallet, selectedChain } = get();
        await connectWallet();
        setLoading(true);
        const currentWalletItem = wallets.filter((item) => {
          return item.chainInfo?.chainID === selectedChain?.chainID;
        });
        const res = await PromisePool.withConcurrency(2)
          .for(isAll ? wallets : currentWalletItem)
          .process(async (chain) => {
            const balances = await fetchBalances(
              chain.chainInfo.restUrl,
              chain.address
            );
            return { id: chain.chainInfo.chainID, balances: balances };
          });
        setLoading(false);
        console.log(res.results.flat());
        return res.results.flat();
      },
      setBalance: (balances: Balance[]) => {
        const { selectedChain } = get();

        const balance = balances?.filter((item) => {
          if (item.id === selectedChain.chainID) {
            return item;
          }
        });
        set((state) => ({
          ...state,
          balanceList: balance,
        }));
      },
    }),
    { name: 'wallet-store', storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useWalletStore;
