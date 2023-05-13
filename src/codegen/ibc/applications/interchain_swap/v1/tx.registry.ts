import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreatePoolRequest, MsgSingleAssetDepositRequest, MsgMultiAssetDepositRequest, MsgSingleAssetWithdrawRequest, MsgMultiAssetWithdrawRequest, MsgSwapRequest } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest", MsgCreatePoolRequest], ["/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest", MsgSingleAssetDepositRequest], ["/ibc.applications.interchain_swap.v1.MsgMultiAssetDepositRequest", MsgMultiAssetDepositRequest], ["/ibc.applications.interchain_swap.v1.MsgSingleAssetWithdrawRequest", MsgSingleAssetWithdrawRequest], ["/ibc.applications.interchain_swap.v1.MsgMultiAssetWithdrawRequest", MsgMultiAssetWithdrawRequest], ["/ibc.applications.interchain_swap.v1.MsgSwapRequest", MsgSwapRequest]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createPool(value: MsgCreatePoolRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest",
        value: MsgCreatePoolRequest.encode(value).finish()
      };
    },
    singleAssetDeposit(value: MsgSingleAssetDepositRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest",
        value: MsgSingleAssetDepositRequest.encode(value).finish()
      };
    },
    multiAssetDeposit(value: MsgMultiAssetDepositRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgMultiAssetDepositRequest",
        value: MsgMultiAssetDepositRequest.encode(value).finish()
      };
    },
    singleAssetWithdraw(value: MsgSingleAssetWithdrawRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSingleAssetWithdrawRequest",
        value: MsgSingleAssetWithdrawRequest.encode(value).finish()
      };
    },
    multiAssetWithdraw(value: MsgMultiAssetWithdrawRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgMultiAssetWithdrawRequest",
        value: MsgMultiAssetWithdrawRequest.encode(value).finish()
      };
    },
    swap(value: MsgSwapRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSwapRequest",
        value: MsgSwapRequest.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createPool(value: MsgCreatePoolRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest",
        value
      };
    },
    singleAssetDeposit(value: MsgSingleAssetDepositRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest",
        value
      };
    },
    multiAssetDeposit(value: MsgMultiAssetDepositRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgMultiAssetDepositRequest",
        value
      };
    },
    singleAssetWithdraw(value: MsgSingleAssetWithdrawRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSingleAssetWithdrawRequest",
        value
      };
    },
    multiAssetWithdraw(value: MsgMultiAssetWithdrawRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgMultiAssetWithdrawRequest",
        value
      };
    },
    swap(value: MsgSwapRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSwapRequest",
        value
      };
    }
  },
  fromPartial: {
    createPool(value: MsgCreatePoolRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgCreatePoolRequest",
        value: MsgCreatePoolRequest.fromPartial(value)
      };
    },
    singleAssetDeposit(value: MsgSingleAssetDepositRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSingleAssetDepositRequest",
        value: MsgSingleAssetDepositRequest.fromPartial(value)
      };
    },
    multiAssetDeposit(value: MsgMultiAssetDepositRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgMultiAssetDepositRequest",
        value: MsgMultiAssetDepositRequest.fromPartial(value)
      };
    },
    singleAssetWithdraw(value: MsgSingleAssetWithdrawRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSingleAssetWithdrawRequest",
        value: MsgSingleAssetWithdrawRequest.fromPartial(value)
      };
    },
    multiAssetWithdraw(value: MsgMultiAssetWithdrawRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgMultiAssetWithdrawRequest",
        value: MsgMultiAssetWithdrawRequest.fromPartial(value)
      };
    },
    swap(value: MsgSwapRequest) {
      return {
        typeUrl: "/ibc.applications.interchain_swap.v1.MsgSwapRequest",
        value: MsgSwapRequest.fromPartial(value)
      };
    }
  }
};