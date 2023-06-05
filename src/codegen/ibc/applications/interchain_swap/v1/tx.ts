import { PoolAsset, PoolAssetSDKType } from "./market";
import { Height, HeightSDKType } from "../../../core/client/v1/client";
import { Coin, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { Long, DeepPartial } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
export enum SwapMsgType {
  LEFT = 0,
  RIGHT = 1,
  UNRECOGNIZED = -1,
}
export const SwapMsgTypeSDKType = SwapMsgType;
export function swapMsgTypeFromJSON(object: any): SwapMsgType {
  switch (object) {
    case 0:
    case "LEFT":
      return SwapMsgType.LEFT;
    case 1:
    case "RIGHT":
      return SwapMsgType.RIGHT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SwapMsgType.UNRECOGNIZED;
  }
}
export function swapMsgTypeToJSON(object: SwapMsgType): string {
  switch (object) {
    case SwapMsgType.LEFT:
      return "LEFT";
    case SwapMsgType.RIGHT:
      return "RIGHT";
    case SwapMsgType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface MsgCreatePoolRequest {
  sourcePort: string;
  sourceChannel: string;
  creator: string;
  counterPartyCreator: string;
  liquidity: PoolAsset[];
  swapFee: number;
  counterPartySig: Uint8Array;
  timeoutHeight?: Height;
  timeoutTimeStamp: Long;
}
export interface MsgCreatePoolRequestSDKType {
  sourcePort: string;
  sourceChannel: string;
  creator: string;
  counterPartyCreator: string;
  liquidity: PoolAssetSDKType[];
  swapFee: number;
  counterPartySig: Uint8Array;
  timeoutHeight?: HeightSDKType;
  timeoutTimeStamp: Long;
}
export interface MsgCreatePoolResponse {
  poolId: string;
}
export interface MsgCreatePoolResponseSDKType {
  poolId: string;
}
export interface MsgSingleAssetDepositRequest {
  poolId: string;
  sender: string;
  token?: Coin;
  timeoutHeight?: Height;
  timeoutTimeStamp: Long;
}
export interface MsgSingleAssetDepositRequestSDKType {
  poolId: string;
  sender: string;
  token?: CoinSDKType;
  timeoutHeight?: HeightSDKType;
  timeoutTimeStamp: Long;
}
export interface MsgSingleAssetDepositResponse {
  poolToken?: Coin;
}
export interface MsgSingleAssetDepositResponseSDKType {
  poolToken?: CoinSDKType;
}
/** demo two side deposit */
export interface MsgMultiAssetDepositRequest {
  poolId: string;
  deposits: DepositAsset[];
  timeoutHeight?: Height;
  timeoutTimeStamp: Long;
}
/** demo two side deposit */
export interface MsgMultiAssetDepositRequestSDKType {
  poolId: string;
  deposits: DepositAssetSDKType[];
  timeoutHeight?: HeightSDKType;
  timeoutTimeStamp: Long;
}
export interface DepositAsset {
  sender: string;
  balance?: Coin;
  signature: Uint8Array;
}
export interface DepositAssetSDKType {
  sender: string;
  balance?: CoinSDKType;
  signature: Uint8Array;
}
export interface MsgMultiAssetDepositResponse {
  poolTokens: Coin[];
}
export interface MsgMultiAssetDepositResponseSDKType {
  poolTokens: CoinSDKType[];
}
export interface MsgMultiAssetWithdrawRequest {
  poolId: string;
  sender: string;
  withdraws: WithdrawAsset[];
  timeoutHeight?: Height;
  timeoutTimeStamp: Long;
}
export interface MsgMultiAssetWithdrawRequestSDKType {
  poolId: string;
  sender: string;
  withdraws: WithdrawAssetSDKType[];
  timeoutHeight?: HeightSDKType;
  timeoutTimeStamp: Long;
}
export interface WithdrawAsset {
  receiver: string;
  balance?: Coin;
}
export interface WithdrawAssetSDKType {
  receiver: string;
  balance?: CoinSDKType;
}
export interface MsgSingleAssetWithdrawRequest {
  sender: string;
  poolCoin?: Coin;
  timeoutHeight?: Height;
  timeoutTimeStamp: Long;
}
export interface MsgSingleAssetWithdrawRequestSDKType {
  sender: string;
  poolCoin?: CoinSDKType;
  timeoutHeight?: HeightSDKType;
  timeoutTimeStamp: Long;
}
export interface MsgSingleAssetWithdrawResponse {
  tokens: Coin[];
}
export interface MsgSingleAssetWithdrawResponseSDKType {
  tokens: CoinSDKType[];
}
export interface MsgMultiAssetWithdrawResponse {
  tokens: Coin[];
}
export interface MsgMultiAssetWithdrawResponseSDKType {
  tokens: CoinSDKType[];
}
export interface MsgSwapRequest {
  swapType: SwapMsgType;
  sender: string;
  tokenIn?: Coin;
  tokenOut?: Coin;
  slippage: Long;
  recipient: string;
  timeoutHeight?: Height;
  timeoutTimeStamp: Long;
}
export interface MsgSwapRequestSDKType {
  swap_type: SwapMsgType;
  sender: string;
  tokenIn?: CoinSDKType;
  tokenOut?: CoinSDKType;
  slippage: Long;
  recipient: string;
  timeoutHeight?: HeightSDKType;
  timeoutTimeStamp: Long;
}
export interface MsgSwapResponse {
  swapType: SwapMsgType;
  tokens: Coin[];
}
export interface MsgSwapResponseSDKType {
  swap_type: SwapMsgType;
  tokens: CoinSDKType[];
}
export interface DepositSignature {
  sender: string;
  balance?: Coin;
  sequence: Long;
}
export interface DepositSignatureSDKType {
  sender: string;
  balance?: CoinSDKType;
  sequence: Long;
}
function createBaseMsgCreatePoolRequest(): MsgCreatePoolRequest {
  return {
    sourcePort: "",
    sourceChannel: "",
    creator: "",
    counterPartyCreator: "",
    liquidity: [],
    swapFee: 0,
    counterPartySig: new Uint8Array(),
    timeoutHeight: undefined,
    timeoutTimeStamp: Long.UZERO
  };
}
export const MsgCreatePoolRequest = {
  encode(message: MsgCreatePoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourcePort !== "") {
      writer.uint32(10).string(message.sourcePort);
    }
    if (message.sourceChannel !== "") {
      writer.uint32(18).string(message.sourceChannel);
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    if (message.counterPartyCreator !== "") {
      writer.uint32(34).string(message.counterPartyCreator);
    }
    for (const v of message.liquidity) {
      PoolAsset.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.swapFee !== 0) {
      writer.uint32(48).uint32(message.swapFee);
    }
    if (message.counterPartySig.length !== 0) {
      writer.uint32(58).bytes(message.counterPartySig);
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(66).fork()).ldelim();
    }
    if (!message.timeoutTimeStamp.isZero()) {
      writer.uint32(72).uint64(message.timeoutTimeStamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePoolRequest();
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
          message.creator = reader.string();
          break;
        case 4:
          message.counterPartyCreator = reader.string();
          break;
        case 5:
          message.liquidity.push(PoolAsset.decode(reader, reader.uint32()));
          break;
        case 6:
          message.swapFee = reader.uint32();
          break;
        case 7:
          message.counterPartySig = reader.bytes();
          break;
        case 8:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 9:
          message.timeoutTimeStamp = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgCreatePoolRequest>): MsgCreatePoolRequest {
    const message = createBaseMsgCreatePoolRequest();
    message.sourcePort = object.sourcePort ?? "";
    message.sourceChannel = object.sourceChannel ?? "";
    message.creator = object.creator ?? "";
    message.counterPartyCreator = object.counterPartyCreator ?? "";
    message.liquidity = object.liquidity?.map(e => PoolAsset.fromPartial(e)) || [];
    message.swapFee = object.swapFee ?? 0;
    message.counterPartySig = object.counterPartySig ?? new Uint8Array();
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimeStamp = object.timeoutTimeStamp !== undefined && object.timeoutTimeStamp !== null ? Long.fromValue(object.timeoutTimeStamp) : Long.UZERO;
    return message;
  }
};
function createBaseMsgCreatePoolResponse(): MsgCreatePoolResponse {
  return {
    poolId: ""
  };
}
export const MsgCreatePoolResponse = {
  encode(message: MsgCreatePoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgCreatePoolResponse>): MsgCreatePoolResponse {
    const message = createBaseMsgCreatePoolResponse();
    message.poolId = object.poolId ?? "";
    return message;
  }
};
function createBaseMsgSingleAssetDepositRequest(): MsgSingleAssetDepositRequest {
  return {
    poolId: "",
    sender: "",
    token: undefined,
    timeoutHeight: undefined,
    timeoutTimeStamp: Long.UZERO
  };
}
export const MsgSingleAssetDepositRequest = {
  encode(message: MsgSingleAssetDepositRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.token !== undefined) {
      Coin.encode(message.token, writer.uint32(26).fork()).ldelim();
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(34).fork()).ldelim();
    }
    if (!message.timeoutTimeStamp.isZero()) {
      writer.uint32(40).uint64(message.timeoutTimeStamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSingleAssetDepositRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSingleAssetDepositRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.string();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.token = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.timeoutTimeStamp = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgSingleAssetDepositRequest>): MsgSingleAssetDepositRequest {
    const message = createBaseMsgSingleAssetDepositRequest();
    message.poolId = object.poolId ?? "";
    message.sender = object.sender ?? "";
    message.token = object.token !== undefined && object.token !== null ? Coin.fromPartial(object.token) : undefined;
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimeStamp = object.timeoutTimeStamp !== undefined && object.timeoutTimeStamp !== null ? Long.fromValue(object.timeoutTimeStamp) : Long.UZERO;
    return message;
  }
};
function createBaseMsgSingleAssetDepositResponse(): MsgSingleAssetDepositResponse {
  return {
    poolToken: undefined
  };
}
export const MsgSingleAssetDepositResponse = {
  encode(message: MsgSingleAssetDepositResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolToken !== undefined) {
      Coin.encode(message.poolToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSingleAssetDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSingleAssetDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolToken = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgSingleAssetDepositResponse>): MsgSingleAssetDepositResponse {
    const message = createBaseMsgSingleAssetDepositResponse();
    message.poolToken = object.poolToken !== undefined && object.poolToken !== null ? Coin.fromPartial(object.poolToken) : undefined;
    return message;
  }
};
function createBaseMsgMultiAssetDepositRequest(): MsgMultiAssetDepositRequest {
  return {
    poolId: "",
    deposits: [],
    timeoutHeight: undefined,
    timeoutTimeStamp: Long.UZERO
  };
}
export const MsgMultiAssetDepositRequest = {
  encode(message: MsgMultiAssetDepositRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    for (const v of message.deposits) {
      DepositAsset.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(26).fork()).ldelim();
    }
    if (!message.timeoutTimeStamp.isZero()) {
      writer.uint32(32).uint64(message.timeoutTimeStamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiAssetDepositRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiAssetDepositRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.string();
          break;
        case 2:
          message.deposits.push(DepositAsset.decode(reader, reader.uint32()));
          break;
        case 3:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 4:
          message.timeoutTimeStamp = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgMultiAssetDepositRequest>): MsgMultiAssetDepositRequest {
    const message = createBaseMsgMultiAssetDepositRequest();
    message.poolId = object.poolId ?? "";
    message.deposits = object.deposits?.map(e => DepositAsset.fromPartial(e)) || [];
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimeStamp = object.timeoutTimeStamp !== undefined && object.timeoutTimeStamp !== null ? Long.fromValue(object.timeoutTimeStamp) : Long.UZERO;
    return message;
  }
};
function createBaseDepositAsset(): DepositAsset {
  return {
    sender: "",
    balance: undefined,
    signature: new Uint8Array()
  };
}
export const DepositAsset = {
  encode(message: DepositAsset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): DepositAsset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.balance = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.signature = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DepositAsset>): DepositAsset {
    const message = createBaseDepositAsset();
    message.sender = object.sender ?? "";
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    message.signature = object.signature ?? new Uint8Array();
    return message;
  }
};
function createBaseMsgMultiAssetDepositResponse(): MsgMultiAssetDepositResponse {
  return {
    poolTokens: []
  };
}
export const MsgMultiAssetDepositResponse = {
  encode(message: MsgMultiAssetDepositResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.poolTokens) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiAssetDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiAssetDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolTokens.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgMultiAssetDepositResponse>): MsgMultiAssetDepositResponse {
    const message = createBaseMsgMultiAssetDepositResponse();
    message.poolTokens = object.poolTokens?.map(e => Coin.fromPartial(e)) || [];
    return message;
  }
};
function createBaseMsgMultiAssetWithdrawRequest(): MsgMultiAssetWithdrawRequest {
  return {
    poolId: "",
    sender: "",
    withdraws: [],
    timeoutHeight: undefined,
    timeoutTimeStamp: Long.UZERO
  };
}
export const MsgMultiAssetWithdrawRequest = {
  encode(message: MsgMultiAssetWithdrawRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    for (const v of message.withdraws) {
      WithdrawAsset.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(34).fork()).ldelim();
    }
    if (!message.timeoutTimeStamp.isZero()) {
      writer.uint32(40).uint64(message.timeoutTimeStamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiAssetWithdrawRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiAssetWithdrawRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.string();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.withdraws.push(WithdrawAsset.decode(reader, reader.uint32()));
          break;
        case 4:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.timeoutTimeStamp = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgMultiAssetWithdrawRequest>): MsgMultiAssetWithdrawRequest {
    const message = createBaseMsgMultiAssetWithdrawRequest();
    message.poolId = object.poolId ?? "";
    message.sender = object.sender ?? "";
    message.withdraws = object.withdraws?.map(e => WithdrawAsset.fromPartial(e)) || [];
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimeStamp = object.timeoutTimeStamp !== undefined && object.timeoutTimeStamp !== null ? Long.fromValue(object.timeoutTimeStamp) : Long.UZERO;
    return message;
  }
};
function createBaseWithdrawAsset(): WithdrawAsset {
  return {
    receiver: "",
    balance: undefined
  };
}
export const WithdrawAsset = {
  encode(message: WithdrawAsset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.receiver !== "") {
      writer.uint32(10).string(message.receiver);
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawAsset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receiver = reader.string();
          break;
        case 2:
          message.balance = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<WithdrawAsset>): WithdrawAsset {
    const message = createBaseWithdrawAsset();
    message.receiver = object.receiver ?? "";
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    return message;
  }
};
function createBaseMsgSingleAssetWithdrawRequest(): MsgSingleAssetWithdrawRequest {
  return {
    sender: "",
    poolCoin: undefined,
    timeoutHeight: undefined,
    timeoutTimeStamp: Long.UZERO
  };
}
export const MsgSingleAssetWithdrawRequest = {
  encode(message: MsgSingleAssetWithdrawRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolCoin !== undefined) {
      Coin.encode(message.poolCoin, writer.uint32(26).fork()).ldelim();
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(34).fork()).ldelim();
    }
    if (!message.timeoutTimeStamp.isZero()) {
      writer.uint32(40).uint64(message.timeoutTimeStamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSingleAssetWithdrawRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSingleAssetWithdrawRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 3:
          message.poolCoin = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.timeoutTimeStamp = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgSingleAssetWithdrawRequest>): MsgSingleAssetWithdrawRequest {
    const message = createBaseMsgSingleAssetWithdrawRequest();
    message.sender = object.sender ?? "";
    message.poolCoin = object.poolCoin !== undefined && object.poolCoin !== null ? Coin.fromPartial(object.poolCoin) : undefined;
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimeStamp = object.timeoutTimeStamp !== undefined && object.timeoutTimeStamp !== null ? Long.fromValue(object.timeoutTimeStamp) : Long.UZERO;
    return message;
  }
};
function createBaseMsgSingleAssetWithdrawResponse(): MsgSingleAssetWithdrawResponse {
  return {
    tokens: []
  };
}
export const MsgSingleAssetWithdrawResponse = {
  encode(message: MsgSingleAssetWithdrawResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tokens) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSingleAssetWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSingleAssetWithdrawResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokens.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgSingleAssetWithdrawResponse>): MsgSingleAssetWithdrawResponse {
    const message = createBaseMsgSingleAssetWithdrawResponse();
    message.tokens = object.tokens?.map(e => Coin.fromPartial(e)) || [];
    return message;
  }
};
function createBaseMsgMultiAssetWithdrawResponse(): MsgMultiAssetWithdrawResponse {
  return {
    tokens: []
  };
}
export const MsgMultiAssetWithdrawResponse = {
  encode(message: MsgMultiAssetWithdrawResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tokens) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiAssetWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiAssetWithdrawResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokens.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgMultiAssetWithdrawResponse>): MsgMultiAssetWithdrawResponse {
    const message = createBaseMsgMultiAssetWithdrawResponse();
    message.tokens = object.tokens?.map(e => Coin.fromPartial(e)) || [];
    return message;
  }
};
function createBaseMsgSwapRequest(): MsgSwapRequest {
  return {
    swapType: 0,
    sender: "",
    tokenIn: undefined,
    tokenOut: undefined,
    slippage: Long.UZERO,
    recipient: "",
    timeoutHeight: undefined,
    timeoutTimeStamp: Long.UZERO
  };
}
export const MsgSwapRequest = {
  encode(message: MsgSwapRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.swapType !== 0) {
      writer.uint32(8).int32(message.swapType);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(34).fork()).ldelim();
    }
    if (!message.slippage.isZero()) {
      writer.uint32(40).uint64(message.slippage);
    }
    if (message.recipient !== "") {
      writer.uint32(50).string(message.recipient);
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(58).fork()).ldelim();
    }
    if (!message.timeoutTimeStamp.isZero()) {
      writer.uint32(64).uint64(message.timeoutTimeStamp);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwapRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swapType = (reader.int32() as any);
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.tokenIn = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.tokenOut = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.slippage = (reader.uint64() as Long);
          break;
        case 6:
          message.recipient = reader.string();
          break;
        case 7:
          message.timeoutHeight = Height.decode(reader, reader.uint32());
          break;
        case 8:
          message.timeoutTimeStamp = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgSwapRequest>): MsgSwapRequest {
    const message = createBaseMsgSwapRequest();
    message.swapType = object.swapType ?? 0;
    message.sender = object.sender ?? "";
    message.tokenIn = object.tokenIn !== undefined && object.tokenIn !== null ? Coin.fromPartial(object.tokenIn) : undefined;
    message.tokenOut = object.tokenOut !== undefined && object.tokenOut !== null ? Coin.fromPartial(object.tokenOut) : undefined;
    message.slippage = object.slippage !== undefined && object.slippage !== null ? Long.fromValue(object.slippage) : Long.UZERO;
    message.recipient = object.recipient ?? "";
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimeStamp = object.timeoutTimeStamp !== undefined && object.timeoutTimeStamp !== null ? Long.fromValue(object.timeoutTimeStamp) : Long.UZERO;
    return message;
  }
};
function createBaseMsgSwapResponse(): MsgSwapResponse {
  return {
    swapType: 0,
    tokens: []
  };
}
export const MsgSwapResponse = {
  encode(message: MsgSwapResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.swapType !== 0) {
      writer.uint32(8).int32(message.swapType);
    }
    for (const v of message.tokens) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swapType = (reader.int32() as any);
          break;
        case 2:
          message.tokens.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgSwapResponse>): MsgSwapResponse {
    const message = createBaseMsgSwapResponse();
    message.swapType = object.swapType ?? 0;
    message.tokens = object.tokens?.map(e => Coin.fromPartial(e)) || [];
    return message;
  }
};
function createBaseDepositSignature(): DepositSignature {
  return {
    sender: "",
    balance: undefined,
    sequence: Long.UZERO
  };
}
export const DepositSignature = {
  encode(message: DepositSignature, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    if (!message.sequence.isZero()) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): DepositSignature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositSignature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.balance = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.sequence = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DepositSignature>): DepositSignature {
    const message = createBaseDepositSignature();
    message.sender = object.sender ?? "";
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    message.sequence = object.sequence !== undefined && object.sequence !== null ? Long.fromValue(object.sequence) : Long.UZERO;
    return message;
  }
};