import {Coin,GasPrice } from '@cosmjs/stargate';
import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { BriefChainInfo } from '@/shared/types/chain';
import { getSideChainInfo } from '@/shared/types/chain';
//import { SideSigningStargateClient } from '@/utils/side_stargateclient';
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";

import PromisePool from '@supercharge/promise-pool';
import { AppConfig } from '@/utils/AppConfig';
import { Registry } from "@cosmjs/proto-signing";
import {ethermintProtoRegistry,ethermintAminoConverters} from '@/codegen/ethermint/client'
import {ibcProtoRegistry,ibcAminoConverters} from '@/codegen/ibc/client'
import chargeCoins from '@/http/requests/post/chargeCoins';


const getSigningClientOptions =()=>{
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
  balance: Coin;
  chainInfo: BriefChainInfo;
  offlineSigner: any;
  signingClient: SigningStargateClient;
}
interface WalletState {
  loading: boolean,
  isConnected: boolean,
  wallets: Wallet[];
  setLoading:(isLoad:boolean)=>void
  connectWallet: () => void;
  disconnect: () => void;
  charge:()=>Promise<void>;
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
      connectWallet: async () => {
        const { isConnected, setLoading } = get();
        console.log(isConnected)
        if (isConnected) {
          return;
        }
      
       setLoading(true)
        const res = await PromisePool.withConcurrency(1)
          .for(AppConfig.chains)
          .process(async (chain) => {
            try {
          const { keplr } = window;
          if (!keplr) {
            alert('You need to install Keplr');
            throw new Error('You need to install Keplr');
          }
          const chainInfo = getSideChainInfo(chain);
          await keplr.experimentalSuggestChain(chainInfo);
          const offlineSigner = keplr.getOfflineSigner(chainInfo.chainId);

          const {aminoTypes, registry} = getSigningClientOptions()
          const newClient = await SigningStargateClient.connectWithSigner(
            chain.rpcUrl,
            offlineSigner,
            {
              gasPrice: GasPrice.fromString(`0.01${chain.denom}`),
              registry,
              aminoTypes,
            }
          );
          const newCreator = (await offlineSigner.getAccounts())[0].address;
          const balance = await newClient.getBalance(newCreator, chain.denom)
          const newWallet:Wallet = {
            address: newCreator,
            balance: balance,
            chainInfo: chain,

            offlineSigner,
            signingClient: newClient,
          };
          return  newWallet
            } catch (error) {
            console.log('Connection Error', error);
          }
        });
        
        const newWallets = res.results.filter((value): value is Wallet => value !== undefined);
        if(res.errors.length === 0) {
          set((state) => ({
            ...state,
            isConnected: true,
            wallets: newWallets,
          }));
        }else{
          console.log(res.errors)
        }
        setLoading(false)
      },
      disconnect: () => {
        set((state) => ({ ...state, isConnected: false,wallets: [] }));
      },

      charge: async() => {
          const {wallets, setLoading} = get()
          setLoading(true)
          const res = await PromisePool.withConcurrency(2)
          .for(wallets)
          .process(async (chain) => {
            const url = new URL(chain.chainInfo.rpcUrl);
            await chargeCoins(url.hostname, chain.chainInfo.denom, chain.address)
          })
          setLoading(false)
          console.log(res.errors)
      }
    }),
    { name: 'wallet-store', storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useWalletStore;
