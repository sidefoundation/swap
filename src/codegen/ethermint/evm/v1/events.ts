import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../helpers";
/** EventEthereumTx defines the event for an Ethereum transaction */
export interface EventEthereumTx {
  /** amount */
  amount: string;
  /** eth_hash is the Ethereum hash of the transaction */
  ethHash: string;
  /** index of the transaction in the block */
  index: string;
  /** gas_used is the amount of gas used by the transaction */
  gasUsed: string;
  /** hash is the Tendermint hash of the transaction */
  hash: string;
  /** recipient of the transaction */
  recipient: string;
  /** eth_tx_failed contains a VM error should it occur */
  ethTxFailed: string;
}
/** EventEthereumTx defines the event for an Ethereum transaction */
export interface EventEthereumTxSDKType {
  amount: string;
  eth_hash: string;
  index: string;
  gas_used: string;
  hash: string;
  recipient: string;
  eth_tx_failed: string;
}
/** EventTxLog defines the event for an Ethereum transaction log */
export interface EventTxLog {
  /** tx_logs is an array of transaction logs */
  txLogs: string[];
}
/** EventTxLog defines the event for an Ethereum transaction log */
export interface EventTxLogSDKType {
  tx_logs: string[];
}
/** EventMessage */
export interface EventMessage {
  /** module which emits the event */
  module: string;
  /** sender of the message */
  sender: string;
  /** tx_type is the type of the message */
  txType: string;
}
/** EventMessage */
export interface EventMessageSDKType {
  module: string;
  sender: string;
  tx_type: string;
}
/** EventBlockBloom defines an Ethereum block bloom filter event */
export interface EventBlockBloom {
  /** bloom is the bloom filter of the block */
  bloom: string;
}
/** EventBlockBloom defines an Ethereum block bloom filter event */
export interface EventBlockBloomSDKType {
  bloom: string;
}
function createBaseEventEthereumTx(): EventEthereumTx {
  return {
    amount: "",
    ethHash: "",
    index: "",
    gasUsed: "",
    hash: "",
    recipient: "",
    ethTxFailed: ""
  };
}
export const EventEthereumTx = {
  encode(message: EventEthereumTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== "") {
      writer.uint32(10).string(message.amount);
    }
    if (message.ethHash !== "") {
      writer.uint32(18).string(message.ethHash);
    }
    if (message.index !== "") {
      writer.uint32(26).string(message.index);
    }
    if (message.gasUsed !== "") {
      writer.uint32(34).string(message.gasUsed);
    }
    if (message.hash !== "") {
      writer.uint32(42).string(message.hash);
    }
    if (message.recipient !== "") {
      writer.uint32(50).string(message.recipient);
    }
    if (message.ethTxFailed !== "") {
      writer.uint32(58).string(message.ethTxFailed);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): EventEthereumTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventEthereumTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.string();
          break;
        case 2:
          message.ethHash = reader.string();
          break;
        case 3:
          message.index = reader.string();
          break;
        case 4:
          message.gasUsed = reader.string();
          break;
        case 5:
          message.hash = reader.string();
          break;
        case 6:
          message.recipient = reader.string();
          break;
        case 7:
          message.ethTxFailed = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<EventEthereumTx>): EventEthereumTx {
    const message = createBaseEventEthereumTx();
    message.amount = object.amount ?? "";
    message.ethHash = object.ethHash ?? "";
    message.index = object.index ?? "";
    message.gasUsed = object.gasUsed ?? "";
    message.hash = object.hash ?? "";
    message.recipient = object.recipient ?? "";
    message.ethTxFailed = object.ethTxFailed ?? "";
    return message;
  }
};
function createBaseEventTxLog(): EventTxLog {
  return {
    txLogs: []
  };
}
export const EventTxLog = {
  encode(message: EventTxLog, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txLogs) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): EventTxLog {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTxLog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txLogs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<EventTxLog>): EventTxLog {
    const message = createBaseEventTxLog();
    message.txLogs = object.txLogs?.map(e => e) || [];
    return message;
  }
};
function createBaseEventMessage(): EventMessage {
  return {
    module: "",
    sender: "",
    txType: ""
  };
}
export const EventMessage = {
  encode(message: EventMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.module !== "") {
      writer.uint32(10).string(message.module);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.txType !== "") {
      writer.uint32(26).string(message.txType);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): EventMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.module = reader.string();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.txType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<EventMessage>): EventMessage {
    const message = createBaseEventMessage();
    message.module = object.module ?? "";
    message.sender = object.sender ?? "";
    message.txType = object.txType ?? "";
    return message;
  }
};
function createBaseEventBlockBloom(): EventBlockBloom {
  return {
    bloom: ""
  };
}
export const EventBlockBloom = {
  encode(message: EventBlockBloom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bloom !== "") {
      writer.uint32(10).string(message.bloom);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): EventBlockBloom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBlockBloom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bloom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<EventBlockBloom>): EventBlockBloom {
    const message = createBaseEventBlockBloom();
    message.bloom = object.bloom ?? "";
    return message;
  }
};