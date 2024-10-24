<script setup>
import ModalComponent from '@/components/ModalComponent.vue';
import { onMounted, ref } from 'vue';

const props = defineProps({
    item: {
        type: Object
    }
})

const qty = ref(null)
const focusField = ref()

onMounted(() => {
    focusField.value.focus()
})

const emit = defineEmits(['submit'])
</script>

<template>
    <ModalComponent>
        <div class="p-6">
            <div class="text-center">{{ item.item.nama_barang }}</div>
            <form @submit.prevent="emit('submit', qty ? qty : item.qty)" action="" class="space-y-6 mt-10">
                <div class="form-control">
                    <input ref="focusField" v-model="qty" type="number" :placeholder="item.qty" class="w-full input">
                </div>
                <div class="">
                    <button class="btn w-full">Simpan</button>
                </div>
            </form>
        </div>
    </ModalComponent>
</template>