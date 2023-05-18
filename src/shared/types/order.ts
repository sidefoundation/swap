import { Coin } from '@/codegen/cosmos/base/v1beta1/coin';

export interface IAtomicSwapOrder {
  orderId: string;
  sellToken: Coin;
  buyToken: Coin;
  sender: string;
  makerReceivingAddress: string;
}
