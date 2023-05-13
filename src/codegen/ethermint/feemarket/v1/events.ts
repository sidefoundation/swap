import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../helpers";
/** EventFeeMarket is the event type for the fee market module */
export interface EventFeeMarket {
  /** base_fee for EIP-1559 blocks */
  baseFee: string;
}
/** EventFeeMarket is the event type for the fee market module */
export interface EventFeeMarketSDKType {
  base_fee: string;
}
/** EventBlockGas defines an Ethereum block gas event */
export interface EventBlockGas {
  /** height of the block */
  height: string;
  /** amount of gas wanted by the block */
  amount: string;
}
/** EventBlockGas defines an Ethereum block gas event */
export interface EventBlockGasSDKType {
  height: string;
  amount: string;
}
function createBaseEventFeeMarket(): EventFeeMarket {
  return {
    baseFee: ""
  };
}
export const EventFeeMarket = {
  encode(message: EventFeeMarket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseFee !== "") {
      writer.uint32(10).string(message.baseFee);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): EventFeeMarket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFeeMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<EventFeeMarket>): EventFeeMarket {
    const message = createBaseEventFeeMarket();
    message.baseFee = object.baseFee ?? "";
    return message;
  }
};
function createBaseEventBlockGas(): EventBlockGas {
  return {
    height: "",
    amount: ""
  };
}
export const EventBlockGas = {
  encode(message: EventBlockGas, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "") {
      writer.uint32(10).string(message.height);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): EventBlockGas {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBlockGas();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<EventBlockGas>): EventBlockGas {
    const message = createBaseEventBlockGas();
    message.height = object.height ?? "";
    message.amount = object.amount ?? "";
    return message;
  }
};