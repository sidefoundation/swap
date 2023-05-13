import { AminoMsg } from "@cosmjs/amino";
import { Long } from "../../../helpers";
import { MsgUpdateParams } from "./tx";
export interface MsgUpdateParamsAminoType extends AminoMsg {
  type: "/ethermint.feemarket.v1.MsgUpdateParams";
  value: {
    authority: string;
    params: {
      no_base_fee: boolean;
      base_fee_change_denominator: number;
      elasticity_multiplier: number;
      enable_height: string;
      base_fee: string;
      min_gas_price: string;
      min_gas_multiplier: string;
    };
  };
}
export const AminoConverter = {
  "/ethermint.feemarket.v1.MsgUpdateParams": {
    aminoType: "/ethermint.feemarket.v1.MsgUpdateParams",
    toAmino: ({
      authority,
      params
    }: MsgUpdateParams): MsgUpdateParamsAminoType["value"] => {
      return {
        authority,
        params: {
          no_base_fee: params.noBaseFee,
          base_fee_change_denominator: params.baseFeeChangeDenominator,
          elasticity_multiplier: params.elasticityMultiplier,
          enable_height: params.enableHeight.toString(),
          base_fee: params.baseFee,
          min_gas_price: params.minGasPrice,
          min_gas_multiplier: params.minGasMultiplier
        }
      };
    },
    fromAmino: ({
      authority,
      params
    }: MsgUpdateParamsAminoType["value"]): MsgUpdateParams => {
      return {
        authority,
        params: {
          noBaseFee: params.no_base_fee,
          baseFeeChangeDenominator: params.base_fee_change_denominator,
          elasticityMultiplier: params.elasticity_multiplier,
          enableHeight: Long.fromString(params.enable_height),
          baseFee: params.base_fee,
          minGasPrice: params.min_gas_price,
          minGasMultiplier: params.min_gas_multiplier
        }
      };
    }
  }
};