import type { ChainInfo } from '@keplr-wallet/types';

export interface BriefChainInfo {
  chainID: string;
  name: string;
  rpcUrl: string;
  restUrl: string;
  prefix: string;
  denom: string;
}

export const getSideChainInfo = (chain: BriefChainInfo): ChainInfo => ({
  chainId: chain.chainID,
  chainName: chain.name,
  rpc: chain.rpcUrl!,
  rest: chain.restUrl,
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: chain.prefix,
    bech32PrefixAccPub: `${chain.prefix}pub`,
    bech32PrefixValAddr: `${chain.prefix}valoper`,
    bech32PrefixValPub: `${chain.prefix}valoperpub`,
    bech32PrefixConsAddr: `${chain.prefix}valcons`,
    bech32PrefixConsPub: `${chain.prefix}valconspub`,
  },
  currencies: [
    {
      coinDenom: chain.denom,
      coinMinimalDenom: chain.denom,
      coinDecimals: 18,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: chain.denom,
      coinMinimalDenom: chain.denom,
      coinDecimals: 18,
    },
  ],
  stakeCurrency: {
    coinDenom: chain.denom,
    coinMinimalDenom: chain.denom,
    coinDecimals: 18,
  },
  coinType: 60,
  features: ['stargate', 'ibc-transfer', "eth-address-gen","eth-key-sign"],
});
