import { Params, ParamsSDKType, Order, OrderSDKType } from "./swap";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../../helpers";
/** GenesisState defines the ibc-transfer genesis state */
export interface GenesisState {
  portId: string;
  params?: Params;
  orders: Order[];
}
/** GenesisState defines the ibc-transfer genesis state */
export interface GenesisStateSDKType {
  port_id: string;
  params?: ParamsSDKType;
  orders: OrderSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    portId: "",
    params: undefined,
    orders: []
  };
}
export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.orders) {
      Order.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 3:
          message.orders.push(Order.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.portId = object.portId ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.orders = object.orders?.map(e => Order.fromPartial(e)) || [];
    return message;
  }
};