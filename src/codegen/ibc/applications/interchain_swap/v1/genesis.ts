import { Params, ParamsSDKType } from "./param";
import { InterchainLiquidityPool, InterchainLiquidityPoolSDKType, InterchainMarketMaker, InterchainMarketMakerSDKType } from "./market";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../../helpers";
/** GenesisState defines the ibc-transfer genesis state */
export interface GenesisState {
  portId: string;
  params?: Params;
  interchainLiquidityPoolList: InterchainLiquidityPool[];
  interchainMarketMakerList: InterchainMarketMaker[];
}
/** GenesisState defines the ibc-transfer genesis state */
export interface GenesisStateSDKType {
  port_id: string;
  params?: ParamsSDKType;
  interchainLiquidityPoolList: InterchainLiquidityPoolSDKType[];
  interchainMarketMakerList: InterchainMarketMakerSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    portId: "",
    params: undefined,
    interchainLiquidityPoolList: [],
    interchainMarketMakerList: []
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
    for (const v of message.interchainLiquidityPoolList) {
      InterchainLiquidityPool.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.interchainMarketMakerList) {
      InterchainMarketMaker.encode(v!, writer.uint32(34).fork()).ldelim();
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
          message.interchainLiquidityPoolList.push(InterchainLiquidityPool.decode(reader, reader.uint32()));
          break;
        case 4:
          message.interchainMarketMakerList.push(InterchainMarketMaker.decode(reader, reader.uint32()));
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
    message.interchainLiquidityPoolList = object.interchainLiquidityPoolList?.map(e => InterchainLiquidityPool.fromPartial(e)) || [];
    message.interchainMarketMakerList = object.interchainMarketMakerList?.map(e => InterchainMarketMaker.fromPartial(e)) || [];
    return message;
  }
};