import { Coin, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { Height, HeightSDKType } from "../../../core/client/v1/client";
import { Long, DeepPartial } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
export interface MakeSwapMsg {
  /** the port on which the packet will be sent */
  sourcePort: string;
  /** the channel by which the packet will be sent */
  sourceChannel: string;
  /** the tokens to be sell */
  sellToken?: Coin;
  buyToken?: Coin;
  /** the sender address */
  makerAddress: string;
  /** the sender's address on the destination chain */
  makerReceivingAddress: string;
  /**
   * if desired_taker is specified,
   * only the desired_taker is allowed to take this order
   * this is address on destination chain
   */
  desiredTaker: string;
  createTimestamp: Long;
  /**
   * Timeout height relative to the current block height.
   * The timeout is disabled when set to 0.
   */
  timeoutHeight?: Height;
  /**
   * Timeout timestamp in absolute nanoseconds since unix epoch.
   * The timeout is disabled when set to 0.
   */
  timeoutTimestamp: Long;
  expirationTimestamp: Long;
}
export interface MakeSwapMsgSDKType {
  source_port: string;
  source_channel: string;
  sell_token?: CoinSDKType;
  buy_token?: CoinSDKType;
  maker_address: string;
  maker_receiving_address: string;
  desired_taker: string;
  create_timestamp: Long;
  timeout_height?: HeightSDKType;
  timeout_timestamp: Long;
  expiration_timestamp: Long;
}
export interface MsgMakeSwapResponse {
  orderId: string;
}
export interface MsgMakeSwapResponseSDKType {
  order_id: string;
}
export interface TakeSwapMsg {
  orderId: string;
  /** the tokens to be sell */
  sellToken?: Coin;
  /** the sender address */
  takerAddress: string;
  /** the sender's address on the destination chain */
  takerReceivingAddress: string;
  /**
   * Timeout height relative to the current block height.
   * The timeout is disabled when set to 0.
   */
  timeoutHeight?: Height;
  /**
   * Timeout timestamp in absolute nanoseconds since unix epoch.
   * The timeout is disabled when set to 0.
   */
  timeoutTimestamp: Long;
  createTimestamp: Long;
}
export interface TakeSwapMsgSDKType {
  order_id: string;
  sell_token?: CoinSDKType;
  taker_address: string;
  taker_receiving_address: string;
  timeout_height?: HeightSDKType;
  timeout_timestamp: Long;
  create_timestamp: Long;
}
export interface MsgTakeSwapResponse {
  orderId: string;
}
export interface MsgTakeSwapResponseSDKType {
  order_id: string;
}
export interface CancelSwapMsg {
  orderId: string;
  /** the sender address */
  makerAddress: string;
  /**
   * Timeout height relative to the current block height.
   * The timeout is disabled when set to 0.
   */
  timeoutHeight?: Height;
  /**
   * Timeout timestamp in absolute nanoseconds since unix epoch.
   * The timeout is disabled when set to 0.
   */
  timeoutTimestamp: Long;
  createTimestamp: Long;
}
export interface CancelSwapMsgSDKType {
  order_id: string;
  maker_address: string;
  timeout_height?: HeightSDKType;
  timeout_timestamp: Long;
  create_timestamp: Long;
}
export interface MsgCancelSwapResponse {
  orderId: string;
}
export interface MsgCancelSwapResponseSDKType {
  order_id: string;
}
function createBaseMakeSwapMsg(): MakeSwapMsg {
  return {
    sourcePort: "",
    sourceChannel: "",
    sellToken: undefined,
    buyToken: undefined,
    makerAddress: "",
    makerReceivingAddress: "",
    desiredTaker: "",
    createTimestamp: Long.ZERO,
    timeoutHeight: undefined,
    timeoutTimestamp: Long.UZERO,
    expirationTimestamp: Long.UZERO
  };
}
export const MakeSwapMsg = {
  encode(message: MakeSwapMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourcePort !== "") {
      writer.uint32(10).string(message.sourcePort);
    }
    if (message.sourceChannel !== "") {
      writer.uint32(18).string(message.sourceChannel);
    }
    if (message.sellToken !== undefined) {
      Coin.encode(message.sellToken, writer.uint32(26).fork()).ldelim();
    }
    if (message.buyToken !== undefined) {
      Coin.encode(message.buyToken, writer.uint32(34).fork()).ldelim();
    }
    if (message.makerAddress !== "") {
      writer.uint32(42).string(message.makerAddress);
    }
    if (message.makerReceivingAddress !== "") {
      writer.uint32(50).string(message.makerReceivingAddress);
    }
    if (message.desiredTaker !== "") {
      writer.uint32(58).string(message.desiredTaker);
    }
    if (!message.createTimestamp.isZero()) {
      writer.uint32(64).int64(message.createTimestamp);
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(74).fork()).ldelim();
    }
    if (!message.timeoutTimestamp.isZero()) {
      writer.uint32(80).uint64(message.timeoutTimestamp);
    }
    if (!message.expirationTimestamp.isZero()) {
      writer.uint32(88).uint64(message.expirationTimestamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MakeSwapMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMakeSwapMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sourcePort = reader.string();
          break;
        case 2:
          message.sourceChannel = reader.string();
          break;
        case 3:
          message.sellToken = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.buyToken = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.makerAddress = reader.string();
          break;
        case 6:
          message.makerReceivingAddress = reader.string();
          break;
        case 7:
          message.desiredTaker = reader.string();
          break;
        case 8:
          message.createTimestamp = (reader.int64() as Long);
          break;
        case 9:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 10:
          message.timeoutTimestamp = (reader.uint64() as Long);
          break;
        case 11:
          message.expirationTimestamp = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MakeSwapMsg>): MakeSwapMsg {
    const message = createBaseMakeSwapMsg();
    message.sourcePort = object.sourcePort ?? "";
    message.sourceChannel = object.sourceChannel ?? "";
    message.sellToken = object.sellToken !== undefined && object.sellToken !== null ? Coin.fromPartial(object.sellToken) : undefined;
    message.buyToken = object.buyToken !== undefined && object.buyToken !== null ? Coin.fromPartial(object.buyToken) : undefined;
    message.makerAddress = object.makerAddress ?? "";
    message.makerReceivingAddress = object.makerReceivingAddress ?? "";
    message.desiredTaker = object.desiredTaker ?? "";
    message.createTimestamp = object.createTimestamp !== undefined && object.createTimestamp !== null ? Long.fromValue(object.createTimestamp) : Long.ZERO;
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimestamp = object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null ? Long.fromValue(object.timeoutTimestamp) : Long.UZERO;
    message.expirationTimestamp = object.expirationTimestamp !== undefined && object.expirationTimestamp !== null ? Long.fromValue(object.expirationTimestamp) : Long.UZERO;
    return message;
  }
};
function createBaseMsgMakeSwapResponse(): MsgMakeSwapResponse {
  return {
    orderId: ""
  };
}
export const MsgMakeSwapResponse = {
  encode(message: MsgMakeSwapResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== "") {
      writer.uint32(10).string(message.orderId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMakeSwapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMakeSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgMakeSwapResponse>): MsgMakeSwapResponse {
    const message = createBaseMsgMakeSwapResponse();
    message.orderId = object.orderId ?? "";
    return message;
  }
};
function createBaseTakeSwapMsg(): TakeSwapMsg {
  return {
    orderId: "",
    sellToken: undefined,
    takerAddress: "",
    takerReceivingAddress: "",
    timeoutHeight: undefined,
    timeoutTimestamp: Long.UZERO,
    createTimestamp: Long.ZERO
  };
}
export const TakeSwapMsg = {
  encode(message: TakeSwapMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== "") {
      writer.uint32(26).string(message.orderId);
    }
    if (message.sellToken !== undefined) {
      Coin.encode(message.sellToken, writer.uint32(34).fork()).ldelim();
    }
    if (message.takerAddress !== "") {
      writer.uint32(42).string(message.takerAddress);
    }
    if (message.takerReceivingAddress !== "") {
      writer.uint32(50).string(message.takerReceivingAddress);
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(58).fork()).ldelim();
    }
    if (!message.timeoutTimestamp.isZero()) {
      writer.uint32(64).uint64(message.timeoutTimestamp);
    }
    if (!message.createTimestamp.isZero()) {
      writer.uint32(72).int64(message.createTimestamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): TakeSwapMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakeSwapMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.orderId = reader.string();
          break;
        case 4:
          message.sellToken = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.takerAddress = reader.string();
          break;
        case 6:
          message.takerReceivingAddress = reader.string();
          break;
        case 7:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 8:
          message.timeoutTimestamp = (reader.uint64() as Long);
          break;
        case 9:
          message.createTimestamp = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<TakeSwapMsg>): TakeSwapMsg {
    const message = createBaseTakeSwapMsg();
    message.orderId = object.orderId ?? "";
    message.sellToken = object.sellToken !== undefined && object.sellToken !== null ? Coin.fromPartial(object.sellToken) : undefined;
    message.takerAddress = object.takerAddress ?? "";
    message.takerReceivingAddress = object.takerReceivingAddress ?? "";
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimestamp = object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null ? Long.fromValue(object.timeoutTimestamp) : Long.UZERO;
    message.createTimestamp = object.createTimestamp !== undefined && object.createTimestamp !== null ? Long.fromValue(object.createTimestamp) : Long.ZERO;
    return message;
  }
};
function createBaseMsgTakeSwapResponse(): MsgTakeSwapResponse {
  return {
    orderId: ""
  };
}
export const MsgTakeSwapResponse = {
  encode(message: MsgTakeSwapResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== "") {
      writer.uint32(10).string(message.orderId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTakeSwapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTakeSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgTakeSwapResponse>): MsgTakeSwapResponse {
    const message = createBaseMsgTakeSwapResponse();
    message.orderId = object.orderId ?? "";
    return message;
  }
};
function createBaseCancelSwapMsg(): CancelSwapMsg {
  return {
    orderId: "",
    makerAddress: "",
    timeoutHeight: undefined,
    timeoutTimestamp: Long.UZERO,
    createTimestamp: Long.ZERO
  };
}
export const CancelSwapMsg = {
  encode(message: CancelSwapMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== "") {
      writer.uint32(26).string(message.orderId);
    }
    if (message.makerAddress !== "") {
      writer.uint32(42).string(message.makerAddress);
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(66).fork()).ldelim();
    }
    if (!message.timeoutTimestamp.isZero()) {
      writer.uint32(72).uint64(message.timeoutTimestamp);
    }
    if (!message.createTimestamp.isZero()) {
      writer.uint32(80).int64(message.createTimestamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): CancelSwapMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelSwapMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.orderId = reader.string();
          break;
        case 5:
          message.makerAddress = reader.string();
          break;
        case 8:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 9:
          message.timeoutTimestamp = (reader.uint64() as Long);
          break;
        case 10:
          message.createTimestamp = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CancelSwapMsg>): CancelSwapMsg {
    const message = createBaseCancelSwapMsg();
    message.orderId = object.orderId ?? "";
    message.makerAddress = object.makerAddress ?? "";
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimestamp = object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null ? Long.fromValue(object.timeoutTimestamp) : Long.UZERO;
    message.createTimestamp = object.createTimestamp !== undefined && object.createTimestamp !== null ? Long.fromValue(object.createTimestamp) : Long.ZERO;
    return message;
  }
};
function createBaseMsgCancelSwapResponse(): MsgCancelSwapResponse {
  return {
    orderId: ""
  };
}
export const MsgCancelSwapResponse = {
  encode(message: MsgCancelSwapResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== "") {
      writer.uint32(10).string(message.orderId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelSwapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgCancelSwapResponse>): MsgCancelSwapResponse {
    const message = createBaseMsgCancelSwapResponse();
    message.orderId = object.orderId ?? "";
    return message;
  }
};