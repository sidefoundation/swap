import {
  CancelSwapMsg,
  MakeSwapMsg,
  TakeSwapMsg,
} from '@/codegen/ibc/applications/atomic_swap/v1/tx';
import useWalletStore from '@/store/wallet';
import { useChainStore } from '@/store/chain';
import { Coin, StdFee } from '@cosmjs/stargate';
import Long from 'long';
import { useEffect, useState } from 'react';
import { TokenInput } from '@/components/TokenInput';
import { IAtomicSwapOrder } from '@/shared/types/order';
import fetchAtomicSwapOrders from '@/http/requests/get/fetchOrders';
import { timestampToDate } from '@/utils/utils';
import toast from 'react-hot-toast';

const TabItem = ({
  value,
  title,
  setTab,
  tab,
}: {
  value: string;
  title: string;
  setTab: Function;
  tab: string;
}) => {
  return (
    <div
      className={`tab tab-sm ${tab === value ? 'tab-active' : ''}`}
      onClick={() => setTab(value)}
    >
      {title}
    </div>
  );
};

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
  const [tab, setTab] = useState('all');
  const { chainCurrent } = useChainStore();
  const { wallets, getBalance, getClient } = useWalletStore();
  const [openOrder, setOpenOrder] = useState(false);
  const [balances, setBalances] = useState<
    {
      id: string;
      balances: Coin[];
    }[]
  >([]);
  const [sender, setSender] = useState(wallets[0]?.chainInfo.chainID);
  const [tokenPair, setTokenPair] = useState<Map<number, Coin>>(new Map());
  const [orders, setOrders] = useState<IAtomicSwapOrder[]>([]);

  const fetchBalances = async () => {
    const balance = await getBalance();
    setBalances(balance);
  };

  const fetchOrders = async (rpcUrl: string) => {
    const orders = await fetchAtomicSwapOrders(rpcUrl);
    setOrders(orders);
  };

  useEffect(() => {
    fetchBalances();
    fetchOrders(chainCurrent?.restUrl);
  }, []);
  useEffect(() => {
    fetchOrders(chainCurrent?.restUrl);
  }, [chainCurrent]);

  const onMakeOrder = async () => {
    if (tokenPair.size !== 2) {
      alert('Please input token pair value');
      return;
    }

    const sourceWallet = wallets.find((wallet) =>
      sender?.includes(wallet.chainInfo.chainID)
    );
    const targetWallet = wallets.find(
      (wallet) => !sender?.includes(wallet.chainInfo.chainID)
    );

    if (sourceWallet === undefined || targetWallet === undefined) {
      console.log('sourceWallet or targetWallet not found');
      return;
    }

    const client = await getClient(sourceWallet.chainInfo);

    const srcBalances = balances.find(
      (bal) => bal.id === sourceWallet.chainInfo.chainID
    );
    const tarBalances = balances.find(
      (bal) => bal.id === targetWallet.chainInfo.chainID
    );
    if (srcBalances === undefined || tarBalances === undefined) {
      return;
    }

    const tokenPairArray = Array.from(tokenPair);
    const sellToken = tokenPairArray.find((item) => {
      const foundToken = srcBalances.balances.find(
        (bal) => bal.denom == item[1].denom
      );
      return foundToken !== undefined;
    });
    const buyToken = tokenPairArray.find((item) => {
      const foundToken = tarBalances.balances.find(
        (bal) => bal.denom == item[1].denom
      );
      return foundToken !== undefined;
    });
    if (sellToken?.[1] === undefined || buyToken?.[1] === undefined) {
      return;
    }
    // Get current date
    const currentDate = new Date();

    // Get current timestamp in milliseconds
    const currentTimestamp = currentDate.getTime();

    // Calculate the timestamp for 24 hours from now
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const expirationTimestamp = currentTimestamp + oneDayInMilliseconds;

    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); //

    const makeOrderMsg: MakeSwapMsg = {
      sourcePort: 'swap',
      sourceChannel: 'channel-1',
      sellToken: sellToken[1],
      buyToken: buyToken[1],
      makerAddress: sourceWallet.address,

      makerReceivingAddress: sourceWallet.address,
      desiredTaker: '',
      createTimestamp: Long.fromNumber(currentTimestamp),
      timeoutHeight: {
        revisionHeight: Long.fromInt(10),
        revisionNumber: Long.fromInt(10000000000),
      },
      timeoutTimestamp: timeoutTimeStamp,
      expirationTimestamp: Long.fromInt(expirationTimestamp),
    };

    const msg = {
      typeUrl: '/ibc.applications.atomic_swap.v1.MakeSwapMsg',
      value: makeOrderMsg,
    };
    console.log(client);

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
      const txHash = await client!.broadCastTx(data);
      console.log('TxHash:', txHash);
    } else {
      console.log('there are problem in encoding');
    }
  };

  const onTakeOrder = async (order: IAtomicSwapOrder) => {
    const chainID = balances.find((bal) =>
      bal.balances
        .map((item) => item.denom)
        .includes(order.maker.buy_token.denom)
    )?.id;
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
      const txHash = await client!.broadCastTx(data);
      console.log('TxHash:', txHash);
    } else {
      console.log('there are problem in encoding');
    }
  };

  const onCancelOrder = async (order: IAtomicSwapOrder) => {
    const chainID = balances.find((bal) =>
      bal.balances
        .map((item) => item.denom)
        .includes(order.maker.sell_token.denom)
    )?.id;
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
      const txHash = await client!.broadCastTx(data);
      console.log('TxHash:', txHash);
    } else {
      console.log('there are problem in encoding');
    }
  };

  const onNewOrder = () => {
    setOpenOrder(true);
  };

  return (
    <div>
      {!openOrder && (
        <div>
          <div className="tabs hidden">
            <TabItem tab={tab} setTab={setTab} title="All" value="all" />
            <TabItem
              tab={tab}
              setTab={setTab}
              title="Inbound"
              value="inbound"
            />
            <TabItem
              tab={tab}
              setTab={setTab}
              title="Outbound"
              value="outbound"
            />
            <TabItem
              tab={tab}
              setTab={setTab}
              title="Completed"
              value="completed"
            />
            <TabItem
              tab={tab}
              setTab={setTab}
              title="Cancelled"
              value="cancelled"
            />
          </div>

          <div className="">
            {orders.map((order, index) => (
              <OrderCard
                order={order}
                key={index}
                tab={order.status}
                onTake={(order) => onTakeOrder(order)}
                onCancel={(order) => onCancelOrder(order)}
                wallets={wallets}
              ></OrderCard>
            ))}
          </div>
        </div>
      )}
      {openOrder && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div>Input Swap Params</div>
          {balances.map((coins, index) => {
            return (
              <div className="grid gap-4">
                {coins.balances
                  .filter((coin) => !coin.denom.includes('pool'))
                  .map((coin) => {
                    return (
                      <TokenInput
                        placeholder="Amount.."
                        coin={
                          tokenPair.get(index) ?? {
                            denom: coin.denom,
                            amount: '0',
                          }
                        }
                        onChange={(amount) => {
                          const updatedTokenPair = new Map(tokenPair);
                          updatedTokenPair.set(index, {
                            denom: coin.denom,
                            amount: amount,
                          });
                          setTokenPair(updatedTokenPair);
                        }}
                      ></TokenInput>
                    );
                  })}
                {index < balances.length - 1 && (
                  <div className="w-full h-1 bg-gray-700"></div>
                )}
              </div>
            );
          })}

          <label>
            Select Wallet:
            <select
              className="ml-4"
              onChange={(e) => setSender(e.target.value)}
            >
              {wallets.map((item, index) => (
                <option value={item.chainInfo.chainID}>
                  Wallet {index} ({item.chainInfo.chainID})
                </option>
              ))}
            </select>
          </label>
          <button className="btn btn-primary" onClick={onMakeOrder}>
            Make Order
          </button>
        </div>
      )}
    </div>
  );
}
