'use client';

import { fetchAllChannels, useEscrowedStore } from '@/store/escrowed';
import { useEffect } from 'react';
import { useChainStore } from '@/store/chain';
export default function Escrowed() {
  const { escrowedAddressList } = useEscrowedStore();
  const { chainCurrent } = useChainStore();

  useEffect(() => {
    if (chainCurrent?.chainID) {
      fetchAllChannels(chainCurrent?.restUrl);
    }
  }, [chainCurrent]);

  return (
    <div className="bg-base-100 container mx-auto mt-10 rounded-lg px-5 pt-5 pb-10">
      <div className="mb-5 flex items-center">
        <div className="text-xl font-semibold flex-1">Escrowed Accounts</div>
        <div></div>
      </div>
      <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
        <table className="table  w-full">
          <thead>
            <tr>
              <th>Address</th>
              <th>Channel_id/Port_id</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            {escrowedAddressList?.map((item, index) => (
              <tr key={index}>
                <td width="40%">{item?.escrowedAddress}</td>
                <td width="30%">
                  {item?.channel?.channel_id} / {item?.channel?.port_id}
                </td>
                <td>
                  <div>
                    {item?.balances?.map((balance, key) => (
                      <div key={key}>
                        {balance?.amount} {balance?.denom}
                      </div>
                    ))}
                    {item?.balances?.length === 0 ? '--' : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
