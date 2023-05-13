import { Coin, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../../helpers";
/** Type defines a classification of swap messages */
export enum SwapMessageType {
  /** TYPE_UNSPECIFIED - Default zero value enumeration */
  TYPE_UNSPECIFIED = 0,
  TYPE_CREATE_POOL = 1,
  TYPE_SINGLE_DEPOSIT = 2,
  TYPE_MULTI_DEPOSIT = 3,
  TYPE_SINGLE_WITHDRAW = 4,
  TYPE_MULTI_WITHDRAW = 5,
  TYPE_LEFT_SWAP = 6,
  TYPE_RIGHT_SWAP = 7,
  UNRECOGNIZED = -1,
}
export const SwapMessageTypeSDKType = SwapMessageType;
export function swapMessageTypeFromJSON(object: any): SwapMessageType {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return SwapMessageType.TYPE_UNSPECIFIED;
    case 1:
    case "TYPE_CREATE_POOL":
      return SwapMessageType.TYPE_CREATE_POOL;
    case 2:
    case "TYPE_SINGLE_DEPOSIT":
      return SwapMessageType.TYPE_SINGLE_DEPOSIT;
    case 3:
    case "TYPE_MULTI_DEPOSIT":
      return SwapMessageType.TYPE_MULTI_DEPOSIT;
    case 4:
    case "TYPE_SINGLE_WITHDRAW":
      return SwapMessageType.TYPE_SINGLE_WITHDRAW;
    case 5:
    case "TYPE_MULTI_WITHDRAW":
      return SwapMessageType.TYPE_MULTI_WITHDRAW;
    case 6:
    case "TYPE_LEFT_SWAP":
      return SwapMessageType.TYPE_LEFT_SWAP;
    case 7:
    case "TYPE_RIGHT_SWAP":
      return SwapMessageType.TYPE_RIGHT_SWAP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SwapMessageType.UNRECOGNIZED;
  }
}
export function swapMessageTypeToJSON(object: SwapMessageType): string {
  switch (object) {
    case SwapMessageType.TYPE_UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case SwapMessageType.TYPE_CREATE_POOL:
      return "TYPE_CREATE_POOL";
    case SwapMessageType.TYPE_SINGLE_DEPOSIT:
      return "TYPE_SINGLE_DEPOSIT";
    case SwapMessageType.TYPE_MULTI_DEPOSIT:
      return "TYPE_MULTI_DEPOSIT";
    case SwapMessageType.TYPE_SINGLE_WITHDRAW:
      return "TYPE_SINGLE_WITHDRAW";
    case SwapMessageType.TYPE_MULTI_WITHDRAW:
      return "TYPE_MULTI_WITHDRAW";
    case SwapMessageType.TYPE_LEFT_SWAP:
      return "TYPE_LEFT_SWAP";
    case SwapMessageType.TYPE_RIGHT_SWAP:
      return "TYPE_RIGHT_SWAP";
    case SwapMessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface StateChange {
  in: Coin[];
  out: Coin[];
  poolTokens: Coin[];
}
export interface StateChangeSDKType {
  in: CoinSDKType[];
  out: CoinSDKType[];
  poolTokens: CoinSDKType[];
}
/** IBCSwapPacketData is comprised of a raw transaction, type of transaction and optional memo field. */
export interface IBCSwapPacketData {
  type: SwapMessageType;
  /** marshall data of transactions */
  data: Uint8Array;
  /** current pool states on source chain, could be empty. */
  stateChange?: StateChange;
}
/** IBCSwapPacketData is comprised of a raw transaction, type of transaction and optional memo field. */
export interface IBCSwapPacketDataSDKType {
  type: SwapMessageType;
  data: Uint8Array;
  stateChange?: StateChangeSDKType;
}
function createBaseStateChange(): StateChange {
  return {
    in: [],
    out: [],
    poolTokens: []
  };
}
export const StateChange = {
  encode(message: StateChange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.in) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.out) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.poolTokens) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): StateChange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.in.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.out.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.poolTokens.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<StateChange>): StateChange {
    const message = createBaseStateChange();
    message.in = object.in?.map(e => Coin.fromPartial(e)) || [];
    message.out = object.out?.map(e => Coin.fromPartial(e)) || [];
    message.poolTokens = object.poolTokens?.map(e => Coin.fromPartial(e)) || [];
    return message;
  }
};
function createBaseIBCSwapPacketData(): IBCSwapPacketData {
  return {
    type: 0,
    data: new Uint8Array(),
    stateChange: undefined
  };
}
export const IBCSwapPacketData = {
  encode(message: IBCSwapPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.stateChange !== undefined) {
      StateChange.encode(message.stateChange, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): IBCSwapPacketData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIBCSwapPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = (reader.int32() as any);
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.stateChange = StateChange.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<IBCSwapPacketData>): IBCSwapPacketData {
    const message = createBaseIBCSwapPacketData();
    message.type = object.type ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.stateChange = object.stateChange !== undefined && object.stateChange !== null ? StateChange.fromPartial(object.stateChange) : undefined;
    return message;
  }
};