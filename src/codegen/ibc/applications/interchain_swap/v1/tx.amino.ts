import { AminoMsg } from "@cosmjs/amino";
import { AminoHeight, omitDefault, Long } from "../../../../helpers";
import { MsgSingleAssetWithdrawRequest, swapMsgTypeFromJSON, MsgCreatePoolRequest, MsgSingleAssetDepositRequest, MsgMultiAssetDepositRequest, MsgMultiAssetWithdrawRequest, MsgSwapRequest } from "./tx";
export interface MsgCreatePoolRequestAminoType extends AminoMsg {
  type: "cosmos-sdk/MsgCreatePoolRequest";
  value: {
    sourcePort: string;
    sourceChannel: string;
    sender: string;
    tokens: {
      denom: string;
      amount: string;
    }[];
    decimals: number[];
    weight: string;
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
    localDeposit: {
      sender: string;
      token: {
        denom: string;
        amount: string;
      };
    };
    remoteDeposit: {
      sender: string;
      token: {
        denom: string;
        amount: string;
      };
      sequence: string;
      signature: Uint8Array;
    };
    timeoutHeight: AminoHeight;
    timeoutTimeStamp: string;
  };
}
export interface MsgSingleAssetWithdrawRequestAminoType extends AminoMsg {
  type: "cosmos-sdk/MsgSingleAssetWithdrawRequest";
  value: {
    sender: string;
    denomOut: string;
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
    localWithdraw: {
      sender: string;
      denomOut: string;
      poolCoin: {
        denom: string;
        amount: string;
      };
      timeoutHeight: AminoHeight;
      timeoutTimeStamp: string;
    };
    remoteWithdraw: {
      sender: string;
      denomOut: string;
      poolCoin: {
        denom: string;
        amount: string;
      };
      timeoutHeight: AminoHeight;
      timeoutTimeStamp: string;
    };
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
      sender,
      tokens,
      decimals,
      weight,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgCreatePoolRequest): MsgCreatePoolRequestAminoType["value"] => {
      return {
        sourcePort,
        sourceChannel,
        sender,
        tokens: tokens.map(el0 => ({
          denom: el0.denom,
          amount: el0.amount
        })),
        decimals,
        weight,
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
      sender,
      tokens,
      decimals,
      weight,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgCreatePoolRequestAminoType["value"]): MsgCreatePoolRequest => {
      return {
        sourcePort,
        sourceChannel,
        sender,
        tokens: tokens.map(el0 => ({
          denom: el0.denom,
          amount: el0.amount
        })),
        decimals,
        weight,
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
          denom: token!.denom,
          amount: Long.fromValue(token!.amount).toString()
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
      localDeposit,
      remoteDeposit,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgMultiAssetDepositRequest): MsgMultiAssetDepositRequestAminoType["value"] => {
      return {
        poolId,
        localDeposit: {
          sender: localDeposit!.sender,
          token: {
            denom: localDeposit!.token!.denom,
            amount: Long.fromValue(localDeposit!.token!.amount).toString()
          }
        },
        remoteDeposit: {
          sender: remoteDeposit!.sender,
          token: {
            denom: remoteDeposit!.token!.denom,
            amount: Long.fromValue(remoteDeposit!.token!.amount).toString()
          },
          sequence: remoteDeposit!.sequence.toString(),
          signature: remoteDeposit!.signature
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
      localDeposit,
      remoteDeposit,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgMultiAssetDepositRequestAminoType["value"]): MsgMultiAssetDepositRequest => {
      return {
        poolId,
        localDeposit: {
          sender: localDeposit.sender,
          token: {
            denom: localDeposit.token.denom,
            amount: localDeposit.token.amount
          }
        },
        remoteDeposit: {
          sender: remoteDeposit.sender,
          token: {
            denom: remoteDeposit.token.denom,
            amount: remoteDeposit.token.amount
          },
          sequence: Long.fromString(remoteDeposit.sequence),
          signature: remoteDeposit.signature
        },
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
      denomOut,
      poolCoin,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgSingleAssetWithdrawRequest): MsgSingleAssetWithdrawRequestAminoType["value"] => {
      return {
        sender,
        denomOut,
        poolCoin: {
          denom: poolCoin!.denom,
          amount: Long.fromValue(poolCoin!.amount).toString()
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
      denomOut,
      poolCoin,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgSingleAssetWithdrawRequestAminoType["value"]): MsgSingleAssetWithdrawRequest => {
      return {
        sender,
        denomOut,
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
      localWithdraw,
      remoteWithdraw,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgMultiAssetWithdrawRequest): MsgMultiAssetWithdrawRequestAminoType["value"] => {
      return {
        localWithdraw: {
          sender: localWithdraw!.sender,
          denomOut: localWithdraw!.denomOut,
          poolCoin: {
            denom: localWithdraw!.poolCoin!.denom,
            amount: Long.fromValue(localWithdraw!.poolCoin!.amount).toString()
          },
          timeoutHeight: localWithdraw!.timeoutHeight ? {
            revision_height: omitDefault(localWithdraw!.timeoutHeight.revisionHeight)?.toString(),
            revision_number: omitDefault(localWithdraw!.timeoutHeight.revisionNumber)?.toString()
          } : {},
          timeoutTimeStamp: localWithdraw!.timeoutTimeStamp.toString()
        },
        remoteWithdraw: {
          sender: remoteWithdraw!.sender,
          denomOut: remoteWithdraw!.denomOut,
          poolCoin: {
            denom: remoteWithdraw!.poolCoin!.denom,
            amount: Long.fromValue(remoteWithdraw!.poolCoin!.amount).toString()
          },
          timeoutHeight: remoteWithdraw!.timeoutHeight ? {
            revision_height: omitDefault(remoteWithdraw!.timeoutHeight.revisionHeight)?.toString(),
            revision_number: omitDefault(remoteWithdraw!.timeoutHeight.revisionNumber)?.toString()
          } : {},
          timeoutTimeStamp: remoteWithdraw!.timeoutTimeStamp.toString()
        },
        timeoutHeight: timeoutHeight ? {
          revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
          revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString()
        } : {},
        timeoutTimeStamp: timeoutTimeStamp.toString()
      };
    },
    fromAmino: ({
      localWithdraw,
      remoteWithdraw,
      timeoutHeight,
      timeoutTimeStamp
    }: MsgMultiAssetWithdrawRequestAminoType["value"]): MsgMultiAssetWithdrawRequest => {
      return {
        localWithdraw: {
          sender: localWithdraw.sender,
          denomOut: localWithdraw.denomOut,
          poolCoin: {
            denom: localWithdraw.poolCoin.denom,
            amount: localWithdraw.poolCoin.amount
          },
          timeoutHeight: localWithdraw.timeoutHeight ? {
            revisionHeight: Long.fromString(localWithdraw.timeoutHeight.revision_height || "0", true),
            revisionNumber: Long.fromString(localWithdraw.timeoutHeight.revision_number || "0", true)
          } : undefined,
          timeoutTimeStamp: Long.fromString(localWithdraw.timeoutTimeStamp)
        },
        remoteWithdraw: {
          sender: remoteWithdraw.sender,
          denomOut: remoteWithdraw.denomOut,
          poolCoin: {
            denom: remoteWithdraw.poolCoin.denom,
            amount: remoteWithdraw.poolCoin.amount
          },
          timeoutHeight: remoteWithdraw.timeoutHeight ? {
            revisionHeight: Long.fromString(remoteWithdraw.timeoutHeight.revision_height || "0", true),
            revisionNumber: Long.fromString(remoteWithdraw.timeoutHeight.revision_number || "0", true)
          } : undefined,
          timeoutTimeStamp: Long.fromString(remoteWithdraw.timeoutTimeStamp)
        },
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
          denom: tokenIn!.denom,
          amount: Long.fromValue(tokenIn!.amount).toString()
        },
        tokenOut: {
          denom: tokenOut!.denom,
          amount: Long.fromValue(tokenOut!.amount).toString()
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