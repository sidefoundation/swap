import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import useWalletStore from '@/store/wallet';
import { useEffect } from 'react';
import { BriefChainInfo } from '@/shared/types/chain';
import { useChainStore, setChainCurrent } from '@/store/chain';
export default function ToggleChain() {
  const { suggestChain, selectedWallet } =
    useWalletStore();
  const { chainList, chainCurrent } = useChainStore();

  useEffect(() => {
    if (chainCurrent) {
      console.log(chainCurrent, 'chainCurrentchainCurrent');
    }
  }, [chainCurrent]);
  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <a>
            <span>{chainCurrent?.name || ''}</span>
            <MdKeyboardArrowDown className="fill-current" />
          </a>
          <ul className="p-2 bg-base-100 z-10">
            {chainList?.map((item: BriefChainInfo, index: number) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => {
                      suggestChain(item);
                      setChainCurrent(item);
                    }}
                  >
                    {item?.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
