<script lang="ts" setup>
import { connected } from 'process';
import { ChainConfig } from '@/config/ChainConfig'
import { table } from 'console';
const view = ref("list")
const tab = ref("buy")

const my = ref('sell')

const remoteWallet = ref({ address: '' })
const privates = ref(false)

function connect() {
    remoteWallet.value = {
        address: "side1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr"
    }
}

const localChains = computed(() => {
    return ChainConfig.chains.map(x => x.name)
})

</script>
<template>
    <div class="container m-auto grid grid-cols-3 gap-4">
        <div class="text-center align-middle mt-4 col-span-2">
            <h2>Whole Sale Market</h2>
            <div class="tabs tabs-boxed">
                <label class="tab" :class="tab === 'buy' ? 'tab-active' : ''" @click="tab = 'buy'">Wish To Buy</label>
                <label class="tab" :class="tab === 'sell' ? 'tab-active' : ''" @click="tab = 'sell'">Wish To Sell</label>
            </div>
            <table v-if="tab === 'buy'" class="table">
                <thead>
                    <tr>
                        <td>Buyer</td>
                        <td>Paid</td>
                        <td>Wish to {{ tab }}</td>
                        <td>Market Price</td>
                        <td>Order Price</td>
                        <td>Expiry</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>chihuahua1m...rcalaenr</td>
                        <td>100USDC</td>
                        <td>300Atom </td>
                        <td><div class="tooltip" data-tip="ATOM/USD">
                            $4.10
                        </div></td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <label for="my_modal_6" class="btn">take</label>
                        </td>
                    </tr>
                    <tr class="bg-gray-500">
                        <td>chihuahua1m...rcalaenr</td>
                        <td>100Eth </td>
                        <td>300Atom</td>
                        <td><div class="tooltip" data-tip="ATOM/USD">
                            $4.10
                        </div></td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <label for="my_modal_6" class="btn">take</label>
                        </td>
                    </tr>
                    <tr>
                        <td>chihuahua1m...rcalaenr</td>
                        <td>100USDC</td>
                        <td>
                            300Atom
                        </td>
                        <td><div class="tooltip" data-tip="ATOM/USD">
                            $4.10
                        </div></td>
                        <td>$3.00<div class="text-red-500 text-xs">+20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <label for="my_modal_6" class="btn">take</label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-if="tab === 'sell'" class="table">
                <thead>
                    <tr>
                        <td>Seller</td>
                        <td>Wish to {{ tab }}</td>
                        <td>Wish to receive</td>
                        <td>Market Price</td>
                        <td>Order Price</td>
                        <td>Expiry</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom </td>
                        <td>100USDC</td>
                        <td>$4.00</td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <label for="my_modal_6" class="btn">take</label>
                        </td>
                    </tr>
                    <tr class="bg-gray-500">
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom</td>
                        <td>100Eth </td>
                        <td>$3.98</td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <label for="my_modal_6" class="btn">take</label>
                        </td>
                    </tr>
                    <tr>
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom</td>
                        <td>100USDC</td>
                        <td>$4.00</td>
                        <td>$3.00<div class="text-red-500 text-xs">+20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <label for="my_modal_6" class="btn">take</label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-if="tab === 'my'" class="table">
                <thead>
                    <tr>
                        <td>Seller</td>
                        <td>Wish to {{ tab }}</td>
                        <td>Wish to receive</td>
                        <td>Market Price</td>
                        <td>Order Price</td>
                        <td>Expiry</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom </td>
                        <td>100USDC</td>
                        <td>$4.00</td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <ul class="steps">
                                <li data-content="✓" class="step step-success"></li>
                                <li data-content="✓" class="step step-success"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="bg-gray-500">
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom</td>
                        <td>100Eth </td>
                        <td>$3.98</td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <ul class="steps">
                                <li data-content="✓" class="step step-success"></li>
                                <li data-content="✕" class="step step-error"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom</td>
                        <td>100USDC</td>
                        <td>$4.00</td>
                        <td>$3.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td>
                            <div class="flex gap-1 text-sm">
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
                            <ul class="steps">
                                <li data-content="✓" class="step step-success"></li>
                                <li data-content="✕" class="step step-error"></li>
                            </ul>
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

            <!-- my orders-->
            <h2 class="mt-4">My Orders</h2>
            <div class="tabs tabs-boxed">
                <label class="tab" :class="my === 'sell' ? 'tab-active' : ''" @click="my = 'sell'">Submitted Orders</label>
                <label class="tab" :class="my === 'buy' ? 'tab-active' : ''" @click="my = 'buy'">Taked Orders</label>
                <label class="tab" :class="my === 'only' ? 'tab-active' : ''" @click="my = 'only'">Inbound Private Orders</label>
            </div>
            <table v-if="my === 'buy'" class="table">
                <thead>
                    <tr>
                        <td>Paid</td>
                        <td>Wish to {{ my }}</td>
                        <td>Market Price</td>
                        <td>Order Price</td>
                        <td>Expiry</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>100USDC</td>
                        <td>300Atom </td>
                        <td>$4.00</td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td> in 7 days </td>
                        <td>
                            <label class="btn btn-sm">Cancel</label>
                        </td>
                    </tr>
                    <tr class="bg-gray-500">
                        <td>100Eth </td>
                        <td>300Atom</td>
                        <td>$3.98</td>
                        <td>$4.00</td>
                        <td> in 1 days </td>
                        <td>
                            <label class="btn btn-sm btn-disabled">Cancel</label>
                        </td>
                    </tr>
                    <tr>
                        <td>100USDC</td>
                        <td>
                            300Atom
                        </td>
                        <td>$4.00</td>
                        <td>$3.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td> in 3 days </td>
                        <td>
                            <label class="btn btn-sm">Cancel</label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-if="my === 'sell'" class="table">
                <thead>
                    <tr>
                        <td>Wish to {{ my }}</td>
                        <td>Wish to receive</td>
                        <td>Market Price</td>
                        <td>Order Price</td>
                        <td>Expiry</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>300Atom </td>
                        <td>100USDC</td>
                        <td>$4.00</td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td> in 7 days </td>
                        <td>
                            <ul class="steps">
                                <li data-content="✓" class="step step-success"></li>
                                <li data-content="✕" class="step step-error"></li>
                            </ul>
                        </td>
                        <td>
                            <label class="btn btn-sm">Cancel</label>
                        </td>
                    </tr>
                    <tr class="bg-gray-500">
                        <td>300Atom</td>
                        <td>100Eth </td>
                        <td>$3.98</td>
                        <td>$4.00</td>
                        <td> in 8 days </td>
                        <td>
                            <ul class="steps">
                                <li data-content="✓" class="step step-success"></li>
                                <li data-content="✕" class="step step-error"></li>
                            </ul>
                        </td>
                        <td>
                            <label class="btn btn-sm">Cancel</label>
                        </td>
                    </tr>
                    <tr>
                        <td>300Atom</td>
                        <td>100USDC</td>
                        <td>$4.00</td>
                        <td>$3.00</td>
                        <td> in 7 days </td>
                        <td>
                            <ul class="steps">
                                <li data-content="✓" class="step step-success"></li>
                                <li data-content="✕" class="step step-error"></li>
                            </ul>
                        </td>
                        <td>
                            <label class="btn btn-sm">Cancel</label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-if="my === 'only'" class="table">
                <thead>
                    <tr>
                        <td>Seller</td>
                        <td>Wish to sell</td>
                        <td>Wish to receive</td>
                        <td>Market Price</td>
                        <td>Order Price</td>
                        <td>Expiry</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom </td>
                        <td>100USDC</td>
                        <td>$4.00</td>
                        <td>$4.00<div class="text-green-500 text-xs">-20%</div>
                        </td>
                        <td> in 7 days </td>
                        <td>
                            <label for="my_modal_6" class="btn">take</label>
                        </td>
                    </tr>
                    <tr class="bg-gray-500">
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom</td>
                        <td>100Eth </td>
                        <td>$3.98</td>
                        <td>$4.00</td>
                        <td> in 7 days </td>
                        <td>
                            <label for="my_modal_6" class="btn">take</label>
                        </td>
                    </tr>
                    <tr>
                        <td>chihuahua1m...rcalaenr</td>
                        <td>300Atom</td>
                        <td>100USDC</td>
                        <td>$4.00</td>
                        <td>$3.00</td>
                        <td> in 7 days </td>
                        <td>
                            <label for="my_modal_6" class="btn">take</label>
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
        <!-- place order -->
        <div class="my-4">
            <div class="card bg-base-100 shadow-xl">
                <div class="p-4">
                    <h1 class="card-title">
                        Submit A Swap Order
                    </h1>
                    <h2 class="card-title mt-3">
                        Wish To Sell
                    </h2>
                    <div
                        class="flex items-center relative h-14 bg-gray-100 dark:bg-[#232333] rounded-tl-lg rounded-tr-lg mt-4 text-white">
                        <div class="flex">

                            <div class="dropdown ml-2">
                                <label tabindex="0" class="btn btn-sm btn-ghost m-1">
                                    <img src="https://ping.pub/logos/cosmos.svg"
                                        class="w-8 h-8 mr-3 rounded-full" />CosmosHub</label>
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
                                            <img class="w-7 h-7 rounded-full mr-2"
                                                src="https://ping.pub/logos/cosmos.svg" />
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
                        <input type="number" placeholder="1" class="input bg-transparent h-14 text-right text-lg font-bold" />
                    </div>

                    <div
                        class="flex justify-between align-middle py-2 px-4 bg-gray-200 dark:bg-[#171721] rounded-bl-lg rounded-br-lg text-white mt-0">
                        <div class="text-xs mt-0">
                            Sending Address: cosmos1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr
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
                                Wish To Buy
                            </h2>
                            <div class="text-xs mt-0">
                                {{ remoteWallet.address }}
                            </div>
                        </div>
                        <div class="hidden">
                            <label class="input-group">
                                <select>
                                    <option>Rate</option>
                                    <option>Market Price</option>
                                    <option>Value in USD</option>
                                </select>
                                <input type="text" placeholder="Price" class="input input-bordered" />
                            </label>
                        </div>
                    </div>

                    <div
                        class="flex items-center relative h-14 bg-gray-100 dark:bg-[#232333] rounded-tl-lg rounded-tr-lg mt-4 text-white">
                        <div class="flex">
                            <div class="dropdown ml-2">
                                <label tabindex="0" class="btn btn-sm btn-ghost m-1">
                                    <img src="https://ping.pub/logos/chihuahua.png"
                                        class="w-8 h-8 mr-3 rounded-full" />CHIHUAHUA</label>
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
                                            <img class="w-7 h-7 rounded-full mr-2"
                                                src="https://ping.pub/logos/cosmos.svg" />
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
                        <input type="number" placeholder="Receiving amount"
                            class="input bg-transparent h-14 text-right text-lg font-bold" />
                    </div>

                    <div
                        class="flex justify-between align-middle py-2 px-4 bg-gray-200 dark:bg-[#171721] rounded-bl-lg rounded-br-lg text-white mt-0">
                        <div class="text-xs mt-0">
                            Receiving Address: chihuahua1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr
                        </div>
                        <div class="hidden">
                            <div class="mr-3 text-sm">Balance:</div>
                            <div class="text-base font-semibold">
                                3424
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 justify-end">
                        <div>
                            <input v-model="privates" id="privates" type="checkbox" class="checkbox"/>
                            <label for="privates">Make this order private</label>
                        </div>
                        <div v-if="privates">
                            <input type="text" class="input mb-4 input-bordered w-full" placeholder="input take address (eg:.chihuahua1m8mma9... )" />
                        </div>
                        <div class="">
                            <label class="input-group">
                                <span>Expires in</span>
                                <select class="select select-bordered">
                                    <option>1 hour</option>
                                    <option>12 hours</option>
                                    <option>1 day</option>
                                    <option selected>1 week</option>
                                    <option>1 year</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div class="card-actions justify-end mt-4">
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my_modal_6" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">

                <h3 class="font-bold text-lg">Taker Order!</h3>

                <div class="rounded-xl bg-red-200 p-4">

                    <h2>You will pay</h2>
                    <div class="flex">
                        <div class="ml-2">
                            <label tabindex="0" class="btn btn-sm btn-ghost m-1">
                                <img src="https://ping.pub/logos/chihuahua.png"
                                    class="w-8 h-8 mr-3 rounded-full" />CHIHUAHUA</label>
                        </div>
                        <div>
                            <label tabindex="0" class="flex items-center h-12 px-4 cursor-pointer">
                                <div class="text-lg font-semibold mr-2">
                                    100 HUAHUA
                                </div>
                                <Icon icon="mdi:chevron-down" class="text-lg" />
                            </label>
                        </div>
                    </div>
                    <p v-if="remoteWallet.address" class="py-4">
                        {{ remoteWallet.address }}
                    </p>
                    <p v-else>
                        <button class="btn btn-primary w-full my-10" @click="connect">Connect Wallet</button>
                    </p>

                </div>
                <div class="rounded-xl p-4">
                    <div class="flex justify-between">
                        <span class=" font-bold">Market Price</span><span> $4.00</span>
                    </div>
                    <div class="flex justify-between">
                        <span class=" font-bold">My Price</span><span> 3.50</span>
                    </div>
                </div>

                <div class="rounded-xl bg-green-200 p-4">

                    <h2>You will receive</h2>
                    <div class="flex">
                        <div class="ml-2">
                            <label tabindex="0" class="btn btn-sm btn-ghost m-1">
                                <img src="https://ping.pub/logos/cosmos.svg"
                                    class="w-8 h-8 mr-3 rounded-full" />Cosmoshub</label>
                        </div>
                        <div>
                            <label tabindex="0" class="flex items-center h-12 px-4 cursor-pointer">
                                <div class="text-lg font-semibold mr-2">
                                    300 ATOM
                                </div>
                                <Icon icon="mdi:chevron-down" class="text-lg" />
                            </label>                            
                        </div>
                    </div>
                    <p v-if="remoteWallet.address" class="py-4">
                        <input type="text" class="input my-4 input-bordered w-full"
                    placeholder="My Receiving Address: cosmos1abcd3faf3raf3r343" />
                    <span></span>
                    </p>
                    <p v-else>
                        <button class="btn btn-primary w-full my-10" @click="connect">Connect Wallet</button>
                    </p>
                </div>
                
                <div class="modal-action">
                    <label for="my_modal_6" class="btn">Take!</label>
                </div>
            </div>
        </div>
    </div>
</template>