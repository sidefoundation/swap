export interface IAtomicSwapOrder {
  id: string;
  maker: Maker;
  status: string;
  path: string;
  takers: Takers;
  cancel_timestamp: string;
  complete_timestamp: string;
  side: string;
}

interface Maker {
  source_port: string;
  source_channel: string;
  sell_token: Token;
  buy_token: Token;
  maker_address: string;
  maker_receiving_address: string;
  desired_taker: string;
  create_timestamp: string;
  timeout_height: RevisionInfo;
  timeout_timestamp: string;
  expiration_timestamp: string;
}

interface Token {
  denom: string;
  amount: string;
}

interface RevisionInfo {
  revision_number: string;
  revision_height: string;
}

interface Takers {
  order_id: string;
  sell_token: Token;
  taker_address: string;
  taker_receiving_address: string;
  timeout_height: RevisionInfo;
  timeout_timestamp: string;
  create_timestamp: string;
}
