import { AminoMsg } from "@cosmjs/amino";
import { Long } from "../../../helpers";
import { MsgEthereumTx, MsgUpdateParams } from "./tx";
export interface MsgEthereumTxAminoType extends AminoMsg {
  type: "/ethermint.evm.v1.MsgEthereumTx";
  value: {
    data: {
      type_url: string;
      value: Uint8Array;
    };
    size: number;
    hash: string;
    from: string;
  };
}
export interface MsgUpdateParamsAminoType extends AminoMsg {
  type: "/ethermint.evm.v1.MsgUpdateParams";
  value: {
    authority: string;
    params: {
      evm_denom: string;
      enable_create: boolean;
      enable_call: boolean;
      extra_eips: string[];
      chain_config: {
        homestead_block: string;
        dao_fork_block: string;
        dao_fork_support: boolean;
        eip150_block: string;
        eip150_hash: string;
        eip155_block: string;
        eip158_block: string;
        byzantium_block: string;
        constantinople_block: string;
        petersburg_block: string;
        istanbul_block: string;
        muir_glacier_block: string;
        berlin_block: string;
        london_block: string;
        arrow_glacier_block: string;
        gray_glacier_block: string;
        merge_netsplit_block: string;
        shanghai_block: string;
        cancun_block: string;
      };
      allow_unprotected_txs: boolean;
    };
  };
}
export const AminoConverter = {
  "/ethermint.evm.v1.MsgEthereumTx": {
    aminoType: "/ethermint.evm.v1.MsgEthereumTx",
    toAmino: ({
      data,
      size,
      hash,
      from
    }: MsgEthereumTx): MsgEthereumTxAminoType["value"] => {
      return {
        data: {
          type_url: data.typeUrl,
          value: data.value
        },
        size,
        hash,
        from
      };
    },
    fromAmino: ({
      data,
      size,
      hash,
      from
    }: MsgEthereumTxAminoType["value"]): MsgEthereumTx => {
      return {
        data: {
          typeUrl: data.type_url,
          value: data.value
        },
        size,
        hash,
        from
      };
    }
  },
  "/ethermint.evm.v1.MsgUpdateParams": {
    aminoType: "/ethermint.evm.v1.MsgUpdateParams",
    toAmino: ({
      authority,
      params
    }: MsgUpdateParams): MsgUpdateParamsAminoType["value"] => {
      return {
        authority,
        params: {
          evm_denom: params.evmDenom,
          enable_create: params.enableCreate,
          enable_call: params.enableCall,
          extra_eips: params.extraEips.map(el0 => el0.toString()),
          chain_config: {
            homestead_block: params.chainConfig.homesteadBlock,
            dao_fork_block: params.chainConfig.daoForkBlock,
            dao_fork_support: params.chainConfig.daoForkSupport,
            eip150_block: params.chainConfig.eip150Block,
            eip150_hash: params.chainConfig.eip150Hash,
            eip155_block: params.chainConfig.eip155Block,
            eip158_block: params.chainConfig.eip158Block,
            byzantium_block: params.chainConfig.byzantiumBlock,
            constantinople_block: params.chainConfig.constantinopleBlock,
            petersburg_block: params.chainConfig.petersburgBlock,
            istanbul_block: params.chainConfig.istanbulBlock,
            muir_glacier_block: params.chainConfig.muirGlacierBlock,
            berlin_block: params.chainConfig.berlinBlock,
            london_block: params.chainConfig.londonBlock,
            arrow_glacier_block: params.chainConfig.arrowGlacierBlock,
            gray_glacier_block: params.chainConfig.grayGlacierBlock,
            merge_netsplit_block: params.chainConfig.mergeNetsplitBlock,
            shanghai_block: params.chainConfig.shanghaiBlock,
            cancun_block: params.chainConfig.cancunBlock
          },
          allow_unprotected_txs: params.allowUnprotectedTxs
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
          evmDenom: params.evm_denom,
          enableCreate: params.enable_create,
          enableCall: params.enable_call,
          extraEips: params.extra_eips.map(el1 => Long.fromString(el1)),
          chainConfig: {
            homesteadBlock: params.chain_config.homestead_block,
            daoForkBlock: params.chain_config.dao_fork_block,
            daoForkSupport: params.chain_config.dao_fork_support,
            eip150Block: params.chain_config.eip150_block,
            eip150Hash: params.chain_config.eip150_hash,
            eip155Block: params.chain_config.eip155_block,
            eip158Block: params.chain_config.eip158_block,
            byzantiumBlock: params.chain_config.byzantium_block,
            constantinopleBlock: params.chain_config.constantinople_block,
            petersburgBlock: params.chain_config.petersburg_block,
            istanbulBlock: params.chain_config.istanbul_block,
            muirGlacierBlock: params.chain_config.muir_glacier_block,
            berlinBlock: params.chain_config.berlin_block,
            londonBlock: params.chain_config.london_block,
            arrowGlacierBlock: params.chain_config.arrow_glacier_block,
            grayGlacierBlock: params.chain_config.gray_glacier_block,
            mergeNetsplitBlock: params.chain_config.merge_netsplit_block,
            shanghaiBlock: params.chain_config.shanghai_block,
            cancunBlock: params.chain_config.cancun_block
          },
          allowUnprotectedTxs: params.allow_unprotected_txs
        }
      };
    }
  }
};