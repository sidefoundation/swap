import { Coin, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../../helpers";
export enum PoolSide {
  NATIVE = 0,
  REMOTE = 1,
  UNRECOGNIZED = -1,
}
export const PoolSideSDKType = PoolSide;
export function poolSideFromJSON(object: any): PoolSide {
  switch (object) {
    case 0:
    case "NATIVE":
      return PoolSide.NATIVE;
    case 1:
    case "REMOTE":
      return PoolSide.REMOTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PoolSide.UNRECOGNIZED;
  }
}
export function poolSideToJSON(object: PoolSide): string {
  switch (object) {
    case PoolSide.NATIVE:
      return "NATIVE";
    case PoolSide.REMOTE:
      return "REMOTE";
    case PoolSide.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum PoolStatus {
  POOL_STATUS_INITIAL = 0,
  POOL_STATUS_READY = 1,
  UNRECOGNIZED = -1,
}
export const PoolStatusSDKType = PoolStatus;
export function poolStatusFromJSON(object: any): PoolStatus {
  switch (object) {
    case 0:
    case "POOL_STATUS_INITIAL":
      return PoolStatus.POOL_STATUS_INITIAL;
    case 1:
    case "POOL_STATUS_READY":
      return PoolStatus.POOL_STATUS_READY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PoolStatus.UNRECOGNIZED;
  }
}
export function poolStatusToJSON(object: PoolStatus): string {
  switch (object) {
    case PoolStatus.POOL_STATUS_INITIAL:
      return "POOL_STATUS_INITIAL";
    case PoolStatus.POOL_STATUS_READY:
      return "POOL_STATUS_READY";
    case PoolStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface PoolAsset {
  side: PoolSide;
  balance?: Coin;
  weight: number;
  decimal: number;
}
export interface PoolAssetSDKType {
  side: PoolSide;
  balance?: CoinSDKType;
  weight: number;
  decimal: number;
}
export interface InterchainLiquidityPool {
  poolId: string;
  creator: string;
  assets: PoolAsset[];
  supply?: Coin;
  poolPrice: number;
  status: PoolStatus;
  encounterPartyPort: string;
  encounterPartyChannel: string;
}
export interface InterchainLiquidityPoolSDKType {
  poolId: string;
  creator: string;
  assets: PoolAssetSDKType[];
  supply?: CoinSDKType;
  pool_price: number;
  status: PoolStatus;
  encounterPartyPort: string;
  encounterPartyChannel: string;
}
export interface InterchainMarketMaker {
  poolId: string;
  pool?: InterchainLiquidityPool;
  feeRate: number;
}
export interface InterchainMarketMakerSDKType {
  poolId: string;
  pool?: InterchainLiquidityPoolSDKType;
  feeRate: number;
}
/** @deprecated */
export interface MarketFeeUpdateProposal {
  title: string;
  description: string;
  poolId: string;
  feeRate: number;
}
/** @deprecated */
export interface MarketFeeUpdateProposalSDKType {
  title: string;
  description: string;
  pool_id: string;
  fee_rate: number;
}
function createBasePoolAsset(): PoolAsset {
  return {
    side: 0,
    balance: undefined,
    weight: 0,
    decimal: 0
  };
}
export const PoolAsset = {
  encode(message: PoolAsset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.side !== 0) {
      writer.uint32(8).int32(message.side);
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    if (message.weight !== 0) {
      writer.uint32(24).uint32(message.weight);
    }
    if (message.decimal !== 0) {
      writer.uint32(32).uint32(message.decimal);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): PoolAsset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.side = (reader.int32() as any);
          break;
        case 2:
          message.balance = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.weight = reader.uint32();
          break;
        case 4:
          message.decimal = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PoolAsset>): PoolAsset {
    const message = createBasePoolAsset();
    message.side = object.side ?? 0;
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    message.weight = object.weight ?? 0;
    message.decimal = object.decimal ?? 0;
    return message;
  }
};
function createBaseInterchainLiquidityPool(): InterchainLiquidityPool {
  return {
    poolId: "",
    creator: "",
    assets: [],
    supply: undefined,
    poolPrice: 0,
    status: 0,
    encounterPartyPort: "",
    encounterPartyChannel: ""
  };
}
export const InterchainLiquidityPool = {
  encode(message: InterchainLiquidityPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    for (const v of message.assets) {
      PoolAsset.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.supply !== undefined) {
      Coin.encode(message.supply, writer.uint32(34).fork()).ldelim();
    }
    if (message.poolPrice !== 0) {
      writer.uint32(45).float(message.poolPrice);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    if (message.encounterPartyPort !== "") {
      writer.uint32(58).string(message.encounterPartyPort);
    }
    if (message.encounterPartyChannel !== "") {
      writer.uint32(66).string(message.encounterPartyChannel);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): InterchainLiquidityPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterchainLiquidityPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.string();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.assets.push(PoolAsset.decode(reader, reader.uint32()));
          break;
        case 4:
          message.supply = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.poolPrice = reader.float();
          break;
        case 6:
          message.status = (reader.int32() as any);
          break;
        case 7:
          message.encounterPartyPort = reader.string();
          break;
        case 8:
          message.encounterPartyChannel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<InterchainLiquidityPool>): InterchainLiquidityPool {
    const message = createBaseInterchainLiquidityPool();
    message.poolId = object.poolId ?? "";
    message.creator = object.creator ?? "";
    message.assets = object.assets?.map(e => PoolAsset.fromPartial(e)) || [];
    message.supply = object.supply !== undefined && object.supply !== null ? Coin.fromPartial(object.supply) : undefined;
    message.poolPrice = object.poolPrice ?? 0;
    message.status = object.status ?? 0;
    message.encounterPartyPort = object.encounterPartyPort ?? "";
    message.encounterPartyChannel = object.encounterPartyChannel ?? "";
    return message;
  }
};
function createBaseInterchainMarketMaker(): InterchainMarketMaker {
  return {
    poolId: "",
    pool: undefined,
    feeRate: 0
  };
}
export const InterchainMarketMaker = {
  encode(message: InterchainMarketMaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.pool !== undefined) {
      InterchainLiquidityPool.encode(message.pool, writer.uint32(18).fork()).ldelim();
    }
    if (message.feeRate !== 0) {
      writer.uint32(24).uint32(message.feeRate);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): InterchainMarketMaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterchainMarketMaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.string();
          break;
        case 2:
          message.pool = InterchainLiquidityPool.decode(reader, reader.uint32());
          break;
        case 3:
          message.feeRate = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<InterchainMarketMaker>): InterchainMarketMaker {
    const message = createBaseInterchainMarketMaker();
    message.poolId = object.poolId ?? "";
    message.pool = object.pool !== undefined && object.pool !== null ? InterchainLiquidityPool.fromPartial(object.pool) : undefined;
    message.feeRate = object.feeRate ?? 0;
    return message;
  }
};
function createBaseMarketFeeUpdateProposal(): MarketFeeUpdateProposal {
  return {
    title: "",
    description: "",
    poolId: "",
    feeRate: 0
  };
}
export const MarketFeeUpdateProposal = {
  encode(message: MarketFeeUpdateProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.poolId !== "") {
      writer.uint32(26).string(message.poolId);
    }
    if (message.feeRate !== 0) {
      writer.uint32(32).uint32(message.feeRate);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MarketFeeUpdateProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketFeeUpdateProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.poolId = reader.string();
          break;
        case 4:
          message.feeRate = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MarketFeeUpdateProposal>): MarketFeeUpdateProposal {
    const message = createBaseMarketFeeUpdateProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.poolId = object.poolId ?? "";
    message.feeRate = object.feeRate ?? 0;
    return message;
  }
};