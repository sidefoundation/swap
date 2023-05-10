<template>
  <div>
    <input type="checkbox" :id="modalId" class="modal-toggle" />

    <label :for="modalId" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <h3 class="font-bold text-lg">Select Chain</h3>
        <p class="py-4">TODO...</p>
        <div class="modal-action">
          <label :for="modalId" class="btn">Yay!</label>
        </div>
      </label>
    </label>
  </div>
</template>

<script setup>
const modalId = 'modal-swap-chain';
</script>
