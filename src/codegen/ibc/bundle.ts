import * as _118 from "./applications/atomic_swap/v1/genesis";
import * as _119 from "./applications/atomic_swap/v1/packet";
import * as _120 from "./applications/atomic_swap/v1/query";
import * as _121 from "./applications/atomic_swap/v1/swap";
import * as _122 from "./applications/atomic_swap/v1/tx";
import * as _123 from "./applications/interchain_swap/v1/genesis";
import * as _124 from "./applications/interchain_swap/v1/market";
import * as _125 from "./applications/interchain_swap/v1/packet";
import * as _126 from "./applications/interchain_swap/v1/param";
import * as _127 from "./applications/interchain_swap/v1/query";
import * as _128 from "./applications/interchain_swap/v1/tx";
import * as _129 from "./applications/transfer/v1/genesis";
import * as _130 from "./applications/transfer/v1/query";
import * as _131 from "./applications/transfer/v1/transfer";
import * as _132 from "./applications/transfer/v1/tx";
import * as _133 from "./applications/transfer/v2/packet";
import * as _134 from "./core/channel/v1/channel";
import * as _135 from "./core/channel/v1/genesis";
import * as _136 from "./core/channel/v1/query";
import * as _137 from "./core/channel/v1/tx";
import * as _138 from "./core/client/v1/client";
import * as _139 from "./core/client/v1/genesis";
import * as _140 from "./core/client/v1/query";
import * as _141 from "./core/client/v1/tx";
import * as _142 from "./core/commitment/v1/commitment";
import * as _143 from "./core/connection/v1/connection";
import * as _144 from "./core/connection/v1/genesis";
import * as _145 from "./core/connection/v1/query";
import * as _146 from "./core/connection/v1/tx";
import * as _147 from "./core/port/v1/query";
import * as _148 from "./core/types/v1/genesis";
import * as _149 from "./lightclients/localhost/v1/localhost";
import * as _150 from "./lightclients/solomachine/v1/solomachine";
import * as _151 from "./lightclients/solomachine/v2/solomachine";
import * as _152 from "./lightclients/tendermint/v1/tendermint";
import * as _232 from "./applications/atomic_swap/v1/tx.amino";
import * as _233 from "./applications/interchain_swap/v1/tx.amino";
import * as _234 from "./applications/transfer/v1/tx.amino";
import * as _235 from "./core/channel/v1/tx.amino";
import * as _236 from "./core/client/v1/tx.amino";
import * as _237 from "./core/connection/v1/tx.amino";
import * as _238 from "./applications/atomic_swap/v1/tx.registry";
import * as _239 from "./applications/interchain_swap/v1/tx.registry";
import * as _240 from "./applications/transfer/v1/tx.registry";
import * as _241 from "./core/channel/v1/tx.registry";
import * as _242 from "./core/client/v1/tx.registry";
import * as _243 from "./core/connection/v1/tx.registry";
import * as _244 from "./applications/atomic_swap/v1/query.rpc.Query";
import * as _245 from "./applications/interchain_swap/v1/query.rpc.Query";
import * as _246 from "./applications/transfer/v1/query.rpc.Query";
import * as _247 from "./core/channel/v1/query.rpc.Query";
import * as _248 from "./core/client/v1/query.rpc.Query";
import * as _249 from "./core/connection/v1/query.rpc.Query";
import * as _250 from "./core/port/v1/query.rpc.Query";
import * as _251 from "./applications/atomic_swap/v1/tx.rpc.msg";
import * as _252 from "./applications/interchain_swap/v1/tx.rpc.msg";
import * as _253 from "./applications/transfer/v1/tx.rpc.msg";
import * as _254 from "./core/channel/v1/tx.rpc.msg";
import * as _255 from "./core/client/v1/tx.rpc.msg";
import * as _256 from "./core/connection/v1/tx.rpc.msg";
import * as _261 from "./rpc.query";
import * as _262 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace atomic_swap {
      export const v1 = {
        ..._118,
        ..._119,
        ..._120,
        ..._121,
        ..._122,
        ..._232,
        ..._238,
        ..._244,
        ..._251
      };
    }
    export namespace interchain_swap {
      export const v1 = {
        ..._123,
        ..._124,
        ..._125,
        ..._126,
        ..._127,
        ..._128,
        ..._233,
        ..._239,
        ..._245,
        ..._252
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._129,
        ..._130,
        ..._131,
        ..._132,
        ..._234,
        ..._240,
        ..._246,
        ..._253
      };
      export const v2 = {
        ..._133
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._134,
        ..._135,
        ..._136,
        ..._137,
        ..._235,
        ..._241,
        ..._247,
        ..._254
      };
    }
    export namespace client {
      export const v1 = {
        ..._138,
        ..._139,
        ..._140,
        ..._141,
        ..._236,
        ..._242,
        ..._248,
        ..._255
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._142
      };
    }
    export namespace connection {
      export const v1 = {
        ..._143,
        ..._144,
        ..._145,
        ..._146,
        ..._237,
        ..._243,
        ..._249,
        ..._256
      };
    }
    export namespace port {
      export const v1 = {
        ..._147,
        ..._250
      };
    }
    export namespace types {
      export const v1 = {
        ..._148
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._149
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._150
      };
      export const v2 = {
        ..._151
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._152
      };
    }
  }
  export const ClientFactory = {
    ..._261,
    ..._262
  };
}