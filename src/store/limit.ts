import { proxy, useSnapshot } from 'valtio';
import { Coin } from '@cosmjs/stargate';
import fetchAtomicSwapList from '@/http/requests/get/fetchAtomicSwapList';

type Store = {
  limitNative: {
    amount: string;
    supply: Coin;
  };
  limitRemote: {
    amount: string;
    supply: Coin;
  };
  makerReceivingAddress: string;
  desiredTaker: string;
  nativeSupplyList: Coin[];
  remoteSupplyList: Coin[];
  selectedRemoteChain: {}
};

export const limitStore = proxy<Store>({
  limitNative: { amount: '0', supply: { denom: '', amount: '0' } as Coin },
  limitRemote: { amount: '0', supply: { denom: '', amount: '0' } as Coin },
  makerReceivingAddress: '',
  desiredTaker: '',
  nativeSupplyList: [],
  remoteSupplyList: [],
  selectedRemoteChain:{}
});

export const useLimitStore = () => {
  return useSnapshot(limitStore);
};
export const useLimitRate = () => {
  const nativeAmount = useSnapshot(limitStore.limitNative).amount;
  const remoteAmount = useSnapshot(limitStore.limitRemote).amount;
  let limitRate = '0';
  if (
    !!parseFloat(nativeAmount) ||
    !!parseFloat(remoteAmount)
  ) {
    limitRate = '0';
  }
  if (
    !!parseFloat(nativeAmount) &&
    !!parseFloat(remoteAmount)
  ) {
    const rate = (
      parseFloat(nativeAmount) / parseFloat(remoteAmount)
    ).toFixed(8);
    limitRate = rate;
  }
  return {
    limitRate,
  };
};

export const getSupplyList = async (
  restUrl: string,
  type?: 'native' | 'remote'
) => {
  const res = await fetchAtomicSwapList(restUrl);

  if (type === 'native') {
    limitStore.nativeSupplyList = res;
  }
  if (type === 'remote') {
    limitStore.remoteSupplyList = res;
  }
  // if (!type) {
  //   return res;
  // }
};
