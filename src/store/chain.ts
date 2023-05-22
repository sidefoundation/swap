import { create } from 'zustand';
import { BriefChainInfo } from '../shared/types/chain';
import { AppConfig } from '../utils/AppConfig';

type Store = {
  chainList: BriefChainInfo[];
  chainCurrent: BriefChainInfo;
};

export const useChainStore = create<Store>()((set) => ({
  chainList: AppConfig.chains,
  chainCurrent: {} as BriefChainInfo,
  setChainCurrent: (chain: BriefChainInfo) => ({ chainCurrent: chain }),
}));
