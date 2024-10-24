<script setup>
import { useSaleStore } from '@/stores/saleStore';
import { computed, ref } from 'vue';
import { rupiah } from '@/composers/useCurrency';

import ItemUpdateModal from './components/ItemUpdateModal.vue';
import PayActionModal from './components/PayActionModal.vue';
import apiClient from '@/composers/apiClient';
import { useAlertStore } from '@/stores/alertStore';

const saleStore = useSaleStore()
const alertStore = useAlertStore()

const props = defineProps({
    sale: {
        type: Object
    }
})
const emit = defineEmits(['reset'])
const items = computed(() => saleStore.items)
const subtotal = (a, b) => (rupiah(a*b))

const item = ref(null)
const prosesBayar = ref(false)

const total = computed(() => (items.value.reduce((a, b) => (a + (b.qty * b.harga)), 0)))

const selectItem = (i) => {
    item.value = items.value.find(item => item.id === i)
}

const closeModal = () => {
    item.value = null
    prosesBayar.value = false
}

const postUpdate = async (e) => {
    await apiClient.put(`api/rekap/items/${item.value.id}/`, {
        ...item.value, qty: e
    }).then(res => {
        saleStore.pushItem(res.data)
    }).catch(err => {
        console.log(e)
    })

    closeModal()
}

const resetSale = () => {
    saleStore.items = []
    emit('reset')
}

const postProsesBayar = async () => {
    await apiClient.post(`/api/rekap/penjualan/${props.sale.id}/bayar/`).then((res) => {
        saleStore.addTotal(res.data.total)
        alertStore.success('Berhasil menerima pembayaran.')
    }).catch(
        err => {
            console.log(err.response.data)
        }
    )
    resetSale()
    closeModal()
}

</script>



<template>
    <div class="flex-1 p-6 flex flex-col">
        <div class="flex-1">
            <table class=" table min-w-full border">
                <thead>
                    <tr>
                        <th class="px-4 py-2 bg-gray-100">Item</th>
                        <th class="px-4 py-2 bg-gray-100">Qty</th>
                        <th class="px-4 py-2 bg-gray-100">Total</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    <tr v-for="i, index in items" :key="index">
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-2">
                                <span class="w-4">{{  index+1 }}</span>
                                <a href="#" @click.prevent="selectItem(i.id)"><span>{{ i.item.nama_barang }} @{{ rupiah(i.harga) }}</span></a>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-center">{{ i.qty }}</td>
                        <td class="px-4 py-3 text-right font-light">{{ subtotal(i.harga, i.qty) }}</td>
                    </tr>
                    <tr v-if="items.length === 0">
                        <td colspan="3" class="text-center py-3">Tidak ada item</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex items-center border-t pt-6">
            <div class="flex-1 font-medium text-xl">
                <div class="text-sm font-light">Total belanja</div>
                {{ rupiah(total) }}
            </div>
            <div class="flex items-center gap-6">
                <button class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
                <button :disabled="total<=0" @click="prosesBayar=true" class="btn" :class="[total>0 ? 'primary' : '']">Pembayaran</button>
            </div>
        </div>
    </div>


    <!-- Modal -->
    <ItemUpdateModal v-if="item" :item="item" @submit="postUpdate" />

    <PayActionModal v-if="prosesBayar" @submit="postProsesBayar" />



</template>