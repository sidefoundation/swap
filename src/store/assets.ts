import { create } from 'zustand';
import { ICoin } from '../shared/types/asset';

type Store = {
  assetsList: ICoin[];
};

export const useAssetsStore = create<Store>()((set) => ({
  assetsList: [] as ICoin[],
  // based on the chain, fetch the assets list
  fetchAssetsList: async () => {
  },
}));
