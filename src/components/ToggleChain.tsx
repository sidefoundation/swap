import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import useWalletStore, { Wallet } from '@/store/wallet';
import { AppConfig } from '@/utils/AppConfig';

export function ToggleChain() {
  const { wallets, suggestChain, selectedChain } = useWalletStore();
  console.log(selectedChain,'9998888999')
  return (  
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <a>
            {/* {currentChain} */}
            <MdKeyboardArrowDown className="fill-current" />
          </a>
          <ul className="p-2 bg-base-100">
            
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
