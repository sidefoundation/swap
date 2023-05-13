import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsSDKType } from "./param";
import { InterchainLiquidityPool, InterchainLiquidityPoolSDKType, InterchainMarketMaker, InterchainMarketMakerSDKType } from "./market";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../../helpers";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params?: ParamsSDKType;
}
/** QueryEscrowAddressRequest is the request type for the EscrowAddress RPC method. */
export interface QueryEscrowAddressRequest {
  /** unique port identifier */
  portId: string;
  /** unique channel identifier */
  channelId: string;
}
/** QueryEscrowAddressRequest is the request type for the EscrowAddress RPC method. */
export interface QueryEscrowAddressRequestSDKType {
  port_id: string;
  channel_id: string;
}
/** QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method. */
export interface QueryEscrowAddressResponse {
  /** the escrow account address */
  escrowAddress: string;
}
/** QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method. */
export interface QueryEscrowAddressResponseSDKType {
  escrow_address: string;
}
export interface QueryGetInterchainLiquidityPoolRequest {
  poolId: string;
}
export interface QueryGetInterchainLiquidityPoolRequestSDKType {
  poolId: string;
}
export interface QueryGetInterchainLiquidityPoolResponse {
  interchainLiquidityPool?: InterchainLiquidityPool;
}
export interface QueryGetInterchainLiquidityPoolResponseSDKType {
  interchainLiquidityPool?: InterchainLiquidityPoolSDKType;
}
export interface QueryAllInterchainLiquidityPoolRequest {
  pagination?: PageRequest;
}
export interface QueryAllInterchainLiquidityPoolRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryAllInterchainLiquidityPoolResponse {
  interchainLiquidityPool: InterchainLiquidityPool[];
  pagination?: PageResponse;
}
export interface QueryAllInterchainLiquidityPoolResponseSDKType {
  interchainLiquidityPool: InterchainLiquidityPoolSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryGetInterchainMarketMakerRequest {
  poolId: string;
}
export interface QueryGetInterchainMarketMakerRequestSDKType {
  poolId: string;
}
export interface QueryGetInterchainMarketMakerResponse {
  interchainMarketMaker?: InterchainMarketMaker;
}
export interface QueryGetInterchainMarketMakerResponseSDKType {
  interchainMarketMaker?: InterchainMarketMakerSDKType;
}
export interface QueryAllInterchainMarketMakerRequest {
  pagination?: PageRequest;
}
export interface QueryAllInterchainMarketMakerRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryAllInterchainMarketMakerResponse {
  interchainMarketMaker: InterchainMarketMaker[];
  pagination?: PageResponse;
}
export interface QueryAllInterchainMarketMakerResponseSDKType {
  interchainMarketMaker: InterchainMarketMakerSDKType[];
  pagination?: PageResponseSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: undefined
  };
}
export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  }
};
function createBaseQueryEscrowAddressRequest(): QueryEscrowAddressRequest {
  return {
    portId: "",
    channelId: ""
  };
}
export const QueryEscrowAddressRequest = {
  encode(message: QueryEscrowAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryEscrowAddressRequest>): QueryEscrowAddressRequest {
    const message = createBaseQueryEscrowAddressRequest();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    return message;
  }
};
function createBaseQueryEscrowAddressResponse(): QueryEscrowAddressResponse {
  return {
    escrowAddress: ""
  };
}
export const QueryEscrowAddressResponse = {
  encode(message: QueryEscrowAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.escrowAddress !== "") {
      writer.uint32(10).string(message.escrowAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.escrowAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryEscrowAddressResponse>): QueryEscrowAddressResponse {
    const message = createBaseQueryEscrowAddressResponse();
    message.escrowAddress = object.escrowAddress ?? "";
    return message;
  }
};
function createBaseQueryGetInterchainLiquidityPoolRequest(): QueryGetInterchainLiquidityPoolRequest {
  return {
    poolId: ""
  };
}
export const QueryGetInterchainLiquidityPoolRequest = {
  encode(message: QueryGetInterchainLiquidityPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetInterchainLiquidityPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetInterchainLiquidityPoolRequest();
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
  fromPartial(object: DeepPartial<QueryGetInterchainLiquidityPoolRequest>): QueryGetInterchainLiquidityPoolRequest {
    const message = createBaseQueryGetInterchainLiquidityPoolRequest();
    message.poolId = object.poolId ?? "";
    return message;
  }
};
function createBaseQueryGetInterchainLiquidityPoolResponse(): QueryGetInterchainLiquidityPoolResponse {
  return {
    interchainLiquidityPool: undefined
  };
}
export const QueryGetInterchainLiquidityPoolResponse = {
  encode(message: QueryGetInterchainLiquidityPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.interchainLiquidityPool !== undefined) {
      InterchainLiquidityPool.encode(message.interchainLiquidityPool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetInterchainLiquidityPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetInterchainLiquidityPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interchainLiquidityPool = InterchainLiquidityPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryGetInterchainLiquidityPoolResponse>): QueryGetInterchainLiquidityPoolResponse {
    const message = createBaseQueryGetInterchainLiquidityPoolResponse();
    message.interchainLiquidityPool = object.interchainLiquidityPool !== undefined && object.interchainLiquidityPool !== null ? InterchainLiquidityPool.fromPartial(object.interchainLiquidityPool) : undefined;
    return message;
  }
};
function createBaseQueryAllInterchainLiquidityPoolRequest(): QueryAllInterchainLiquidityPoolRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllInterchainLiquidityPoolRequest = {
  encode(message: QueryAllInterchainLiquidityPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllInterchainLiquidityPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllInterchainLiquidityPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAllInterchainLiquidityPoolRequest>): QueryAllInterchainLiquidityPoolRequest {
    const message = createBaseQueryAllInterchainLiquidityPoolRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  }
};
function createBaseQueryAllInterchainLiquidityPoolResponse(): QueryAllInterchainLiquidityPoolResponse {
  return {
    interchainLiquidityPool: [],
    pagination: undefined
  };
}
export const QueryAllInterchainLiquidityPoolResponse = {
  encode(message: QueryAllInterchainLiquidityPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.interchainLiquidityPool) {
      InterchainLiquidityPool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllInterchainLiquidityPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllInterchainLiquidityPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interchainLiquidityPool.push(InterchainLiquidityPool.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAllInterchainLiquidityPoolResponse>): QueryAllInterchainLiquidityPoolResponse {
    const message = createBaseQueryAllInterchainLiquidityPoolResponse();
    message.interchainLiquidityPool = object.interchainLiquidityPool?.map(e => InterchainLiquidityPool.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  }
};
function createBaseQueryGetInterchainMarketMakerRequest(): QueryGetInterchainMarketMakerRequest {
  return {
    poolId: ""
  };
}
export const QueryGetInterchainMarketMakerRequest = {
  encode(message: QueryGetInterchainMarketMakerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetInterchainMarketMakerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetInterchainMarketMakerRequest();
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
  fromPartial(object: DeepPartial<QueryGetInterchainMarketMakerRequest>): QueryGetInterchainMarketMakerRequest {
    const message = createBaseQueryGetInterchainMarketMakerRequest();
    message.poolId = object.poolId ?? "";
    return message;
  }
};
function createBaseQueryGetInterchainMarketMakerResponse(): QueryGetInterchainMarketMakerResponse {
  return {
    interchainMarketMaker: undefined
  };
}
export const QueryGetInterchainMarketMakerResponse = {
  encode(message: QueryGetInterchainMarketMakerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.interchainMarketMaker !== undefined) {
      InterchainMarketMaker.encode(message.interchainMarketMaker, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetInterchainMarketMakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetInterchainMarketMakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interchainMarketMaker = InterchainMarketMaker.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryGetInterchainMarketMakerResponse>): QueryGetInterchainMarketMakerResponse {
    const message = createBaseQueryGetInterchainMarketMakerResponse();
    message.interchainMarketMaker = object.interchainMarketMaker !== undefined && object.interchainMarketMaker !== null ? InterchainMarketMaker.fromPartial(object.interchainMarketMaker) : undefined;
    return message;
  }
};
function createBaseQueryAllInterchainMarketMakerRequest(): QueryAllInterchainMarketMakerRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllInterchainMarketMakerRequest = {
  encode(message: QueryAllInterchainMarketMakerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllInterchainMarketMakerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllInterchainMarketMakerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAllInterchainMarketMakerRequest>): QueryAllInterchainMarketMakerRequest {
    const message = createBaseQueryAllInterchainMarketMakerRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  }
};
function createBaseQueryAllInterchainMarketMakerResponse(): QueryAllInterchainMarketMakerResponse {
  return {
    interchainMarketMaker: [],
    pagination: undefined
  };
}
export const QueryAllInterchainMarketMakerResponse = {
  encode(message: QueryAllInterchainMarketMakerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.interchainMarketMaker) {
      InterchainMarketMaker.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllInterchainMarketMakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllInterchainMarketMakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interchainMarketMaker.push(InterchainMarketMaker.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAllInterchainMarketMakerResponse>): QueryAllInterchainMarketMakerResponse {
    const message = createBaseQueryAllInterchainMarketMakerResponse();
    message.interchainMarketMaker = object.interchainMarketMaker?.map(e => InterchainMarketMaker.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  }
};