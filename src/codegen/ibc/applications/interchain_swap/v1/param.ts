import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../../helpers";
/** Params defines the set of IBC swap parameters. */
export interface Params {
  /** swap_enabled enables or disables all cross-chain token transfers from this chain. */
  swapEnabled: boolean;
  /** max_fee_rate set a max value of fee, it's base point, 1/10000 */
  maxFeeRate: number;
}
/** Params defines the set of IBC swap parameters. */
export interface ParamsSDKType {
  swap_enabled: boolean;
  max_fee_rate: number;
}
function createBaseParams(): Params {
  return {
    swapEnabled: false,
    maxFeeRate: 0
  };
}
export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.swapEnabled === true) {
      writer.uint32(8).bool(message.swapEnabled);
    }
    if (message.maxFeeRate !== 0) {
      writer.uint32(16).uint32(message.maxFeeRate);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swapEnabled = reader.bool();
          break;
        case 2:
          message.maxFeeRate = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Params>): Params {
    const message = createBaseParams();
    message.swapEnabled = object.swapEnabled ?? false;
    message.maxFeeRate = object.maxFeeRate ?? 0;
    return message;
  }
};