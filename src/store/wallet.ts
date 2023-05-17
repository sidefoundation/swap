import {Coin,GasPrice, SigningStargateClient } from '@cosmjs/stargate';
import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { BriefChainInfo } from '@/shared/types/chain';
import { getSideChainInfo } from '@/shared/types/chain';
//import { SideSigningStargateClient } from '@/utils/side_stargateclient';
import { defaultRegistryTypes, AminoTypes } from "@cosmjs/stargate";
import SigningKeplerEthermintClient from "@/utils/SigningKeplrEthermintClient"

import PromisePool from '@supercharge/promise-pool';
import { AppConfig } from '@/utils/AppConfig';
import { Registry } from "@cosmjs/proto-signing";
import {ethermintProtoRegistry,ethermintAminoConverters} from '@/codegen/ethermint/client'
import {ibcProtoRegistry,ibcAminoConverters} from '@/codegen/ibc/client'

import chargeCoins from '@/http/requests/post/chargeCoins';
import { OfflineDirectSigner } from '@keplr-wallet/types';
import fetchAccount from '@/http/requests/get/fetchAccount';
import fetchBalances from '@/http/requests/get/fetchBalance';



export const getSigningClientOptions =()=>{
  const registry = new Registry([...defaultRegistryTypes, ... ethermintProtoRegistry, ...ibcProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...ethermintAminoConverters,...ibcAminoConverters
  });

  return {
    registry,
    aminoTypes
  }
}
export interface Wallet {
  
  address: string;
  chainInfo: BriefChainInfo;
}
interface WalletState {
  loading: boolean,
  isConnected: boolean,
  wallets: Wallet[];
  setLoading:(isLoad:boolean)=>void
  connectWallet: () => Promise<void>;
  suggestChain:(chain:BriefChainInfo)=>Promise<void>
  getClient: (chain:BriefChainInfo) => Promise<SigningKeplerEthermintClient|undefined>;
  disconnect: () => void;
  charge:()=>Promise<void>;
  getBalance:()=> Promise<any>;
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
      setLoading:((isLoad:boolean)=>{
        set((state) => ({
          ...state,
          loading: isLoad,
        }));
      }),
      suggestChain: async(chain:BriefChainInfo)=> {
        const { keplr } = window;
        if (!keplr) {
          alert('You need to install Keplr');
          throw new Error('You need to install Keplr');
        }
        const chainInfo = getSideChainInfo(chain);
        await keplr.experimentalSuggestChain(chainInfo);
      },
      connectWallet: async () => {
        const { setLoading, suggestChain } = get();
        setLoading(true)
      
        const { keplr } = window;
        if (!keplr) {
          alert('You need to install Keplr');
          throw new Error('You need to install Keplr');
        }
      
        const newWallets: Wallet[] = [];
      
        for (const chain of AppConfig.chains) {
          try {
            await suggestChain(chain)
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
      
        if(newWallets.length === AppConfig.chains.length) {
          set((state) => ({
            ...state,
            isConnected: true,
            wallets: newWallets,
          }));
        } else {
          
          console.log('Not all chains could be registered.')
        }
      
        setLoading(false)
      },

      
      
      getClient: async (chain:BriefChainInfo) => {
        try {
          const { setLoading } = get();
        
          setLoading(true)
          const { keplr } = window;
          if (!keplr) {
            alert('You need to install Keplr');
            throw new Error('You need to install Keplr');
          }
          const chainInfo = getSideChainInfo(chain);
          await keplr.experimentalSuggestChain(chainInfo);
          const offlineSigner = await keplr.getOfflineSigner(chainInfo.chainId);
  
          const {aminoTypes, registry} = getSigningClientOptions()
          const newSigningClient = await SigningStargateClient.connectWithSigner(
            chain.rpcUrl,
            offlineSigner,
            {
              gasPrice: GasPrice.fromString(`0.01${chain.denom}`),
              registry,
              aminoTypes,
            }
          )
          const newClient = new SigningKeplerEthermintClient(newSigningClient, offlineSigner)
          console.log("New client", newClient)
          setLoading(false)
          return newClient
        } catch (error) {
          return undefined
        }
       
      },
      disconnect: () => {
        set((state) => ({ ...state, isConnected: false,wallets: [] }));
      },

      charge: async() => {
          const {wallets, setLoading, connectWallet} = get()
          await connectWallet()
          setLoading(true)
          const res = await PromisePool.withConcurrency(2)
          .for(wallets)
          .process(async (chain) => {
            const url = new URL(chain.chainInfo.rpcUrl);
            await chargeCoins(url.hostname, chain.chainInfo.denom, chain.address)
          })
          setLoading(false)
          console.log(res.errors)
      },
      getBalance: async() => {
        const {wallets, setLoading, connectWallet} = get()
        await connectWallet()
        setLoading(true)
        const res = await PromisePool.withConcurrency(2)
        .for(wallets)
        .process(async (chain) => {
          const url = new URL(chain.chainInfo.rpcUrl);
          const balances = await fetchBalances(url.hostname, chain.address)
          return {address: chain.address, balances: balances};
        })
        setLoading(false)
        return res.results
      }


    }),
    { name: 'wallet-store', storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useWalletStore;