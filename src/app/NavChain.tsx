import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import useWalletStore from '@/store/wallet';
import { AppConfig } from '@/utils/AppConfig';
import { useEffect } from 'react';
import { BriefChainInfo } from '@/shared/types/chain';
export default function ToggleChain() {
  const { suggestChain, selectedChain, setChain, selectedWallet } =
    useWalletStore();
  const [currentChain, setCurrentChain] = useState({ name: '' });
  const {} = useState();
  useEffect(() => {
    // setChain(AppConfig?.chains?.[0] as BriefChainInfo);
    // if (AppConfig?.chains?.length > 0) {
    //   suggestChain(AppConfig?.chains?.[0] as BriefChainInfo);
    // }
    return () => {
      console.log('xioahui', selectedWallet);
      if (selectedWallet.address) {
        setChain(selectedWallet.chainInfo as BriefChainInfo);
      }
    };
  }, []);
  useEffect(() => {
    if (selectedChain) {
      setCurrentChain(selectedChain);
      // connectSelectedWallet();
    }
  }, [selectedChain]);

  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <a>
            <span>{currentChain?.name || ''}</span>
            <MdKeyboardArrowDown className="fill-current" />
          </a>
          <ul className="p-2 bg-base-100 z-10">
            {AppConfig?.chains?.map((item, index) => {
              return (
                <li key={index}>
                  <a onClick={() => suggestChain(item)}>{item?.name}</a>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
