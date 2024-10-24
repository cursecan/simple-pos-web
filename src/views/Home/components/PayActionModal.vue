<script setup>
import ModalComponent from '@/components/ModalComponent.vue';

const emit = defineEmits(['submit'])
</script>


<template>
    <ModalComponent>
        <div class="">
            <form @submit.prevent="emit('submit')" action="">
                <div class="">
                    <button class="btn w-full">Bayar Tunai</button>
                </div>
            </form>
        </div>
    </ModalComponent>
</template>