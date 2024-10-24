<script setup>
import { stringify } from 'postcss';


const model = defineModel()
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    }
})
</script>


<template>
    <div class="form-control">
        <label v-if="props.label" for="">{{ props.label }}</label>
        <input v-model="model" class="input w-full" :type="type" :placeholder="placeholder">
    </div>
</template>