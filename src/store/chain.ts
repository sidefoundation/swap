import { proxy, useSnapshot } from 'valtio';

import { BriefChainInfo } from '../shared/types/chain';
import { AppConfig } from '../utils/AppConfig';

type Store = {
  chainList: BriefChainInfo[];
  chainCurrent: BriefChainInfo;
};

export const chainStore = proxy<Store>({
  chainList: AppConfig.chains,
  chainCurrent: {} as BriefChainInfo,
});

export const useChainStore = () => {
  return useSnapshot(chainStore);
};
