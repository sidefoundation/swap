<template>
  <div class="w-[600px] bg-base-100 mt-8 mx-auto rounded-lg shadow-lg pt-4 pb-8 px-5">
    <div class="flex items-center justify-between mb-4">
      <div class="text-xl font-semibold flex-1">Swap</div>
      <div class="btn btn-ghost btn-sm">
        <Icon
          name="streamline:interface-setting-slider-horizontal-adjustment-adjust-controls-fader-horizontal-settings-slider"
          size="16"
        />
      </div>
    </div>

    <SwapFormFrom />

    <div class="text-center mt-4">
      <Icon
        name="streamline:interface-arrows-diagonal-arrows-arrow-server-data-diagonal-internet-transfer-network"
        size="20"
        class="text-gray-400"
      />
    </div>

    <SwapFormTo />

    <SwapFormInfo />

    <btn class="btn w-full">Connect Wallet</btn>

    <SwapModalChain />
    <SwapModalToken />
  </div>
</template>
