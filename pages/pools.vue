<script lang="ts" setup>
const weight = ref(50)
const step = ref(1)
</script>

<template>
    <div class=" container m-auto py-10">
        <div> Liquidity Mesh Network </div>
        <div class="flex gap-4 py-4">
            <div class="btn btn-sm btn-primary">CosmosHub</div>
            <div class="btn btn-sm">OSmosis</div>
            <div class="btn btn-sm">Akash</div>
            <div class="btn btn-sm">Stargaze</div>
            <div class="btn btn-sm">Bitcanna</div>
        </div>
        <div> My Pools </div>
        <table class="table w-full">
            <thead>
                <tr>
                    <td>Mesh</td>
                    <td>Composition</td>
                    <td>Pool Value</td>
                    <td>My Liquidity</td>
                    <td>APR</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="flex">
                            <img src="https://ping.pub/logos/cosmos.svg" class="w-6 h-6 mr-3 rounded-full" />
                            <img src="https://ping.pub/logos/chihuahua.png" class="w-6 h-6 mr-3 rounded-full" />
                        </div>
                    </td>
                    <td>ATOM / HUAHUA <span class="text-xs bg-slate-400 rounded-md text-white p-1">60 : 40</span></td>
                    <td>$100,100,100</td>
                    <td>$23,000</td>
                    <td>23%</td>
                </tr>
                <tr>
                    <td>
                        <div class="flex">
                            <img src="https://ping.pub/logos/cosmos.svg" class="w-6 h-6 mr-3 rounded-full" />
                            <img src="https://ping.pub/logos/chihuahua.png" class="w-6 h-6 mr-3 rounded-full" />
                        </div>
                    </td>
                    <td>ATOM / HUAHUA <span class="text-xs bg-slate-400 rounded-md text-white p-1">60 : 40</span></td>
                    <td>$100,100,100</td>
                    <td>$23,000</td>
                    <td>23%</td>
                </tr>
                <tr>
                    <td>
                        <div class="flex">
                            <img src="https://ping.pub/logos/cosmos.svg" class="w-6 h-6 mr-3 rounded-full" />
                            <img src="https://ping.pub/logos/chihuahua.png" class="w-6 h-6 mr-3 rounded-full" />
                        </div>
                    </td>
                    <td>ATOM / HUAHUA <span class="text-xs bg-slate-400 rounded-md text-white p-1">60 : 40</span></td>
                    <td>$100,100,100</td>
                    <td>$23,000</td>
                    <td>23%</td>
                </tr>
            </tbody>
        </table>

        <div class="mt-10 flex justify-between">
            <h2>All Pools</h2>
            <!-- The button to open modal -->
            <a href="#my_modal_8" class="btn btn-primary">Create Pool</a>
            <!-- Put this part before </body> tag -->
            <div class="modal" id="my_modal_8">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Create New Pool</h3>
                    <!-- step 1-->
                    <div v-if="step === 1">
                        <h6>Step 1: Select Tokens</h6>
                        <div class="flex justify-evenly">
                            <div class="mt-10 flex flex-col rounded-lg bg-green-300">
                                <div>Local Chain</div>
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
                                            ATOM ({{ weight }}%)
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

                            <div class="mt-10 flex flex-col rounded-lg bg-blue-300">
                                <div>Remote Chain</div>
                                <div class="dropdown ml-2">
                                    <label tabindex="0" class="btn btn-sm btn-ghost m-1">
                                        <img src="https://ping.pub/logos/chihuahua.png"
                                            class="w-8 h-8 mr-3 rounded-full" />Chihuahua</label>
                                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a>Evmos</a></li>
                                        <li><a>Osmosis</a></li>
                                    </ul>
                                </div>
                                <div class="dropdown">
                                    <label tabindex="0" class="flex items-center h-12 px-4 cursor-pointer">
                                        <div class="text-lg font-semibold mr-2">
                                            ATOM ({{ 100 - weight }}%)
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
                        </div>
                        <input v-model="weight" type="range" min="10" max="90" class="range mt-5" step="10" />
                        <input type="text" class="mt-4 w-full input input-bordered" placeholder="fee rate: 2%" />
                    </div>
                    <div v-if="step === 2" class="py-10">
                        <div class="join w-full my-5">
                            <button class="join-item bg-slate-400">ATOM<div class="text-xs">( On Cosmoshub)</div></button>
                            <input class="input join-item w-2/3" placeholder="Amount"/>
                        </div>
                        <div class="join w-full my-5">
                            <button class="join-item bg-slate-400">HUAHUA<div class="text-xs">( On Chihuahua)</div></button>
                            <input class="input join-item w-2/3" placeholder="Amount"/>
                        </div>
                        <div class="rounded-lg my-2 bg-red-200 p-5">
                            We recommend you deposit at least $200,000
                        </div>
                    </div>
                    <div v-if="step === 3" class="py-10 bg-slate-400 rounded-xl">
                        <div class="join w-full my-5">
                            <button class="join-item bg-slate-400">ATOM<div class="text-xs">( On Cosmoshub)</div></button>
                            214321421 (50%)
                        </div>
                        <div class="join w-full my-5">
                            <button class="join-item bg-slate-400">HUAHUA<div class="text-xs">( On Chihuahua)</div></button>
                            1424252151 (50%)
                        </div>
                        <div class="join w-full my-5">
                            price: 4.32 ATOM/HUAHUA
                        </div>
                        <div class="join w-full my-5">
                            Pool Value: 4.32 ATOM/HUAHUA
                        </div>
                    </div>
                    <div v-if="step === 4" class="py-10 bg-slate-400 rounded-xl">
                        <ul class="steps">
                            <li class="step step-info">Submited</li>
                            <li class="step step-info">Deposited on remote chain</li>
                            <li class="step step-error" data-content="?">Ready</li>
                        </ul>
                    </div>
                    <div class="modal-action">
                        <div v-if="step < 4">
                            <label v-if="step > 1" class="btn" @click="step -= 1">Last</label>
                            <a v-if="step === 3" class="btn" @click="step += 1">Submit</a>
                            <label v-else class="btn" @click="step += 1">Next</label>
                        </div>
                        <a v-if="step === 4" class="btn" href="#"  @click="step = 1">Close</a>
                    </div>
                </div>
            </div>
        </div>
        <table class="table w-full">
            <thead>
                <tr>
                    <td>Mesh</td>
                    <td>Composition</td>
                    <td>Pool Value</td>
                    <td>APR</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="flex">
                            <img src="https://ping.pub/logos/cosmos.svg" class="w-6 h-6 mr-3 rounded-full" />
                            <img src="https://ping.pub/logos/chihuahua.png" class="w-6 h-6 mr-3 rounded-full" />
                        </div>
                    </td>
                    <td>ATOM / HUAHUA <span class="text-xs bg-slate-400 rounded-md text-white p-1">60 : 40</span></td>
                    <td>$100,100,100</td>
                    <td>23%</td>
                    <td><RouterLink to="/pool">Detail</RouterLink></td>
                </tr>
                <tr>
                    <td>
                        <div class="flex">
                            <img src="https://ping.pub/logos/cosmos.svg" class="w-6 h-6 mr-3 rounded-full" />
                            <img src="https://ping.pub/logos/chihuahua.png" class="w-6 h-6 mr-3 rounded-full" />
                        </div>
                    </td>
                    <td>ATOM / HUAHUA <span class="text-xs bg-slate-400 rounded-md text-white p-1">60 : 40</span></td>
                    <td>$100,100,100</td>
                    <td>23%</td>
                    <td><RouterLink to="/pool">Detail</RouterLink></td>
                </tr>
                <tr>
                    <td>
                        <div class="flex">
                            <img src="https://ping.pub/logos/cosmos.svg" class="w-6 h-6 mr-3 rounded-full" />
                            <img src="https://ping.pub/logos/chihuahua.png" class="w-6 h-6 mr-3 rounded-full" />
                        </div>
                    </td>
                    <td>ATOM / HUAHUA <span class="text-xs bg-slate-400 rounded-md text-white p-1">60 : 40</span></td>
                    <td>$100,100,100</td>
                    <td>23%</td>
                    <td><RouterLink to="/pool">Detail</RouterLink></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>