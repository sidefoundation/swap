export interface ICoin {
  denom: string;
  amount: string;
}
export interface IAsset {
  side: 'SOURCE' | 'TARGET';
  balance: ICoin;
  weight: number;
  decimal: number;
}
