import * as _95 from "./crypto/v1/ethsecp256k1/keys";
import * as _96 from "./evm/v1/events";
import * as _97 from "./evm/v1/evm";
import * as _98 from "./evm/v1/genesis";
import * as _99 from "./evm/v1/query";
import * as _100 from "./evm/v1/tx";
import * as _101 from "./feemarket/v1/events";
import * as _102 from "./feemarket/v1/feemarket";
import * as _103 from "./feemarket/v1/genesis";
import * as _104 from "./feemarket/v1/query";
import * as _105 from "./feemarket/v1/tx";
import * as _106 from "./types/v1/account";
import * as _107 from "./types/v1/dynamic_fee";
import * as _108 from "./types/v1/indexer";
import * as _109 from "./types/v1/web3";
import * as _224 from "./evm/v1/tx.amino";
import * as _225 from "./feemarket/v1/tx.amino";
import * as _226 from "./evm/v1/tx.registry";
import * as _227 from "./feemarket/v1/tx.registry";
import * as _228 from "./evm/v1/query.rpc.Query";
import * as _229 from "./feemarket/v1/query.rpc.Query";
import * as _230 from "./evm/v1/tx.rpc.msg";
import * as _231 from "./feemarket/v1/tx.rpc.msg";
import * as _259 from "./rpc.query";
import * as _260 from "./rpc.tx";
export namespace ethermint {
  export namespace crypto {
    export namespace v1 {
      export const ethsecp256k1 = {
        ..._95
      };
    }
  }
  export namespace evm {
    export const v1 = {
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._224,
      ..._226,
      ..._228,
      ..._230
    };
  }
  export namespace feemarket {
    export const v1 = {
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._105,
      ..._225,
      ..._227,
      ..._229,
      ..._231
    };
  }
  export namespace types {
    export const v1 = {
      ..._106,
      ..._107,
      ..._108,
      ..._109
    };
  }
  export const ClientFactory = {
    ..._259,
    ..._260
  };
}