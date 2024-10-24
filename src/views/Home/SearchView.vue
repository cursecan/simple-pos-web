<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import apiClient from "@/composers/apiClient";
import { debounce } from "lodash";
import { rupiah } from "@/composers/useCurrency";
import { useSaleStore } from "@/stores/saleStore";

const search = ref('')
const modeBarcode = ref(true)
const focusField = ref()
const data = ref(null)
const props = defineProps({
    sale: {
        type: Object
    }
})

const emit = defineEmits(['changeSale'])
const initCondition = () => {
    data.value = null
    focusField.value.focus()
    search.value = ''
}

const toggleMode = () => {
    modeBarcode.value = !modeBarcode.value
    initCondition()
}

const saleStore = useSaleStore()


const handleSearch = async () => {
    await apiClient.get('api/bisnis/barang/', {params: { q: search.value}}).then(async (res) => {
        data.value = res.data
        if (modeBarcode.value && data.value.results.length === 1) {
            const item = data.value.results[0]
            setTimeout(() => {
                postItemSale(item.id)
            }, 400);
        }
    }).catch(err => {
        console.log(err)
    })
}

const postItemSale = async (i) => {
    await apiClient.post('/api/rekap/items/', {
        penjualan: props.sale.id,
        barang: i
    }).then(res => {
        saleStore.pushItem(res.data)
        initCondition()
    })
}

onMounted(() => {
    initCondition()
})

watch(search, () => {
    if (search.value.length > 0) handleSearch()
    else data.value = null
})

watch(() => props.sale, () => {
    initCondition()
})

</script>


<template>
    <div class="flex-1 p-6 flex flex-col">
        <div class="">
            
            <div class="form-control flex items-center gap-3">
                <div class="flex-1">
                    <input ref="focusField" v-model="search" type="text" class="input w-full" :placeholder="modeBarcode ? 'Menunggu masukan mesin scanner' : 'Cari nama barang, nomor sku atau barcode'">
                </div>
                <button @click="toggleMode" class="btn">{{ modeBarcode ? 'Mode Barcode' : 'Mode Manual'}}</button>
            </div>
                <!-- <div class="overflow-hidden rounded-full border shadow flex">
                    <input v-model="search" type="text" class="px-6 py-5 flex-1 outline-none" placeholder="Cari produk">
                    <button class="flex items-center justify-center px-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                    </button>
                </div> -->
        </div>
        <div class="flex-1 mt-10">
            <div v-if="data?.results.length > 0" class="">
                <ul class="divide-y">
                    <li v-for="i in data.results" :key="i.id">
                        <a href="#" @click.prevent="postItemSale(i.id)" class="block py-4 hover:bg-gray-50">
                            <div class="flex items-top px-3">
                                <div class="flex-1">
                                    <div class="">({{ i.sku || 'SK.001' }}) {{ i.nama_barang }}</div>
                                    <div class="flex items-center gap-2 text-sm text-gray-500">
                                        <div class="">Stok: {{ i.stok }}</div>
                                        <div class="">Kode: {{ i.code || '-' }}</div>
                                    </div>
                                </div>
                                <div class="">{{ rupiah(i.harga) }}</div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- Empty  -->
            <div v-else class="bg-gray-100 flex-1 h-[100%]">
            </div>

            <!-- No Empty -->
        </div>
    </div>
</template>