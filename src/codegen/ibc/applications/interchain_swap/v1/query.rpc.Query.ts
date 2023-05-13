import { Rpc } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryEscrowAddressRequest, QueryEscrowAddressResponse, QueryGetInterchainLiquidityPoolRequest, QueryGetInterchainLiquidityPoolResponse, QueryAllInterchainLiquidityPoolRequest, QueryAllInterchainLiquidityPoolResponse, QueryGetInterchainMarketMakerRequest, QueryGetInterchainMarketMakerResponse, QueryAllInterchainMarketMakerRequest, QueryAllInterchainMarketMakerResponse } from "./query";
/** Query provides defines the gRPC querier service. */
export interface Query {
  /** Params queries all parameters of the ibc-transfer module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** EscrowAddress returns the escrow address for a particular port and channel id. */
  escrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
  /** Queries a list of InterchainLiquidityPool items. */
  interchainLiquidityPool(request: QueryGetInterchainLiquidityPoolRequest): Promise<QueryGetInterchainLiquidityPoolResponse>;
  interchainLiquidityPoolAll(request?: QueryAllInterchainLiquidityPoolRequest): Promise<QueryAllInterchainLiquidityPoolResponse>;
  /** Queries a list of InterchainMarketMaker items. */
  interchainMarketMaker(request: QueryGetInterchainMarketMakerRequest): Promise<QueryGetInterchainMarketMakerResponse>;
  interchainMarketMakerAll(request?: QueryAllInterchainMarketMakerRequest): Promise<QueryAllInterchainMarketMakerResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.escrowAddress = this.escrowAddress.bind(this);
    this.interchainLiquidityPool = this.interchainLiquidityPool.bind(this);
    this.interchainLiquidityPoolAll = this.interchainLiquidityPoolAll.bind(this);
    this.interchainMarketMaker = this.interchainMarketMaker.bind(this);
    this.interchainMarketMakerAll = this.interchainMarketMakerAll.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new _m0.Reader(data)));
  }
  escrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse> {
    const data = QueryEscrowAddressRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Query", "EscrowAddress", data);
    return promise.then(data => QueryEscrowAddressResponse.decode(new _m0.Reader(data)));
  }
  interchainLiquidityPool(request: QueryGetInterchainLiquidityPoolRequest): Promise<QueryGetInterchainLiquidityPoolResponse> {
    const data = QueryGetInterchainLiquidityPoolRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Query", "InterchainLiquidityPool", data);
    return promise.then(data => QueryGetInterchainLiquidityPoolResponse.decode(new _m0.Reader(data)));
  }
  interchainLiquidityPoolAll(request: QueryAllInterchainLiquidityPoolRequest = {
    pagination: undefined
  }): Promise<QueryAllInterchainLiquidityPoolResponse> {
    const data = QueryAllInterchainLiquidityPoolRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Query", "InterchainLiquidityPoolAll", data);
    return promise.then(data => QueryAllInterchainLiquidityPoolResponse.decode(new _m0.Reader(data)));
  }
  interchainMarketMaker(request: QueryGetInterchainMarketMakerRequest): Promise<QueryGetInterchainMarketMakerResponse> {
    const data = QueryGetInterchainMarketMakerRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Query", "InterchainMarketMaker", data);
    return promise.then(data => QueryGetInterchainMarketMakerResponse.decode(new _m0.Reader(data)));
  }
  interchainMarketMakerAll(request: QueryAllInterchainMarketMakerRequest = {
    pagination: undefined
  }): Promise<QueryAllInterchainMarketMakerResponse> {
    const data = QueryAllInterchainMarketMakerRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Query", "InterchainMarketMakerAll", data);
    return promise.then(data => QueryAllInterchainMarketMakerResponse.decode(new _m0.Reader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    escrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse> {
      return queryService.escrowAddress(request);
    },
    interchainLiquidityPool(request: QueryGetInterchainLiquidityPoolRequest): Promise<QueryGetInterchainLiquidityPoolResponse> {
      return queryService.interchainLiquidityPool(request);
    },
    interchainLiquidityPoolAll(request?: QueryAllInterchainLiquidityPoolRequest): Promise<QueryAllInterchainLiquidityPoolResponse> {
      return queryService.interchainLiquidityPoolAll(request);
    },
    interchainMarketMaker(request: QueryGetInterchainMarketMakerRequest): Promise<QueryGetInterchainMarketMakerResponse> {
      return queryService.interchainMarketMaker(request);
    },
    interchainMarketMakerAll(request?: QueryAllInterchainMarketMakerRequest): Promise<QueryAllInterchainMarketMakerResponse> {
      return queryService.interchainMarketMakerAll(request);
    }
  };
};