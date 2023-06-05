<template>
  <div>
    <div class="flex items-center text-xs justify-between text-gray-500">
      <div>Buy</div>
      <div>BALANCE: 0</div>
    </div>

    <div class="bg-gray-50 border rounded-lg flex items-center text-sm mt-3">
      <label
        for="modal-swap-chain"
        class="w-40 hover:bg-gray-100 h-12 flex items-center justify-between px-4 cursor-pointer border-r"
      >
        <span class="mr-2 flex-1 w-0 whitespace-nowrap truncate">Aribitrum Georli</span>
        <Icon name="streamline:interface-arrows-button-down-arrow-down-keyboard" size="10" />
      </label>
      <label
        for="modal-swap-token"
        class="w-40 hover:bg-gray-100 h-12 flex items-center justify-between px-4 cursor-pointer border-r"
      >
        <span class="mr-2 flex-1 w-0 whitespace-nowrap truncate">ETH</span>
        <Icon name="streamline:interface-arrows-button-down-arrow-down-keyboard" size="10" />
      </label>
      <input
        type="text"
        placeholder="Enter Amount"
        class="input flex-1 w-0 bg-transparent hover:outline-none focus-within:outline-none"
      />
      <div class="px-4">
        <div class="badge cursor-pointer">Max</div>
      </div>
    </div>
  </div>
</template>
