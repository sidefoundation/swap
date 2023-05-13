import { Rpc } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { MsgCreatePoolRequest, MsgCreatePoolResponse, MsgSingleAssetDepositRequest, MsgSingleAssetDepositResponse, MsgMultiAssetDepositRequest, MsgMultiAssetDepositResponse, MsgSingleAssetWithdrawRequest, MsgSingleAssetWithdrawResponse, MsgMultiAssetWithdrawRequest, MsgMultiAssetWithdrawResponse, MsgSwapRequest, MsgSwapResponse } from "./tx";
/** Msg defines the ibc/swap Msg service.
 Msg defines the Msg service.
 Msg defines the Msg service. */
export interface Msg {
  createPool(request: MsgCreatePoolRequest): Promise<MsgCreatePoolResponse>;
  singleAssetDeposit(request: MsgSingleAssetDepositRequest): Promise<MsgSingleAssetDepositResponse>;
  multiAssetDeposit(request: MsgMultiAssetDepositRequest): Promise<MsgMultiAssetDepositResponse>;
  singleAssetWithdraw(request: MsgSingleAssetWithdrawRequest): Promise<MsgSingleAssetWithdrawResponse>;
  multiAssetWithdraw(request: MsgMultiAssetWithdrawRequest): Promise<MsgMultiAssetWithdrawResponse>;
  swap(request: MsgSwapRequest): Promise<MsgSwapResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createPool = this.createPool.bind(this);
    this.singleAssetDeposit = this.singleAssetDeposit.bind(this);
    this.multiAssetDeposit = this.multiAssetDeposit.bind(this);
    this.singleAssetWithdraw = this.singleAssetWithdraw.bind(this);
    this.multiAssetWithdraw = this.multiAssetWithdraw.bind(this);
    this.swap = this.swap.bind(this);
  }
  createPool(request: MsgCreatePoolRequest): Promise<MsgCreatePoolResponse> {
    const data = MsgCreatePoolRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Msg", "CreatePool", data);
    return promise.then(data => MsgCreatePoolResponse.decode(new _m0.Reader(data)));
  }
  singleAssetDeposit(request: MsgSingleAssetDepositRequest): Promise<MsgSingleAssetDepositResponse> {
    const data = MsgSingleAssetDepositRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Msg", "SingleAssetDeposit", data);
    return promise.then(data => MsgSingleAssetDepositResponse.decode(new _m0.Reader(data)));
  }
  multiAssetDeposit(request: MsgMultiAssetDepositRequest): Promise<MsgMultiAssetDepositResponse> {
    const data = MsgMultiAssetDepositRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Msg", "MultiAssetDeposit", data);
    return promise.then(data => MsgMultiAssetDepositResponse.decode(new _m0.Reader(data)));
  }
  singleAssetWithdraw(request: MsgSingleAssetWithdrawRequest): Promise<MsgSingleAssetWithdrawResponse> {
    const data = MsgSingleAssetWithdrawRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Msg", "SingleAssetWithdraw", data);
    return promise.then(data => MsgSingleAssetWithdrawResponse.decode(new _m0.Reader(data)));
  }
  multiAssetWithdraw(request: MsgMultiAssetWithdrawRequest): Promise<MsgMultiAssetWithdrawResponse> {
    const data = MsgMultiAssetWithdrawRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Msg", "MultiAssetWithdraw", data);
    return promise.then(data => MsgMultiAssetWithdrawResponse.decode(new _m0.Reader(data)));
  }
  swap(request: MsgSwapRequest): Promise<MsgSwapResponse> {
    const data = MsgSwapRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_swap.v1.Msg", "Swap", data);
    return promise.then(data => MsgSwapResponse.decode(new _m0.Reader(data)));
  }
}