import { AminoMsg } from "@cosmjs/amino";
import { AminoHeight, Long, omitDefault } from "../../../../helpers";
import { MakeSwapMsg, TakeSwapMsg, CancelSwapMsg } from "./tx";
export interface MakeSwapMsgAminoType extends AminoMsg {
  type: "cosmos-sdk/MakeSwapMsg";
  value: {
    source_port: string;
    source_channel: string;
    sell_token: {
      denom: string;
      amount: string;
    };
    buy_token: {
      denom: string;
      amount: string;
    };
    maker_address: string;
    maker_receiving_address: string;
    desired_taker: string;
    create_timestamp: string;
    timeout_height: AminoHeight;
    timeout_timestamp: string;
    expiration_timestamp: string;
  };
}
export interface TakeSwapMsgAminoType extends AminoMsg {
  type: "cosmos-sdk/TakeSwapMsg";
  value: {
    order_id: string;
    sell_token: {
      denom: string;
      amount: string;
    };
    taker_address: string;
    taker_receiving_address: string;
    timeout_height: AminoHeight;
    timeout_timestamp: string;
    create_timestamp: string;
  };
}
export interface CancelSwapMsgAminoType extends AminoMsg {
  type: "cosmos-sdk/CancelSwapMsg";
  value: {
    order_id: string;
    maker_address: string;
    timeout_height: AminoHeight;
    timeout_timestamp: string;
    create_timestamp: string;
  };
}
export const AminoConverter = {
  "/ibc.applications.atomic_swap.v1.MakeSwapMsg": {
    aminoType: "cosmos-sdk/MakeSwapMsg",
    toAmino: ({
      sourcePort,
      sourceChannel,
      sellToken,
      buyToken,
      makerAddress,
      makerReceivingAddress,
      desiredTaker,
      createTimestamp,
      timeoutHeight,
      timeoutTimestamp,
      expirationTimestamp
    }: MakeSwapMsg): MakeSwapMsgAminoType["value"] => {
      return {
        source_port: sourcePort,
        source_channel: sourceChannel,
        sell_token: {
          denom: sellToken.denom,
          amount: Long.fromValue(sellToken.amount).toString()
        },
        buy_token: {
          denom: buyToken.denom,
          amount: Long.fromValue(buyToken.amount).toString()
        },
        maker_address: makerAddress,
        maker_receiving_address: makerReceivingAddress,
        desired_taker: desiredTaker,
        create_timestamp: createTimestamp.toString(),
        timeout_height: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeout_timestamp: timeoutTimestamp.toString(),
        expiration_timestamp: expirationTimestamp.toString()
      };
    },
    fromAmino: ({
      source_port,
      source_channel,
      sell_token,
      buy_token,
      maker_address,
      maker_receiving_address,
      desired_taker,
      create_timestamp,
      timeout_height,
      timeout_timestamp,
      expiration_timestamp
    }: MakeSwapMsgAminoType["value"]): MakeSwapMsg => {
      return {
        sourcePort: source_port,
        sourceChannel: source_channel,
        sellToken: {
          denom: sell_token.denom,
          amount: sell_token.amount
        },
        buyToken: {
          denom: buy_token.denom,
          amount: buy_token.amount
        },
        makerAddress: maker_address,
        makerReceivingAddress: maker_receiving_address,
        desiredTaker: desired_taker,
        createTimestamp: Long.fromString(create_timestamp),
        timeoutHeight: timeout_height ? {
          revisionHeight: Long.fromString(timeout_height.revision_height || "0", true),
          revisionNumber: Long.fromString(timeout_height.revision_number || "0", true)
        } : undefined,
        timeoutTimestamp: Long.fromString(timeout_timestamp),
        expirationTimestamp: Long.fromString(expiration_timestamp)
      };
    }
  },
  "/ibc.applications.atomic_swap.v1.TakeSwapMsg": {
    aminoType: "cosmos-sdk/TakeSwapMsg",
    toAmino: ({
      orderId,
      sellToken,
      takerAddress,
      takerReceivingAddress,
      timeoutHeight,
      timeoutTimestamp,
      createTimestamp
    }: TakeSwapMsg): TakeSwapMsgAminoType["value"] => {
      return {
        order_id: orderId,
        sell_token: {
          denom: sellToken.denom,
          amount: Long.fromValue(sellToken.amount).toString()
        },
        taker_address: takerAddress,
        taker_receiving_address: takerReceivingAddress,
        timeout_height: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeout_timestamp: timeoutTimestamp.toString(),
        create_timestamp: createTimestamp.toString()
      };
    },
    fromAmino: ({
      order_id,
      sell_token,
      taker_address,
      taker_receiving_address,
      timeout_height,
      timeout_timestamp,
      create_timestamp
    }: TakeSwapMsgAminoType["value"]): TakeSwapMsg => {
      return {
        orderId: order_id,
        sellToken: {
          denom: sell_token.denom,
          amount: sell_token.amount
        },
        takerAddress: taker_address,
        takerReceivingAddress: taker_receiving_address,
        timeoutHeight: timeout_height ? {
          revisionHeight: Long.fromString(timeout_height.revision_height || "0", true),
          revisionNumber: Long.fromString(timeout_height.revision_number || "0", true)
        } : undefined,
        timeoutTimestamp: Long.fromString(timeout_timestamp),
        createTimestamp: Long.fromString(create_timestamp)
      };
    }
  },
  "/ibc.applications.atomic_swap.v1.CancelSwapMsg": {
    aminoType: "cosmos-sdk/CancelSwapMsg",
    toAmino: ({
      orderId,
      makerAddress,
      timeoutHeight,
      timeoutTimestamp,
      createTimestamp
    }: CancelSwapMsg): CancelSwapMsgAminoType["value"] => {
      return {
        order_id: orderId,
        maker_address: makerAddress,
        timeout_height: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeout_timestamp: timeoutTimestamp.toString(),
        create_timestamp: createTimestamp.toString()
      };
    },
    fromAmino: ({
      order_id,
      maker_address,
      timeout_height,
      timeout_timestamp,
      create_timestamp
    }: CancelSwapMsgAminoType["value"]): CancelSwapMsg => {
      return {
        orderId: order_id,
        makerAddress: maker_address,
        timeoutHeight: timeout_height ? {
          revisionHeight: Long.fromString(timeout_height.revision_height || "0", true),
          revisionNumber: Long.fromString(timeout_height.revision_number || "0", true)
        } : undefined,
        timeoutTimestamp: Long.fromString(timeout_timestamp),
        createTimestamp: Long.fromString(create_timestamp)
      };
    }
  }
};