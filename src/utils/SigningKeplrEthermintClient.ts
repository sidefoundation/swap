import fetchAccount from '@/http/requests/get/fetchAccount'
import { BriefChainInfo } from '@/shared/types/chain'
import { fromBase64 } from '@cosmjs/encoding'
import { Int53 } from '@cosmjs/math'
import {
  EncodeObject, makeAuthInfoBytes, makeSignDoc, OfflineSigner,
} from '@cosmjs/proto-signing'
import {
   SigningStargateClient, StdFee,
} from '@cosmjs/stargate'
import { OfflineDirectSigner, StdSignature } from '@keplr-wallet/types'
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { Any } from 'cosmjs-types/google/protobuf/any'
export default class SigningKeplerEthermintClient {
  private client:SigningStargateClient
  private offlineSigner: OfflineDirectSigner

  constructor(client:SigningStargateClient, offlineSigner:OfflineDirectSigner) {
    this.client = client
    this.offlineSigner = offlineSigner
    
  }
  async signWithEthermint(signerAddress: string,messages: readonly EncodeObject[],chain:BriefChainInfo, fee: StdFee, memo: string): Promise<Uint8Array|undefined> {
    try {
      const account = await this.offlineSigner.getAccounts()
    const acc = account.find(x => x.address === signerAddress)
    if (!acc) {
      throw new Error('The signer address dose not exsits in Ledger!')
    }

     // Get the account information to get the sequence
    const accountInfo = await fetchAccount(chain.restUrl,signerAddress);
    console.log('Account Info')
    if (!accountInfo) {
      throw new Error('Failed to fetch account information')
    }
    
    // Custom typeUrl for EVMOS
    const pubk = Any.fromPartial({
      typeUrl: '/ethermint.crypto.v1.ethsecp256k1.PubKey',
      value: PubKey.encode({
        key: acc.pubkey,
      }).finish(),
    })
  
    const txBodyEncodeObject = {
      typeUrl: '/cosmos.tx.v1beta1.TxBody',
      value: {
        messages,
        memo,
      },
    }

    const txBodyBytes = this.client.registry.encode(txBodyEncodeObject)
    const gasLimit = Int53.fromString(fee.gas).toNumber()
    const authInfoBytes = makeAuthInfoBytes([{ pubkey: pubk, sequence: +accountInfo.base_account.sequence}], fee.amount, gasLimit)
    const signDoc = makeSignDoc(txBodyBytes, authInfoBytes,chain.chainID, +accountInfo.base_account.account_number)
    const { signature, signed } = await this.offlineSigner.signDirect(signerAddress, signDoc)
    
    // returns txBytes for broadcast
    return Promise.resolve(TxRaw.encode({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    }).finish())
    } catch (error) {
      console.log("error", error)
      return undefined
    }
  }


  async signToMsg(signerAddress: string, messages: Uint8Array, chain:BriefChainInfo): Promise<string|undefined> {
    try {
        const account = await this.offlineSigner.getAccounts()
        const acc = account.find(x => x.address === signerAddress)
      if (!acc) {
        throw new Error('The signer address dose not exsits in Ledger!')
      }
      const { keplr } = window;
      const sign:StdSignature = await keplr.signArbitrary(
        chain.chainID,
        signerAddress,
        messages
      )
      console.log(sign)
    return sign.signature
    } catch (error) {
      console.log("error", error)
      return undefined
    }
  }

  async broadCastTx(tx: Uint8Array): Promise<string> {
    try {
      const txData = await this.client.broadcastTx(tx)
      console.log(txData)
      // returns txBytes for broadcast
      return txData.transactionHash
    } catch (error) {
      console.log(error)
      return ""
    }
  }
}
