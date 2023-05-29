<script lang="ts" setup>
const remoteWallet = ref({address: ''})
const special = ref(false)

function connect() {
    remoteWallet.value = {
        address: "side1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr"
    }
}
</script>
<template>
  <div class="container m-auto">
    <div class="flex justify-center gap-4 mt-4">
      <div class="card w-2/5 bg-green-100 shadow-xl">
        <div class="p-4">
          <h2 class="card-title">
            Exchanges tokens from:
            <div class="dropdown ml-2">
              <label tabindex="0" class="btn btn-sm btn-ghost m-1">CosmosHub</label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Evmos</a></li>
                <li><a>Osmosis</a></li>
              </ul>
            </div>
          </h2>
          <div class="text-xs mt-0">
            cosmos1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr
          </div>
          <div
            class="flex items-center relative h-14 bg-gray-100 dark:bg-[#232333] rounded-tl-lg rounded-tr-lg mt-4 text-white">
            <div class="dropdown">
              <label tabindex="0" class="flex items-center h-12 px-4 cursor-pointer">
                <img src="https://ping.pub/logos/cosmos.svg" class="w-8 h-8 mr-3 rounded-full" />
                <div class="text-lg font-semibold mr-2">
                  ATOM
                </div>
                <Icon icon="mdi:chevron-down" class="text-lg" />
              </label>
              <div tabindex="0" class="dropdown-content shadow bg-base-100 rounded-lg w-64 mt-0">
                <div class="py-2">
                  <div class="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#232333] cursor-pointer">
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
            <input type="number" placeholder="1" class="input bg-transparent flex-1 h-14 text-right text-lg font-bold" />
          </div>

          <div
            class="flex items-center py-2 px-4 bg-gray-200 dark:bg-[#171721] rounded-bl-lg rounded-br-lg text-white mt-0">
            <div class="mr-3 text-sm">Balance:</div>
            <div class="text-base font-semibold">
              3424
            </div>
          </div>

          <div class="card bg-slate-400 my-5 rounded-md">
            <div class="card-title m-4">Pool State on CosmosHub</div>
            <div class="card-body pt-0">
              <div class="mt-0">Price: <span class="float-right">$123.5</span></div>
              <div>Price impact: <span class="float-right">$123.5</span></div>
              <div>Pool Supply: <span class="float-right">123.5</span></div>
            </div>
          </div>
                    
          <div class="card-actions justify-end mt-4">
            <button class="btn btn-primary">Sending A Swap >></button>
          </div>
        </div>
      </div>

      <div class="card w-2/5 bg-blue-100 shadow-xl">
        <div class="p-4">
          <h2 class="card-title">
            Receiving tokens on:
            <div class="dropdown ml-2">
              <label tabindex="0" class="btn btn-sm btn-ghost m-1">Osmosis</label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Evmos</a></li>
                <li><a>Osmosis</a></li>
              </ul>
            </div>
          </h2>
          <div class="text-xs mt-0">
            osmo1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr <span class="ml-2 text-primary">Edit</span>
          </div>
          <div
            class="flex items-center relative h-14 bg-gray-700 rounded-tl-lg rounded-tr-lg mt-4 text-white">
            <div class="dropdown">
              <label tabindex="0" class="flex items-center h-12 px-4 cursor-pointer">
                <img src="https://ping.pub/logos/osmosis.jpg" class="w-8 h-8 mr-3 rounded-full" />
                <div class="text-lg font-semibold mr-2">
                  ATOM
                </div>
                <Icon icon="mdi:chevron-down" class="text-lg" />
              </label>
              <div tabindex="0" class="dropdown-content shadow bg-gray-800 rounded-lg w-64 mt-0">
                <div class="py-2">
                  <div class="flex items-center px-4 py-2 cursor-pointer">
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
            <input type="number" placeholder="1" class="input bg-transparent flex-1 h-14 text-right text-lg font-bold" />
          </div>

          <div
            class="flex items-center py-2 px-4 bg-gray-400 dark:bg-[#171721] rounded-bl-lg rounded-br-lg text-white mt-0">
            <div class="mr-3 text-sm">Balance:</div>
            <div class="text-base font-semibold">
              3424
            </div>
          </div>

          <div class="card bg-slate-400 my-5 rounded-md">
            <div class="card-title m-4">Pool State On Osmosis</div>
            <div class="card-body pt-0">
              <div class="mt-0">Price: <span class="float-right">$123.5</span></div>
              <div>Price impact: <span class="float-right">$123.5</span></div>
              <div>Pool Supply: <span class="float-right">123.5</span></div>
            </div>
          </div>
                              
          <div class="card-actions justify-end mt-4">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
