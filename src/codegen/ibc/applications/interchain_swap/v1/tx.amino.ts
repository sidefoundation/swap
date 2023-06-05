import { poolAssetSideFromJSON } from "./market";
import { AminoMsg } from "@cosmjs/amino";
import { AminoHeight, Long, omitDefault } from "../../../../helpers";
import { swapMsgTypeFromJSON, MsgCreatePoolRequest, MsgSingleAssetDepositRequest, MsgMultiAssetDepositRequest, MsgSingleAssetWithdrawRequest, MsgMultiAssetWithdrawRequest, MsgSwapRequest } from "./tx";
export interface MsgCreatePoolRequestAminoType extends AminoMsg {
  type: "cosmos-sdk/MsgCreatePoolRequest";
  value: {
    sourcePort: string;
    sourceChannel: string;
    creator: string;
    counterPartyCreator: string;
    liquidity: {
      side: number;
      balance: {
        denom: string;
        amount: string;
      };
      weight: number;
      decimal: number;
    }[];
    swapFee: number;
    counterPartySig: Uint8Array;
    timeoutHeight: AminoHeight;
    timeoutTimeStamp: string;
  };
}
export interface MsgSingleAssetDepositRequestAminoType extends AminoMsg {
  type: "cosmos-sdk/MsgSingleAssetDepositRequest";
  value: {
    poolId: string;
    sender: string;
    token: {
      denom: string;
      amount: string;
    };
    timeoutHeight: AminoHeight;
    timeoutTimeStamp: string;
  };
}
export interface MsgMultiAssetDepositRequestAminoType extends AminoMsg {
  type: "cosmos-sdk/MsgMultiAssetDepositRequest";
  value: {
    poolId: string;
    deposits: {
      sender: string;
      balance: {
        denom: string;
        amount: string;
      };
      signature: Uint8Array;
    }[];
    timeoutHeight: AminoHeight;
    timeoutTimeStamp: string;
  };
}
export interface MsgSingleAssetWithdrawRequestAminoType extends AminoMsg {
  type: "cosmos-sdk/MsgSingleAssetWithdrawRequest";
  value: {
    sender: string;
    poolCoin: {
      denom: string;
      amount: string;
    };
    timeoutHeight: AminoHeight;
    timeoutTimeStamp: string;
  };
}
export interface MsgMultiAssetWithdrawRequestAminoType extends AminoMsg {
  type: "cosmos-sdk/MsgMultiAssetWithdrawRequest";
  value: {
    poolId: string;
    sender: string;
    withdraws: {
      receiver: string;
      balance: {
        denom: string;
        amount: string;
      };
    }[];
    timeoutHeight: AminoHeight;
    timeoutTimeStamp: string;
  };
}
export interface MsgSwapRequestAminoType extends AminoMsg {
  type: "cosmos-sdk/MsgSwapRequest";
  value: {
    swap_type: number;
    sender: string;
    tokenIn: {
      denom: string;
      amount: string;
    };
    tokenOut: {
      denom: string;
      amount: string;
    };
    slippage: string;
    recipient: string;
    timeoutHeight: AminoHeight;
    timeoutTimeStamp: string;
  };
}
export const AminoConverter = {
  "/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest": {
    aminoType: "cosmos-sdk/MsgCreatePoolRequest",
    toAmino: ({
      sourcePort,
      sourceChannel,
      creator,
      counterPartyCreator,
      liquidity,
      swapFee,
      counterPartySig,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgCreatePoolRequest): MsgCreatePoolRequestAminoType["value"] => {
      return {
        sourcePort,
        sourceChannel,
        creator,
        counterPartyCreator,
        liquidity: liquidity.map(el0 => ({
          side: el0.side,
          balance: {
            denom: el0.balance.denom,
            amount: Long.fromValue(el0.balance.amount).toString()
          },
          weight: el0.weight,
          decimal: el0.decimal
        })),
        swapFee,
        counterPartySig,
        timeoutHeight: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeoutTimeStamp: timeoutTimeStamp.toString()
      };
    },
    fromAmino: ({
      sourcePort,
      sourceChannel,
      creator,
      counterPartyCreator,
      liquidity,
      swapFee,
      counterPartySig,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgCreatePoolRequestAminoType["value"]): MsgCreatePoolRequest => {
      return {
        sourcePort,
        sourceChannel,
        creator,
        counterPartyCreator,
        liquidity: liquidity.map(el0 => ({
          side: poolAssetSideFromJSON(el0.side),
          balance: {
            denom: el0.balance.denom,
            amount: el0.balance.amount
          },
          weight: el0.weight,
          decimal: el0.decimal
        })),
        swapFee,
        counterPartySig,
        timeoutHeight: timeoutHeight ? {
          revisionHeight: Long.fromString(timeoutHeight.revision_height || "0", true),
          revisionNumber: Long.fromString(timeoutHeight.revision_number || "0", true)
        } : undefined,
        timeoutTimeStamp: Long.fromString(timeoutTimeStamp)
      };
    }
  },
  "/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest": {
    aminoType: "cosmos-sdk/MsgSingleAssetDepositRequest",
    toAmino: ({
      poolId,
      sender,
      token,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgSingleAssetDepositRequest): MsgSingleAssetDepositRequestAminoType["value"] => {
      return {
        poolId,
        sender,
        token: {
          denom: token.denom,
          amount: Long.fromValue(token.amount).toString()
        },
        timeoutHeight: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeoutTimeStamp: timeoutTimeStamp.toString()
      };
    },
    fromAmino: ({
      poolId,
      sender,
      token,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgSingleAssetDepositRequestAminoType["value"]): MsgSingleAssetDepositRequest => {
      return {
        poolId,
        sender,
        token: {
          denom: token.denom,
          amount: token.amount
        },
        timeoutHeight: timeoutHeight ? {
          revisionHeight: Long.fromString(timeoutHeight.revision_height || "0", true),
          revisionNumber: Long.fromString(timeoutHeight.revision_number || "0", true)
        } : undefined,
        timeoutTimeStamp: Long.fromString(timeoutTimeStamp)
      };
    }
  },
  "/ibc.applications.interchain_swap.v1.MsgMultiAssetDepositRequest": {
    aminoType: "cosmos-sdk/MsgMultiAssetDepositRequest",
    toAmino: ({
      poolId,
      deposits,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgMultiAssetDepositRequest): MsgMultiAssetDepositRequestAminoType["value"] => {
      return {
        poolId,
        deposits: deposits.map(el0 => ({
          sender: el0.sender,
          balance: {
            denom: el0.balance.denom,
            amount: Long.fromValue(el0.balance.amount).toString()
          },
          signature: el0.signature
        })),
        timeoutHeight: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeoutTimeStamp: timeoutTimeStamp.toString()
      };
    },
    fromAmino: ({
      poolId,
      deposits,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgMultiAssetDepositRequestAminoType["value"]): MsgMultiAssetDepositRequest => {
      return {
        poolId,
        deposits: deposits.map(el0 => ({
          sender: el0.sender,
          balance: {
            denom: el0.balance.denom,
            amount: el0.balance.amount
          },
          signature: el0.signature
        })),
        timeoutHeight: timeoutHeight ? {
          revisionHeight: Long.fromString(timeoutHeight.revision_height || "0", true),
          revisionNumber: Long.fromString(timeoutHeight.revision_number || "0", true)
        } : undefined,
        timeoutTimeStamp: Long.fromString(timeoutTimeStamp)
      };
    }
  },
  "/ibc.applications.interchain_swap.v1.MsgSingleAssetWithdrawRequest": {
    aminoType: "cosmos-sdk/MsgSingleAssetWithdrawRequest",
    toAmino: ({
      sender,
      poolCoin,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgSingleAssetWithdrawRequest): MsgSingleAssetWithdrawRequestAminoType["value"] => {
      return {
        sender,
        poolCoin: {
          denom: poolCoin.denom,
          amount: Long.fromValue(poolCoin.amount).toString()
        },
        timeoutHeight: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeoutTimeStamp: timeoutTimeStamp.toString()
      };
    },
    fromAmino: ({
      sender,
      poolCoin,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgSingleAssetWithdrawRequestAminoType["value"]): MsgSingleAssetWithdrawRequest => {
      return {
        sender,
        poolCoin: {
          denom: poolCoin.denom,
          amount: poolCoin.amount
        },
        timeoutHeight: timeoutHeight ? {
          revisionHeight: Long.fromString(timeoutHeight.revision_height || "0", true),
          revisionNumber: Long.fromString(timeoutHeight.revision_number || "0", true)
        } : undefined,
        timeoutTimeStamp: Long.fromString(timeoutTimeStamp)
      };
    }
  },
  "/ibc.applications.interchain_swap.v1.MsgMultiAssetWithdrawRequest": {
    aminoType: "cosmos-sdk/MsgMultiAssetWithdrawRequest",
    toAmino: ({
      poolId,
      sender,
      withdraws,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgMultiAssetWithdrawRequest): MsgMultiAssetWithdrawRequestAminoType["value"] => {
      return {
        poolId,
        sender,
        withdraws: withdraws.map(el0 => ({
          receiver: el0.receiver,
          balance: {
            denom: el0.balance.denom,
            amount: Long.fromValue(el0.balance.amount).toString()
          }
        })),
        timeoutHeight: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeoutTimeStamp: timeoutTimeStamp.toString()
      };
    },
    fromAmino: ({
      poolId,
      sender,
      withdraws,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgMultiAssetWithdrawRequestAminoType["value"]): MsgMultiAssetWithdrawRequest => {
      return {
        poolId,
        sender,
        withdraws: withdraws.map(el0 => ({
          receiver: el0.receiver,
          balance: {
            denom: el0.balance.denom,
            amount: el0.balance.amount
          }
        })),
        timeoutHeight: timeoutHeight ? {
          revisionHeight: Long.fromString(timeoutHeight.revision_height || "0", true),
          revisionNumber: Long.fromString(timeoutHeight.revision_number || "0", true)
        } : undefined,
        timeoutTimeStamp: Long.fromString(timeoutTimeStamp)
      };
    }
  },
  "/ibc.applications.interchain_swap.v1.MsgSwapRequest": {
    aminoType: "cosmos-sdk/MsgSwapRequest",
    toAmino: ({
      swapType,
      sender,
      tokenIn,
      tokenOut,
      slippage,
      recipient,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgSwapRequest): MsgSwapRequestAminoType["value"] => {
      return {
        swap_type: swapType,
        sender,
        tokenIn: {
          denom: tokenIn.denom,
          amount: Long.fromValue(tokenIn.amount).toString()
        },
        tokenOut: {
          denom: tokenOut.denom,
          amount: Long.fromValue(tokenOut.amount).toString()
        },
        slippage: slippage.toString(),
        recipient,
        timeoutHeight: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeoutTimeStamp: timeoutTimeStamp.toString()
      };
    },
    fromAmino: ({
      swap_type,
      sender,
      tokenIn,
      tokenOut,
      slippage,
      recipient,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgSwapRequestAminoType["value"]): MsgSwapRequest => {
      return {
        swapType: swapMsgTypeFromJSON(swap_type),
        sender,
        tokenIn: {
          denom: tokenIn.denom,
          amount: tokenIn.amount
        },
        tokenOut: {
          denom: tokenOut.denom,
          amount: tokenOut.amount
        },
        slippage: Long.fromString(slippage),
        recipient,
        timeoutHeight: timeoutHeight ? {
          revisionHeight: Long.fromString(timeoutHeight.revision_height || "0", true),
          revisionNumber: Long.fromString(timeoutHeight.revision_number || "0", true)
        } : undefined,
        timeoutTimeStamp: Long.fromString(timeoutTimeStamp)
      };
    }
  }
};