import type { IAsset, ICoin } from './asset';

export interface ILiquidityPool {
  findAssetByDenom(denom: string): unknown;
  poolId: string;
  creator: string;
  creatorChainId: string;
  assets: IAsset[];
  supply: ICoin;
  pool_price: string;
  status: 'POOL_STATUS_READY' | 'POOL_STATUS_INITIAL';
  encounterPartyPort: string;
  encounterPartyChannel: string;
}
