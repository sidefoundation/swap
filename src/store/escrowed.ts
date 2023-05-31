import { proxy, useSnapshot } from 'valtio';
import fetchChannels, {
  fetchAtomicEscrowAddress,
  fetchInterchainEscrowAddress,
} from '@/http/requests/get/fetchChannels';
import fetchBalances from '@/http/requests/get/fetchBalance';
import { Coin } from '@cosmjs/stargate';
import { toast } from 'react-hot-toast';
import { EscrowPortId } from '@/shared/types/escrow';

type Channel = { channel_id: string; port_id: EscrowPortId };
type EscrowedAddress = {
  channel: Channel;
  escrowedAddress: string;
  balances: Coin[];
};

export const escrowedStore = proxy({
  channels: [] as Channel[],
  escrowedAddressList: [] as EscrowedAddress[],
});

export const useEscrowedStore = () => {
  return useSnapshot(escrowedStore);
};

// api
export const fetchAllChannels = async (restUrl: string) => {
  toast.loading('Loading...');
  const res: Channel[] = await fetchChannels(restUrl);
  escrowedStore.channels = res as Channel[];

  // get escrowed address:
  const promiseAll = [];
  for (let i = 0; i < res?.length; i += 1) {
    const item: Channel = res[i] as Channel;

    switch (item.port_id) {
      case 'swap':
        promiseAll.push(
          fetchAtomicEscrowAddress(restUrl, item.channel_id, item.port_id).then(
            (res) => {
              if (res) {
                return fetchBalances(restUrl, res?.escrow_address).then(
                  (res2: Coin[]) => {
                    return {
                      channel: item,
                      escrowedAddress: res?.escrow_address,
                      balances: res2,
                    };
                  }
                );
              }
            }
          )
        );
        break;
      case 'interchainswap':
        promiseAll.push(
          fetchInterchainEscrowAddress(
            restUrl,
            item.channel_id,
            item.port_id
          ).then((res) => {
            if (res) {
              return fetchBalances(restUrl, res?.escrow_address).then(
                (res2: Coin[]) => {
                  return {
                    channel: item,
                    escrowedAddress: res?.escrow_address,
                    balances: res2,
                  };
                }
              );
            }
          })
        );
      default:
        break;
    }
  }
  const resAll = await Promise.all(promiseAll);
  toast.dismiss();
  escrowedStore.escrowedAddressList = resAll as EscrowedAddress[];
};
