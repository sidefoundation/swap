import { Long, DeepPartial } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
/** TxResult is the value stored in eth tx indexer */
export interface TxResult {
  /** height of the blockchain */
  height: Long;
  /** tx_index of the cosmos transaction */
  txIndex: number;
  /** msg_index in a batch transaction */
  msgIndex: number;
  /**
   * eth_tx_index is the index in the list of valid eth tx in the block,
   * aka. the transaction list returned by eth_getBlock api.
   */
  ethTxIndex: number;
  /** failed is true if the eth transaction did not go succeed */
  failed: boolean;
  /**
   * gas_used by the transaction. If it exceeds the block gas limit,
   * it's set to gas limit, which is what's actually deducted by ante handler.
   */
  gasUsed: Long;
  /**
   * cumulative_gas_used specifies the cumulated amount of gas used for all
   * processed messages within the current batch transaction.
   */
  cumulativeGasUsed: Long;
}
/** TxResult is the value stored in eth tx indexer */
export interface TxResultSDKType {
  height: Long;
  tx_index: number;
  msg_index: number;
  eth_tx_index: number;
  failed: boolean;
  gas_used: Long;
  cumulative_gas_used: Long;
}
function createBaseTxResult(): TxResult {
  return {
    height: Long.ZERO,
    txIndex: 0,
    msgIndex: 0,
    ethTxIndex: 0,
    failed: false,
    gasUsed: Long.UZERO,
    cumulativeGasUsed: Long.UZERO
  };
}
export const TxResult = {
  encode(message: TxResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).int64(message.height);
    }
    if (message.txIndex !== 0) {
      writer.uint32(16).uint32(message.txIndex);
    }
    if (message.msgIndex !== 0) {
      writer.uint32(24).uint32(message.msgIndex);
    }
    if (message.ethTxIndex !== 0) {
      writer.uint32(32).int32(message.ethTxIndex);
    }
    if (message.failed === true) {
      writer.uint32(40).bool(message.failed);
    }
    if (!message.gasUsed.isZero()) {
      writer.uint32(48).uint64(message.gasUsed);
    }
    if (!message.cumulativeGasUsed.isZero()) {
      writer.uint32(56).uint64(message.cumulativeGasUsed);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): TxResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = (reader.int64() as Long);
          break;
        case 2:
          message.txIndex = reader.uint32();
          break;
        case 3:
          message.msgIndex = reader.uint32();
          break;
        case 4:
          message.ethTxIndex = reader.int32();
          break;
        case 5:
          message.failed = reader.bool();
          break;
        case 6:
          message.gasUsed = (reader.uint64() as Long);
          break;
        case 7:
          message.cumulativeGasUsed = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxResult>): TxResult {
    const message = createBaseTxResult();
    message.height = object.height !== undefined && object.height !== null ? Long.fromValue(object.height) : Long.ZERO;
    message.txIndex = object.txIndex ?? 0;
    message.msgIndex = object.msgIndex ?? 0;
    message.ethTxIndex = object.ethTxIndex ?? 0;
    message.failed = object.failed ?? false;
    message.gasUsed = object.gasUsed !== undefined && object.gasUsed !== null ? Long.fromValue(object.gasUsed) : Long.UZERO;
    message.cumulativeGasUsed = object.cumulativeGasUsed !== undefined && object.cumulativeGasUsed !== null ? Long.fromValue(object.cumulativeGasUsed) : Long.UZERO;
    return message;
  }
};