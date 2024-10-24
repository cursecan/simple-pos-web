<script setup>
import IconSuccess from './icons/IconSuccess.vue';
import IconDanger from './icons/IconDanger.vue';
import IconWarning from './icons/IconWarning.vue';

import { useAlertStore } from '@/stores/alertStore';

const alertStore = useAlertStore()

const style = {
    success: 'bg-teal-200 text-teal-600',
    warning: 'bg-orange-100 text-orange-400',
    danger: 'bg-rose-200 text-rose-600',
}

const icon = {
    success: IconSuccess,
    warning: IconWarning,
    danger: IconDanger
}

</script>

<template>
    <Teleport to="body">
        <Transition>
            <div v-if="alertStore.alert.message" class="absolute top-0 inset-x-0 mt-8 flex items-center justify-end px-8">
                <div class="max-w-xl w-full rounded-xl overflow-hidden" :class="[style[alertStore.alert.type]]">
                    <div class="">
                        <div class="flex items-center gap-2 px-5 py-3">
                            <component :is="icon[alertStore.alert.type]" />
                            <div class="">{{ alertStore.alert.message }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>