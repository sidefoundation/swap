import {
  CancelSwapMsg,
  TakeSwapMsg,
} from '@/codegen/ibc/applications/atomic_swap/v1/tx';

import { useEffect } from 'react';
import useWalletStore from '@/store/wallet';
import { useChainStore } from '@/store/chain';

import { StdFee } from '@cosmjs/stargate';
import Long from 'long';

import { IAtomicSwapOrder } from '@/shared/types/order';
import { timestampToDate } from '@/utils/utils';
import toast from 'react-hot-toast';
import LimitOrderSelect from './LimitOrderSelect';
import { getBalanceList, useAssetsStore } from '@/store/assets';
import { useLimitStore, limitStore, getOrderList } from '@/store/limit';
export type OrderCardProps = {
  order: IAtomicSwapOrder;
  tab: string;
  onTake: (order: IAtomicSwapOrder) => void;
  onCancel: (order: IAtomicSwapOrder) => void;
  wallets: any;
};

function OrderCard({ order, tab, onTake, onCancel, wallets }: OrderCardProps) {
  return (
    <div className="p-5 mb-4 rounded-lg bg-base-200">
      <div className="flex items-center justify-between">
        <div className="px-4 text-sm capitalize border rounded-full border-primary">
          {order?.side}
        </div>
        <div className="px-4 text-sm capitalize border rounded-full border-primary">
          {tab}
        </div>
        <div className="text-sm">
          {order.id.slice(0, 10)}...{order.id.slice(-10)}
        </div>
      </div>
      <div className="mt-4 mb-2">
        <div className="text-base font-semibold">
          {order.maker.sell_token.denom}/{order.maker.buy_token.denom}
        </div>
      </div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <div>You will pay</div>
        <div>
          {order.maker.sell_token.amount} {order.maker.sell_token.denom}
        </div>
      </div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <div>To receive</div>
        <div>
          {order.maker.buy_token.amount} {order.maker.buy_token.denom}
        </div>
      </div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <div>
          {order.maker.sell_token.denom} per {order.maker.buy_token.denom}
        </div>
        <div>
          {(
            order.maker.sell_token.amount / order.maker.buy_token.amount
          ).toFixed(6)}
        </div>
      </div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <div>Sender(Maker)</div>
        <div>{order.maker.maker_address}</div>
      </div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <div>Date</div>
        <div>{timestampToDate(+order.maker.create_timestamp)}</div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div>Expires in</div>
        <div>
          {timestampToDate(
            +(
              Number(order.maker.expiration_timestamp) +
              Number(order.maker.create_timestamp)
            )
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        {(order.maker?.desired_taker === wallets?.[0]?.address ||
          !order.maker.desired_taker) && (
          <button className="btn btn-primary" onClick={() => onTake(order)}>
            Take
          </button>
        )}
        {order.maker?.maker_address === wallets?.[0]?.address && (
          <button className="btn btn-primary" onClick={() => onCancel(order)}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default function SwapOrder() {
  const { balanceList } = useAssetsStore();
  const { orderForm } = useLimitStore();
  const { chainCurrent } = useChainStore();
  const { wallets, getClient } = useWalletStore();

  const getCurrentBalance = () => {
    if (wallets.length > 0) {
      const walletItem = wallets?.find((wallet) => {
        if (wallet.chainInfo.chainID === chainCurrent.chainID) {
          return { restUrl: wallet.chainInfo.restUrl, address: wallet.address };
        }
      });
      getBalanceList(chainCurrent?.restUrl, walletItem?.address);
    }
  };

  useEffect(() => {
    if (chainCurrent?.restUrl) {
      getCurrentBalance();
      getOrderList(chainCurrent?.restUrl);
    }
  }, []);
  useEffect(() => {
    if (chainCurrent?.restUrl) {
      getCurrentBalance();
      getOrderList(chainCurrent?.restUrl);
    }
  }, [chainCurrent]);

  useEffect(() => {
    if (orderForm.orderList.length > 0){
      limitStore.orderForm.filterList =
      orderForm.orderList.filter((order, index) => {
        if (order.side === orderForm.sideType.key) {
          return order;
        }
      }) || [];
    }
  }, [orderForm.sideType,orderForm.orderList]);

  const onTakeOrder = async (order: IAtomicSwapOrder) => {
    // const chainID = balances.find((bal) =>
    //   bal.balances
    //     .map((item) => item.denom)
    //     .includes(order.maker.buy_token.denom)
    // )?.id;
    const chainID = chainCurrent.chainID;
    const wallet = wallets.find(
      (wallet) => wallet.chainInfo.chainID === chainID
    );
    if (wallet === undefined) {
      toast.error("You don't have wallet about this token");
      return;
    }

    const client = await getClient(wallet.chainInfo);
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); //

    const makeOrderMsg: TakeSwapMsg = {
      orderId: order.id,
      /** the tokens to be sell */
      sellToken: order.maker.buy_token,
      /** the sender address */
      takerAddress: order.maker.maker_address,
      /** the sender's address on the destination chain */
      takerReceivingAddress: order.maker.maker_receiving_address,
      createTimestamp: Long.fromInt(Date.now() * 1000),
      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimestamp: timeoutTimeStamp,
    };

    const msg = {
      typeUrl: '/ibc.applications.atomic_swap.v1.TakeSwapMsg',
      value: makeOrderMsg,
    };
    console.log(client);

    const fee: StdFee = {
      amount: [{ denom: wallet.chainInfo.denom, amount: '0.01' }],
      gas: '200000',
    };

    const data = await client!.signWithEthermint(
      wallet.address,
      [msg],
      wallet.chainInfo,
      fee,
      'test'
    );

    console.log('Signed data', data);
    if (data !== undefined) {
      const { txHash } = await client!.broadCastTx(data);
      console.log('TxHash:', txHash);
    } else {
      console.log('there are problem in encoding');
    }
  };

  const onCancelOrder = async (order: IAtomicSwapOrder) => {
    const chainID = chainCurrent.chainID;
    // balanceList
    //   .map((item) => item.denom)
    //   .includes(order.maker.sell_token.denom);
    // balances.find((bal) =>
    //   bal.balances
    //     .map((item) => item.denom)
    //     .includes(order.maker.sell_token.denom)
    // )?.id;
    const wallet = wallets.find(
      (wallet) => wallet.chainInfo.chainID === chainID
    );
    if (wallet === undefined) {
      toast.error("You don't have wallet about this token");
      return;
    }

    const client = await getClient(wallet.chainInfo);
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); //
    const currentDate = new Date();
    // Get current timestamp in milliseconds
    const createTimestamp = currentDate.getTime();

    const cancelOrderMsg: CancelSwapMsg = {
      orderId: order.id,
      /** the sender address */
      makerAddress: order.maker.maker_address,
      createTimestamp: Long.fromInt(createTimestamp),
      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimestamp: timeoutTimeStamp,
    };

    const msg = {
      typeUrl: '/ibc.applications.atomic_swap.v1.CancelSwapMsg',
      value: cancelOrderMsg,
    };
    console.log(client);

    const fee: StdFee = {
      amount: [{ denom: wallet.chainInfo.denom, amount: '0.01' }],
      gas: '200000',
    };

    const data = await client!.signWithEthermint(
      wallet.address,
      [msg],
      wallet.chainInfo,
      fee,
      'test'
    );
    console.log('Signed data', data);
    if (data !== undefined) {
      const { txHash } = await client!.broadCastTx(data);
      console.log('TxHash:', txHash);
    } else {
      console.log('there are problem in encoding');
    }
  };

  return (
    <div>
      <div>
        <LimitOrderSelect onReFresh={getCurrentBalance} />

        <div className="">
          {orderForm.filterList.map((order, index) => {
            return (
              <OrderCard
                order={order}
                key={index}
                tab={order.status}
                onTake={(order) => onTakeOrder(order)}
                onCancel={(order) => onCancelOrder(order)}
                wallets={wallets}
              ></OrderCard>
            );
          })}
        </div>
        {orderForm.filterList?.length === 0 ? (
          <div className="text-center py-20">
            <div className="m-4">No Data</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
