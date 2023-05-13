import { Coin, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { MakeSwapMsg, MakeSwapMsgSDKType, TakeSwapMsg, TakeSwapMsgSDKType } from "./tx";
import { Long, DeepPartial } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
/** OTC */
export enum Status {
  INITIAL = 0,
  SYNC = 1,
  CANCEL = 2,
  COMPLETE = 3,
  UNRECOGNIZED = -1,
}
export const StatusSDKType = Status;
export function statusFromJSON(object: any): Status {
  switch (object) {
    case 0:
    case "INITIAL":
      return Status.INITIAL;
    case 1:
    case "SYNC":
      return Status.SYNC;
    case 2:
    case "CANCEL":
      return Status.CANCEL;
    case 3:
    case "COMPLETE":
      return Status.COMPLETE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Status.UNRECOGNIZED;
  }
}
export function statusToJSON(object: Status): string {
  switch (object) {
    case Status.INITIAL:
      return "INITIAL";
    case Status.SYNC:
      return "SYNC";
    case Status.CANCEL:
      return "CANCEL";
    case Status.COMPLETE:
      return "COMPLETE";
    case Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
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
export interface SwapMaker {
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
}
export interface SwapMakerSDKType {
  source_port: string;
  source_channel: string;
  sell_token?: CoinSDKType;
  buy_token?: CoinSDKType;
  maker_address: string;
  maker_receiving_address: string;
  desired_taker: string;
  create_timestamp: Long;
}
export interface SwapTaker {
  orderId: string;
  /** the tokens to be sell */
  sellToken?: Coin;
  /** the sender address */
  takerAddress: string;
  /** the sender's address on the destination chain */
  takerReceivingAddress: string;
  createTimestamp: Long;
}
export interface SwapTakerSDKType {
  order_id: string;
  sell_token?: CoinSDKType;
  taker_address: string;
  taker_receiving_address: string;
  create_timestamp: Long;
}
export interface Order {
  id: string;
  maker?: MakeSwapMsg;
  status: Status;
  path: string;
  takers?: TakeSwapMsg;
  cancelTimestamp: Long;
  completeTimestamp: Long;
}
export interface OrderSDKType {
  id: string;
  maker?: MakeSwapMsgSDKType;
  status: Status;
  path: string;
  takers?: TakeSwapMsgSDKType;
  cancel_timestamp: Long;
  complete_timestamp: Long;
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
function createBaseSwapMaker(): SwapMaker {
  return {
    sourcePort: "",
    sourceChannel: "",
    sellToken: undefined,
    buyToken: undefined,
    makerAddress: "",
    makerReceivingAddress: "",
    desiredTaker: "",
    createTimestamp: Long.ZERO
  };
}
export const SwapMaker = {
  encode(message: SwapMaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): SwapMaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapMaker();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SwapMaker>): SwapMaker {
    const message = createBaseSwapMaker();
    message.sourcePort = object.sourcePort ?? "";
    message.sourceChannel = object.sourceChannel ?? "";
    message.sellToken = object.sellToken !== undefined && object.sellToken !== null ? Coin.fromPartial(object.sellToken) : undefined;
    message.buyToken = object.buyToken !== undefined && object.buyToken !== null ? Coin.fromPartial(object.buyToken) : undefined;
    message.makerAddress = object.makerAddress ?? "";
    message.makerReceivingAddress = object.makerReceivingAddress ?? "";
    message.desiredTaker = object.desiredTaker ?? "";
    message.createTimestamp = object.createTimestamp !== undefined && object.createTimestamp !== null ? Long.fromValue(object.createTimestamp) : Long.ZERO;
    return message;
  }
};
function createBaseSwapTaker(): SwapTaker {
  return {
    orderId: "",
    sellToken: undefined,
    takerAddress: "",
    takerReceivingAddress: "",
    createTimestamp: Long.ZERO
  };
}
export const SwapTaker = {
  encode(message: SwapTaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== "") {
      writer.uint32(10).string(message.orderId);
    }
    if (message.sellToken !== undefined) {
      Coin.encode(message.sellToken, writer.uint32(18).fork()).ldelim();
    }
    if (message.takerAddress !== "") {
      writer.uint32(26).string(message.takerAddress);
    }
    if (message.takerReceivingAddress !== "") {
      writer.uint32(34).string(message.takerReceivingAddress);
    }
    if (!message.createTimestamp.isZero()) {
      writer.uint32(40).int64(message.createTimestamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): SwapTaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapTaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.string();
          break;
        case 2:
          message.sellToken = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.takerAddress = reader.string();
          break;
        case 4:
          message.takerReceivingAddress = reader.string();
          break;
        case 5:
          message.createTimestamp = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SwapTaker>): SwapTaker {
    const message = createBaseSwapTaker();
    message.orderId = object.orderId ?? "";
    message.sellToken = object.sellToken !== undefined && object.sellToken !== null ? Coin.fromPartial(object.sellToken) : undefined;
    message.takerAddress = object.takerAddress ?? "";
    message.takerReceivingAddress = object.takerReceivingAddress ?? "";
    message.createTimestamp = object.createTimestamp !== undefined && object.createTimestamp !== null ? Long.fromValue(object.createTimestamp) : Long.ZERO;
    return message;
  }
};
function createBaseOrder(): Order {
  return {
    id: "",
    maker: undefined,
    status: 0,
    path: "",
    takers: undefined,
    cancelTimestamp: Long.ZERO,
    completeTimestamp: Long.ZERO
  };
}
export const Order = {
  encode(message: Order, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.maker !== undefined) {
      MakeSwapMsg.encode(message.maker, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.path !== "") {
      writer.uint32(34).string(message.path);
    }
    if (message.takers !== undefined) {
      TakeSwapMsg.encode(message.takers, writer.uint32(42).fork()).ldelim();
    }
    if (!message.cancelTimestamp.isZero()) {
      writer.uint32(56).int64(message.cancelTimestamp);
    }
    if (!message.completeTimestamp.isZero()) {
      writer.uint32(64).int64(message.completeTimestamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Order {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.maker = MakeSwapMsg.decode(reader, reader.uint32());
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        case 4:
          message.path = reader.string();
          break;
        case 5:
          message.takers = TakeSwapMsg.decode(reader, reader.uint32());
          break;
        case 7:
          message.cancelTimestamp = (reader.int64() as Long);
          break;
        case 8:
          message.completeTimestamp = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Order>): Order {
    const message = createBaseOrder();
    message.id = object.id ?? "";
    message.maker = object.maker !== undefined && object.maker !== null ? MakeSwapMsg.fromPartial(object.maker) : undefined;
    message.status = object.status ?? 0;
    message.path = object.path ?? "";
    message.takers = object.takers !== undefined && object.takers !== null ? TakeSwapMsg.fromPartial(object.takers) : undefined;
    message.cancelTimestamp = object.cancelTimestamp !== undefined && object.cancelTimestamp !== null ? Long.fromValue(object.cancelTimestamp) : Long.ZERO;
    message.completeTimestamp = object.completeTimestamp !== undefined && object.completeTimestamp !== null ? Long.fromValue(object.completeTimestamp) : Long.ZERO;
    return message;
  }
};