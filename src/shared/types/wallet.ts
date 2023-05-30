import type { BriefChainInfo } from '@/shared/types/chain';
import { Coin } from '@cosmjs/stargate';

export interface Wallet {
  address: string;
  chainInfo: BriefChainInfo;
}
export interface Balance {
  id: string;
  balances: Coin[];
}
