import { Long, DeepPartial } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
/**
 * ExtensionOptionsWeb3Tx is an extension option that specifies the typed chain id,
 * the fee payer as well as its signature data.
 */
export interface ExtensionOptionsWeb3Tx {
  /**
   * typed_data_chain_id is used only in EIP712 Domain and should match
   * Ethereum network ID in a Web3 provider (e.g. Metamask).
   */
  typedDataChainId: Long;
  /**
   * fee_payer is an account address for the fee payer. It will be validated
   * during EIP712 signature checking.
   */
  feePayer: string;
  /**
   * fee_payer_sig is a signature data from the fee paying account,
   * allows to perform fee delegation when using EIP712 Domain.
   */
  feePayerSig: Uint8Array;
}
/**
 * ExtensionOptionsWeb3Tx is an extension option that specifies the typed chain id,
 * the fee payer as well as its signature data.
 */
export interface ExtensionOptionsWeb3TxSDKType {
  typed_data_chain_id: Long;
  fee_payer: string;
  fee_payer_sig: Uint8Array;
}
function createBaseExtensionOptionsWeb3Tx(): ExtensionOptionsWeb3Tx {
  return {
    typedDataChainId: Long.UZERO,
    feePayer: "",
    feePayerSig: new Uint8Array()
  };
}
export const ExtensionOptionsWeb3Tx = {
  encode(message: ExtensionOptionsWeb3Tx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.typedDataChainId.isZero()) {
      writer.uint32(8).uint64(message.typedDataChainId);
    }
    if (message.feePayer !== "") {
      writer.uint32(18).string(message.feePayer);
    }
    if (message.feePayerSig.length !== 0) {
      writer.uint32(26).bytes(message.feePayerSig);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionOptionsWeb3Tx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionOptionsWeb3Tx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.typedDataChainId = (reader.uint64() as Long);
          break;
        case 2:
          message.feePayer = reader.string();
          break;
        case 3:
          message.feePayerSig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ExtensionOptionsWeb3Tx>): ExtensionOptionsWeb3Tx {
    const message = createBaseExtensionOptionsWeb3Tx();
    message.typedDataChainId = object.typedDataChainId !== undefined && object.typedDataChainId !== null ? Long.fromValue(object.typedDataChainId) : Long.UZERO;
    message.feePayer = object.feePayer ?? "";
    message.feePayerSig = object.feePayerSig ?? new Uint8Array();
    return message;
  }
};