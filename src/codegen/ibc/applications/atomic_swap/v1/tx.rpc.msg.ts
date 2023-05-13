import { Rpc } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { MakeSwapMsg, MsgMakeSwapResponse, TakeSwapMsg, MsgTakeSwapResponse, CancelSwapMsg, MsgCancelSwapResponse } from "./tx";
/** Msg defines the ibc/swap Msg service. */
export interface Msg {
  makeSwap(request: MakeSwapMsg): Promise<MsgMakeSwapResponse>;
  takeSwap(request: TakeSwapMsg): Promise<MsgTakeSwapResponse>;
  cancelSwap(request: CancelSwapMsg): Promise<MsgCancelSwapResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.makeSwap = this.makeSwap.bind(this);
    this.takeSwap = this.takeSwap.bind(this);
    this.cancelSwap = this.cancelSwap.bind(this);
  }
  makeSwap(request: MakeSwapMsg): Promise<MsgMakeSwapResponse> {
    const data = MakeSwapMsg.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.atomic_swap.v1.Msg", "MakeSwap", data);
    return promise.then(data => MsgMakeSwapResponse.decode(new _m0.Reader(data)));
  }
  takeSwap(request: TakeSwapMsg): Promise<MsgTakeSwapResponse> {
    const data = TakeSwapMsg.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.atomic_swap.v1.Msg", "TakeSwap", data);
    return promise.then(data => MsgTakeSwapResponse.decode(new _m0.Reader(data)));
  }
  cancelSwap(request: CancelSwapMsg): Promise<MsgCancelSwapResponse> {
    const data = CancelSwapMsg.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.atomic_swap.v1.Msg", "CancelSwap", data);
    return promise.then(data => MsgCancelSwapResponse.decode(new _m0.Reader(data)));
  }
}