import type { IAsset, ICoin } from './asset';

export interface ILiquidityPool {
  assets: IAsset[];
  counterPartyChannel: string;
  counterPartyPort: string;
  creator: string;
  id: string;
  originatingChainId:string;
  pool_price: string;
  status: 'ACTIVE' | string;
  supply: ICoin;
  swapFee: string
  findAssetByDenom(denom: string): unknown;
  creatorChainId?: string;
}
