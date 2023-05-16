import { defineStore } from 'pinia';
import { ChainConfig } from '~/config/ChainConfig';
import { SideHubRestClient } from '~/libs';

export const useChains = defineStore('chain-store', {
  state: () => {
    return {
        current: ChainConfig.chains[0]
    };
  },
  getters: {
    client(): SideHubRestClient {
        return SideHubRestClient.newDefault(this.current.restUrl)
    }
  },
  actions: {
    changeCurrent(chain_id: string) {
        const c =  ChainConfig.chains.find(x => x.chainID === chain_id)
        if(c) {
            this.current = c
        }
    },
  },
});
