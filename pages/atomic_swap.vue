<script lang="ts" setup>
import { connected } from 'process';
import { ChainConfig } from '@/config/ChainConfig'
const view = ref("list")
const tab = ref("buy")

const remoteWallet = ref({address: ''})
const special = ref(false)

function connect() {
    remoteWallet.value = {
        address: "side1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr"
    }
}

console.log(ChainConfig)

const localChains = computed(() => {
    return ChainConfig.chains.map(x => x.name )
})

</script>
<template>
    <div class="container max-w-3xl m-auto">

        <div class="flex justify-center my-4">
            <div class="card w-full bg-base-100 shadow-xl">
                <div class="p-4">
                    <h2 class="card-title">
                        Publish A Swap Offer
                    </h2>
                    <div class="flex items-center relative h-14 bg-gray-100 dark:bg-[#232333] rounded-tl-lg rounded-tr-lg mt-4 text-white">
                        <div class="flex">
                            
                            <div class="dropdown ml-2">
                                <label tabindex="0" class="btn btn-sm btn-ghost m-1">
                            <img src="https://ping.pub/logos/cosmos.svg" class="w-8 h-8 mr-3 rounded-full" />CosmosHub</label>
                                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Evmos</a></li>
                                    <li><a>Osmosis</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                            <label tabindex="0" class="flex items-center h-12 px-4 cursor-pointer">
                                <div class="text-lg font-semibold mr-2">
                                    ATOM
                                </div>
                                <Icon icon="mdi:chevron-down" class="text-lg" />
                            </label>
                            <div tabindex="0" class="dropdown-content shadow bg-base-100 rounded-lg w-64 mt-0">
                                <div class="py-2">
                                    <div
                                        class="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#232333] cursor-pointer">
                                        <img class="w-7 h-7 rounded-full mr-2" src="https://ping.pub/logos/cosmos.svg" />
                                        <div class="flex-1 text-sm">
                                            atom
                                        </div>
                                        <div class="text-sm font-semibold text-gray-200">
                                            100
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        </div>
                        <input type="number" placeholder="1"
                            class="input bg-transparent h-14 text-right text-lg font-bold" />
                    </div>

                    <div
                        class="flex justify-between align-middle py-2 px-4 bg-gray-200 dark:bg-[#171721] rounded-bl-lg rounded-br-lg text-white mt-0">
                        <div class="text-xs mt-0">
                            cosmos1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr
                        </div>
                        <div class="flex">
                            <div class="mr-3 text-sm">Balance:</div>
                            <div class="text-base font-semibold">
                                3424
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between mt-4">
                        <div>
                            <h2 class="card-title">
                                In Exchange For
                            </h2>
                            <div class="text-xs mt-0">
                                {{ remoteWallet.address }}
                            </div>
                        </div>
                        <div>
                            <label class="input-group">
                                <span>$</span>
                                <input type="text" placeholder="Price in USD" class="input input-bordered" />
                            </label>
                        </div>
                    </div>
                    
                    <div class="flex items-center relative h-14 bg-gray-100 dark:bg-[#232333] rounded-tl-lg rounded-tr-lg mt-4 text-white">
                        <div class="flex">
                            
                            <div class="dropdown ml-2">
                                <label tabindex="0" class="btn btn-sm btn-ghost m-1">
                            <img src="https://ping.pub/logos/chihuahua.png" class="w-8 h-8 mr-3 rounded-full" />CHIHUAHUA</label>
                                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Evmos</a></li>
                                    <li><a>Osmosis</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                            <label tabindex="0" class="flex items-center h-12 px-4 cursor-pointer">
                                <div class="text-lg font-semibold mr-2">
                                    HUAHUA
                                </div>
                                <Icon icon="mdi:chevron-down" class="text-lg" />
                            </label>
                            <div tabindex="0" class="dropdown-content shadow bg-base-100 rounded-lg w-64 mt-0">
                                <div class="py-2">
                                    <div
                                        class="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#232333] cursor-pointer">
                                        <img class="w-7 h-7 rounded-full mr-2" src="https://ping.pub/logos/cosmos.svg" />
                                        <div class="flex-1 text-sm">
                                            atom
                                        </div>
                                        <div class="text-sm font-semibold text-gray-200">
                                            100
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        </div>
                        <input type="number" placeholder="1"
                            class="input bg-transparent h-14 text-right text-lg font-bold" />
                    </div>

                    <div
                        class="flex justify-between align-middle py-2 px-4 bg-gray-200 dark:bg-[#171721] rounded-bl-lg rounded-br-lg text-white mt-0">
                        <div class="text-xs mt-0">
                            chihuahua1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr
                        </div>
                        <div class="flex">
                            <div class="mr-3 text-sm">Balance:</div>
                            <div class="text-base font-semibold">
                                3424
                            </div>
                        </div>
                    </div>


                    <div class="card-actions justify-end mt-4">
                        <button class="btn btn-primary">Submit & Publish Offer</button>
                    </div>
                </div>
            </div>           

        </div>
        <div class=" text-center align-middle">
            <div class="tabs tabs-boxed">
                <label class="tab" :class="tab === 'buy' ? 'tab-active' : ''" @click="tab = 'buy'">Wish To Buy</label>
                <label class="tab" :class="tab === 'sell' ? 'tab-active' : ''" @click="tab = 'sell'">Wish To Sell</label>
                <label class="tab" :class="tab === 'my' ? 'tab-active' : ''" @click="tab = 'my'">My Orders</label>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <td>{{ tab }} Token</td>
                        <td>In exchagne for</td>
                        <td>Sepecial Offer</td>
                        <td>Price In USD</td>
                        <td>Expiry</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>300Atom</td>
                        <td>100USDC</td>
                        <td></td>
                        <td>$4.00</td>
                        <td>
                            <div class="flex gap-5">
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:15;"></span>
                                    </span>
                                    days
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:10;"></span>
                                    </span>
                                    hours
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:24;"></span>
                                    </span>
                                    min
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:50;"></span>
                                    </span>
                                    sec
                                </div>
                            </div>
                        </td>
                        <td>
                            <label v-if="tab === 'buy'" class="btn btn-sm">take</label>
                            <div v-if="tab==='sell'">
                                <ul class="steps">
                                    <li data-content="✓" class="step step-success"></li>
                                    <li data-content="✓" class="step step-success"></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>300Atom</td>
                        <td>100Eth</td>
                        <td><span class="tooltip" data-tip="Special Offer for cosmos1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr"><a class="btn btn-sm btn-error">Sepecial offer</a></span></td>
                        <td>$3.98</td>
                        <td>
                            <div class="flex gap-5">
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:15;"></span>
                                    </span>
                                    days
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:10;"></span>
                                    </span>
                                    hours
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:24;"></span>
                                    </span>
                                    min
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:50;"></span>
                                    </span>
                                    sec
                                </div>
                            </div>
                        </td>
                        <td>
                            <label v-if="tab === 'buy'" class="btn btn-sm">take</label>
                            <div v-if="tab==='sell'">
                                <ul class="steps">
                                    <li data-content="✓" class="step step-success"></li>
                                    <li data-content="✕" class="step step-error"></li>
                                </ul>
                            </div>
                        </td>
                    </tr><tr>
                        <td>300Atom</td>
                        <td>100USDC</td>
                        <td></td>
                        <td>$4.00</td>
                        <td>
                            <div class="flex gap-5">
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:15;"></span>
                                    </span>
                                    days
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:10;"></span>
                                    </span>
                                    hours
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:24;"></span>
                                    </span>
                                    min
                                </div>
                                <div>
                                    <span class="countdown font-mono">
                                        <span style="--value:50;"></span>
                                    </span>
                                    sec
                                </div>
                            </div>
                        </td>
                        <td>
                            <label v-if="tab === 'buy'" class="btn btn-sm">take</label>
                            <div v-if="tab==='sell'">
                                <ul class="steps">
                                    <li data-content="✓" class="step step-success"></li>
                                    <li data-content="✕" class="step step-error"></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-group mt-5">
                <button class="btn">1</button>
                <button class="btn">2</button>
                <button class="btn btn-disabled">...</button>
                <button class="btn">99</button>
                <button class="btn">100</button>
            </div>
        </div>
    </div>
</template>