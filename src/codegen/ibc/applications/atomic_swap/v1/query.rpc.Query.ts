import { Rpc } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryEscrowAddressRequest, QueryEscrowAddressResponse, QueryOrdersRequest, QueryOrdersResponse } from "./query";
/** Query provides defines the gRPC querier service. */
export interface Query {
  /** Params queries all parameters of the ibc-transfer module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** EscrowAddress returns the escrow address for a particular port and channel id. */
  escrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
  orders(request?: QueryOrdersRequest): Promise<QueryOrdersResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.escrowAddress = this.escrowAddress.bind(this);
    this.orders = this.orders.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.atomic_swap.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new _m0.Reader(data)));
  }
  escrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse> {
    const data = QueryEscrowAddressRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.atomic_swap.v1.Query", "EscrowAddress", data);
    return promise.then(data => QueryEscrowAddressResponse.decode(new _m0.Reader(data)));
  }
  orders(request: QueryOrdersRequest = {}): Promise<QueryOrdersResponse> {
    const data = QueryOrdersRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.atomic_swap.v1.Query", "Orders", data);
    return promise.then(data => QueryOrdersResponse.decode(new _m0.Reader(data)));
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
    orders(request?: QueryOrdersRequest): Promise<QueryOrdersResponse> {
      return queryService.orders(request);
    }
  };
};