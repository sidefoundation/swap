import { MdKeyboardArrowDown } from 'react-icons/md';
import useWalletStore from '@/store/wallet';
import { AppConfig } from '@/utils/AppConfig';
import { useEffect } from 'react';
import { BriefChainInfo } from '@/shared/types/chain';

export function ToggleChain() {
  const { wallets, suggestChain, selectedChain } = useWalletStore();

  console.log(wallets, 'toggle chain');

  useEffect(() => {
    if (AppConfig?.chains?.length > 0) {
      suggestChain(AppConfig?.chains?.[0] as BriefChainInfo);
    }
  }, [AppConfig?.chains]);

  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <a>
            {selectedChain?.name}
            <MdKeyboardArrowDown className="fill-current" />
          </a>
          <ul className="p-2 bg-base-100">
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
