export interface ICoin {
  denom: string;
  amount: string;
}
export interface IAsset {
  side: 'NATIVE' | 'REMOTE';
  balance: ICoin;
  weight: number;
  decimal: number;
}
