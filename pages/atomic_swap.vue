<script lang="ts" setup>
import { ChainConfig } from '@/config/ChainConfig'
import EnableKelpr from '~/components/base/EnableKelpr.vue';
import { useChains } from '~/stores/chain';
import { AtomicOrder } from '~/types/side';

const chainStore = useChains()
const orders = ref([] as AtomicOrder[])
chainStore.client.fetchAtomicSwapOrders().then(x => {
    orders.value = x.orders
})
const selected = ref(chainStore.current.chainID)
function change() {
    chainStore.changeCurrent(selected.value)
}
</script>
<template>
    <div>
        <div class="w-[600px] bg-base-100 mt-8 mx-auto rounded-lg shadow-lg pt-4 pb-8 px-5">            
            <select v-model="selected" @change="change">
                <option v-for="v in ChainConfig.chains" :value="v.chainID">
                    {{ v.name }}
                </option>
            </select>
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Maker</th><th>Sell</th><th>Buy</th><th>Taker</th><th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="o in orders">
                        <td>{{ o.maker.maker_address }}</td>
                        <td>{{ o.maker.sell_token }}</td>
                        <td>{{ o.maker.buy_token }}</td>
                        <td>{{ o.takers.taker_address }}</td>
                        <td>{{ o.status }}</td>
                    </tr>
                    <tr v-if="!orders || orders.length <= 0"><td colspan="13">No order found</td></tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="13"><span class="btn btn-sm">Make An Order</span></td>
                    </tr>
                </tfoot>
            </table>

            <EnableKelpr/>
        </div>
    </div>
</template>