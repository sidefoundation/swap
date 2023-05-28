// PoolDetailsList.tsx
import React, { useEffect, useState } from 'react';
import { ILiquidityPool } from '@/shared/types/liquidity';
import { CoinInput } from '@/components/CoinInput';
import useWalletStore, { Wallet, Balance } from '@/store/wallet';
import { AppConfig } from '@/utils/AppConfig';
import PoolModal from './PoolModal';
import PoolDetails from './PoolDetails';
import toast from 'react-hot-toast';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  MsgCreatePoolRequest,
  MsgSingleAssetDepositRequest,
} from '@/codegen/ibc/applications/interchain_swap/v1/tx';
import Long from 'long';
import { StdFee } from '@cosmjs/stargate';

import {
  MdList,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAddToQueue,
  MdOutlineClose,
} from 'react-icons/md';

interface PoolDetailsListProps {
  pools: ILiquidityPool[];
}

const PoolDetailsList: React.FC<PoolDetailsListProps> = ({ pools }) => {
  const {
    setLoading,
    wallets,
    suggestChain,
    getClient,
    selectedChain,
    balanceList,
    getBalance,
    setBalance,
  } = useWalletStore();

  const [signers, setSigners] = useState<Wallet[]>([]);
  const [allBalances, setAllBalances] = useState<Balance[]>([]);
  const [otherList, setOtherList] = useState<Balance[]>([]);
  const fetchBalances = async () => {
    const balance = await getBalance(true);
    setAllBalances(balance);
    setBalance(balance);

    const balanceItem = balance?.filter((item) => {
      if (item.id === selectedChain.chainID) {
        return item;
      }
    });
    const defalutFirst = balanceItem?.[0]?.balances?.filter((item) => {
      if (!item.denom.includes('pool')) {
        return item;
      }
    })?.[0]?.denom;
    selectCoin('first', defalutFirst);

    console.log(allBalances, 'allBalancesallBalancesallBalances', balanceList);
  };
  useEffect(() => {
    if (selectedChain.chainID) {
      setPoolPair({
        first: { denom: '', amount: '0', weight: '50', chain: '' },
        second: { denom: '', amount: '0', weight: '50', chain: '' },
      });
      fetchBalances();
      getRemoteChainList();
    }
  }, [selectedChain]);
  const [poolPair, setPoolPair] = useState({
    first: { denom: '', amount: '0', weight: '50', chain: '' },
    second: { denom: '', amount: '0', weight: '50', chain: '' },
  });
  const [remoteList, setRemoteChainList] = useState([]);
  useEffect(() => {
    setSigners(wallets);
  }, [wallets]);

  const getRemoteChainList = () => {
    const remote = AppConfig.chains.find((chain) => {
      if (chain.chainID === selectedChain.chainID) {
        return chain;
      }
    })?.counterpartis;
    setRemoteChainList(remote);
  };
  const onChangeWeight = (value, side) => {
    setPoolPair({
      ...poolPair,
      first: {
        denom: poolPair.first.denom,
        amount: poolPair.first.amount,
        weight: side === 'first' ? value : (100 - parseInt(value)).toString(),
        chain: poolPair.first.chain,
      },
      second: {
        denom: poolPair.second.denom,
        amount: poolPair.second.amount,
        weight: side === 'first' ? (100 - parseInt(value)).toString() : value,
        chain: poolPair.second.chain,
      },
    });
  };
  const selectCoin = (side, value) => {
    setPoolPair({
      ...poolPair,
      [side]: {
        denom: value || '',
        amount: poolPair?.[side]?.amount,
        weight: poolPair?.[side]?.weight,
        chain: poolPair?.[side]?.chain,
      },
    });
  };

  const suggestRemoteChain = (value) => {
    setPoolPair({
      ...poolPair,
      second: {
        denom: poolPair.second.denom,
        amount: poolPair.second.amount,
        weight: poolPair.second.weight,
        chain: value,
      },
    });
    const otherLists = allBalances?.filter((item) => {
      if (item.id !== selectedChain.chainID) {
        return item;
      }
    });
    setOtherList(otherLists);
    console.log(otherList, 'otherList');
  };

  const handleCoinUpdate = (type: 'first' | 'second', value: string) => {
    setPoolPair((prevPoolPair) => ({
      ...prevPoolPair,
      [type]: {
        denom: poolPair[type].denom,
        amount: value,
        chain: poolPair[type].chain,
        weight: poolPair[type].weight,
      },
    }));
  };

  const onCreatePool = async () => {
    setLoading(true);
    const wallet = wallets.find(
      (wallet) => wallet.chainInfo.chainID === selectedChain.chainID
    );
    if (wallet === undefined) {
      toast.error("you don't have wallet about this chain");
    }
    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now

    try {
      const client = await getClient(wallet!.chainInfo);

      const createPoolMsg: MsgCreatePoolRequest = {
        sourcePort: 'interchainswap',
        sourceChannel: 'channel-0',
        sender: wallet!.address,
        tokens: [
          { denom: poolPair.first.denom, amount: poolPair.first.amount },
          { denom: poolPair.second.denom, amount: poolPair.second.amount },
        ],
        decimals: [18, 18],
        weight: `${poolPair.first?.weight}:${poolPair.second?.weight}`,
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000),
        },
        timeoutTimeStamp: timeoutTimeStamp,
      };

      const msg = {
        typeUrl: '/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest',
        value: createPoolMsg,
      };
      console.log(client);

      const fee: StdFee = {
        amount: [{ denom: wallet!.chainInfo.denom, amount: '0.01' }],
        gas: '200000',
      };
      console.log(createPoolMsg, 'createPoolMsg');
      console.log(fee, 'fee');
      console.log(wallet, 'wallet');
      const data = await client!.signWithEthermint(
        wallet!.address,
        [msg],
        wallet!.chainInfo,
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
    } catch (error) {
      toast.error(error);

      console.log('error', error);
    }
    setLoading(false);
  };

  const onEnablePool = async (pool: ILiquidityPool) => {
    if(selectedChain.chainID === pool.creatorChainId) {
      toast.error("Please select counter party chain")
      return
    }
    //setLoading(true)
    await suggestChain(selectedChain);

    const wallet = wallets.find(
      (wallet) => wallet.chainInfo.chainID === selectedChain.chainID
    );

    const timeoutTimeStamp = Long.fromNumber(
      (Date.now() + 60 * 1000) * 1000000
    ); // 1 hour from now
    try {
  
      const client = await getClient(wallet!.chainInfo);
      console.log("here", pool.assets.find(
        (item) => item.side == "NATIVE"
      )!.balance)
    
      const singleDepositMsg: MsgSingleAssetDepositRequest = {
        poolId: pool.poolId,
        sender: wallet!.address,
        token: pool.assets.find(
          (item) => item.side == "NATIVE"
        )!.balance,
        timeoutHeight: {
          revisionHeight: Long.fromInt(10),
          revisionNumber: Long.fromInt(10000000000),
        },
        timeoutTimeStamp: timeoutTimeStamp,
      };

      const msg = {
        typeUrl:
          '/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest',
        value: singleDepositMsg,
      };


      const fee: StdFee = {
        amount: [{ denom: wallet!.chainInfo.denom, amount: '0.01' }],
        gas: '200000',
      };
      const data = await client!.signWithEthermint(
        wallet!.address,
        [msg],
        wallet!.chainInfo,
        fee,
        'test'
      );
      if (data !== undefined) {
        const txHash = await client!.broadCastTx(data);
        console.log('TxHash:', txHash);
      } else {
        console.log('there are problem in encoding');
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };
  return (
    <div>
      {/* image-header */}
      <div className="relative mt-10 h-[138px] flex items-center justify-center rounded-lg overflow-hidden bg-[url(/assets/images/maskbg.png)] bg-cover">
        <div className="text-5xl font-bold text-white">
          Scalable, Bridgeless
        </div>
      </div>

      <div className=" mt-5 overflow-x-auto bg-base-100 p-8 rounded-lg min-h-[400px] mb-10">
        {/* search filter */}
        <div className="flex w-full mb-5">
          <div className="relative flex-1 w-full">
            <MdSearch className="absolute top-1/2 -translate-y-[50%] left-2 text-2xl text-gray-300 dark:text-gray-400" />
            <input
              className="flex-1 w-full pl-10 input input-bordered"
              placeholder="Search token name"
              onChange={() => {}}
            />
          </div>

          <div className="ml-4">
            <button className="mr-2 text-2xl btn">
              <MdList />
            </button>

            <label
              htmlFor="modal-create-pool"
              className="text-2xl btn btn-primary"
            >
              <MdAddToQueue />
            </label>
          </div>
        </div>
        {/* list */}
        <div className="mb-5 overflow-x-auto border rounded-lg dark:border-none">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Pair / Chain</th>
                <th>Liquidity</th>
                <th>Pool Price</th>
                <th>Amount</th>
                <th>Channel</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pools.map((pool, index) => (
                <PoolDetails
                  key={index}
                  pool={pool}
                  onEnablePool={onEnablePool}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end !hidden">
          <div>
            <span className="mr-2">Rows per page: </span>
            <select
              value="10"
              className="max-w-xs select select-bordered select-sm"
              onChange={() => {}}
            >
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="mx-4">
            {'1-10'} of {'299'}
          </div>
          <div className="px-1 py-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
            <MdKeyboardArrowLeft className="text-2xl" />
          </div>
          <div className="px-1 py-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
            <MdKeyboardArrowRight className="text-2xl" />
          </div>
        </div>
      </div>

      {/* TODO: dialog should not in loop */}
      <input type="checkbox" id="modal-pool-create" className="modal-toggle" />
      <label className="cursor-pointer modal" htmlFor="modal-pool-create">
        <label className="relative modal-box" htmlFor="">
          <div className="">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold">Create New Pool</div>
              <label htmlFor="modal-pool-create" className="cursor-pointer">
                <MdOutlineClose className="text-2xl text-gray-500 dark:text-gray-400" />
              </label>
            </div>
            <div className="px-4 py-1 mb-3 rounded ">
              {/*  ChainSelect*/}
              <div className="p-2 mb-2 border">
                <span className="mr-2">selectChain:</span>
                <ul className="px-1 menu menu-horizontal ">
                  <li tabIndex={0}>
                    <a>
                      <span>{selectedChain.name}</span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 p-2 bg-base-100">
                      {AppConfig?.chains?.map((item, index) => {
                        return (
                          <li key={index}>
                            <a onClick={() => suggestChain(item)}>
                              {item?.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              {/* CoinSelect */}
              <div className="mb-2 border">
                <span>selectCoin:</span>
                <ul className="px-1 menu menu-horizontal ">
                  <li tabIndex={0}>
                    <a>
                      <span>{poolPair.first?.denom}</span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 p-2 bg-base-100">
                      {balanceList?.[0]?.balances?.map((item, index) => {
                        if (!item.denom.includes('pool')) {
                          return (
                            <li key={index}>
                              <a
                                onClick={() => selectCoin('first', item?.denom)}
                              >
                                {item?.denom}
                              </a>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              {/*amount  */}
              <div className="flex mb-2 border">
                <span>amount:</span>
                <div>
                  <CoinInput
                    coin={{
                      amount: poolPair.first.amount,
                      denom: poolPair.first.denom,
                    }}
                    placeholder="Amount ..."
                    onChange={(value) => handleCoinUpdate('first', value)}
                  />
                </div>
              </div>
              {/* weight */}
              <div className="flex border">
                <span>weight:</span>
                <div>{poolPair.first.weight}</div>
              </div>
              <div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={poolPair.first.weight}
                  className="range"
                  step="10"
                  onChange={(event) =>
                    onChangeWeight(event.target.value, 'first')
                  }
                />
                <div className="flex justify-between w-full px-2 text-xs">
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                  <span>60</span>
                  <span>70</span>
                  <span>80</span>
                </div>
              </div>
            </div>
            <div className="items-center px-4 py-1 border rounded">
              {/*  ChainSelect*/}
              <div className="p-2 mb-2 border">
                <span className="mr-2">selectChain:</span>
                <ul className="px-1 menu menu-horizontal ">
                  <li tabIndex={0}>
                    <a>
                      <span>{poolPair.second.chain}</span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 p-2 bg-base-100">
                      {remoteList?.map((item, index) => {
                        return (
                          <li key={index}>
                            <a onClick={() => suggestRemoteChain(item?.name)}>
                              {item?.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              {/* CoinSelect */}
              <div className="mb-2 border">
                <span>selectCoin:</span>
                <ul className="px-1 menu menu-horizontal ">
                  <li tabIndex={0}>
                    <a>
                      <span>{poolPair.second?.denom}</span>
                      <MdKeyboardArrowDown className="fill-current" />
                    </a>
                    <ul className="z-10 p-2 bg-base-100">
                      {otherList?.[0]?.balances?.map((item, index) => {
                        if (!item.denom.includes('pool')) {
                          return (
                            <li key={index}>
                              <a
                                onClick={() =>
                                  selectCoin('second', item?.denom)
                                }
                              >
                                {item?.denom}
                              </a>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              {/*amount  */}
              <div className="flex mb-2 border">
                <span>amount:</span>
                <div>
                  <CoinInput
                    coin={{
                      amount: poolPair.second.amount,
                      denom: poolPair.second.denom,
                    }}
                    placeholder="Amount ..."
                    onChange={(value) => handleCoinUpdate('second', value)}
                  />
                </div>
              </div>
              {/* weight */}
              <div className="flex border">
                <span>weight:</span>
                <div>{poolPair.second.weight}</div>
              </div>
              <div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={poolPair.second.weight}
                  className="range"
                  step="10"
                  onChange={(event) =>
                    onChangeWeight(event.target.value, 'second')
                  }
                />
                <div className="flex justify-between w-full px-2 text-xs">
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                  <span>60</span>
                  <span>70</span>
                  <span>80</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                disabled={
                  !Number(poolPair.second?.amount || 0) ||
                  !Number(poolPair.first?.amount || 0)
                }
                className="w-full btn btn-primary"
                onClick={onCreatePool}
              >
                Confirm
              </button>
            </div>
          </div>
        </label>
      </label>

      <PoolModal />
    </div>
  );
};

export default PoolDetailsList;
