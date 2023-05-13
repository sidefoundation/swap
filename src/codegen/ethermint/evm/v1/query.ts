import { MsgEthereumTx, MsgEthereumTxSDKType } from "./tx";
import { TraceConfig, TraceConfigSDKType, Log, LogSDKType, Params, ParamsSDKType } from "./evm";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Long, DeepPartial, toTimestamp, fromTimestamp } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
  /** address is the ethereum hex address to query the account for. */
  address: string;
}
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequestSDKType {
  address: string;
}
/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface QueryAccountResponse {
  /** balance is the balance of the EVM denomination. */
  balance: string;
  /** code_hash is the hex-formatted code bytes from the EOA. */
  codeHash: string;
  /** nonce is the account's sequence number. */
  nonce: Long;
}
/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface QueryAccountResponseSDKType {
  balance: string;
  code_hash: string;
  nonce: Long;
}
/**
 * QueryCosmosAccountRequest is the request type for the Query/CosmosAccount RPC
 * method.
 */
export interface QueryCosmosAccountRequest {
  /** address is the ethereum hex address to query the account for. */
  address: string;
}
/**
 * QueryCosmosAccountRequest is the request type for the Query/CosmosAccount RPC
 * method.
 */
export interface QueryCosmosAccountRequestSDKType {
  address: string;
}
/**
 * QueryCosmosAccountResponse is the response type for the Query/CosmosAccount
 * RPC method.
 */
export interface QueryCosmosAccountResponse {
  /** cosmos_address is the cosmos address of the account. */
  cosmosAddress: string;
  /** sequence is the account's sequence number. */
  sequence: Long;
  /** account_number is the account number */
  accountNumber: Long;
}
/**
 * QueryCosmosAccountResponse is the response type for the Query/CosmosAccount
 * RPC method.
 */
export interface QueryCosmosAccountResponseSDKType {
  cosmos_address: string;
  sequence: Long;
  account_number: Long;
}
/**
 * QueryValidatorAccountRequest is the request type for the
 * Query/ValidatorAccount RPC method.
 */
export interface QueryValidatorAccountRequest {
  /** cons_address is the validator cons address to query the account for. */
  consAddress: string;
}
/**
 * QueryValidatorAccountRequest is the request type for the
 * Query/ValidatorAccount RPC method.
 */
export interface QueryValidatorAccountRequestSDKType {
  cons_address: string;
}
/**
 * QueryValidatorAccountResponse is the response type for the
 * Query/ValidatorAccount RPC method.
 */
export interface QueryValidatorAccountResponse {
  /** account_address is the cosmos address of the account in bech32 format. */
  accountAddress: string;
  /** sequence is the account's sequence number. */
  sequence: Long;
  /** account_number is the account number */
  accountNumber: Long;
}
/**
 * QueryValidatorAccountResponse is the response type for the
 * Query/ValidatorAccount RPC method.
 */
export interface QueryValidatorAccountResponseSDKType {
  account_address: string;
  sequence: Long;
  account_number: Long;
}
/** QueryBalanceRequest is the request type for the Query/Balance RPC method. */
export interface QueryBalanceRequest {
  /** address is the ethereum hex address to query the balance for. */
  address: string;
}
/** QueryBalanceRequest is the request type for the Query/Balance RPC method. */
export interface QueryBalanceRequestSDKType {
  address: string;
}
/** QueryBalanceResponse is the response type for the Query/Balance RPC method. */
export interface QueryBalanceResponse {
  /** balance is the balance of the EVM denomination. */
  balance: string;
}
/** QueryBalanceResponse is the response type for the Query/Balance RPC method. */
export interface QueryBalanceResponseSDKType {
  balance: string;
}
/** QueryStorageRequest is the request type for the Query/Storage RPC method. */
export interface QueryStorageRequest {
  /** address is the ethereum hex address to query the storage state for. */
  address: string;
  /** key defines the key of the storage state */
  key: string;
}
/** QueryStorageRequest is the request type for the Query/Storage RPC method. */
export interface QueryStorageRequestSDKType {
  address: string;
  key: string;
}
/**
 * QueryStorageResponse is the response type for the Query/Storage RPC
 * method.
 */
export interface QueryStorageResponse {
  /** value defines the storage state value hash associated with the given key. */
  value: string;
}
/**
 * QueryStorageResponse is the response type for the Query/Storage RPC
 * method.
 */
export interface QueryStorageResponseSDKType {
  value: string;
}
/** QueryCodeRequest is the request type for the Query/Code RPC method. */
export interface QueryCodeRequest {
  /** address is the ethereum hex address to query the code for. */
  address: string;
}
/** QueryCodeRequest is the request type for the Query/Code RPC method. */
export interface QueryCodeRequestSDKType {
  address: string;
}
/**
 * QueryCodeResponse is the response type for the Query/Code RPC
 * method.
 */
export interface QueryCodeResponse {
  /** code represents the code bytes from an ethereum address. */
  code: Uint8Array;
}
/**
 * QueryCodeResponse is the response type for the Query/Code RPC
 * method.
 */
export interface QueryCodeResponseSDKType {
  code: Uint8Array;
}
/** QueryTxLogsRequest is the request type for the Query/TxLogs RPC method. */
export interface QueryTxLogsRequest {
  /** hash is the ethereum transaction hex hash to query the logs for. */
  hash: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** QueryTxLogsRequest is the request type for the Query/TxLogs RPC method. */
export interface QueryTxLogsRequestSDKType {
  hash: string;
  pagination?: PageRequestSDKType;
}
/** QueryTxLogsResponse is the response type for the Query/TxLogs RPC method. */
export interface QueryTxLogsResponse {
  /** logs represents the ethereum logs generated from the given transaction. */
  logs: Log[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/** QueryTxLogsResponse is the response type for the Query/TxLogs RPC method. */
export interface QueryTxLogsResponseSDKType {
  logs: LogSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryParamsRequest defines the request type for querying x/evm parameters. */
export interface QueryParamsRequest {}
/** QueryParamsRequest defines the request type for querying x/evm parameters. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse defines the response type for querying x/evm parameters. */
export interface QueryParamsResponse {
  /** params define the evm module parameters. */
  params?: Params;
}
/** QueryParamsResponse defines the response type for querying x/evm parameters. */
export interface QueryParamsResponseSDKType {
  params?: ParamsSDKType;
}
/** EthCallRequest defines EthCall request */
export interface EthCallRequest {
  /** args uses the same json format as the json rpc api. */
  args: Uint8Array;
  /** gas_cap defines the default gas cap to be used */
  gasCap: Long;
  /** proposer_address of the requested block in hex format */
  proposerAddress: Uint8Array;
  /** chain_id is the eip155 chain id parsed from the requested block header */
  chainId: Long;
}
/** EthCallRequest defines EthCall request */
export interface EthCallRequestSDKType {
  args: Uint8Array;
  gas_cap: Long;
  proposer_address: Uint8Array;
  chain_id: Long;
}
/** EstimateGasResponse defines EstimateGas response */
export interface EstimateGasResponse {
  /** gas returns the estimated gas */
  gas: Long;
}
/** EstimateGasResponse defines EstimateGas response */
export interface EstimateGasResponseSDKType {
  gas: Long;
}
/** QueryTraceTxRequest defines TraceTx request */
export interface QueryTraceTxRequest {
  /** msg is the MsgEthereumTx for the requested transaction */
  msg?: MsgEthereumTx;
  /** trace_config holds extra parameters to trace functions. */
  traceConfig?: TraceConfig;
  /**
   * predecessors is an array of transactions included in the same block
   * need to be replayed first to get correct context for tracing.
   */
  predecessors: MsgEthereumTx[];
  /** block_number of requested transaction */
  blockNumber: Long;
  /** block_hash of requested transaction */
  blockHash: string;
  /** block_time of requested transaction */
  blockTime?: Date;
  /** proposer_address is the proposer of the requested block */
  proposerAddress: Uint8Array;
  /** chain_id is the the eip155 chain id parsed from the requested block header */
  chainId: Long;
}
/** QueryTraceTxRequest defines TraceTx request */
export interface QueryTraceTxRequestSDKType {
  msg?: MsgEthereumTxSDKType;
  trace_config?: TraceConfigSDKType;
  predecessors: MsgEthereumTxSDKType[];
  block_number: Long;
  block_hash: string;
  block_time?: Date;
  proposer_address: Uint8Array;
  chain_id: Long;
}
/** QueryTraceTxResponse defines TraceTx response */
export interface QueryTraceTxResponse {
  /** data is the response serialized in bytes */
  data: Uint8Array;
}
/** QueryTraceTxResponse defines TraceTx response */
export interface QueryTraceTxResponseSDKType {
  data: Uint8Array;
}
/** QueryTraceBlockRequest defines TraceTx request */
export interface QueryTraceBlockRequest {
  /** txs is an array of messages in the block */
  txs: MsgEthereumTx[];
  /** trace_config holds extra parameters to trace functions. */
  traceConfig?: TraceConfig;
  /** block_number of the traced block */
  blockNumber: Long;
  /** block_hash (hex) of the traced block */
  blockHash: string;
  /** block_time of the traced block */
  blockTime?: Date;
  /** proposer_address is the address of the requested block */
  proposerAddress: Uint8Array;
  /** chain_id is the eip155 chain id parsed from the requested block header */
  chainId: Long;
}
/** QueryTraceBlockRequest defines TraceTx request */
export interface QueryTraceBlockRequestSDKType {
  txs: MsgEthereumTxSDKType[];
  trace_config?: TraceConfigSDKType;
  block_number: Long;
  block_hash: string;
  block_time?: Date;
  proposer_address: Uint8Array;
  chain_id: Long;
}
/** QueryTraceBlockResponse defines TraceBlock response */
export interface QueryTraceBlockResponse {
  /** data is the response serialized in bytes */
  data: Uint8Array;
}
/** QueryTraceBlockResponse defines TraceBlock response */
export interface QueryTraceBlockResponseSDKType {
  data: Uint8Array;
}
/**
 * QueryBaseFeeRequest defines the request type for querying the EIP1559 base
 * fee.
 */
export interface QueryBaseFeeRequest {}
/**
 * QueryBaseFeeRequest defines the request type for querying the EIP1559 base
 * fee.
 */
export interface QueryBaseFeeRequestSDKType {}
/** QueryBaseFeeResponse returns the EIP1559 base fee. */
export interface QueryBaseFeeResponse {
  /** base_fee is the EIP1559 base fee */
  baseFee: string;
}
/** QueryBaseFeeResponse returns the EIP1559 base fee. */
export interface QueryBaseFeeResponseSDKType {
  base_fee: string;
}
function createBaseQueryAccountRequest(): QueryAccountRequest {
  return {
    address: ""
  };
}
export const QueryAccountRequest = {
  encode(message: QueryAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAccountRequest>): QueryAccountRequest {
    const message = createBaseQueryAccountRequest();
    message.address = object.address ?? "";
    return message;
  }
};
function createBaseQueryAccountResponse(): QueryAccountResponse {
  return {
    balance: "",
    codeHash: "",
    nonce: Long.UZERO
  };
}
export const QueryAccountResponse = {
  encode(message: QueryAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.balance !== "") {
      writer.uint32(10).string(message.balance);
    }
    if (message.codeHash !== "") {
      writer.uint32(18).string(message.codeHash);
    }
    if (!message.nonce.isZero()) {
      writer.uint32(24).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = reader.string();
          break;
        case 2:
          message.codeHash = reader.string();
          break;
        case 3:
          message.nonce = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAccountResponse>): QueryAccountResponse {
    const message = createBaseQueryAccountResponse();
    message.balance = object.balance ?? "";
    message.codeHash = object.codeHash ?? "";
    message.nonce = object.nonce !== undefined && object.nonce !== null ? Long.fromValue(object.nonce) : Long.UZERO;
    return message;
  }
};
function createBaseQueryCosmosAccountRequest(): QueryCosmosAccountRequest {
  return {
    address: ""
  };
}
export const QueryCosmosAccountRequest = {
  encode(message: QueryCosmosAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCosmosAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCosmosAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryCosmosAccountRequest>): QueryCosmosAccountRequest {
    const message = createBaseQueryCosmosAccountRequest();
    message.address = object.address ?? "";
    return message;
  }
};
function createBaseQueryCosmosAccountResponse(): QueryCosmosAccountResponse {
  return {
    cosmosAddress: "",
    sequence: Long.UZERO,
    accountNumber: Long.UZERO
  };
}
export const QueryCosmosAccountResponse = {
  encode(message: QueryCosmosAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cosmosAddress !== "") {
      writer.uint32(10).string(message.cosmosAddress);
    }
    if (!message.sequence.isZero()) {
      writer.uint32(16).uint64(message.sequence);
    }
    if (!message.accountNumber.isZero()) {
      writer.uint32(24).uint64(message.accountNumber);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCosmosAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCosmosAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cosmosAddress = reader.string();
          break;
        case 2:
          message.sequence = (reader.uint64() as Long);
          break;
        case 3:
          message.accountNumber = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryCosmosAccountResponse>): QueryCosmosAccountResponse {
    const message = createBaseQueryCosmosAccountResponse();
    message.cosmosAddress = object.cosmosAddress ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? Long.fromValue(object.sequence) : Long.UZERO;
    message.accountNumber = object.accountNumber !== undefined && object.accountNumber !== null ? Long.fromValue(object.accountNumber) : Long.UZERO;
    return message;
  }
};
function createBaseQueryValidatorAccountRequest(): QueryValidatorAccountRequest {
  return {
    consAddress: ""
  };
}
export const QueryValidatorAccountRequest = {
  encode(message: QueryValidatorAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consAddress !== "") {
      writer.uint32(10).string(message.consAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryValidatorAccountRequest>): QueryValidatorAccountRequest {
    const message = createBaseQueryValidatorAccountRequest();
    message.consAddress = object.consAddress ?? "";
    return message;
  }
};
function createBaseQueryValidatorAccountResponse(): QueryValidatorAccountResponse {
  return {
    accountAddress: "",
    sequence: Long.UZERO,
    accountNumber: Long.UZERO
  };
}
export const QueryValidatorAccountResponse = {
  encode(message: QueryValidatorAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (!message.sequence.isZero()) {
      writer.uint32(16).uint64(message.sequence);
    }
    if (!message.accountNumber.isZero()) {
      writer.uint32(24).uint64(message.accountNumber);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
          break;
        case 2:
          message.sequence = (reader.uint64() as Long);
          break;
        case 3:
          message.accountNumber = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryValidatorAccountResponse>): QueryValidatorAccountResponse {
    const message = createBaseQueryValidatorAccountResponse();
    message.accountAddress = object.accountAddress ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? Long.fromValue(object.sequence) : Long.UZERO;
    message.accountNumber = object.accountNumber !== undefined && object.accountNumber !== null ? Long.fromValue(object.accountNumber) : Long.UZERO;
    return message;
  }
};
function createBaseQueryBalanceRequest(): QueryBalanceRequest {
  return {
    address: ""
  };
}
export const QueryBalanceRequest = {
  encode(message: QueryBalanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBalanceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryBalanceRequest>): QueryBalanceRequest {
    const message = createBaseQueryBalanceRequest();
    message.address = object.address ?? "";
    return message;
  }
};
function createBaseQueryBalanceResponse(): QueryBalanceResponse {
  return {
    balance: ""
  };
}
export const QueryBalanceResponse = {
  encode(message: QueryBalanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.balance !== "") {
      writer.uint32(10).string(message.balance);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBalanceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryBalanceResponse>): QueryBalanceResponse {
    const message = createBaseQueryBalanceResponse();
    message.balance = object.balance ?? "";
    return message;
  }
};
function createBaseQueryStorageRequest(): QueryStorageRequest {
  return {
    address: "",
    key: ""
  };
}
export const QueryStorageRequest = {
  encode(message: QueryStorageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStorageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStorageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryStorageRequest>): QueryStorageRequest {
    const message = createBaseQueryStorageRequest();
    message.address = object.address ?? "";
    message.key = object.key ?? "";
    return message;
  }
};
function createBaseQueryStorageResponse(): QueryStorageResponse {
  return {
    value: ""
  };
}
export const QueryStorageResponse = {
  encode(message: QueryStorageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStorageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStorageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryStorageResponse>): QueryStorageResponse {
    const message = createBaseQueryStorageResponse();
    message.value = object.value ?? "";
    return message;
  }
};
function createBaseQueryCodeRequest(): QueryCodeRequest {
  return {
    address: ""
  };
}
export const QueryCodeRequest = {
  encode(message: QueryCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryCodeRequest>): QueryCodeRequest {
    const message = createBaseQueryCodeRequest();
    message.address = object.address ?? "";
    return message;
  }
};
function createBaseQueryCodeResponse(): QueryCodeResponse {
  return {
    code: new Uint8Array()
  };
}
export const QueryCodeResponse = {
  encode(message: QueryCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code.length !== 0) {
      writer.uint32(10).bytes(message.code);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryCodeResponse>): QueryCodeResponse {
    const message = createBaseQueryCodeResponse();
    message.code = object.code ?? new Uint8Array();
    return message;
  }
};
function createBaseQueryTxLogsRequest(): QueryTxLogsRequest {
  return {
    hash: "",
    pagination: undefined
  };
}
export const QueryTxLogsRequest = {
  encode(message: QueryTxLogsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTxLogsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTxLogsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryTxLogsRequest>): QueryTxLogsRequest {
    const message = createBaseQueryTxLogsRequest();
    message.hash = object.hash ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  }
};
function createBaseQueryTxLogsResponse(): QueryTxLogsResponse {
  return {
    logs: [],
    pagination: undefined
  };
}
export const QueryTxLogsResponse = {
  encode(message: QueryTxLogsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.logs) {
      Log.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTxLogsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTxLogsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.logs.push(Log.decode(reader, reader.uint32()));
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
  fromPartial(object: DeepPartial<QueryTxLogsResponse>): QueryTxLogsResponse {
    const message = createBaseQueryTxLogsResponse();
    message.logs = object.logs?.map(e => Log.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  }
};
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
function createBaseEthCallRequest(): EthCallRequest {
  return {
    args: new Uint8Array(),
    gasCap: Long.UZERO,
    proposerAddress: new Uint8Array(),
    chainId: Long.ZERO
  };
}
export const EthCallRequest = {
  encode(message: EthCallRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.args.length !== 0) {
      writer.uint32(10).bytes(message.args);
    }
    if (!message.gasCap.isZero()) {
      writer.uint32(16).uint64(message.gasCap);
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(26).bytes(message.proposerAddress);
    }
    if (!message.chainId.isZero()) {
      writer.uint32(32).int64(message.chainId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): EthCallRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEthCallRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.args = reader.bytes();
          break;
        case 2:
          message.gasCap = (reader.uint64() as Long);
          break;
        case 3:
          message.proposerAddress = reader.bytes();
          break;
        case 4:
          message.chainId = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<EthCallRequest>): EthCallRequest {
    const message = createBaseEthCallRequest();
    message.args = object.args ?? new Uint8Array();
    message.gasCap = object.gasCap !== undefined && object.gasCap !== null ? Long.fromValue(object.gasCap) : Long.UZERO;
    message.proposerAddress = object.proposerAddress ?? new Uint8Array();
    message.chainId = object.chainId !== undefined && object.chainId !== null ? Long.fromValue(object.chainId) : Long.ZERO;
    return message;
  }
};
function createBaseEstimateGasResponse(): EstimateGasResponse {
  return {
    gas: Long.UZERO
  };
}
export const EstimateGasResponse = {
  encode(message: EstimateGasResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.gas.isZero()) {
      writer.uint32(8).uint64(message.gas);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateGasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateGasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gas = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<EstimateGasResponse>): EstimateGasResponse {
    const message = createBaseEstimateGasResponse();
    message.gas = object.gas !== undefined && object.gas !== null ? Long.fromValue(object.gas) : Long.UZERO;
    return message;
  }
};
function createBaseQueryTraceTxRequest(): QueryTraceTxRequest {
  return {
    msg: undefined,
    traceConfig: undefined,
    predecessors: [],
    blockNumber: Long.ZERO,
    blockHash: "",
    blockTime: undefined,
    proposerAddress: new Uint8Array(),
    chainId: Long.ZERO
  };
}
export const QueryTraceTxRequest = {
  encode(message: QueryTraceTxRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msg !== undefined) {
      MsgEthereumTx.encode(message.msg, writer.uint32(10).fork()).ldelim();
    }
    if (message.traceConfig !== undefined) {
      TraceConfig.encode(message.traceConfig, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.predecessors) {
      MsgEthereumTx.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (!message.blockNumber.isZero()) {
      writer.uint32(40).int64(message.blockNumber);
    }
    if (message.blockHash !== "") {
      writer.uint32(50).string(message.blockHash);
    }
    if (message.blockTime !== undefined) {
      Timestamp.encode(toTimestamp(message.blockTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(66).bytes(message.proposerAddress);
    }
    if (!message.chainId.isZero()) {
      writer.uint32(72).int64(message.chainId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTraceTxRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTraceTxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg = MsgEthereumTx.decode(reader, reader.uint32());
          break;
        case 3:
          message.traceConfig = TraceConfig.decode(reader, reader.uint32());
          break;
        case 4:
          message.predecessors.push(MsgEthereumTx.decode(reader, reader.uint32()));
          break;
        case 5:
          message.blockNumber = (reader.int64() as Long);
          break;
        case 6:
          message.blockHash = reader.string();
          break;
        case 7:
          message.blockTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.proposerAddress = reader.bytes();
          break;
        case 9:
          message.chainId = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryTraceTxRequest>): QueryTraceTxRequest {
    const message = createBaseQueryTraceTxRequest();
    message.msg = object.msg !== undefined && object.msg !== null ? MsgEthereumTx.fromPartial(object.msg) : undefined;
    message.traceConfig = object.traceConfig !== undefined && object.traceConfig !== null ? TraceConfig.fromPartial(object.traceConfig) : undefined;
    message.predecessors = object.predecessors?.map(e => MsgEthereumTx.fromPartial(e)) || [];
    message.blockNumber = object.blockNumber !== undefined && object.blockNumber !== null ? Long.fromValue(object.blockNumber) : Long.ZERO;
    message.blockHash = object.blockHash ?? "";
    message.blockTime = object.blockTime ?? undefined;
    message.proposerAddress = object.proposerAddress ?? new Uint8Array();
    message.chainId = object.chainId !== undefined && object.chainId !== null ? Long.fromValue(object.chainId) : Long.ZERO;
    return message;
  }
};
function createBaseQueryTraceTxResponse(): QueryTraceTxResponse {
  return {
    data: new Uint8Array()
  };
}
export const QueryTraceTxResponse = {
  encode(message: QueryTraceTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTraceTxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTraceTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryTraceTxResponse>): QueryTraceTxResponse {
    const message = createBaseQueryTraceTxResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  }
};
function createBaseQueryTraceBlockRequest(): QueryTraceBlockRequest {
  return {
    txs: [],
    traceConfig: undefined,
    blockNumber: Long.ZERO,
    blockHash: "",
    blockTime: undefined,
    proposerAddress: new Uint8Array(),
    chainId: Long.ZERO
  };
}
export const QueryTraceBlockRequest = {
  encode(message: QueryTraceBlockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      MsgEthereumTx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.traceConfig !== undefined) {
      TraceConfig.encode(message.traceConfig, writer.uint32(26).fork()).ldelim();
    }
    if (!message.blockNumber.isZero()) {
      writer.uint32(40).int64(message.blockNumber);
    }
    if (message.blockHash !== "") {
      writer.uint32(50).string(message.blockHash);
    }
    if (message.blockTime !== undefined) {
      Timestamp.encode(toTimestamp(message.blockTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(66).bytes(message.proposerAddress);
    }
    if (!message.chainId.isZero()) {
      writer.uint32(72).int64(message.chainId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTraceBlockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTraceBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(MsgEthereumTx.decode(reader, reader.uint32()));
          break;
        case 3:
          message.traceConfig = TraceConfig.decode(reader, reader.uint32());
          break;
        case 5:
          message.blockNumber = (reader.int64() as Long);
          break;
        case 6:
          message.blockHash = reader.string();
          break;
        case 7:
          message.blockTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.proposerAddress = reader.bytes();
          break;
        case 9:
          message.chainId = (reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryTraceBlockRequest>): QueryTraceBlockRequest {
    const message = createBaseQueryTraceBlockRequest();
    message.txs = object.txs?.map(e => MsgEthereumTx.fromPartial(e)) || [];
    message.traceConfig = object.traceConfig !== undefined && object.traceConfig !== null ? TraceConfig.fromPartial(object.traceConfig) : undefined;
    message.blockNumber = object.blockNumber !== undefined && object.blockNumber !== null ? Long.fromValue(object.blockNumber) : Long.ZERO;
    message.blockHash = object.blockHash ?? "";
    message.blockTime = object.blockTime ?? undefined;
    message.proposerAddress = object.proposerAddress ?? new Uint8Array();
    message.chainId = object.chainId !== undefined && object.chainId !== null ? Long.fromValue(object.chainId) : Long.ZERO;
    return message;
  }
};
function createBaseQueryTraceBlockResponse(): QueryTraceBlockResponse {
  return {
    data: new Uint8Array()
  };
}
export const QueryTraceBlockResponse = {
  encode(message: QueryTraceBlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTraceBlockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTraceBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryTraceBlockResponse>): QueryTraceBlockResponse {
    const message = createBaseQueryTraceBlockResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  }
};
function createBaseQueryBaseFeeRequest(): QueryBaseFeeRequest {
  return {};
}
export const QueryBaseFeeRequest = {
  encode(_: QueryBaseFeeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBaseFeeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBaseFeeRequest();
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
  fromPartial(_: DeepPartial<QueryBaseFeeRequest>): QueryBaseFeeRequest {
    const message = createBaseQueryBaseFeeRequest();
    return message;
  }
};
function createBaseQueryBaseFeeResponse(): QueryBaseFeeResponse {
  return {
    baseFee: ""
  };
}
export const QueryBaseFeeResponse = {
  encode(message: QueryBaseFeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseFee !== "") {
      writer.uint32(10).string(message.baseFee);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBaseFeeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBaseFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryBaseFeeResponse>): QueryBaseFeeResponse {
    const message = createBaseQueryBaseFeeResponse();
    message.baseFee = object.baseFee ?? "";
    return message;
  }
};