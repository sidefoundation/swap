<script lang="ts" setup>
import Swap from '../components/swap/index.vue'
const remoteWallet = ref({address: ''})
const special = ref(false)

function connect() {
    remoteWallet.value = {
        address: "side1m8mma95ta2zajqtmfp5c5y3wgeyqzcrcalaenr"
    }
}
</script>
<template>
  <Swap class="mt-10"></Swap>
</template>
