import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MakeSwapMsg, TakeSwapMsg, CancelSwapMsg } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/ibc.applications.atomic_swap.v1.MakeSwapMsg", MakeSwapMsg], ["/ibc.applications.atomic_swap.v1.TakeSwapMsg", TakeSwapMsg], ["/ibc.applications.atomic_swap.v1.CancelSwapMsg", CancelSwapMsg]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    makeSwap(value: MakeSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.MakeSwapMsg",
        value: MakeSwapMsg.encode(value).finish()
      };
    },
    takeSwap(value: TakeSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.TakeSwapMsg",
        value: TakeSwapMsg.encode(value).finish()
      };
    },
    cancelSwap(value: CancelSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.CancelSwapMsg",
        value: CancelSwapMsg.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    makeSwap(value: MakeSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.MakeSwapMsg",
        value
      };
    },
    takeSwap(value: TakeSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.TakeSwapMsg",
        value
      };
    },
    cancelSwap(value: CancelSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.CancelSwapMsg",
        value
      };
    }
  },
  fromPartial: {
    makeSwap(value: MakeSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.MakeSwapMsg",
        value: MakeSwapMsg.fromPartial(value)
      };
    },
    takeSwap(value: TakeSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.TakeSwapMsg",
        value: TakeSwapMsg.fromPartial(value)
      };
    },
    cancelSwap(value: CancelSwapMsg) {
      return {
        typeUrl: "/ibc.applications.atomic_swap.v1.CancelSwapMsg",
        value: CancelSwapMsg.fromPartial(value)
      };
    }
  }
};