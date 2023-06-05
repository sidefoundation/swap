<script lang="ts" setup>

</script>
<template>
    <div class="container m-auto">
        <div class="grid grid-cols-3 -scroll-mt-10">
            <div class="col-span-2 px-4">
                <div class="py-10 flex justify-between">
                    <span>Pool Id: Pool432142142143214321</span>
                    <span class="rounded-xl p-2 bg-green-300">Ready</span>
                </div>
                <div class="flex justify-evenly">
                    <div class=" bg-slate-200 rounded-xl py-10 px-4">
                        ATOM/HUAHUA
                    </div>
                    <div class=" bg-slate-200 rounded-xl py-10 px-4">
                        Pool Value: $2134214
                    </div>
                    <div class=" bg-slate-200 rounded-xl py-10 px-4">
                        Atom Value: $4324321
                    </div>
                    <div class=" bg-slate-200 rounded-xl py-10 px-4">
                        Huahua value: $343
                    </div>
                    <div class=" bg-slate-200 rounded-xl py-10 px-4">
                        Price $4.34
                    </div>
                </div>

                <h2 class="mt-10">Pool Composition</h2>
                <table class="table w-full">
                    <thead>
                        <tr>
                            <td>Token</td>
                            <td>Balances</td>
                            <td>Value</td>
                            <td>%</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="10" class=" bg-slate-300">On Cosmoshub</td>
                        </tr>
                        <tr class="hover">
                            <td>ATOM</td>
                            <td>142421</td>
                            <td>14321</td>
                            <td>51%</td>
                        </tr>
                        <tr class="hover">
                            <td>HUAHUA<span class="text-sm">(virtual)</span></td>
                            <td>142421</td>
                            <td>14321</td>
                            <td>51%</td>
                        </tr>
                        <tr>
                            <td colspan="10" class=" bg-slate-300">On Chihuahua</td>
                        </tr>
                        <tr class="hover">
                            <td>ATOM<span class="text-sm">(virtual)</span></td>
                            <td>142421</td>
                            <td>14321</td>
                            <td>51%</td>
                        </tr>
                        <tr class="hover">
                            <td>HUAHUA</td>
                            <td>142421</td>
                            <td>14321</td>
                            <td>51%</td>
                        </tr>
                    </tbody>
                </table><h2 class="mt-10">Pool Activities</h2>
                <table class="table w-full">
                    <thead>
                        <tr>
                            <td>Action</td>
                            <td>Details</td>
                            <td>Value</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="hover">
                            <td>Swap</td>
                            <td>100ATOM &lt;&gt; 300CHIHUAHUA</td>
                            <td>$14321</td>
                            <td>2 mins ago</td>
                        </tr>
                        <tr class="hover">
                            <td>Swap</td>
                            <td>100ATOM &lt;&gt; 300CHIHUAHUA</td>
                            <td>$14321</td>
                            <td>2 mins ago</td>
                        </tr>
                        <tr class="hover">
                            <td>Swap</td>
                            <td>100ATOM &lt;&gt; 300CHIHUAHUA</td>
                            <td>$14321</td>
                            <td>2 mins ago</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table class="table w-full">
                    <thead>
                        <tr>
                            <td colspan="2">My Liquidity</td>
                        </tr>
                    </thead>
                    <tr>
                        <td>Balances:</td>
                        <td>1341431241</td>
                    </tr>
                </table>
                <div class="mt-4">
                    <label class="btn btn-success w-1/2">Add Liquidity</label>
                    <label class="btn btn-info w-1/2">Withdraw</label>
                </div>
            </div>
        </div>
    </div>
</template>