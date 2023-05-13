import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../../helpers";
/** Type defines a classification of swap messages */
export enum SwapMessageType {
  /** TYPE_UNSPECIFIED - Default zero value enumeration */
  TYPE_UNSPECIFIED = 0,
  TYPE_MSG_MAKE_SWAP = 1,
  TYPE_MSG_TAKE_SWAP = 2,
  TYPE_MSG_CANCEL_SWAP = 3,
  UNRECOGNIZED = -1,
}
export const SwapMessageTypeSDKType = SwapMessageType;
export function swapMessageTypeFromJSON(object: any): SwapMessageType {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return SwapMessageType.TYPE_UNSPECIFIED;
    case 1:
    case "TYPE_MSG_MAKE_SWAP":
      return SwapMessageType.TYPE_MSG_MAKE_SWAP;
    case 2:
    case "TYPE_MSG_TAKE_SWAP":
      return SwapMessageType.TYPE_MSG_TAKE_SWAP;
    case 3:
    case "TYPE_MSG_CANCEL_SWAP":
      return SwapMessageType.TYPE_MSG_CANCEL_SWAP;
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
    case SwapMessageType.TYPE_MSG_MAKE_SWAP:
      return "TYPE_MSG_MAKE_SWAP";
    case SwapMessageType.TYPE_MSG_TAKE_SWAP:
      return "TYPE_MSG_TAKE_SWAP";
    case SwapMessageType.TYPE_MSG_CANCEL_SWAP:
      return "TYPE_MSG_CANCEL_SWAP";
    case SwapMessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** AtomicSwapPacketData is comprised of a raw transaction, type of transaction and optional memo field. */
export interface AtomicSwapPacketData {
  type: SwapMessageType;
  data: Uint8Array;
  memo: string;
}
/** AtomicSwapPacketData is comprised of a raw transaction, type of transaction and optional memo field. */
export interface AtomicSwapPacketDataSDKType {
  type: SwapMessageType;
  data: Uint8Array;
  memo: string;
}
function createBaseAtomicSwapPacketData(): AtomicSwapPacketData {
  return {
    type: 0,
    data: new Uint8Array(),
    memo: ""
  };
}
export const AtomicSwapPacketData = {
  encode(message: AtomicSwapPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.memo !== "") {
      writer.uint32(26).string(message.memo);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): AtomicSwapPacketData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAtomicSwapPacketData();
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
          message.memo = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<AtomicSwapPacketData>): AtomicSwapPacketData {
    const message = createBaseAtomicSwapPacketData();
    message.type = object.type ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.memo = object.memo ?? "";
    return message;
  }
};