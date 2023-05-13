import React from 'react';
import { CoinInput } from "@/components/CoinInput";
import { Coin } from "@cosmjs/stargate";

interface SwapControlsProps {
  swapPair: { first: Coin; second: Coin };
  updateFirstCoin: (value: string) => void;
  updateSecondCoin: (value: string) => void;
  onSwap: (direction: '->' | '<-') => Promise<void>;
}

const SwapControls: React.FC<SwapControlsProps> = ({ swapPair, updateFirstCoin, updateSecondCoin, onSwap }) => {
  return (
    <div>
      <div className="flex flex-col justify-between w-full max-w-xl mt-4 text-2xl md:flex-row">
        <div className="grid grid-rows-2 gap-4">
          <CoinInput coin={swapPair.first} placeholder="Amount ..."  onChange={updateFirstCoin} />
          <CoinInput coin={swapPair.second} placeholder="Amount ..." onChange={updateSecondCoin} />

          <div className="flex gap-4">
            <button
              className="flex-grow mt-4 text-2xl font-semibold rounded-full md:mt-0 btn btn-primary btn-lg hover:text-base-100"
              onClick={() => onSwap('->')}
            >
              {'SWAP>>'}
            </button>

            <button
              className="flex-grow mt-4 text-2xl font-semibold rounded-full md:mt-0 btn btn-primary btn-lg hover:text-base-100"
              onClick={() => onSwap('<-')}
            >
              {'<<SWAP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapControls;
