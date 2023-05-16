<script setup>
import { ChainConfig } from '~/config/ChainConfig';
import { useChains } from '~/stores/chain';

const chainStore = useChains()

const config = ref("")

function init() {
    const chain = chainStore.current
    config.value = JSON.stringify({
        "chainId": chain.chainID,
        "chainName": chain.name,
        "rpc": chain.rpcUrl,
        "rest": chain.restUrl,
        "bip44": {
            "coinType": 60
        },
        "coinType": 60,
        "bech32Config": {
            "bech32PrefixAccAddr": chain.prefix,
            "bech32PrefixAccPub": `${chain.prefix}pub`,
            "bech32PrefixValAddr": `${chain.prefix}valoper`,
            "bech32PrefixValPub": `${chain.prefix}valoperpub`,
            "bech32PrefixConsAddr": `${chain.prefix}valcons`,
            "bech32PrefixConsPub": `${chain.prefix}valconspub`
        },
        "currencies": [
            {
                "coinDenom": chain.denom,
                "coinMinimalDenom": chain.denom,
                "coinDecimals": 18,
                "coinGeckoId": "cosmos"
            }
        ],
        "feeCurrencies": [
            {
                "coinDenom": chain.denom,
                "coinMinimalDenom": chain.denom,
                "coinDecimals": 18,
                "coinGeckoId": "cosmos",
                "gasPriceStep": {
                    "low": 0.01,
                    "average": 0.025,
                    "high": 0.03
                }
            }
        ],
        "gasPriceStep": {
            "low": 0.01,
            "average": 0.025,
            "high": 0.03
        },
        "stakeCurrency": {
            "coinDenom": chain.denom,
            "coinMinimalDenom": chain.denom,
            "coinDecimals": 18,
            "coinGeckoId": "cosmos"
        },
        "features": [
            "ibc-transfer",
            "ibc-go",
            "eth-address-gen",
            "eth-key-sign"
        ]
    }, null, '\t')
}

function suggest() {
    if (window.keplr) {
        console.log('install chain', config.value)
        window.keplr.experimentalSuggestChain(JSON.parse(config.value)).catch(e => {
            console.error(e)
        })
    }
}
</script>
<template>
    <div>
        <!-- The button to open modal -->
        <label for="enable-keplr" class="btn">Enable Keplr</label>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="enable-keplr" class="modal-toggle" @change="init" />
        <div class="modal">
            <div class="modal-box relative w-11/12 max-w-5xl">
                <label for="enable-keplr" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-lg font-bold">Add Chain To Keplr Extenstion</h3>

                <textarea v-model="config" class="textarea w-full h-80">
                </textarea>
                <div class="modal-action">
                    <label class="btn btn-sm" @click="suggest">Enable</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EnableKeplr'
}
</script>