export interface IEthsecp256k1PubKey {
  "@type": "/ethermint.crypto.v1.ethsecp256k1.PubKey",
  "key": string
}

export interface IBaseAccount {
  "address": string,
  "pub_key": IEthsecp256k1PubKey,
  "account_number": string,
  "sequence": string
}

export interface IAccount {
  "@type": "/ethermint.types.v1.EthAccount",
  "base_account": IBaseAccount,
  "code_hash": string
}
