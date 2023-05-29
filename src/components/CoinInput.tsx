import React from 'react';
import { Coin } from '@cosmjs/stargate';

export type CoinInputProps = {
  placeholder: string;
  coin: Coin;
  onChange: (value: string) => void;
};
export function CoinInput({ placeholder, coin, onChange }: CoinInputProps) {
  return (
    <input
      type="number"
      className="text-right h-10 flex-1 w-0 bg-transparent text-2xl focus-within:outline-none placeholder:font-normal placeholder:text-sm font-semibold"
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      value={coin.amount}
      min="0"
    />
  );
}
