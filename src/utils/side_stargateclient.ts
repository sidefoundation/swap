import type { GeneratedType, OfflineSigner } from '@cosmjs/proto-signing';
import { Registry } from '@cosmjs/proto-signing';
import type {
  DeliverTxResponse,
  SigningStargateClientOptions,
  StdFee,
} from '@cosmjs/stargate';
import {
  defaultRegistryTypes,
  QueryClient,
  SigningStargateClient,
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

export const sideDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> =
  [
    ...defaultRegistryTypes,
    // ...sideTypes,
  ];

function createDefaultRegistry(): Registry {
  return new Registry(sideDefaultRegistryTypes);
}

export class SideSigningStargateClient extends SigningStargateClient {
  public readonly sideQueryClient: any | undefined;

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {}
  ): Promise<SideSigningStargateClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SideSigningStargateClient(tmClient, signer, {
      registry: createDefaultRegistry(),
      ...options,
    });
  }

  protected constructor(
    tmClient: Tendermint34Client | undefined,
    signer: OfflineSigner,
    options: SigningStargateClientOptions
  ) {
    super(tmClient, signer, options);
    if (tmClient) {
      this.sideQueryClient = QueryClient.withExtensions(tmClient);
    }
  }

  public async createPool(
    creator: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    return this.signAndBroadcast(creator, [], fee, memo);
  }
}
