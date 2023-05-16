import { PaginatedResponse } from "."

export interface AtomicOrder {
  id: string,
  maker: {
    source_port: string,
    source_channel: string,
    sell_token: {
      denom: string,
      amount: string
    },
    buy_token: {
      denom: string,
      amount: string
    },
    maker_address: string,
    maker_receiving_address: string,
    desired_taker: string,
    create_timestamp: string,
    timeout_height: {
      revision_number: string,
      revision_height: string
    },
    timeout_timestamp: string,
    expiration_timestamp: string
  },
  status: string,
  path: string,
  takers: {
    order_id: string,
    sell_token: {
      denom: string,
      amount: string
    },
    taker_address: string,
    taker_receiving_address: string,
    timeout_height: {
      revision_number: string,
      revision_height: string
    },
    timeout_timestamp: string,
    create_timestamp: string
  },
  cancel_timestamp: string,
  complete_timestamp: string
}

export interface InterchainLiquidityPool {
  poolId: string,
  creator: string,
  assets: [
    {
      side: string,
      balance: {
        denom: string,
        amount: string
      },
      weight: number,
      decimal: number
    }
  ],
  supply: {
    denom: string,
    amount: string
  },
  pool_price: number,
  status: string,
  encounterPartyPort: string,
  encounterPartyChannel: string
}

export interface PaginatedLiquidityPools extends PaginatedResponse {
  interchainLiquidityPool: InterchainLiquidityPool[]
}