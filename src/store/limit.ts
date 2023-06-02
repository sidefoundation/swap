import { proxy, useSnapshot } from 'valtio';
import { Coin, StdFee } from '@cosmjs/stargate';
import fetchAtomicSwapList from '@/http/requests/get/fetchAtomicSwapList';
import { toast } from 'react-hot-toast';
import { Wallet } from '@/shared/types/wallet';
import { selectTimeList } from '@/shared/types/limit';
import { MakeSwapMsg } from '@/codegen/ibc/applications/atomic_swap/v1/tx';
import fetchAtomicSwapOrders from '@/http/requests/get/fetchOrders';
import { IAtomicSwapOrder } from '@/shared/types/order';
import fetchTxs from '@/http/requests/get/fetchTxs';
import { getBalanceList } from '@/store/assets';
import Long from 'long';
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
  selectedRemoteChain: {};
  selectedTime: string;
  expirationTime: string;

  orderForm: {
    orderList: IAtomicSwapOrder[];
    filterList: IAtomicSwapOrder[];
    sideType: { name: string; key: string };
  };
};

export const limitStore = proxy<Store>({
  limitNative: { amount: '0', supply: { denom: '', amount: '0' } as Coin },
  limitRemote: { amount: '0', supply: { denom: '', amount: '0' } as Coin },
  makerReceivingAddress: '',
  desiredTaker: '',
  nativeSupplyList: [],
  remoteSupplyList: [],
  selectedRemoteChain: {},
  selectedTime: 'Hour',
  expirationTime: '1',
  orderForm: {
    orderList: [],
    filterList: [],
    sideType: { name: 'Native', key: 'TYPE_NATIVE' },
  },
});

export const useLimitStore = () => {
  return useSnapshot(limitStore);
};
export const useLimitRate = () => {
  const nativeAmount = useSnapshot(limitStore.limitNative).amount;
  const remoteAmount = useSnapshot(limitStore.limitRemote).amount;
  let limitRate = '0';
  if (!!parseFloat(nativeAmount) || !!parseFloat(remoteAmount)) {
    limitRate = '0';
  }
  if (!!parseFloat(nativeAmount) && !!parseFloat(remoteAmount)) {
    const rate = (parseFloat(nativeAmount) / parseFloat(remoteAmount)).toFixed(
      8
    );
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

export const onMakeOrder = async (
  wallets: Wallet[],
  chainCurrent,
  getClient
) => {
  if (
    parseFloat(limitStore.limitNative.amount) <= 0 ||
    parseFloat(limitStore.limitRemote.amount) <= 0
  ) {
    toast.error('Please input token pair value');
    return;
  }
  const sourceWallet = wallets.find(
    (wallet: Wallet) => chainCurrent.chainID === wallet.chainInfo.chainID
  );
  const targetWallet = wallets.find(
    (wallet: Wallet) => chainCurrent.chainID !== wallet.chainInfo.chainID
  );
  if (sourceWallet === undefined || targetWallet === undefined) {
    toast.error('sourceWallet or targetWallet not found');
    return;
  }
  const client = await getClient(sourceWallet.chainInfo);
  // need to confirm balance exist
  const sellToken = {
    denom: limitStore.limitNative.supply.denom,
    amount: limitStore.limitNative.amount,
  };
  const buyToken = {
    denom: limitStore.limitRemote.supply.denom,
    amount: limitStore.limitRemote.amount,
  };
  if (sellToken === undefined) {
    return;
  }
  // Get current date
  const currentDate = new Date();

  // Get current timestamp in milliseconds
  const currentTimestamp = currentDate.getTime();

  // Calculate the timestamp for 24 hours from now  24 * 60 * 60 * 1000;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  // 1 'expirationTime' 'selectedTime' 'Hour'
  const inputExpirationTime =
    limitStore.expirationTime *
    selectTimeList?.find((item) => item.option === limitStore.selectedTime)
      ?.key *
    1000;
  const expirationTimestamp = inputExpirationTime || oneDayInMilliseconds;
  const timeoutTimeStamp = Long.fromNumber((Date.now() + 60 * 1000) * 1000000);
  const makeOrderMsg: MakeSwapMsg = {
    sourcePort: 'swap',
    sourceChannel: 'channel-1',
    sellToken: sellToken,
    buyToken: buyToken,
    makerAddress: sourceWallet.address,
    makerReceivingAddress: limitStore.makerReceivingAddress,
    desiredTaker: limitStore.desiredTaker,
    createTimestamp: Long.fromNumber(currentTimestamp),
    expirationTimestamp: Long.fromInt(expirationTimestamp),
    timeoutHeight: {
      revisionHeight: Long.fromInt(10),
      revisionNumber: Long.fromInt(10000000000),
    },
    timeoutTimestamp: timeoutTimeStamp,
  };
  const msg = {
    typeUrl: '/ibc.applications.atomic_swap.v1.MakeSwapMsg',
    value: makeOrderMsg,
  };
  const fee: StdFee = {
    amount: [{ denom: sourceWallet.chainInfo.denom, amount: '0.01' }],
    gas: '200000',
  };
  const data = await client!.signWithEthermint(
    sourceWallet.address,
    [msg],
    sourceWallet.chainInfo,
    fee,
    'test'
  );

  console.log('Signed data', data);
  if (data !== undefined) {
    const { txHash, status, rawLog } = await client!.broadCastTx(data);
    if (status !== 'error') {
      const result = await fetchTxs(chainCurrent.restUrl, txHash);
      console.log(result, 'result');
      if (`${result?.code}` !== '0') {
        console.log(result?.raw_log, 'raw_log');
        toast.error(result?.raw_log, {
          // id: toastItem,
          duration: 5000,
        });
      } else {
        toast.success('successfully ordered', {
          // id: toastItem,
        });
        getBalanceList(chainCurrent?.restUrl, sourceWallet!.address);
      }
    }
    console.log('TxHash:', txHash);
  } else {
    console.log('there are problem in encoding');
  }
  console.log('onMakeOrder', wallets, sourceWallet, chainCurrent);
};

export const getOrderList = async (restUrl: string) => {
  const res = await fetchAtomicSwapOrders(restUrl);
  limitStore.orderForm.orderList = res || [];
};
